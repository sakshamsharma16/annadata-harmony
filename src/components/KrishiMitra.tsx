
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, X, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const KrishiMitra = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initial greeting message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "नमस्ते! मैं कृषि मित्र हूँ। मैं आपकी कृषि संबंधित प्रश्नों में मदद कर सकता हूँ। आप मुझसे कुछ भी पूछ सकते हैं!"
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to your backend where you handle OpenAI API
      // For now, we'll simulate a response
      setTimeout(() => {
        const demoResponses = [
          "मौसम की जानकारी के अनुसार, अगले सप्ताह बारिश की संभावना है। फसल की कटाई के लिए इस सप्ताह का समय बेहतर होगा।",
          "धान की फसल के लिए, नाइट्रोजन, फॉस्फोरस और पोटाश का संतुलित उपयोग करें। मिट्टी परीक्षण के आधार पर उर्वरक का चयन करें।",
          "आपके क्षेत्र में गेहूं की बुवाई के लिए अक्टूबर-नवंबर का समय सबसे उपयुक्त है। अच्छी पैदावार के लिए उचित बीज का चयन करें।",
          "सिंचाई की आवृत्ति फसल की प्रकृति और मौसम पर निर्भर करती है। सिंचाई से पहले मिट्टी की नमी की जांच करें।"
        ];
        
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: randomResponse }
        ]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Could not send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Listening",
      description: "Speak now...",
    });
    
    // This is just a placeholder - in a real app you would implement the SpeechRecognition API
    setTimeout(() => {
      toast({
        title: "Sorry",
        description: "Speech recognition implementation requires backend configuration.",
      });
    }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg bg-[#138808] hover:bg-[#138808]/90"
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          className="sm:max-w-md md:max-w-lg w-[90vw] bg-white" 
          side="right"
        >
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center gap-2 text-[#138808]">
              <Bot className="h-5 w-5" />
              कृषि मित्र (Krishi Mitra)
            </SheetTitle>
            <SheetDescription>
              आपका कृषि सहायक - Your Agricultural Assistant
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-12rem)]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-[#138808] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.role === "assistant" && (
                          <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                        )}
                        <p className="text-sm">{message.content}</p>
                        {message.role === "user" && (
                          <User className="h-5 w-5 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        <div className="flex gap-1">
                          <span className="animate-pulse">●</span>
                          <span className="animate-pulse delay-150">●</span>
                          <span className="animate-pulse delay-300">●</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSubmit}
              className="border-t p-4 flex items-center gap-2"
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={startSpeechRecognition}
                disabled={isLoading}
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="bg-[#138808] hover:bg-[#138808]/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default KrishiMitra;
