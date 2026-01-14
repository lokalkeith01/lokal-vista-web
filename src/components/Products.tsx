import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Placeholder images - replace these paths with actual uploaded images
const lokalSignin = "/placeholder.svg";
const lokalHomeFeed = "/placeholder.svg";
const lokalSearchAds = "/placeholder.svg";
const lokalProfile = "/placeholder.svg";
const lokalBusinessOnboarding = "/placeholder.svg";
const lokalMarketplace = "/placeholder.svg";
const lokalVideoChristmas = "/placeholder.svg";
const lokalVideoInfo = "/placeholder.svg";
const lokalArchitecture = "/placeholder.svg";

const Products = () => {
  const appScreenshots = [
    { image: lokalSignin, caption: "User Authentication" },
    { image: lokalHomeFeed, caption: "Local Video Feed" },
    { image: lokalSearchAds, caption: "Search & Sponsored Content" },
    { image: lokalProfile, caption: "Content Creator Profile" },
    { image: lokalBusinessOnboarding, caption: "Business Onboarding" },
    { image: lokalMarketplace, caption: "Advertising Marketplace" },
    { image: lokalVideoChristmas, caption: "Video Discovery" },
    { image: lokalVideoInfo, caption: "Business Information" }
  ];

  const products = [
    {
      name: "Lokal App (Core Platform)",
      stage: "Live",
      description: "Short-form local video social platform with BLE beacon check-ins, influencer marketplace, and business advertising. Built entirely with AI assistance in under 2 months. Available on iOS with web version.",
      features: [
        "Location-based video discovery (<2min)",
        "BLE beacon check-in system",
        "Business ad campaign management",
        "Real-time analytics dashboard",
        "OAuth authentication (Google/Meta)"
      ],
      image: lokalArchitecture,
      badge: "Production"
    },
    {
      name: "AI Powered Backend",
      stage: "Development",
      description: "AI-powered authentication enables small businesses to save time and increase their reach to customers in their area.",
      features: [
        "Business page generation",
        "Powered ad creation",
        "Campaign metrics",
        "AI help desk with immediate resolution",
        "Content moderation eliminating negative posts"
      ],
      image: lokalProfile,
      badge: "In Development"
    },
    {
      name: "AI Ad Purchase Assistant Bot",
      stage: "Development",
      description: "Intelligent chatbot that guides businesses through ad campaign decisions. Analyzes business goals, budget, target audience, and location to recommend optimal ad types, duration, and targeting strategies.",
      features: [
        "Natural language conversation interface",
        "Budget optimization recommendations",
        "Target audience analysis",
        "Campaign performance predictions",
        "Automated campaign setup"
      ],
      image: lokalMarketplace,
      badge: "In Development"
    },
    {
      name: "AI Business Help Desk",
      stage: "Development",
      description: "24/7 AI-powered customer support system for business users. Handles common questions about campaign setup, analytics interpretation, payment processing, and platform features with instant, intelligent responses.",
      features: [
        "Natural language query understanding",
        "Context-aware troubleshooting",
        "Multi-language support",
        "Escalation to human support when needed",
        "Learning from user interactions"
      ],
      image: lokalSearchAds,
      badge: "In Development"
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Live":
        return "bg-green-500";
      case "Beta":
        return "bg-blue-500";
      case "Development":
        return "bg-yellow-500";
      case "Planning":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our AI-Powered Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with artificial intelligence at every layer—from the code itself to the features that power authentic local connections.
          </p>
        </div>

        {/* App Screenshots Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Lokal App Experience
          </h3>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {appScreenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="relative overflow-hidden rounded-2xl bg-card border shadow-lg">
                      <div className="aspect-[9/16] relative">
                        <img
                          src={screenshot.image}
                          alt={screenshot.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white text-sm font-medium text-center">
                          {screenshot.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-card rounded-xl border shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Product Image/Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    {product.badge}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStageColor(product.stage)}`} />
                  <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                    {product.stage}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>

                {/* Features List */}
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl border shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Built with AI. Powered by Community.</h3>
            <p className="text-muted-foreground mb-6">
              Every line of code, every feature, every database query was created through AI-assisted development. 
              Lokal proves that the future of software is collaborative intelligence between humans and AI.
            </p>
            <div className="flex justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="https://apps.apple.com/us/app/lokal-local-video-platform/id6738029498" target="_blank" rel="noopener noreferrer">
                  Visit Lokal App
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
