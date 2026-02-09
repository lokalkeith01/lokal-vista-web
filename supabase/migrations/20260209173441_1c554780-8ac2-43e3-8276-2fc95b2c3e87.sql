-- Add admin roles for the 3 admin users
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('629866c7-0193-45cc-b418-c2f76d1e9e04', 'admin'),  -- info@sharelokal.com
  ('56280b5b-87c5-4117-b9ff-0f6eb909ed04', 'admin'),  -- keith@sharelokal.com
  ('6216c42f-23a8-4db0-b320-9749f622b036', 'admin')   -- help@sharelokal.com
ON CONFLICT (user_id, role) DO NOTHING;

-- Fix profiles table: replace overly permissive SELECT policies
-- Drop the policy that allows ALL authenticated users to see ALL profiles
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;

-- Drop and recreate the public profiles policy to remove the (auth.uid() IS NOT NULL) fallback
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Recreate: public profiles visible to authenticated users, own profile always visible
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles
FOR SELECT
USING (
  (auth.uid() = user_id) OR 
  (is_profile_public = true AND auth.uid() IS NOT NULL)
);

-- Keep existing "Users can view own profile" policy as-is (already correct)
