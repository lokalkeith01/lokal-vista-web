
import { ArrowRight, CheckCircle, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Expert Team",
      description: "Our experienced professionals are dedicated to your success"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Targeted Solutions",
      description: "Customized strategies that align with your business goals"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Fast Results",
      description: "Quick implementation and measurable outcomes"
    }
  ];

  const benefits = [
    "Increase your local market presence",
    "Streamline business operations",
    "Boost customer engagement",
    "Maximize ROI on investments"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Lokal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering local businesses with innovative solutions, strategic guidance, 
              and exceptional service. Let's grow your business together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                <Link to="/contact" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lokal?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine local expertise with proven strategies to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Business Today
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join hundreds of local businesses that have already experienced 
                remarkable growth with our comprehensive solutions.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Contact us today for a free consultation and discover how we can help your business thrive.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
