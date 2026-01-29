import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Mail, Loader2, CheckCircle } from 'lucide-react';

interface ClaimBusinessDialogProps {
  businessId: string;
  businessName: string;
  trigger?: React.ReactNode;
}

const ClaimBusinessDialog = ({ businessId, businessName, trigger }: ClaimBusinessDialogProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the claim request
      const { data: claimData, error: claimError } = await supabase
        .from('business_claim_requests')
        .insert({
          business_id: businessId,
          email: email.toLowerCase().trim(),
        })
        .select('token')
        .single();

      if (claimError) {
        if (claimError.code === '23505') {
          toast({
            title: 'Claim Already Pending',
            description: 'A claim request for this business is already in progress.',
            variant: 'destructive',
          });
        } else {
          throw claimError;
        }
        setLoading(false);
        return;
      }

      // Send magic link via Supabase Auth
      const claimUrl = `${window.location.origin}/claim-business?token=${claimData.token}`;
      
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase().trim(),
        options: {
          emailRedirectTo: claimUrl,
        },
      });

      if (authError) {
        throw authError;
      }

      setSent(true);
      toast({
        title: 'Verification Email Sent!',
        description: 'Check your inbox for the magic link to claim your business.',
      });
    } catch (error: any) {
      console.error('Claim error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send verification email',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when dialog closes
      setEmail('');
      setSent(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Building2 className="h-4 w-4" />
            Claim This Business
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Claim {businessName}
          </DialogTitle>
          <DialogDescription>
            Enter your business email to receive a verification link. Once verified, you'll have full access to manage this business profile.
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleClaim} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claim-email">Business Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="claim-email"
                  type="email"
                  placeholder="you@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We recommend using your official business domain email for verification.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Verification Link'
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Check Your Email!</h3>
              <p className="text-muted-foreground mt-1">
                We sent a verification link to <strong>{email}</strong>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Click the link in the email to complete your business claim. The link expires in 24 hours.
            </p>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClaimBusinessDialog;
