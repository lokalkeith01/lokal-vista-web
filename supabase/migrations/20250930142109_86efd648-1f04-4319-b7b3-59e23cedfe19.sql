-- Create beacons table
CREATE TABLE public.beacons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mac_address text UNIQUE NOT NULL,
  location_name text NOT NULL,
  latitude numeric,
  longitude numeric,
  major integer,
  minor integer,
  uuid text,
  is_active boolean DEFAULT true,
  last_seen_at timestamp with time zone,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create beacon_detections table
CREATE TABLE public.beacon_detections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beacon_id uuid REFERENCES public.beacons(id) ON DELETE CASCADE,
  device_fingerprint text NOT NULL,
  signal_strength integer NOT NULL,
  distance_meters numeric,
  detection_type text DEFAULT 'ble',
  metadata jsonb,
  detected_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Create visitor_sessions table
CREATE TABLE public.visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_fingerprint text NOT NULL,
  entry_beacon_id uuid REFERENCES public.beacons(id),
  exit_beacon_id uuid REFERENCES public.beacons(id),
  beacon_path jsonb,
  total_dwell_time_seconds integer,
  confidence_score numeric,
  session_start timestamp with time zone NOT NULL,
  session_end timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  campaign_type text NOT NULL,
  target_beacons uuid[],
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone,
  is_active boolean DEFAULT true,
  metadata jsonb,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create campaign_attributions table
CREATE TABLE public.campaign_attributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.campaigns(id) ON DELETE CASCADE,
  visitor_session_id uuid REFERENCES public.visitor_sessions(id) ON DELETE CASCADE,
  attribution_type text NOT NULL,
  confidence_score numeric NOT NULL,
  beacon_id uuid REFERENCES public.beacons(id),
  attributed_at timestamp with time zone DEFAULT now(),
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.beacons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beacon_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_attributions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for beacons
CREATE POLICY "Beacons viewable by everyone" ON public.beacons FOR SELECT USING (true);
CREATE POLICY "Admins can manage beacons" ON public.beacons FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for beacon_detections
CREATE POLICY "Detections viewable by everyone" ON public.beacon_detections FOR SELECT USING (true);
CREATE POLICY "Anyone can insert detections" ON public.beacon_detections FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage detections" ON public.beacon_detections FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for visitor_sessions
CREATE POLICY "Sessions viewable by everyone" ON public.visitor_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert sessions" ON public.visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage sessions" ON public.visitor_sessions FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for campaigns
CREATE POLICY "Campaigns viewable by everyone" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Admins can manage campaigns" ON public.campaigns FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for campaign_attributions
CREATE POLICY "Attributions viewable by everyone" ON public.campaign_attributions FOR SELECT USING (true);
CREATE POLICY "Admins can manage attributions" ON public.campaign_attributions FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_beacon_detections_beacon_id ON public.beacon_detections(beacon_id);
CREATE INDEX idx_beacon_detections_detected_at ON public.beacon_detections(detected_at DESC);
CREATE INDEX idx_beacon_detections_device ON public.beacon_detections(device_fingerprint);
CREATE INDEX idx_visitor_sessions_device ON public.visitor_sessions(device_fingerprint);
CREATE INDEX idx_visitor_sessions_active ON public.visitor_sessions(is_active) WHERE is_active = true;
CREATE INDEX idx_campaign_attributions_campaign ON public.campaign_attributions(campaign_id);
CREATE INDEX idx_campaign_attributions_session ON public.campaign_attributions(visitor_session_id);

-- Create trigger for updated_at
CREATE TRIGGER update_beacons_updated_at
  BEFORE UPDATE ON public.beacons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_visitor_sessions_updated_at
  BEFORE UPDATE ON public.visitor_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.beacons;
ALTER PUBLICATION supabase_realtime ADD TABLE public.beacon_detections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaign_attributions;