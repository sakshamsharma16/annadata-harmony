
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, MessageCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FastBotsChatProps {
  botId: string;
}

const FastBotsChat = ({ botId }: FastBotsChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{[key: string]: any[]}>({
    all: [],
    farmers: [],
    vendors: [],
    consumers: []
  });
  const [activeHistoryTab, setActiveHistoryTab] = useState("all");

  // Initialize FastBots with Rasa Pro token
  useEffect(() => {
    const loadFastBots = () => {
      const script = document.createElement("script");
      script.src = "https://app.fastbots.ai/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.FastBots) {
          window.FastBots.init({
            rasaProLicenseToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg",
            multilingual: true,
            voiceEnabled: true
          });
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadFastBots();

    // Set up message listener for chat history
    window.addEventListener('message', handleChatMessages);
    
    return () => {
      window.removeEventListener('message', handleChatMessages);
    };
  }, [botId]);

  // Handle messages from FastBots to collect history
  const handleChatMessages = (event: MessageEvent) => {
    // Check if the message is from FastBots and contains chat data
    if (event.data && event.data.type === 'fastbots_message') {
      // Store the message in our history
      const newMessage = {
        text: event.data.message,
        timestamp: new Date().toISOString(),
        sender: event.data.sender || 'user',
        role: event.data.role || 'all' // Default to 'all' if no role specified
      };
      
      // Update history in localStorage for persistence
      const storedHistory = JSON.parse(localStorage.getItem('fastbots_history') || '{"all":[],"farmers":[],"vendors":[],"consumers":[]}');
      
      // Add to appropriate categories
      storedHistory.all.push(newMessage);
      if (newMessage.role === 'farmer') storedHistory.farmers.push(newMessage);
      if (newMessage.role === 'vendor') storedHistory.vendors.push(newMessage);
      if (newMessage.role === 'consumer') storedHistory.consumers.push(newMessage);
      
      // Store back to localStorage
      localStorage.setItem('fastbots_history', JSON.stringify(storedHistory));
      
      // Update state
      setChatHistory(storedHistory);
    }
  };

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('fastbots_history');
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (window.FastBots) {
      if (!isOpen) {
        window.FastBots.open();
      } else {
        window.FastBots.close();
      }
    }
  };

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  return (
    <>
      {/* Chat History Panel */}
      {isHistoryOpen && (
        <div className="fixed right-20 bottom-24 z-50 w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden">
          <Card>
            <CardHeader className="bg-[#215f33] text-white py-2 px-4 flex flex-row justify-between items-center">
              <CardTitle className="text-lg">Conversation History</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleHistory}
                className="h-8 w-8 text-white hover:bg-[#184426] hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" value={activeHistoryTab} onValueChange={setActiveHistoryTab}>
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="farmers">Farmers</TabsTrigger>
                  <TabsTrigger value="vendors">Vendors</TabsTrigger>
                  <TabsTrigger value="consumers">Consumers</TabsTrigger>
                </TabsList>
                
                {Object.keys(chatHistory).map((category) => (
                  <TabsContent key={category} value={category} className="p-0 max-h-96 overflow-y-auto">
                    {chatHistory[category].length > 0 ? (
                      <div className="p-4 space-y-3">
                        {chatHistory[category].map((msg, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg ${
                              msg.sender === 'user' 
                                ? 'bg-gray-100 ml-4 mr-1' 
                                : 'bg-[#E9F7E2] ml-1 mr-4'
                            }`}
                          >
                            <div className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleString()}
                            </div>
                            <div className="mt-1">
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        No conversation history yet.
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat control buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-2">
        <Button
          onClick={toggleHistory}
          size="icon"
          className="rounded-full bg-white text-[#215f33] border border-[#215f33] shadow-md hover:bg-gray-100"
        >
          <ClipboardList className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full bg-[#215f33] hover:bg-[#184426] shadow-md"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Preload the bot */}
      <div id={`fastbots-${botId}`} style={{ display: "none" }} />
    </>
  );
};

export default FastBotsChat;
