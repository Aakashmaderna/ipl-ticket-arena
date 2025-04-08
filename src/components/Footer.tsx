
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ipl-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLLogoNew.png" 
                alt="IPL Logo" 
                className="h-10 w-auto" 
              />
              <h3 className="text-xl font-bold">IPL Ticket Arena</h3>
            </div>
            <p className="text-gray-300 mb-4">
              The official ticket booking platform for the Indian Premier League.
              Book your tickets now and cheer for your favorite teams!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-ipl-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-ipl-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-ipl-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-ipl-orange transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors inline-block">Home</Link></li>
              <li><Link to="/matches" className="text-gray-300 hover:text-white transition-colors inline-block">Matches</Link></li>
              <li><Link to="/venues" className="text-gray-300 hover:text-white transition-colors inline-block">Venues</Link></li>
              <li><Link to="/teams" className="text-gray-300 hover:text-white transition-colors inline-block">Teams</Link></li>
              <li><Link to="/mytickets" className="text-gray-300 hover:text-white transition-colors inline-block">My Tickets</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors inline-block">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors inline-block">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors inline-block">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors inline-block">Refund Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact</h3>
            <address className="not-italic text-gray-300">
              <div className="flex items-start space-x-2 mb-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-ipl-orange" />
                <div>
                  <p>BCCI-IPL</p>
                  <p>Cricket Centre, Wankhede Stadium</p>
                  <p>Mumbai 400020, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Mail size={18} className="flex-shrink-0 text-ipl-orange" />
                <p>tickets@iplticketarena.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0 text-ipl-orange" />
                <p>+91 1234567890</p>
              </div>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} IPL Ticket Arena. All rights reserved.</p>
          <p className="mt-1">TATA IPL is a registered trademark of BCCI. This is a demonstration site.</p>
          <div className="mt-4 flex justify-center">
            <img 
              src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644848730_tata-ipl-logo.png" 
              alt="TATA IPL" 
              className="h-8" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
