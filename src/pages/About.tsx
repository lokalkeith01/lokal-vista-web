
import { Award, Heart, Lightbulb, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Passion",
      description: "We're passionate about helping local businesses succeed and thrive in their communities."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Trust",
      description: "Building lasting relationships through transparency, reliability, and consistent results."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description: "Constantly exploring new solutions and technologies to stay ahead of the curve."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality service and exceeding expectations."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "15+ years of experience in business consulting and local market development."
    },
    {
      name: "Michael Chen",
      role: "Head of Strategy",
      description: "Expert in digital transformation and growth strategies for small to medium businesses."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      description: "Specializes in local marketing campaigns and community engagement initiatives."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Lokal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of dedicated professionals committed to empowering local businesses 
            with the tools, strategies, and support they need to succeed.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, Lokal was born from a simple belief: local businesses are the 
                backbone of thriving communities. We saw too many great companies struggling with 
                outdated processes and missed opportunities.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our mission became clear - to bridge the gap between traditional local business 
                practices and modern growth strategies. Today, we've helped over 200 businesses 
                transform their operations and achieve sustainable growth.
              </p>
              <p className="text-lg text-gray-600">
                We're not just consultants; we're partners in your success story.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-600">Businesses Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Team Members</div>
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we work with our clients
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your business success
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
