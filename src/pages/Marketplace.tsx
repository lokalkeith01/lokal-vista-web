import { useState } from 'react';
import { Check, Video, Users, Target, TrendingUp, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Marketplace = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 50,
      duration: '7 days',
      impressions: '1,000-2,000',
      features: [
        'Featured in local feed',
        'Up to 30-second video',
        'Basic analytics',
        'City-level targeting',
        'Upload your own video'
      ],
      best: false
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 100,
      duration: '14 days',
      impressions: '3,000-5,000',
      features: [
        'Priority feed placement',
        'Up to 60-second video',
        'Advanced analytics',
        'Neighborhood targeting',
        'Upload own video OR book influencer',
        'Social media cross-post'
      ],
      best: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 200,
      duration: '30 days',
      impressions: '8,000-15,000',
      features: [
        'Top feed placement',
        'Up to 90-second video',
        'Premium analytics dashboard',
        'Multi-location targeting',
        'Professional influencer booking',
        'Social media campaign',
        'Featured business badge',
        'Priority support'
      ],
      best: false
    }
  ];

  const whatYouGet = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Local Visibility',
      description: 'Your video appears in feeds of users in your target area'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Precise Targeting',
      description: 'Reach customers by city, neighborhood, or multiple locations'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Analytics Dashboard',
      description: 'Track views, engagement, and conversion metrics in real-time'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Guaranteed Runtime',
      description: 'Your ad runs for the full duration with consistent placement'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4" variant="secondary">Business Advertising</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Advertise Your Business on Lokal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Reach local customers with authentic video content. Book an influencer or upload your own video to showcase your business to the community.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouGet.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground">
              Affordable options for businesses of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${plan.best ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.best && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.duration} campaign</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.impressions} estimated impressions
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={plan.best ? "default" : "outline"}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    Select {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Options Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Do You Want to Create Your Ad?
          </h2>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Your Video</TabsTrigger>
              <TabsTrigger value="influencer">Book an Influencer</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Upload Your Own Video</CardTitle>
                  </div>
                  <CardDescription>
                    Perfect if you already have video content ready to go
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">What You'll Need:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Video file (MP4, MOV) - up to 90 seconds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>High-quality footage (1080p recommended)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Business name and location details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Target audience preferences</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Pro Tip:</strong> Authentic, locally-focused content performs best. 
                      Show your space, your team, and what makes your business special!
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Start Upload Process
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="influencer" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Book a Local Influencer</CardTitle>
                  </div>
                  <CardDescription>
                    Let a trusted local creator showcase your business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">How It Works:</h4>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-semibold">1</span>
                        <span>Browse validated local influencers in your area</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-semibold">2</span>
                        <span>Select an influencer based on their audience and style</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-semibold">3</span>
                        <span>They visit your business and create authentic content</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-semibold">4</span>
                        <span>Review and approve before it goes live</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-semibold">5</span>
                        <span>Your ad runs with verified local reach</span>
                      </li>
                    </ol>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Available with Growth & Premium plans.</strong> All influencers are 
                      validated through our AI verification system for authentic local reach.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Browse Influencers
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Local Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of businesses reaching local customers on Lokal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started Today</Button>
            <Button size="lg" variant="outline">Contact Sales</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;
