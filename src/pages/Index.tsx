
import { ArrowRight, CheckCircle, Users, Target, Zap, Video, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: <Video className="w-8 h-8 text-blue-600" />,
      title: "Short Video Stories",
      description: "Authentic crowd-sourced videos that capture the real essence of local spots"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Vibe & Venue Tags",
      description: "Discover places by mood, atmosphere, and exactly what you're looking for"
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Share What You Love",
      description: "Only positive vibes - share the places that truly inspire you"
    }
  ];

  const benefits = [
    "Give small businesses a powerful voice",
    "Discover authentic local experiences",
    "Connect locals and travelers naturally",
    "Build genuine word-of-mouth buzz"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Be a <span className="text-blue-600">Lokal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Giving a voice to the underdog, the small business owner.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Using short crowd-sourced videos tagged by vibe and venue, Lokal is the word of mouth app 
              that inspires locals and travelers to authentically experience any city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                <Link to="/contact" className="flex items-center">
                  Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Link to="/about">Our Story</Link>
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
              How Lokal Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Authentic experiences shared by real people, for real people
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

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Empowering Small Businesses
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every small business has a story worth telling. Lokal gives them the platform 
                to share their passion, connect with their community, and grow through authentic 
                word-of-mouth recommendations.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Share Your City?</h3>
              <p className="text-gray-600 mb-6">
                Join our community of locals and travelers who believe in supporting small businesses 
                and sharing authentic experiences.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/contact">Get Early Access</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                We believe in the power of community connections and authentic recommendations
              </p>
            </div>
            <div className="p-6">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share What You Love</h3>
              <p className="text-gray-600">
                Only positive vibes - we encourage sharing places that truly inspire you
              </p>
            </div>
            <div className="p-6">
              <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentic Experiences</h3>
              <p className="text-gray-600">
                Real stories from real people about the places that matter most
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
