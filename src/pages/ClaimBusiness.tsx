import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, Building2 } from 'lucide-react';

const ClaimBusiness = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'needs-auth'>('loading');
  const [message, setMessage] = useState('');
  const [businessName, setBusinessName] = useState('');
  
  const token = searchParams.get('token');

  useEffect(() => {
    const completeClaim = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid claim link. Please request a new one.');
        return;
      }

      // Check if user is authenticated
      if (!user) {
        setStatus('needs-auth');
        setMessage('Please sign in to complete your business claim.');
        return;
      }

      try {
        // Call the complete_business_claim function
        const { data, error } = await supabase.rpc('complete_business_claim', {
          claim_token: token
        });

        if (error) {
          console.error('Claim error:', error);
          setStatus('error');
          setMessage(error.message || 'Failed to complete claim');
          return;
        }

        const result = data as { success: boolean; error?: string; business_id?: string; message?: string };

        if (result.success) {
          // Fetch business name for success message
          if (result.business_id) {
            const { data: business } = await supabase
              .from('businesses')
              .select('name')
              .eq('id', result.business_id)
              .single();
            
            if (business) {
              setBusinessName(business.name);
            }
          }
          
          setStatus('success');
          setMessage(result.message || 'Business successfully claimed!');
          
          toast({
            title: 'Business Claimed!',
            description: 'You now have access to manage this business.',
          });
        } else {
          setStatus('error');
          setMessage(result.error || 'Failed to complete claim');
        }
      } catch (err) {
        console.error('Claim error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    completeClaim();
  }, [token, user, toast]);

  const handleSignIn = () => {
    // Navigate to sign-in with redirect back to this claim page
    navigate(`/sign-in?redirect=/claim-business?token=${token}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${
                status === 'success' ? 'bg-green-100' :
                status === 'error' ? 'bg-red-100' :
                status === 'needs-auth' ? 'bg-blue-100' :
                'bg-gray-100'
              }`}>
                {status === 'loading' && <Loader2 className="h-12 w-12 text-gray-500 animate-spin" />}
                {status === 'success' && <CheckCircle className="h-12 w-12 text-green-600" />}
                {status === 'error' && <XCircle className="h-12 w-12 text-red-600" />}
                {status === 'needs-auth' && <Building2 className="h-12 w-12 text-blue-600" />}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {status === 'loading' && 'Verifying Claim...'}
              {status === 'success' && 'Claim Successful!'}
              {status === 'error' && 'Claim Failed'}
              {status === 'needs-auth' && 'Sign In Required'}
            </CardTitle>
            <CardDescription className="mt-2">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === 'success' && (
              <>
                {businessName && (
                  <p className="text-center text-lg font-medium text-foreground">
                    Welcome to <span className="text-primary">{businessName}</span>!
                  </p>
                )}
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/metrics')}
                >
                  Go to Dashboard
                </Button>
              </>
            )}
            
            {status === 'needs-auth' && (
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={handleSignIn}
                >
                  Sign In to Complete Claim
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account? You'll be able to create one.
                </p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full" 
                  onClick={() => navigate('/services')}
                >
                  Request New Claim Link
                </Button>
                <Button 
                  variant="ghost"
                  className="w-full" 
                  onClick={() => navigate('/')}
                >
                  Return Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ClaimBusiness;
