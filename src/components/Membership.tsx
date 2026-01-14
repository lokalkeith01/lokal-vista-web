import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const membershipTiers = [
  {
    name: "Small Business",
    price: "$299",
    period: "per year",
    features: [
      "Directory listing",
      "Networking events access",
      "Monthly newsletter",
      "Member discounts",
      "Marketing opportunities",
    ],
  },
  {
    name: "Corporate",
    price: "$799",
    period: "per year",
    featured: true,
    features: [
      "All Small Business benefits",
      "Priority event registration",
      "Featured directory listing",
      "Sponsorship opportunities",
      "Exclusive leadership programs",
      "Dedicated account manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    features: [
      "All Corporate benefits",
      "Board representation",
      "Custom partnership programs",
      "VIP networking access",
      "Media & PR opportunities",
      "Strategic advisory services",
    ],
  },
];

const Membership = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Membership Plans
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipTiers.map((tier, index) => (
            <Card 
              key={index}
              className={`relative hover:shadow-2xl transition-all duration-300 animate-fade-in ${
                tier.featured 
                  ? "border-2 border-secondary shadow-xl scale-105 md:scale-110" 
                  : "border-border"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-4">
                  {tier.name}
                </CardTitle>
                <div>
                  <span className="text-5xl font-bold text-primary">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {tier.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <Check className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={tier.featured ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
