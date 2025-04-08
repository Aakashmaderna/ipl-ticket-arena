
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Star, Shield, Trophy } from 'lucide-react';
import { getFeaturedMatches } from '@/data/matchData';

const Index = () => {
  const [featuredMatches] = useState(getFeaturedMatches());

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/stadiums/7.jpg" 
            alt="Stadium Background" 
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="hero-gradient relative z-10 text-white">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="backdrop-blur-sm bg-black/20 p-6 md:p-8 rounded-xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Book Your IPL 2025 Tickets
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  Don't miss the chance to witness cricket's biggest festival live! 
                  Book your tickets now and be part of the IPL excitement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-ipl-orange hover:bg-ipl-orange/90 text-white">
                    <Link to="/matches">Book Tickets</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-ipl-navy">
                    <Link to="/venues">View Venues</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center items-center">
                <img 
                  src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLTrophy.png" 
                  alt="IPL Trophy" 
                  className="max-w-full h-auto animate-pulse-scale filter drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Matches */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Featured Matches</h2>
            <div className="mt-4 md:mt-0">
              <img 
                src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPL2024.png" 
                alt="IPL 2025 Season" 
                className="h-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredMatches.map(match => (
              <Card key={match.id} className="overflow-hidden card-hover-effect border-gray-200 shadow-md">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4">
                  <div className="flex justify-center items-center gap-4">
                    <div className="text-center">
                      <div className="team-badge mx-auto" style={{ backgroundColor: match.homeTeam?.primaryColor }}>
                        <img src={match.homeTeam?.logo} alt={match.homeTeam?.name} className="h-8 w-8" />
                      </div>
                      <p className="font-semibold mt-1">{match.homeTeam?.abbr}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">VS</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="team-badge mx-auto" style={{ backgroundColor: match.awayTeam?.primaryColor }}>
                        <img src={match.awayTeam?.logo} alt={match.awayTeam?.name} className="h-8 w-8" />
                      </div>
                      <p className="font-semibold mt-1">{match.awayTeam?.abbr}</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-center mb-3">
                    {match.homeTeam?.shortName} vs {match.awayTeam?.shortName}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-ipl-blue" />
                      <span>{new Date(match.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-ipl-blue" />
                      <span>{match.time} IST</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-ipl-blue" />
                      <span>{match.venue?.name}, {match.venue?.city}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button asChild className="w-full bg-ipl-blue hover:bg-ipl-blue/90">
                      <Link to={`/matches/${match.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-ipl-blue text-ipl-blue hover:bg-ipl-blue hover:text-white">
              <Link to="/matches">View All Matches</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stadium Experience */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Experience the Stadium Atmosphere</h2>
              <p className="text-gray-600 mb-6">
                Nothing compares to the electrifying atmosphere of watching an IPL match live in the stadium. 
                Feel the energy of thousands of fans, witness spectacular cricket moments, and create memories that last a lifetime.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="bg-ipl-orange text-white p-1 rounded-full mt-1">
                    <Star size={16} />
                  </div>
                  <span>Premium seating options for the best views</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-ipl-orange text-white p-1 rounded-full mt-1">
                    <Shield size={16} />
                  </div>
                  <span>Exclusive access to fan zones and activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-ipl-orange text-white p-1 rounded-full mt-1">
                    <Trophy size={16} />
                  </div>
                  <span>Food and beverage options from local vendors</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-ipl-orange text-white p-1 rounded-full mt-1">
                    <Star size={16} />
                  </div>
                  <span>Opportunity to see your favorite cricketers up close</span>
                </li>
              </ul>
              <Button asChild className="bg-ipl-blue hover:bg-ipl-blue/90">
                <Link to="/venues">Explore Venues</Link>
              </Button>
            </div>
            <div className="order-first lg:order-last mb-6 lg:mb-0">
              <img 
                src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644844207_eden-gardens.jpg" 
                alt="Stadium Experience" 
                className="rounded-lg shadow-lg w-full h-auto transform transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">IPL Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { id: "csk", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png", name: "Chennai Super Kings" },
              { id: "mi", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png", name: "Mumbai Indians" },
              { id: "rcb", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png", name: "Royal Challengers Bangalore" },
              { id: "gt", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GTmedium.png", name: "Gujarat Titans" },
              { id: "srh", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png", name: "Sunrisers Hyderabad" },
              { id: "rr", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png", name: "Rajasthan Royals" },
              { id: "lsg", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSGmedium.png", name: "Lucknow Super Giants" },
              { id: "dc", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png", name: "Delhi Capitals" },
              { id: "pbks", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png", name: "Punjab Kings" },
              { id: "kkr", logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png", name: "Kolkata Knight Riders" }
            ].map(team => (
              <Link 
                key={team.id}
                to={`/teams/${team.id}`}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-xl transition-all flex flex-col items-center card-hover-effect"
              >
                <img src={team.logo} alt={team.name} className="h-16 w-16 mb-3" />
                <h3 className="font-medium text-sm">{team.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter with stadium background */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/stadiums/9.jpg" 
            alt="Stadium Background" 
            className="w-full h-full object-cover filter brightness-25"
          />
        </div>
        <div className="relative z-10 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated on IPL Ticket Sales</h2>
              <p className="mb-6 text-white/90">
                Subscribe to our newsletter to get the latest updates on ticket availability, 
                exclusive offers, and match information.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-ipl-orange"
                />
                <Button className="bg-ipl-orange hover:bg-ipl-orange/90 text-white py-3 px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
