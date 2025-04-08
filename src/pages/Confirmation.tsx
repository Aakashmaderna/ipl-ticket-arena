
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Clock, MapPin, Download, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Confirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookingReference, setBookingReference] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [match, setMatch] = useState<any>(null);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Retrieve booking data from localStorage
    const storedMatch = localStorage.getItem('selectedMatch');
    const storedTickets = localStorage.getItem('selectedTickets');
    const storedAmount = localStorage.getItem('totalAmount');
    const storedReference = localStorage.getItem('bookingReference');
    const storedName = localStorage.getItem('customerName');
    const storedEmail = localStorage.getItem('customerEmail');
    
    if (!storedMatch || !storedTickets || !storedAmount || !storedReference || !storedName || !storedEmail) {
      navigate('/');
      toast({
        title: "Booking information not found",
        description: "We couldn't retrieve your booking details.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setMatch(JSON.parse(storedMatch));
      setSelectedTickets(JSON.parse(storedTickets));
      setTotalAmount(Number(storedAmount));
      setBookingReference(storedReference);
      setCustomerName(storedName);
      setCustomerEmail(storedEmail);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      navigate('/');
    }
  }, [navigate, toast]);

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

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading confirmation...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Confirmation Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-lg">Your tickets have been successfully booked and sent to your email.</p>
        </div>
      </div>
      
      {/* Booking Details */}
      <div className="bg-gray-50 flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex justify-between items-center">
                  <span>Booking Details</span>
                  <span className="text-sm font-normal text-gray-500">Reference: {bookingReference}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-xl mb-2">
                      {match.homeTeam?.name} vs {match.awayTeam?.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p>{new Date(match.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p>{match.time} IST</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Venue</p>
                          <p>{match.venue?.name}, {match.venue?.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-100 py-4">
                    <h4 className="font-medium mb-3">Your Tickets</h4>
                    <div className="space-y-2">
                      {match.tickets
                        .filter((ticket: any) => selectedTickets[ticket.id] > 0)
                        .map((ticket: any) => (
                          <div key={ticket.id} className="flex justify-between">
                            <span>{ticket.name} Ticket × {selectedTickets[ticket.id]}</span>
                            <span>₹{(ticket.price * selectedTickets[ticket.id]).toLocaleString()}</span>
                          </div>
                        ))}
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Convenience Fee</span>
                        <span>₹50</span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>GST (18%)</span>
                        <span>₹{Math.round(totalAmount * 0.18).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-100 mt-2">
                        <span>Total Amount</span>
                        <span>₹{(totalAmount + 50 + Math.round(totalAmount * 0.18)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Customer Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p>{customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{customerEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDownloadTickets}
                className="bg-ipl-blue hover:bg-ipl-blue/90 flex items-center gap-2"
              >
                <Download size={16} />
                Download Tickets
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleShareTickets}
                className="border-ipl-blue text-ipl-blue hover:bg-ipl-blue hover:text-white flex items-center gap-2"
              >
                <Share2 size={16} />
                Share Tickets
              </Button>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Need help with your booking?</p>
              <Button 
                variant="link" 
                className="text-ipl-blue"
                onClick={() => navigate('/mytickets')}
              >
                View My Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
