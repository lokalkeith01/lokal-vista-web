import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play } from "lucide-react";
import networkIcon from "@/assets/network-icon.jpg";
import growthIcon from "@/assets/growth-icon.jpg";
import partnershipIcon from "@/assets/partnership-icon.jpg";

const products = [
  {
    title: "Business Connect Platform",
    stage: "Live - Beta",
    description: "Digital networking platform connecting local businesses with real-time matching, event management, and collaboration tools.",
    image: networkIcon,
    demoLink: "#",
    appLink: "#",
    features: ["Member Directory", "Event Calendar", "Business Matching", "Resource Library"]
  },
  {
    title: "Growth Analytics Dashboard",
    stage: "In Development",
    description: "Comprehensive analytics suite providing members with market insights, competitor analysis, and customized growth strategies.",
    image: growthIcon,
    demoLink: "#",
    appLink: null,
    features: ["Market Data", "Trend Analysis", "Custom Reports", "Benchmarking"]
  },
  {
    title: "Partnership Accelerator",
    stage: "Planning Phase",
    description: "AI-powered platform that identifies strategic partnership opportunities and facilitates collaborative business ventures.",
    image: partnershipIcon,
    demoLink: null,
    appLink: null,
    features: ["AI Matching", "Deal Pipeline", "Contract Templates", "Success Tracking"]
  }
];

const Products = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Innovative tools and platforms designed to accelerate business growth and collaboration
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden bg-accent">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {product.stage}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  {product.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {product.demoLink && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      View Demo
                    </Button>
                  )}
                  {product.appLink && (
                    <Button variant="hero" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Launch App
                    </Button>
                  )}
                  {!product.demoLink && !product.appLink && (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
