
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/ipl-logo.png" alt="IPL Logo" className="h-10 w-auto" onError={(e) => {
              e.currentTarget.src = 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadline.png';
            }} />
            <span className="text-xl font-bold text-ipl-blue">Ticket Arena</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-ipl-blue font-medium">Home</Link>
            <Link to="/matches" className="text-gray-700 hover:text-ipl-blue font-medium">Matches</Link>
            <Link to="/venues" className="text-gray-700 hover:text-ipl-blue font-medium">Venues</Link>
            <Link to="/teams" className="text-gray-700 hover:text-ipl-blue font-medium">Teams</Link>
            <Link to="/mytickets" className="text-gray-700 hover:text-ipl-blue font-medium">My Tickets</Link>
          </div>

          <div className="hidden md:block">
            <Button variant="default" className="bg-ipl-blue text-white">Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-ipl-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/matches" 
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Matches
            </Link>
            <Link 
              to="/venues" 
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Venues
            </Link>
            <Link 
              to="/teams" 
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Teams
            </Link>
            <Link 
              to="/mytickets" 
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              My Tickets
            </Link>
            <Button variant="default" className="w-full bg-ipl-blue text-white">
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
