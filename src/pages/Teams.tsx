
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { teamData } from '@/data/teamData';

const Teams = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Teams Header */}
      <div className="bg-gradient-to-r from-ipl-blue to-ipl-navy text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">IPL 2025 Teams</h1>
          <p className="max-w-3xl">
            The Indian Premier League features 10 franchises representing different cities across India.
            Each team brings its unique style and passionate fan base to the competition.
          </p>
        </div>
      </div>
      
      {/* Teams Grid */}
      <div className="bg-gray-50 flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.map(team => (
              <Card 
                key={team.id} 
                className="overflow-hidden card-hover-effect border-t-4"
                style={{ borderTopColor: team.primaryColor }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 flex items-center justify-center rounded-full p-2"
                      style={{ backgroundColor: `${team.primaryColor}20` }}
                    >
                      <img src={team.logo} alt={team.name} className="h-16 w-16" />
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-xl">{team.name}</h3>
                      <p className="text-gray-600">{team.shortName}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: team.primaryColor,
                        color: '#fff'
                      }}
                    >
                      Team Colors
                    </span>
                    
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: team.secondaryColor,
                        color: '#fff'
                      }}
                    >
                      {team.secondaryColor}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/matches?team=${team.id}`} 
                    className="mt-4 inline-block text-ipl-blue hover:underline"
                  >
                    View {team.abbr} matches →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* IPL History */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">IPL History</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-ipl-blue flex items-center justify-center text-white text-3xl font-bold">
                    2008
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                  <p className="text-gray-600">
                    The IPL was founded in 2008 with eight teams. Rajasthan Royals were the inaugural champions, 
                    defeating Chennai Super Kings in the final.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-ipl-orange flex items-center justify-center text-white text-3xl font-bold">
                    2011
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Expansion Era</h3>
                  <p className="text-gray-600">
                    The league expanded to ten teams with the addition of Pune Warriors India and Kochi Tuskers Kerala. 
                    The tournament format was adjusted to accommodate the larger field.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-ipl-yellow flex items-center justify-center text-white text-3xl font-bold">
                    2022
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">New Era</h3>
                  <p className="text-gray-600">
                    The league expanded to ten teams again with the addition of Gujarat Titans and Lucknow Super Giants. 
                    Gujarat Titans won the title in their debut season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Teams;
