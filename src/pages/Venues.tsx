
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users } from 'lucide-react';
import { venueData } from '@/data/venueData';

const Venues = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Venues Header */}
      <div className="bg-gradient-to-r from-ipl-blue to-ipl-navy text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">IPL 2025 Venues</h1>
          <p className="max-w-3xl">
            The Indian Premier League features matches at some of India's most iconic cricket stadiums. 
            Explore the venues hosting the excitement of IPL 2025.
          </p>
        </div>
      </div>
      
      {/* Venues Grid */}
      <div className="bg-gray-50 flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venueData.map(venue => (
              <Card key={venue.id} className="overflow-hidden card-hover-effect">
                <div className="relative h-48">
                  <img 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-bold text-xl mb-2">{venue.name}</h3>
                  
                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin size={16} />
                    <span>{venue.city}, {venue.state}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users size={16} />
                    <span>Capacity: {venue.capacity.toLocaleString()}</span>
                  </div>
                  
                  <Link 
                    to={`/matches?venue=${venue.id}`} 
                    className="mt-4 inline-block text-ipl-blue hover:underline"
                  >
                    View matches at this venue →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stadium Facts */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Stadium Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-ipl-blue mb-2">132,000</div>
              <p className="text-gray-600">Narendra Modi Stadium Capacity</p>
              <p className="text-sm text-gray-500 mt-1">World's largest cricket stadium</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-ipl-blue mb-2">1987</div>
              <p className="text-gray-600">First World Cup Final</p>
              <p className="text-sm text-gray-500 mt-1">At Eden Gardens, Kolkata</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-ipl-blue mb-2">10</div>
              <p className="text-gray-600">Host Cities</p>
              <p className="text-sm text-gray-500 mt-1">For IPL 2025 season</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-ipl-blue mb-2">1876</div>
              <p className="text-gray-600">Oldest Stadium</p>
              <p className="text-sm text-gray-500 mt-1">Eden Gardens established</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stadium Experience */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Cricket Like Never Before</h2>
              <p className="text-gray-600 mb-6">
                IPL stadiums offer more than just cricket. They provide a complete entertainment experience 
                with state-of-the-art facilities, vibrant atmospheres, and unforgettable memories.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Premium Seating</h3>
                  <p className="text-sm text-gray-600">
                    Enjoy the best views with comfortable seating and exclusive amenities in premium sections.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Food & Beverages</h3>
                  <p className="text-sm text-gray-600">
                    Wide variety of culinary options from local delicacies to international cuisine.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Entertainment Zones</h3>
                  <p className="text-sm text-gray-600">
                    Interactive areas with games, contests, and activities for fans of all ages.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Modern Facilities</h3>
                  <p className="text-sm text-gray-600">
                    Clean restrooms, easy navigation, and accessibility features for all spectators.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-first lg:order-last mb-6 lg:mb-0">
              <img 
                src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644844022_narendra-modi-stadium.jpg" 
                alt="Stadium Experience" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Venues;
