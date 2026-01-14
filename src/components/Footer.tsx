import { Building2, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Chamber</span>
            </div>
            <p className="text-background/80 text-sm">
              Empowering businesses to thrive through collaboration, advocacy, and community engagement.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Membership</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Networking</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Business Support</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Advocacy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Education</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-background/80">
              Stay updated with our latest news and events.
            </p>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>&copy; 2024 Chamber of Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
