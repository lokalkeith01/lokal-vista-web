
import { Award, Heart, Lightbulb, Shield, Video, Users, MapPin, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Authentic Sharing",
      description: "We believe in sharing only what you genuinely love - no fake reviews, just real experiences."
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Small Business Champions",
      description: "Every underdog deserves a voice. We're here to amplify small businesses and local gems."
    },
    {
      icon: <Video className="w-8 h-8 text-blue-500" />,
      title: "Visual Storytelling",
      description: "Short videos capture the real vibe of a place better than any written review ever could."
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-500" />,
      title: "Local Connection",
      description: "Bridging the gap between curious travelers and knowledgeable locals in every city."
    }
  ];

  const team = [
    {
      name: "Alex Martinez",
      role: "CEO & Founder",
      description: "Former small business owner who understands the struggle of getting discovered in a crowded market."
    },
    {
      name: "Sam Chen",
      role: "Head of Product",
      description: "Video technology expert passionate about creating authentic connection through visual storytelling."
    },
    {
      name: "Jordan Taylor",
      role: "Community Director",
      description: "Local culture enthusiast dedicated to building genuine communities around shared experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Story Behind <span className="text-blue-600">Lokal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from the belief that small businesses are the heartbeat of every community, 
            and that authentic word-of-mouth is the most powerful form of marketing.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We started Lokal because we believe small businesses are the underdogs that deserve 
                the biggest cheers. In a world dominated by big chains and paid advertising, 
                authentic recommendations from real people are more valuable than ever.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Through short, crowd-sourced videos tagged by vibe and venue, we're creating 
                a platform where genuine experiences shine. Whether you're a local sharing 
                your favorite hidden gem or a traveler looking for authentic experiences, 
                Lokal connects you with what matters most.
              </p>
              <p className="text-lg text-gray-600">
                Above all, we encourage everyone to share only what they love - because 
                positivity is contagious, and great businesses deserve to be celebrated.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                  <div className="text-gray-600">Videos Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-gray-600">Small Businesses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-600">Cities Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
                  <div className="text-gray-600">Local Advocates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our values guide every feature we build and every community we serve
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate advocates for small businesses and authentic local experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
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

export default About;
