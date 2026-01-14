import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Executive Director",
    initials: "SJ",
    experience: "15+ years in economic development and business advocacy. Former VP at Regional Business Alliance.",
    linkedin: "#"
  },
  {
    name: "Michael Chen",
    role: "Director of Membership",
    initials: "MC",
    experience: "10 years building business networks. Previously led membership growth at Tech Entrepreneurs Association.",
    linkedin: "#"
  },
  {
    name: "Emily Rodriguez",
    role: "Events & Programs Manager",
    initials: "ER",
    experience: "8 years organizing high-impact business events. MBA with focus on community engagement.",
    linkedin: "#"
  },
  {
    name: "David Park",
    role: "Policy & Advocacy Lead",
    initials: "DP",
    experience: "12 years in government relations and business policy. Former legislative advisor and business consultant.",
    linkedin: "#"
  }
];

const Team = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Team
          </h2>
          <p className="text-lg text-muted-foreground">
            Experienced leaders dedicated to supporting your business success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-8 pb-6 text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto ring-4 ring-accent group-hover:ring-primary transition-all">
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.experience}
                  </p>
                </div>

                <a 
                  href={member.linkedin}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
