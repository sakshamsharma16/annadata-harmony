
import { useEffect, useState, useRef } from "react";
import ScriptLoader from "./ui/script-loader";
import { MessageSquare, X, Clock, User, Bot, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the types for conversation history
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastActive: Date;
}

interface FastBotsChatProps {
  botId: string;
}

const FastBotsChat = ({ botId }: FastBotsChatProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeTab, setActiveTab] = useState("farmer");
  
  // Rasa Pro license token
  const rasaProLicenseToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg";

  // Sample conversation history (in a real app, this would come from a database)
  const sampleConversations = useRef([
    {
      id: "conv-1",
      title: "Crop Price Inquiry",
      messages: [
        {
          id: "msg-1",
          text: "What are the current wheat prices?",
          sender: 'user' as const,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
        },
        {
          id: "msg-2",
          text: "Current wheat prices in the market are ranging from ₹2,400 to ₹2,500 per quintal depending on the quality and region.",
          sender: 'bot' as const,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 30000)
        }
      ],
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      id: "conv-2",
      title: "Fertilizer Recommendation",
      messages: [
        {
          id: "msg-3",
          text: "What fertilizer should I use for tomatoes?",
          sender: 'user' as const,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
        },
        {
          id: "msg-4",
          text: "For tomatoes, a balanced NPK fertilizer with ratio 5-10-10 is recommended. You can also add calcium to prevent blossom end rot.",
          sender: 'bot' as const,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 45000)
        }
      ],
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    {
      id: "conv-3",
      title: "Order Status Check",
      messages: [
        {
          id: "msg-5",
          text: "What's the status of my order #12345?",
          sender: 'user' as const,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72)
        },
        {
          id: "msg-6",
          text: "Your order #12345 is currently in transit and is expected to be delivered by tomorrow evening.",
          sender: 'bot' as const,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72 + 25000)
        }
      ],
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 72)
    }
  ]);

  useEffect(() => {
    // Load conversations based on active role tab
    setConversations(sampleConversations.current);
    
    // Store the preference
    localStorage.setItem('preferredChatbot', 'fastBots');
    
    // When the component unmounts, close the chatbot if it's open
    return () => {
      if (window.FastBots && isVisible) {
        window.FastBots.close();
      }
    };
  }, [isVisible, activeTab]);

  const handleScriptLoad = () => {
    console.info("FastBots script loaded successfully");
    setIsScriptLoaded(true);
    
    // Make sure the FastBots object is available
    if (window.FastBots) {
      // Initialize with Rasa integration
      try {
        window.FastBots.init({
          rasaProLicenseToken: rasaProLicenseToken,
          multilingual: true,
          voiceEnabled: true
        });
        
        console.info("FastBots initialized with Rasa Pro integration");
      } catch (error) {
        console.error("Failed to initialize FastBots with Rasa:", error);
      }
      
      // Set a short timeout to ensure the widget is fully initialized
      setTimeout(() => {
        if (isVisible) {
          window.FastBots.open();
        } else {
          window.FastBots.close();
        }
      }, 500);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
    
    if (window.FastBots) {
      if (!isVisible) {
        window.FastBots.open();
      } else {
        window.FastBots.close();
      }
    }
  };

  const toggleHistoryPanel = () => {
    setIsHistoryVisible(prev => !prev);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  return (
    <>
      <ScriptLoader 
        src="https://app.fastbots.ai/embed.js" 
        attributes={{ 
          "data-bot-id": botId,
          "data-rasa-token": rasaProLicenseToken,
          "data-multilingual": "true",
          "data-voice-enabled": "true"
        }}
        onLoad={handleScriptLoad}
      />

      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* History Panel Button */}
        <Button 
          onClick={toggleHistoryPanel} 
          size="icon" 
          className="rounded-full bg-primary shadow-lg"
        >
          <Clock className="h-5 w-5" />
        </Button>
        
        {/* Chat Button */}
        <Button 
          onClick={toggleVisibility} 
          size="icon" 
          className="rounded-full bg-primary shadow-lg"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Conversation History Panel */}
      {isHistoryVisible && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 shadow-xl rounded-lg overflow-hidden animate-in slide-in-from-right">
          <Card>
            <CardHeader className="bg-primary/10 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Conversation History
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={toggleHistoryPanel}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="farmer">Farmer</TabsTrigger>
                <TabsTrigger value="vendor">Vendor</TabsTrigger>
                <TabsTrigger value="consumer">Consumer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="farmer" className="mt-0">
                <CardContent className="max-h-80 overflow-y-auto p-3">
                  {conversations.length > 0 ? (
                    <div className="space-y-3">
                      {conversations.map((conversation) => (
                        <div 
                          key={conversation.id} 
                          className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-sm">{conversation.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(conversation.lastActive)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {conversation.messages[conversation.messages.length - 1].text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No conversation history yet</p>
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              
              <TabsContent value="vendor" className="mt-0">
                <CardContent className="max-h-80 overflow-y-auto p-3">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No vendor conversations yet</p>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="consumer" className="mt-0">
                <CardContent className="max-h-80 overflow-y-auto p-3">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No consumer conversations yet</p>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="bg-muted/50 py-2 px-4 text-xs text-muted-foreground flex justify-between items-center">
              <span>Powered by Rasa Pro</span>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Clear History
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default FastBotsChat;
