import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, BookOpen, Megaphone, HandshakeIcon, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "Networking Events",
    description: "Monthly mixers, business breakfasts, and exclusive member-only gatherings.",
  },
  {
    icon: BookOpen,
    title: "Educational Programs",
    description: "Workshops, seminars, and training sessions to enhance business skills.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    description: "Promotional opportunities through our website, newsletter, and social media.",
  },
  {
    icon: HandshakeIcon,
    title: "Business Referrals",
    description: "Direct member-to-member connections and qualified business referrals.",
  },
  {
    icon: Briefcase,
    title: "Advocacy & Policy",
    description: "Representation in local government and business-friendly policy initiatives.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Access to resources for startups and entrepreneurs looking to scale.",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services & Programs
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive support to help your business succeed at every stage
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all duration-300 group border-border hover:border-secondary animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
