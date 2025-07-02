
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Video } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">Lokal</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Giving a voice to small businesses through authentic, crowd-sourced video experiences. 
              Share what you love and discover your city like never before.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>keith@sharelokal.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Video size={16} />
                <span>Share Your Story</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  For Businesses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Join Lokal
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Video Guidelines</li>
              <li>Local Ambassadors</li>
              <li>Business Partners</li>
              <li>Success Stories</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Lokal. Empowering small businesses, one video at a time.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Community Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
