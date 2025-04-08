
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getUpcomingMatches } from '@/data/matchData';
import { teamData } from '@/data/teamData';
import { venueData } from '@/data/venueData';

const Matches = () => {
  const [matches, setMatches] = useState(getUpcomingMatches());
  const [filteredMatches, setFilteredMatches] = useState(matches);
  
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  // Get unique dates from matches
  const uniqueDates = Array.from(new Set(matches.map(match => match.date)));

  useEffect(() => {
    let result = matches;
    
    if (selectedTeam !== 'all') {
      result = result.filter(
        match => match.homeTeamId === selectedTeam || match.awayTeamId === selectedTeam
      );
    }
    
    if (selectedVenue !== 'all') {
      result = result.filter(match => match.venueId === selectedVenue);
    }
    
    if (selectedDate !== 'all') {
      result = result.filter(match => match.date === selectedDate);
    }
    
    setFilteredMatches(result);
  }, [selectedTeam, selectedVenue, selectedDate, matches]);

  const resetFilters = () => {
    setSelectedTeam('all');
    setSelectedVenue('all');
    setSelectedDate('all');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Matches Header */}
      <div className="bg-gradient-to-r from-ipl-blue to-ipl-navy text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">IPL 2025 Matches</h1>
          <p className="max-w-3xl">
            Browse all upcoming matches in the IPL 2025 season. Filter by team, venue, 
            or date to find the perfect match to attend. Book your tickets now and secure your seats!
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="sticky top-16 bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="team-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Team
              </label>
              <select 
                id="team-filter"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ipl-blue"
              >
                <option value="all">All Teams</option>
                {teamData.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="venue-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <select 
                id="venue-filter"
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ipl-blue"
              >
                <option value="all">All Venues</option>
                {venueData.map(venue => (
                  <option key={venue.id} value={venue.id}>{venue.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select 
                id="date-filter"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ipl-blue"
              >
                <option value="all">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full border-ipl-blue text-ipl-blue hover:bg-ipl-blue hover:text-white"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Match Listing */}
      <div className="bg-gray-50 flex-grow py-8">
        <div className="container mx-auto px-4">
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMatches.map(match => (
                <Card key={match.id} className="overflow-hidden card-hover-effect border-gray-200">
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
                        <Calendar size={16} />
                        <span>{new Date(match.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{match.time} IST</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
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
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No matches found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
              <Button onClick={resetFilters} className="bg-ipl-blue hover:bg-ipl-blue/90">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Matches;
