
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/discover', label: 'Discover' },
    { path: '/about', label: 'Our Story' },
    { path: '/services', label: 'For Businesses' },
    { path: '/metrics', label: 'Metrics' },
    { path: '/live-ble', label: 'Live BLE' },
    { path: '/contact', label: 'Join Lokal' },
  ];

  return (
    <nav className="bg-white backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b7722a35-1baf-4098-90ff-d19627107903.png" 
                alt="Lokal" 
                className="h-8 w-auto"
              />
            </Link>
            <button 
              onClick={() => window.open('https://app.sharelokal.com/', '_blank')}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Scan QR Code"
            >
              <img 
                src="/lovable-uploads/qr-code-sharelokal.png"
                alt="QR Code - app.sharelokal.com" 
                className="h-8 w-8"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-blue border-b-2 border-blue pb-1'
                    : 'text-blue hover:text-blue/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Share Your Story
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-blue bg-blue/10 rounded-md'
                      : 'text-blue hover:text-blue/80 hover:bg-muted rounded-md'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                Share Your Story
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
