-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "Anyone can create claims" ON public.business_claim_requests;

-- Create a more restrictive insert policy - only allow if business is not already claimed
CREATE POLICY "Can create claim for unclaimed business"
ON public.business_claim_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.businesses b 
        WHERE b.id = business_id 
        AND (b.is_claimed = false OR b.is_claimed IS NULL)
    )
    AND NOT EXISTS (
        SELECT 1 FROM public.business_claim_requests bcr
        WHERE bcr.business_id = business_claim_requests.business_id
        AND bcr.status = 'pending'
    )
);