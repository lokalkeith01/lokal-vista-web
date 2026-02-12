import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, ShieldCheck, AlertTriangle } from "lucide-react";

const DataDeletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState(user?.email || "");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({ title: "Email required", description: "Please provide the email associated with your account.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("data-deletion", {
        body: { email, reason, userId: user?.id },
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Request submitted", description: "Your data deletion request has been received. We'll process it within 30 days." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to submit request. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="max-w-lg w-full text-center">
            <CardContent className="pt-8 pb-8 space-y-4">
              <ShieldCheck className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Request Received</h2>
              <p className="text-muted-foreground">
                Your data deletion request has been submitted. We will process your request within <strong>30 days</strong> and send a confirmation to <strong>{email}</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                If you have questions, contact us at <a href="mailto:help@sharelokal.com" className="text-primary underline">help@sharelokal.com</a>.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Delete Your Data</h1>
            <p className="text-muted-foreground mt-2">
              You can request deletion of all personal data associated with your Lokal account.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                What gets deleted
              </CardTitle>
              <CardDescription>
                When your request is processed, the following data will be permanently removed:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your user profile and account information</li>
                <li>Videos and content you've uploaded</li>
                <li>Comments, likes, and interactions</li>
                <li>Business claims and associated data</li>
                <li>Notification preferences and settings</li>
                <li>Any other personal data stored in our systems</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Submit Deletion Request
              </CardTitle>
              <CardDescription>
                Please provide the email address associated with your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deletion-email">Email Address</Label>
                  <Input
                    id="deletion-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deletion-reason">Reason (optional)</Label>
                  <Textarea
                    id="deletion-reason"
                    placeholder="Let us know why you're leaving (optional)"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button type="submit" variant="destructive" disabled={loading} className="w-full">
                  {loading ? "Submitting..." : "Request Data Deletion"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Requests are processed within 30 days. You will receive a confirmation email once complete.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataDeletion;
