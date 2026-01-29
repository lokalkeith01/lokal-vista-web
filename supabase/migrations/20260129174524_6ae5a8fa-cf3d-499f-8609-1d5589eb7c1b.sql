-- Create a table to track business claim requests (pending magic link verification)
CREATE TABLE public.business_claim_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    token UUID DEFAULT gen_random_uuid(),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'expired', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    verified_at TIMESTAMP WITH TIME ZONE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    UNIQUE(business_id, email)
);

-- Enable RLS
ALTER TABLE public.business_claim_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own claim requests
CREATE POLICY "Users can view own claims"
ON public.business_claim_requests
FOR SELECT
TO authenticated
USING (email = auth.jwt() ->> 'email' OR user_id = auth.uid());

-- Policy: Anyone can create a claim request (for the initial claim)
CREATE POLICY "Anyone can create claims"
ON public.business_claim_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Users can update their own pending claims
CREATE POLICY "Users can update own claims"
ON public.business_claim_requests
FOR UPDATE
TO authenticated
USING (email = auth.jwt() ->> 'email')
WITH CHECK (email = auth.jwt() ->> 'email');

-- Function to complete business claim after user authenticates
CREATE OR REPLACE FUNCTION public.complete_business_claim(claim_token UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    claim_record RECORD;
    result JSON;
BEGIN
    -- Find the pending claim
    SELECT * INTO claim_record
    FROM public.business_claim_requests
    WHERE token = claim_token AND status = 'pending';
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Invalid or expired claim token');
    END IF;
    
    -- Check if claim is older than 24 hours
    IF claim_record.created_at < (now() - interval '24 hours') THEN
        UPDATE public.business_claim_requests
        SET status = 'expired'
        WHERE id = claim_record.id;
        
        RETURN json_build_object('success', false, 'error', 'Claim request has expired');
    END IF;
    
    -- Update the claim request
    UPDATE public.business_claim_requests
    SET 
        status = 'verified',
        verified_at = now(),
        user_id = auth.uid()
    WHERE id = claim_record.id;
    
    -- Update the business to mark as claimed
    UPDATE public.businesses
    SET 
        is_claimed = true,
        owner_id = auth.uid(),
        verification_status = 'verified',
        updated_at = now()
    WHERE id = claim_record.business_id;
    
    RETURN json_build_object(
        'success', true, 
        'business_id', claim_record.business_id,
        'message', 'Business successfully claimed'
    );
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.complete_business_claim(UUID) TO authenticated;

-- Index for faster lookups
CREATE INDEX idx_business_claims_token ON public.business_claim_requests(token) WHERE status = 'pending';
CREATE INDEX idx_business_claims_email ON public.business_claim_requests(email);