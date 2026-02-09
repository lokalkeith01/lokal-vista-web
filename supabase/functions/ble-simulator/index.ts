import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user and check admin role
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check admin role via user_roles table
    const { data: roleData } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const action = typeof body.action === 'string' ? body.action.slice(0, 20) : '';
    const beaconId = typeof body.beaconId === 'string' ? body.beaconId.slice(0, 100) : '';
    const intensity = ['low', 'medium', 'high'].includes(body.intensity) ? body.intensity : 'medium';

    if (!action || !beaconId) {
      return new Response(
        JSON.stringify({ error: 'action and beaconId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`BLE Simulator - Action: ${action}, Beacon: ${beaconId}, Intensity: ${intensity}, User: ${userId}`);

    if (action === 'start') {
      const intensityConfig = {
        low: { count: 2, intervalMs: 5000 },
        medium: { count: 5, intervalMs: 3000 },
        high: { count: 10, intervalMs: 1500 },
      };

      const config = intensityConfig[intensity as keyof typeof intensityConfig] || intensityConfig.medium;

      for (let i = 0; i < config.count; i++) {
        const deviceFingerprint = `sim_device_${Math.random().toString(36).substring(7)}`;
        const signalStrength = -50 - Math.floor(Math.random() * 40);
        const distanceMeters = Math.pow(10, ((-69 - signalStrength) / (10 * 2)));

        await supabaseClient.from('beacon_detections').insert({
          beacon_id: beaconId,
          device_fingerprint: deviceFingerprint,
          signal_strength: signalStrength,
          distance_meters: distanceMeters.toFixed(2),
          detection_type: 'simulated',
          metadata: {
            simulation_intensity: intensity,
            timestamp: new Date().toISOString(),
          },
        });

        const { data: existingSessions } = await supabaseClient
          .from('visitor_sessions')
          .select('*')
          .eq('device_fingerprint', deviceFingerprint)
          .eq('is_active', true)
          .single();

        if (!existingSessions) {
          await supabaseClient.from('visitor_sessions').insert({
            device_fingerprint: deviceFingerprint,
            entry_beacon_id: beaconId,
            session_start: new Date().toISOString(),
            beacon_path: JSON.stringify([{ beacon_id: beaconId, timestamp: new Date().toISOString() }]),
            confidence_score: 0.85 + Math.random() * 0.15,
            is_active: true,
          });
        }

        console.log(`Generated detection for device: ${deviceFingerprint}`);
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Generated ${config.count} simulated detections`,
          intensity,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'stop') {
      await supabaseClient
        .from('visitor_sessions')
        .update({ 
          is_active: false, 
          session_end: new Date().toISOString(),
        })
        .eq('entry_beacon_id', beaconId)
        .eq('is_active', true);

      return new Response(
        JSON.stringify({ success: true, message: 'Simulation stopped' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in BLE simulator:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
