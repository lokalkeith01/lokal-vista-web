import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help you grow your business
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="border-2">
            <CardContent className="pt-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input placeholder="John Smith" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Company Name
                  </label>
                  <Input placeholder="Your Company" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us how we can help your business..." 
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button variant="hero" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Contact Information
              </h3>
              <p className="text-muted-foreground">
                Reach out to us through any of these channels. We're committed to responding within 24 hours.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">info@chamber.org</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Office</h4>
                  <p className="text-muted-foreground">
                    123 Business Center Drive<br />
                    Suite 400<br />
                    Your City, ST 12345
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="bg-accent border-border">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Office Hours
                </h4>
                <div className="text-muted-foreground space-y-1">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
