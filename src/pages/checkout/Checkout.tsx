
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { ShoppingCart, Check, ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Enhanced mock cart items with more details
const mockCartItems = [
  {
    id: "1",
    name: "Premium Organic Rice",
    price: 120,
    quantity: 5,
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=2070&auto=format&fit=crop",
    vendor: "Green Earth Farms"
  },
  {
    id: "2",
    name: "Fresh Seasonal Vegetables",
    price: 80,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2069&auto=format&fit=crop",
    vendor: "Local Harvest Co-op"
  },
  {
    id: "3",
    name: "Organic Wheat Flour",
    price: 65,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1568718247028-46f14cfb7533?q=80&w=2070&auto=format&fit=crop",
    vendor: "Heritage Grain Suppliers"
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [currentTab, setCurrentTab] = useState("checkout");

  const handleCheckoutSuccess = () => {
    setOrderCompleted(true);
    setCurrentTab("complete");
  };

  const handleContinueShopping = () => {
    navigate("/");
    toast({
      title: "Continue Shopping",
      description: "Redirecting to the marketplace...",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-8 w-full grid grid-cols-3">
          <TabsTrigger 
            value="cart" 
            disabled={orderCompleted}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </TabsTrigger>
          <TabsTrigger 
            value="checkout" 
            disabled={orderCompleted}
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger 
            value="complete" 
            disabled={!orderCompleted}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Complete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cart">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>Review your items before checkout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Vendor: {item.vendor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}

                <div className="pt-4 flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>₹{mockCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full bg-[#138808] hover:bg-[#138808]/90"
                    onClick={() => setCurrentTab("checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkout">
          <CheckoutForm
            cartItems={mockCartItems}
            onSuccess={handleCheckoutSuccess}
          />
        </TabsContent>

        <TabsContent value="complete">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Order Complete!</CardTitle>
              <CardDescription>
                Your order has been processed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="mx-auto max-w-md space-y-2 text-center">
                <p>
                  Thank you for your purchase. Your order #AN-{Math.floor(10000 + Math.random() * 90000)} 
                  has been confirmed.
                </p>
                <p>
                  You will receive an email confirmation shortly with the expected 
                  delivery date.
                </p>
              </div>

              <div className="border rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span>₹{mockCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Method:</span>
                    <span>Express Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span>{new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="bg-[#FF9933] hover:bg-[#FF9933]/90"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Checkout;
