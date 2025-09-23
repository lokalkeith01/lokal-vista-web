
import { Building2, Users, Video, TrendingUp, Heart, Handshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const { toast } = useToast();
  const chamberServices = [
    {
      icon: <Building2 className="w-12 h-12 text-primary" />,
      title: "Chamber Partnership",
      description: "Partner with Lokal to provide your members with a powerful platform to showcase their businesses through authentic video content. Generate revenue through lokal's profit sharing model.",
      features: ["Member spotlight videos", "Chamber-branded portal", "Business discovery tools", "Event promotion features"]
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Member Engagement",
      description: "Help your members connect with local customers and build stronger community relationships through genuine recommendations.",
      features: ["Member networking", "Customer testimonials", "Local influencer connections", "Community building tools"]
    },
    {
      icon: <Video className="w-12 h-12 text-primary" />,
      title: "Video Storytelling",
      description: "Enable your members to tell their business stories through short, authentic videos that capture the real experience.",
      features: ["Easy video creation", "Professional templates", "Mobile-first design", "Social media integration"]
    }
  ];

  const businessServices = [
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Authentic Promotion",
      description: "Connect with local customers who genuinely love what you do and let them share their experiences with others.",
      features: ["Customer advocacy", "Genuine reviews", "Local community reach", "Trust building"]
    },
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Influencer Connections",
      description: "Partner with local influencers and community advocates who can authentically promote your business to their networks.",
      features: ["Local influencer matching", "Authentic partnerships", "Community ambassadors", "Word-of-mouth amplification"]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Business Growth",
      description: "Grow your business through the most trusted form of marketing - recommendations from real customers and community members.",
      features: ["Organic growth", "Community-driven marketing", "Local SEO boost", "Customer loyalty programs"]
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "$299",
      duration: "month",
      description: "Perfect for small chambers looking to get started",
      popular: false,
      features: [
        "Up to 50 member businesses",
        "Basic video creation tools", 
        "Chamber-branded portal",
        "Email support"
      ]
    },
    {
      name: "Professional", 
      price: "$599",
      duration: "month",
      description: "Ideal for growing chambers with active member bases",
      popular: true,
      features: [
        "Up to 200 member businesses",
        "Advanced video templates",
        "Custom branding options",
        "Analytics dashboard",
        "Priority phone support",
        "Member networking features"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "month", 
      description: "Full-featured solution for large chambers",
      popular: false,
      features: [
        "Unlimited member businesses",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "24/7 support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Empower Your <span className="text-primary">Chamber</span> & <span className="text-primary">Members</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Help Chambers of Commerce enhance their member services while connecting local businesses 
            with customers and influencers through authentic word-of-mouth marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
              <Link to="/contact">Partner with Lokal</Link>
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={async () => {
                try {
                  await supabase.functions.invoke('send-email', {
                    body: {
                      type: 'demo',
                      source: 'services page - hero'
                    }
                  });
                  toast({
                    title: "Demo Request Sent!",
                    description: "We'll contact you soon to schedule your demo.",
                  });
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to send request. Please try again.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Chamber Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              For Chambers of Commerce
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your member services and strengthen your local business community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chamberServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-card border border-border">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              For Local Businesses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with customers and influencers to grow through authentic word-of-mouth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-background border border-border">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Chamber Partnership Plans
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options designed for chambers of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-primary border-2' : 'border-border'} hover:shadow-lg transition-shadow duration-300 bg-card`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground mb-2">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {pkg.price}
                    <span className="text-lg text-muted-foreground font-normal">/{pkg.duration}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                    onClick={async () => {
                      try {
                        await supabase.functions.invoke('send-email', {
                          body: {
                            type: 'partnership',
                            source: `services page - ${pkg.name} package`
                          }
                        });
                        toast({
                          title: "Interest Sent!",
                          description: "We'll contact you soon about the " + pkg.name + " package.",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to send request. Please try again.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Chamber?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join forward-thinking chambers who are already using Lokal to enhance their member services 
            and strengthen their local business communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3"
              onClick={async () => {
                try {
                  await supabase.functions.invoke('send-email', {
                    body: {
                      type: 'demo',
                      source: 'services page - CTA'
                    }
                  });
                  toast({
                    title: "Demo Request Sent!",
                    description: "We'll contact you soon to schedule your demo.",
                  });
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to send request. Please try again.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Schedule a Demo
            </Button>
            <Button 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-3"
              onClick={async () => {
                try {
                  await supabase.functions.invoke('send-email', {
                    body: {
                      type: 'interest',
                      source: 'services page - learn more'
                    }
                  });
                  toast({
                    title: "Interest Sent!",
                    description: "We'll send you more information soon.",
                  });
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to send request. Please try again.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
