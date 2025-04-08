
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Download, Share2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MyTickets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [hasBooking, setHasBooking] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [match, setMatch] = useState<any>(null);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

  useEffect(() => {
    // Check if there's a booking in localStorage
    const storedMatch = localStorage.getItem('selectedMatch');
    const storedTickets = localStorage.getItem('selectedTickets');
    const storedReference = localStorage.getItem('bookingReference');
    
    if (storedMatch && storedTickets && storedReference) {
      try {
        setMatch(JSON.parse(storedMatch));
        setSelectedTickets(JSON.parse(storedTickets));
        setBookingReference(storedReference);
        setHasBooking(true);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, []);

  const handleDownloadTickets = () => {
    // In a real application, this would generate and download a PDF ticket
    // For demo purposes, we'll just show a toast notification
    toast({
      title: "Tickets sent",
      description: "Your tickets have been sent to your email address.",
    });
  };

  const handleShareTickets = () => {
    // In a real application, this would open a share dialog
    // For demo purposes, we'll just show a toast notification
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* My Tickets Header */}
      <div className="bg-gradient-to-r from-ipl-blue to-ipl-navy text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Tickets</h1>
          <p className="max-w-3xl">
            View and manage all your IPL 2025 match tickets in one place.
          </p>
        </div>
      </div>
      
      {/* Tickets Content */}
      <div className="bg-gray-50 flex-grow py-12">
        <div className="container mx-auto px-4">
          {hasBooking && match ? (
            <div className="max-w-3xl mx-auto">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-bold text-xl">
                        {match.homeTeam?.name} vs {match.awayTeam?.name}
                      </h2>
                      <p className="text-sm text-gray-500">Booking Reference: {bookingReference}</p>
                    </div>
                    <div className="flex space-x-3">
                      <div className="team-badge" style={{ backgroundColor: match.homeTeam?.primaryColor }}>
                        <img src={match.homeTeam?.logo} alt={match.homeTeam?.name} className="h-8 w-8" />
                      </div>
                      <div className="team-badge" style={{ backgroundColor: match.awayTeam?.primaryColor }}>
                        <img src={match.awayTeam?.logo} alt={match.awayTeam?.name} className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{new Date(match.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>{match.time} IST</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{match.venue?.name}, {match.venue?.city}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <h3 className="font-medium mb-2">Your Tickets</h3>
                    <div className="space-y-1">
                      {match.tickets
                        .filter((ticket: any) => selectedTickets[ticket.id] > 0)
                        .map((ticket: any) => (
                          <div key={ticket.id} className="flex justify-between">
                            <span>{ticket.name} Ticket</span>
                            <span>× {selectedTickets[ticket.id]}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <Button 
                      variant="outline"
                      onClick={handleShareTickets}
                      className="border-ipl-blue text-ipl-blue hover:bg-ipl-blue hover:text-white flex items-center gap-2"
                      size="sm"
                    >
                      <Share2 size={14} />
                      Share
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadTickets}
                      className="bg-ipl-blue hover:bg-ipl-blue/90 flex items-center gap-2"
                      size="sm"
                    >
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5 flex gap-3">
                <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">Important Information</h3>
                  <p className="text-yellow-700 text-sm">
                    Please arrive at least 1 hour before the match starts. Have your ticket and a valid ID ready 
                    for verification at the entrance. Outside food and beverages are not allowed in the stadium.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center py-12">
              <div className="mb-6">
                <img 
                  src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadline.png" 
                  alt="IPL Trophy" 
                  className="h-40 mx-auto opacity-30"
                />
              </div>
              <h2 className="text-2xl font-bold mb-3">No Tickets Found</h2>
              <p className="text-gray-600 mb-6">
                You haven't booked any tickets yet. Browse upcoming matches and secure your seats for IPL 2025!
              </p>
              <Button asChild className="bg-ipl-blue hover:bg-ipl-blue/90">
                <Link to="/matches">Book Tickets Now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">How do I access my tickets on match day?</h3>
              <p className="text-gray-600">
                You can show the e-ticket on your mobile device at the stadium entrance or print the ticket 
                that was sent to your email. Make sure to bring a valid ID for verification.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I transfer my tickets to someone else?</h3>
              <p className="text-gray-600">
                Yes, you can transfer your tickets by using the Share feature. The person you share with 
                will need to show the ticket and their ID at the entrance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">What if I lose my ticket?</h3>
              <p className="text-gray-600">
                You can always come back to this page to download your tickets again or check your email 
                for the ticket that was sent to you after booking.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I get a refund for my tickets?</h3>
              <p className="text-gray-600">
                Tickets are non-refundable. However, if a match is canceled or rescheduled, you will be notified 
                with options for attending the rescheduled match or receiving a refund.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyTickets;
