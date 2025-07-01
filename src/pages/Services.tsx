
import { Building2, Users, Video, TrendingUp, Heart, Handshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const chamberServices = [
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      title: "Chamber Partnership",
      description: "Partner with Lokal to provide your members with a powerful platform to showcase their businesses through authentic video content.",
      features: ["Member spotlight videos", "Chamber-branded portal", "Business discovery tools", "Event promotion features"]
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: "Member Engagement",
      description: "Help your members connect with local customers and build stronger community relationships through genuine recommendations.",
      features: ["Member networking", "Customer testimonials", "Local influencer connections", "Community building tools"]
    },
    {
      icon: <Video className="w-12 h-12 text-purple-600" />,
      title: "Video Storytelling",
      description: "Enable your members to tell their business stories through short, authentic videos that capture the real experience.",
      features: ["Easy video creation", "Professional templates", "Mobile-first design", "Social media integration"]
    }
  ];

  const businessServices = [
    {
      icon: <Heart className="w-12 h-12 text-red-600" />,
      title: "Authentic Promotion",
      description: "Connect with local customers who genuinely love what you do and let them share their experiences with others.",
      features: ["Customer advocacy", "Genuine reviews", "Local community reach", "Trust building"]
    },
    {
      icon: <Handshake className="w-12 h-12 text-orange-600" />,
      title: "Influencer Connections",
      description: "Partner with local influencers and community advocates who can authentically promote your business to their networks.",
      features: ["Local influencer matching", "Authentic partnerships", "Community ambassadors", "Word-of-mouth amplification"]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-yellow-600" />,
      title: "Business Growth",
      description: "Grow your business through the most trusted form of marketing - recommendations from real customers and community members.",
      features: ["Organic growth", "Community-driven marketing", "Local SEO boost", "Customer loyalty programs"]
    }
  ];

  const packages = [
    {
      name: "Chamber Starter",
      price: "$199",
      duration: "per month",
      description: "Perfect for smaller chambers looking to enhance member services",
      features: [
        "Up to 25 member businesses",
        "Basic video creation tools",
        "Chamber-branded portal",
        "Monthly analytics report",
        "Email support"
      ]
    },
    {
      name: "Chamber Pro",
      price: "$399",
      duration: "per month",
      description: "Ideal for growing chambers with active member engagement",
      features: [
        "Up to 100 member businesses",
        "Advanced video features",
        "Custom branding options",
        "Influencer matching service",
        "Bi-weekly strategy sessions",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Chamber Enterprise",
      price: "$699",
      duration: "per month",
      description: "Comprehensive solution for large chambers and business networks",
      features: [
        "Unlimited member businesses",
        "Full-service video production",
        "White-label platform",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empower Your <span className="text-blue-600">Chamber</span> & <span className="text-blue-600">Members</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Help Chambers of Commerce enhance their member services while connecting local businesses 
            with customers and influencers through authentic word-of-mouth marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <Link to="/contact">Partner with Lokal</Link>
            </Button>
            <Button variant="outline" className="text-lg px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Chamber Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Chambers of Commerce
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your member services and strengthen your local business community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chamberServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Local Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with customers and influencers to grow through authentic word-of-mouth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chamber Partnership Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options designed for chambers of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-blue-500 border-2' : ''} hover:shadow-lg transition-shadow duration-300`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900 mb-2">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {pkg.price}
                    <span className="text-lg text-gray-500 font-normal">/{pkg.duration}</span>
                  </div>
                  <p className="text-gray-600">
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Chamber?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join forward-thinking chambers who are already using Lokal to enhance their member services 
            and strengthen their local business communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link to="/contact">Schedule a Demo</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
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
