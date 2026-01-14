import { Target, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground">
            Connecting businesses and driving community prosperity through strategic partnerships and advocacy
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardContent className="pt-8 pb-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Target className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Our Mission
              </h3>
              <p className="text-muted-foreground">
                We facilitate meaningful business connections, provide growth resources, and advocate for policies that strengthen our local economy and business community.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardContent className="pt-8 pb-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Users className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Problems We Solve
              </h3>
              <p className="text-muted-foreground">
                Businesses struggle with networking, market access, and navigating regulations. We provide the connections, resources, and advocacy needed to overcome these challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardContent className="pt-8 pb-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Who We Serve
              </h3>
              <p className="text-muted-foreground">
                Small businesses, corporate enterprises, and entrepreneurs seeking growth opportunities, professional networks, and a unified voice in economic development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
