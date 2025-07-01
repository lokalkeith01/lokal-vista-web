
import { BarChart3, Megaphone, Settings, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const services = [
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: "Business Analytics",
      description: "Data-driven insights to help you make informed decisions and track your business performance.",
      features: ["Performance Dashboards", "Market Analysis", "ROI Tracking", "Competitive Intelligence"]
    },
    {
      icon: <Megaphone className="w-12 h-12 text-green-600" />,
      title: "Marketing Solutions",
      description: "Comprehensive marketing strategies to boost your local presence and attract more customers.",
      features: ["Local SEO", "Social Media Management", "Content Marketing", "Ad Campaign Management"]
    },
    {
      icon: <Settings className="w-12 h-12 text-purple-600" />,
      title: "Operations Optimization",
      description: "Streamline your business processes and improve efficiency with our operational expertise.",
      features: ["Process Automation", "Workflow Design", "Quality Management", "Cost Optimization"]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
      title: "Growth Strategy",
      description: "Strategic planning and execution to scale your business and enter new markets.",
      features: ["Market Expansion", "Strategic Planning", "Partnership Development", "Revenue Growth"]
    },
    {
      icon: <Users className="w-12 h-12 text-red-600" />,
      title: "Team Development",
      description: "Build stronger teams and improve workplace culture for better business outcomes.",
      features: ["Leadership Training", "Team Building", "Performance Management", "Culture Development"]
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: "Digital Transformation",
      description: "Modernize your business with the latest technology and digital solutions.",
      features: ["Technology Integration", "Digital Tools", "Cloud Solutions", "Mobile Optimization"]
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "$299",
      duration: "per month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Business consultation (2 hours/month)",
        "Basic marketing audit",
        "Monthly performance report",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "$699",
      duration: "per month",
      description: "Ideal for growing businesses ready to scale",
      features: [
        "Business consultation (6 hours/month)",
        "Complete marketing strategy",
        "Bi-weekly performance reports",
        "Priority phone & email support",
        "Quarterly strategy review"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$1,299",
      duration: "per month",
      description: "Comprehensive solution for established businesses",
      features: [
        "Unlimited consultation hours",
        "Full-service marketing management",
        "Weekly performance reports",
        "24/7 dedicated support",
        "Monthly strategy sessions",
        "Custom integrations"
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
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive business solutions designed to help your company grow, 
            optimize operations, and achieve sustainable success.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options to match your business needs and budget
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

      <Footer />
    </div>
  );
};

export default Services;
