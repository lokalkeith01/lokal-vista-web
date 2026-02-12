import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, reason, userId } = await req.json();

    if (!email || typeof email !== "string" || email.length > 320) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sanitizedReason = reason ? escapeHtml(String(reason).slice(0, 1000)) : null;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Store the deletion request
    const { error: insertError } = await supabaseAdmin
      .from("data_deletion_requests")
      .insert({
        email: email.toLowerCase().trim(),
        reason: sanitizedReason,
        user_id: userId || null,
        status: "pending",
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error("Failed to store deletion request");
    }

    // Send confirmation email via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Lokal <help@sharelokal.com>",
          to: [email],
          subject: "Data Deletion Request Received - Lokal",
          html: `<p>Hi,</p><p>We've received your request to delete your data from Lokal. We will process your request within <strong>30 days</strong>.</p><p>If you did not make this request, please contact us immediately at help@sharelokal.com.</p><p>— The Lokal Team</p>`,
        }),
      });
    }

    // Notify admin
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Lokal System <help@sharelokal.com>",
          to: ["help@sharelokal.com"],
          subject: `Data Deletion Request: ${email}`,
          html: `<p>New data deletion request:</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>User ID:</strong> ${userId || "N/A"}</p><p><strong>Reason:</strong> ${sanitizedReason || "Not provided"}</p>`,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Data deletion error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
