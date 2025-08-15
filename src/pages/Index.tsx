
import { ArrowRight, CheckCircle, Users, Target, Zap, Video, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import { processLocationIcon } from '@/utils/processLocationIcon';

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locationIconUrl, setLocationIconUrl] = useState('/lovable-uploads/07447040-2666-4d80-a6ab-c05e325dc616.png');

  useEffect(() => {
    const processIcon = async () => {
      const processedUrl = await processLocationIcon();
      setLocationIconUrl(processedUrl);
    };
    processIcon();
  }, []);
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
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Full height with centered content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <HeroCarousel />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-6xl md:text-8xl font-light tracking-wide flex items-center">
              <span>l</span>
              <div className="relative mx-1">
                <img 
                  src={locationIconUrl}
                  alt="Lokal location pin"
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </div>
              <span>kal</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-light tracking-wider uppercase mb-12">
            share what you love
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 text-base px-8 py-3 font-medium tracking-wide uppercase"
                >
                  Join Now
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
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 text-base px-8 py-3 font-medium tracking-wide uppercase"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <div className="animate-bounce">
            <ArrowRight className="w-6 h-6 rotate-90" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-6 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple. Real. No fancy stuff.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Neighbors helping neighbors</h3>
              <p className="text-gray-600 leading-relaxed">
                Real recommendations from people who actually live here
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Good vibes only</h3>
              <p className="text-gray-600 leading-relaxed">
                Share the places that make you smile - keep it positive
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Keep it real</h3>
              <p className="text-gray-600 leading-relaxed">
                No fake reviews, no paid promotions - just honest stories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Ready to Join?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Help your favorite local spots get discovered. Build community. Support what makes your neighborhood special.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start">
                <CheckCircle className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-4 font-medium tracking-wide uppercase"
            onClick={() => window.open('https://lokalv1.lovable.app/', '_blank')}
          >
            Try the App
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
