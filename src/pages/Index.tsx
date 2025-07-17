
import { ArrowRight, CheckCircle, Users, Target, Zap, Video, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const features = [
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: "Real Stories",
      description: "Quick videos from local neighbors about the spots they actually love"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Find Your Vibe",
      description: "Looking for cozy coffee or free kid-friendly enterainment? We've got you covered"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Share the Love",
      description: "Know a great spot? Help your community discover it too"
    }
  ];

  const benefits = [
    "Help your favorite local spots get noticed",
    "Find hidden gems in your neighborhood", 
    "Connect with people who share your taste",
    "Support small businesses that need it most"
  ];

  const handleEmailSubmit = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'interest',
          source: 'homepage - lets do this',
          email: email
        }
      });
      toast({
        title: "Interest Sent!",
        description: "We'll be in touch soon about Lokal!",
      });
      setEmail('');
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-background py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/lovable-uploads/e0fd6983-a921-40fc-9282-3f5c90be0d41.png" 
            alt="Local business owners celebrating" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hey neighbor! <span className="text-primary">Be Lokal</span>
            </h1>
            <p className="text-lg text-foreground mb-4 max-w-2xl mx-auto">
              Your favorite coffee shop needs more customers. That taco truck makes the best al pastor in town.
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share quick videos of the local spots you love - help your community discover them too. <br></br> All Lokal. No Chains.
            
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-lg px-6"
                  >
                    Let's do this! <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Join the Lokal community!</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Enter your email to get notified when we launch and be part of building something amazing for local businesses.
                    </p>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEmailSubmit();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleEmailSubmit}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Count me in! <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="text-lg px-6">
                <Link to="/about">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Out Section */}
      <section className="py-16 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background p-6 rounded-lg border border-border max-w-md mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-3">Try It Out</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Follow the link to see the latest version of the web application and give us your feedback.
            </p>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://lokalv1.lovable.app/', '_blank')}
            >
              Try the App
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Here's how it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Simple. Real. No fancy stuff.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 bg-background border border-border">
                <CardContent className="pt-4">
                  <div className="flex justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            What we're about
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <Users className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Neighbors helping neighbors</h3>
              <p className="text-muted-foreground text-sm">
                Real recommendations from people who actually live here
              </p>
            </div>
            <div className="p-4">
              <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Good vibes only</h3>
              <p className="text-muted-foreground text-sm">
                Share the places that make you smile - keep it positive
              </p>
            </div>
            <div className="p-4">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Keep it real</h3>
              <p className="text-muted-foreground text-sm">
                No fake reviews, no paid promotions - just honest stories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Why this matters
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            That little bakery down the street? The family restaurant that's been around for 20 years? 
            They're what make our neighborhoods special. Let's help them thrive.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3 flex flex-col items-center">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <span className="text-foreground text-sm">{benefits[0]}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <span className="text-foreground text-sm">{benefits[1]}</span>
              </div>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <span className="text-foreground text-sm">{benefits[2]}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <span className="text-foreground text-sm">{benefits[3]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
