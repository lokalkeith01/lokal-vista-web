import { Building2, TrendingUp, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Users,
    title: "Networking Opportunities",
    description: "Connect with fellow business leaders and expand your professional network through exclusive events and programs.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Access resources, training, and support designed to help your business thrive and reach new heights.",
  },
  {
    icon: Building2,
    title: "Community Advocacy",
    description: "Strong voice for business interests in local government and economic development initiatives.",
  },
  {
    icon: Award,
    title: "Enhanced Credibility",
    description: "Build trust with customers and partners through chamber membership and recognition programs.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Join Our Chamber?
          </h2>
          <p className="text-lg text-muted-foreground">
            Unlock exclusive benefits and resources designed to accelerate your business success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-8 pb-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
