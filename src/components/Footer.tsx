
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ipl-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">IPL Ticket Arena</h3>
            <p className="text-gray-300 mb-4">
              The official ticket booking platform for the Indian Premier League.
              Book your tickets now and cheer for your favorite teams!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-ipl-orange">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-ipl-orange">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-ipl-orange">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-ipl-orange">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/matches" className="text-gray-300 hover:text-white">Matches</Link></li>
              <li><Link to="/venues" className="text-gray-300 hover:text-white">Venues</Link></li>
              <li><Link to="/teams" className="text-gray-300 hover:text-white">Teams</Link></li>
              <li><Link to="/mytickets" className="text-gray-300 hover:text-white">My Tickets</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Refund Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>BCCI-IPL</p>
              <p>Cricket Centre, Wankhede Stadium</p>
              <p>Mumbai 400020, India</p>
              <p className="mt-2">Email: tickets@iplticketarena.com</p>
              <p>Phone: +91 1234567890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} IPL Ticket Arena. All rights reserved.</p>
          <p className="mt-1">TATA IPL is a registered trademark of BCCI. This is a demonstration site.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
