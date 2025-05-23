
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CreditCard, MapPin, Truck, Check, Loader2, AlertCircle } from "lucide-react";

type CheckoutFormProps = {
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    vendor?: string;
  }>;
  onSuccess?: () => void;
};

const CheckoutForm = ({ 
  cartItems = [], 
  onSuccess 
}: CheckoutFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    if (cartItems.length === 0) return 0;
    return deliveryOption === "express" ? 80 : 40;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Form validation
    const requiredFields = ['name', 'phone', 'address', 'city', 'pincode'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in the following: ${emptyFields.join(', ')}`,
        variant: "destructive",
      });
      setProcessing(false);
      return;
    }

    // Payment method validation
    if (paymentMethod === "upi" && !formData.upiId) {
      toast({
        title: "Missing UPI ID",
        description: "Please enter your UPI ID to proceed with payment.",
        variant: "destructive",
      });
      setProcessing(false);
      return;
    }

    if (paymentMethod === "card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv)) {
      toast({
        title: "Missing Card Details",
        description: "Please enter all card details to proceed with payment.",
        variant: "destructive",
      });
      setProcessing(false);
      return;
    }

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Your order has been placed successfully.`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
            <CardDescription>Enter your delivery details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your street address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="Enter your PIN code"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Special instructions for delivery"
                  value={formData.notes}
                  onChange={handleChange}
                  className="min-h-[80px]"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        toast({
                          title: "Location Detected",
                          description: "Your current location has been set as the delivery address.",
                        });
                      });
                    }
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Delivery Options</CardTitle>
            <CardDescription>Choose your preferred delivery method</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={deliveryOption} 
              onValueChange={setDeliveryOption}
              className="space-y-4"
            >
              <div className={`flex items-center justify-between rounded-lg border p-4 ${deliveryOption === "standard" ? "border-[#138808] bg-[#138808]/5" : ""}`}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex flex-col">
                    <span className="font-medium">Standard Delivery</span>
                    <span className="text-sm text-muted-foreground">Delivered within 24-48 hours</span>
                  </Label>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹40</p>
                </div>
              </div>

              <div className={`flex items-center justify-between rounded-lg border p-4 ${deliveryOption === "express" ? "border-[#138808] bg-[#138808]/5" : ""}`}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex flex-col">
                    <span className="font-medium">Express Delivery</span>
                    <span className="text-sm text-muted-foreground">Delivered within 12 hours</span>
                  </Label>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹80</p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="space-y-4"
            >
              <div className={`flex items-center justify-between rounded-lg border p-4 ${paymentMethod === "upi" ? "border-[#138808] bg-[#138808]/5" : ""}`}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center space-x-2">
                    <span>UPI Payment</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" 
                    alt="UPI" 
                    className="h-6 w-auto"
                  />
                </div>
              </div>

              {paymentMethod === "upi" && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    name="upiId"
                    placeholder="yourname@bank"
                    value={formData.upiId}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className={`flex items-center justify-between rounded-lg border p-4 ${paymentMethod === "card" ? "border-[#138808] bg-[#138808]/5" : ""}`}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Card Payment</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    alt="Visa" 
                    className="h-6 w-auto"
                  />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    alt="Mastercard" 
                    className="h-6 w-auto"
                  />
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        name="cardCvv"
                        placeholder="123"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={`flex items-center justify-between rounded-lg border p-4 ${paymentMethod === "cod" ? "border-[#138808] bg-[#138808]/5" : ""}`}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.vendor && (
                          <p className="text-xs text-muted-foreground">
                            Sold by: {item.vendor}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))
              )}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">₹{calculateSubtotal()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Delivery Fee</p>
                  <p className="font-medium">₹{calculateDeliveryFee()}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>₹{calculateTotal()}</p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#138808] p-2 text-white">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {deliveryOption === "express" 
                        ? new Date(Date.now() + 12 * 60 * 60 * 1000).toLocaleDateString() + " (within 12 hours)"
                        : new Date(Date.now() + 36 * 60 * 60 * 1000).toLocaleDateString() + " (within 24-48 hours)"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-700">Order Notification</p>
                      <p className="text-sm text-amber-600">
                        By placing this order, you'll receive notifications when the vendor is near your location for delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-[#138808] hover:bg-[#138808]/90"
              onClick={handleSubmit}
              disabled={processing || cartItems.length === 0}
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Place Order • ₹{calculateTotal()}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By placing an order you agree to our{" "}
            <a href="#" className="text-[#138808] underline">
              Terms and Conditions
            </a>
            {" "}and{" "}
            <a href="#" className="text-[#138808] underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
