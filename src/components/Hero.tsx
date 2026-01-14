import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-business.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-accent to-background overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Business professionals collaborating" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Building Stronger
            <span className="block text-primary mt-2">Business Communities</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            We connect businesses, solve growth challenges, and advocate for your success through strategic partnerships and innovative solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="hero" size="lg" className="group">
              Become a Member
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
