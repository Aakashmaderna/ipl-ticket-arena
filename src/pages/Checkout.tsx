
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, CreditCard, User, Mail, Phone, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [match, setMatch] = useState<any>(null);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Retrieve booking data from localStorage
    const storedMatch = localStorage.getItem('selectedMatch');
    const storedTickets = localStorage.getItem('selectedTickets');
    const storedAmount = localStorage.getItem('totalAmount');
    
    if (!storedMatch || !storedTickets || !storedAmount) {
      navigate('/matches');
      toast({
        title: "Booking data not found",
        description: "Please select a match and tickets first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setMatch(JSON.parse(storedMatch));
      setSelectedTickets(JSON.parse(storedTickets));
      setTotalAmount(Number(storedAmount));
    } catch (error) {
      console.error('Error parsing stored data:', error);
      navigate('/matches');
    }
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number should be 10 digits";
    
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required";
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Card number should be 16 digits";
    }
    
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Expiry date should be in MM/YY format";
    }
    
    if (!formData.cardCVV.trim()) newErrors.cardCVV = "CVV is required";
    else if (!/^\d{3,4}$/.test(formData.cardCVV)) newErrors.cardCVV = "CVV should be 3 or 4 digits";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this is where you would send payment info to a payment processor
      // For demo purposes, we'll simulate a success and redirect to confirmation
      
      // Generate a random booking reference
      const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Store the booking details (in a real app, this would be stored in a database)
      localStorage.setItem('bookingReference', bookingReference);
      localStorage.setItem('customerName', formData.name);
      localStorage.setItem('customerEmail', formData.email);
      
      // Show success toast
      toast({
        title: "Payment Successful!",
        description: "Your tickets have been booked successfully.",
      });
      
      // Redirect to confirmation page
      navigate('/confirmation');
    } else {
      // Show error toast if validation fails
      toast({
        title: "Please check your information",
        description: "There are errors in your form that need to be fixed.",
        variant: "destructive",
      });
      
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementsByName(firstErrorField)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
    }
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading checkout...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Checkout Header */}
      <div className="bg-gradient-to-r from-ipl-blue to-ipl-navy text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
          <p>Complete your booking to secure your tickets</p>
        </div>
      </div>
      
      {/* Checkout Form */}
      <div className="bg-gray-50 flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:order-last">
              <div className="lg:sticky lg:top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {match.homeTeam?.shortName} vs {match.awayTeam?.shortName}
                        </h3>
                        
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(match.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{match.time} IST</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{match.venue?.name}, {match.venue?.city}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Your Tickets</h4>
                        <div className="space-y-2">
                          {match.tickets
                            .filter((ticket: any) => selectedTickets[ticket.id] > 0)
                            .map((ticket: any) => (
                              <div key={ticket.id} className="flex justify-between text-sm">
                                <span>{ticket.name} × {selectedTickets[ticket.id]}</span>
                                <span>₹{(ticket.price * selectedTickets[ticket.id]).toLocaleString()}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Convenience Fee</span>
                          <span>₹50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (18%)</span>
                          <span>₹{Math.round(totalAmount * 0.18).toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>₹{(totalAmount + 50 + Math.round(totalAmount * 0.18)).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 text-sm text-yellow-800 flex gap-2">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <p>Tickets will be emailed to you after successful payment. Please carry a valid ID proof along with your ticket.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                              <User size={16} />
                            </div>
                            <Input 
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                              placeholder="John Doe"
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                              <Mail size={16} />
                            </div>
                            <Input 
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                              placeholder="your@email.com"
                            />
                          </div>
                          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <Phone size={16} />
                          </div>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="10-digit mobile number"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CreditCard size={18} />
                        Payment Details
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className={errors.cardName ? 'border-red-500' : ''}
                            placeholder="John Doe"
                          />
                          {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={errors.cardNumber ? 'border-red-500' : ''}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input 
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className={errors.cardExpiry ? 'border-red-500' : ''}
                              placeholder="MM/YY"
                            />
                            {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry}</p>}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardCVV">CVV</Label>
                            <Input 
                              id="cardCVV"
                              name="cardCVV"
                              value={formData.cardCVV}
                              onChange={handleInputChange}
                              className={errors.cardCVV ? 'border-red-500' : ''}
                              placeholder="123"
                            />
                            {errors.cardCVV && <p className="text-red-500 text-sm">{errors.cardCVV}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-ipl-orange hover:bg-ipl-orange/90 text-white"
                        size="lg"
                      >
                        Pay ₹{(totalAmount + 50 + Math.round(totalAmount * 0.18)).toLocaleString()}
                      </Button>
                      
                      <p className="text-center text-xs text-gray-500 mt-4">
                        By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
                        Your payment information is secured with industry-standard encryption.
                      </p>
                    </div>
                  </form>
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

export default Checkout;
