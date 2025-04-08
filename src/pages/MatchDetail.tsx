
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Info, AlertTriangle } from 'lucide-react';
import { getMatchById, getFormattedMatch, TicketType } from '@/data/matchData';
import { useToast } from '@/components/ui/use-toast';

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [match, setMatch] = useState<ReturnType<typeof getFormattedMatch> | null>(null);

  useEffect(() => {
    if (id) {
      const matchData = getMatchById(id);
      if (matchData) {
        setMatch(getFormattedMatch(matchData));
      } else {
        navigate('/matches');
        toast({
          title: "Match not found",
          description: "The match you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    }
  }, [id, navigate, toast]);

  const handleTicketChange = (ticketId: string, count: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: count
    }));
  };

  const incrementTicket = (ticketId: string, available: number) => {
    const currentCount = selectedTickets[ticketId] || 0;
    if (currentCount < available && currentCount < 10) {
      handleTicketChange(ticketId, currentCount + 1);
    } else if (currentCount >= 10) {
      toast({
        title: "Maximum limit reached",
        description: "You can book a maximum of 10 tickets per category.",
        variant: "destructive",
      });
    }
  };

  const decrementTicket = (ticketId: string) => {
    const currentCount = selectedTickets[ticketId] || 0;
    if (currentCount > 0) {
      handleTicketChange(ticketId, currentCount - 1);
    }
  };

  const getTotalAmount = () => {
    if (!match) return 0;
    
    return match.tickets.reduce((total, ticket) => {
      const count = selectedTickets[ticket.id] || 0;
      return total + (ticket.price * count);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };

  const handleProceedToCheckout = () => {
    if (getTotalTickets() === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, we would store the selected tickets in state/context
    // and redirect to checkout. For this demo, we'll show a toast notification.
    localStorage.setItem('selectedMatch', JSON.stringify(match));
    localStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));
    localStorage.setItem('totalAmount', getTotalAmount().toString());
    
    navigate('/checkout');
  };

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading match details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Match Header */}
      <div className="bg-gradient-to-r from-ipl-blue to-ipl-navy text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {match.homeTeam?.name} vs {match.awayTeam?.name}
              </h1>
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(match.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{match.time} IST</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{match.venue?.name}, {match.venue?.city}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex space-x-6">
              <div className="text-center">
                <div className="team-badge bg-white mx-auto">
                  <img src={match.homeTeam?.logo} alt={match.homeTeam?.name} className="h-10 w-10" />
                </div>
                <p className="font-semibold mt-1">{match.homeTeam?.abbr}</p>
              </div>
              
              <div className="text-center flex items-center">
                <p className="text-xl font-bold">VS</p>
              </div>
              
              <div className="text-center">
                <div className="team-badge bg-white mx-auto">
                  <img src={match.awayTeam?.logo} alt={match.awayTeam?.name} className="h-10 w-10" />
                </div>
                <p className="font-semibold mt-1">{match.awayTeam?.abbr}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Match Details & Booking */}
      <div className="bg-gray-50 flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Match Details */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Venue Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <img
                      src={match.venue?.image}
                      alt={match.venue?.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-bold text-lg">{match.venue?.name}</h3>
                    <p className="text-gray-600">{match.venue?.city}, {match.venue?.state}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span>Capacity: {match.venue?.capacity.toLocaleString()} spectators</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Stadium Guidelines:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gates open 2 hours before match time</li>
                      <li>• Valid ID proof required with ticket</li>
                      <li>• Outside food and beverages not allowed</li>
                      <li>• Parking available on first-come basis</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info size={18} />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={16} className="text-yellow-500 mt-0.5" />
                      <p>Tickets once purchased cannot be cancelled or refunded.</p>
                    </div>
                    <div>
                      <p className="font-medium">COVID-19 Guidelines:</p>
                      <p className="text-gray-600 mt-1">Please follow all safety protocols at the stadium. Mask wearing is recommended.</p>
                    </div>
                    <div>
                      <p className="font-medium">Entry Requirements:</p>
                      <p className="text-gray-600 mt-1">E-tickets will be sent to your registered email. Please carry a valid ID proof along with your ticket.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Ticket Booking */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Select Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {match.tickets.map((ticket: TicketType) => (
                      <div key={ticket.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">{ticket.name}</h3>
                            <p className="text-gray-600">
                              ₹{ticket.price.toLocaleString()} per ticket - {ticket.available} available
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full h-8 w-8"
                              onClick={() => decrementTicket(ticket.id)}
                              disabled={(selectedTickets[ticket.id] || 0) <= 0}
                            >
                              <span className="sr-only">Decrease</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </Button>
                            
                            <span className="font-medium w-8 text-center">
                              {selectedTickets[ticket.id] || 0}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full h-8 w-8"
                              onClick={() => incrementTicket(ticket.id, ticket.available)}
                              disabled={(selectedTickets[ticket.id] || 0) >= ticket.available}
                            >
                              <span className="sr-only">Increase</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </Button>
                          </div>
                        </div>
                        
                        {(selectedTickets[ticket.id] || 0) > 0 && (
                          <div className="mt-2 text-right text-gray-600">
                            {selectedTickets[ticket.id]} × ₹{ticket.price.toLocaleString()} = ₹{(selectedTickets[ticket.id] * ticket.price).toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="mt-8">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Total Tickets:</span>
                        <span>{getTotalTickets()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Convenience Fee:</span>
                        <span>₹50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{Math.round(getTotalAmount() * 0.18).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span>₹{(getTotalAmount() + 50 + Math.round(getTotalAmount() * 0.18)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col space-y-4">
                    <Button 
                      size="lg" 
                      className="bg-ipl-orange hover:bg-ipl-orange/90 text-white"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      By proceeding, you agree to our Terms & Conditions and Privacy Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MatchDetail;
