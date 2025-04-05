
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, MessageCircle, X, Globe, Bot, Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScriptLoader from "@/components/ui/script-loader";
import { useLanguage } from "@/contexts/LanguageContext";

interface FastBotsChatProps {
  botId?: string;
}

const FastBotsChat = ({ botId = "cm4bojr9l0j5zsvbm6faemmyn" }: FastBotsChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{[key: string]: any[]}>({
    all: [],
    farmers: [],
    vendors: [],
    consumers: []
  });
  const [activeHistoryTab, setActiveHistoryTab] = useState("all");
  const { language, t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('message', handleChatMessages);
    
    return () => {
      window.removeEventListener('message', handleChatMessages);
    };
  }, [botId]);

  const handleScriptLoad = () => {
    setIsLoaded(true);
    if (window.FastBots) {
      window.FastBots.init({
        botId: botId,
        rasaProLicenseToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg",
        multilingual: true,
        voiceEnabled: true,
        theme: {
          primaryColor: "#215f33",
          secondaryColor: "#e9f7e2",
          chatWindowBackground: "#ffffff",
          userMessageBackground: "#215f33",
          userMessageTextColor: "#ffffff",
          botMessageBackground: "#e9f7e2",
          botMessageTextColor: "#333333",
          fontFamily: "Inter, system-ui, sans-serif",
          headerBackground: "#215f33",
          headerTextColor: "#ffffff"
        }
      });
      
      if (isOpen) {
        window.FastBots.open();
      }
    }
  };

  const handleChatMessages = (event: MessageEvent) => {
    if (event.data && event.data.type === 'fastbots_message') {
      const newMessage = {
        text: event.data.message,
        timestamp: new Date().toISOString(),
        sender: event.data.sender || 'user',
        role: event.data.role || 'all'
      };
      
      const storedHistory = JSON.parse(localStorage.getItem('fastbots_history') || '{"all":[],"farmers":[],"vendors":[],"consumers":[]}');
      
      storedHistory.all.push(newMessage);
      if (newMessage.role === 'farmer') storedHistory.farmers.push(newMessage);
      if (newMessage.role === 'vendor') storedHistory.vendors.push(newMessage);
      if (newMessage.role === 'consumer') storedHistory.consumers.push(newMessage);
      
      localStorage.setItem('fastbots_history', JSON.stringify(storedHistory));
      
      setChatHistory(storedHistory);
    }
  };

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

  const getChatTitle = () => {
    switch (language) {
      case 'hindi':
        return "संवाद इतिहास";
      case 'punjabi':
        return "ਗੱਲਬਾਤ ਇਤਿਹਾਸ";
      default:
        return "Conversation History";
    }
  };

  return (
    <>
      <ScriptLoader 
        src="https://app.fastbots.ai/embed.js" 
        attributes={{ "data-bot-id": botId }}
        onLoad={handleScriptLoad}
      />

      {isHistoryOpen && (
        <div className="fixed right-20 bottom-24 z-50 w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <Card>
            <CardHeader className="bg-[#215f33] text-white py-2 px-4 flex flex-row justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <ClipboardList className="h-4 w-4 mr-2" aria-hidden="true" />
                {getChatTitle()}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleHistory}
                className="h-8 w-8 text-white hover:bg-[#184426] hover:text-white"
                aria-label="Close conversation history"
              >
                <X className="h-4 w-4" aria-hidden="true" />
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

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-2">
        <Button
          onClick={toggleHistory}
          size="icon"
          className="rounded-full bg-white text-[#215f33] border border-[#215f33] shadow-md hover:bg-gray-100 transition-transform duration-200 hover:scale-105"
          aria-label="View conversation history"
        >
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
        </Button>
        
        <div className="relative">
          <Button
            onClick={toggleChat}
            size="icon"
            className="rounded-full w-14 h-14 bg-[#215f33] hover:bg-[#184426] shadow-md transition-transform duration-200 hover:scale-105 relative"
            aria-label="Open chat assistant"
          >
            <Bot className="h-6 w-6 text-white" aria-hidden="true" />
            
            <span className="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#215f33]">
              <Globe className="h-4 w-4 text-[#215f33]" aria-hidden="true" title="Multilingual Support" />
              <span className="sr-only">Multilingual Support</span>
            </span>
          </Button>
          
          <div className="absolute bottom-full mb-2 right-0 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-[#215f33] whitespace-nowrap border border-[#215f33]">
            Your Personal Assistant
          </div>
        </div>
      </div>

      <div id={`fastbots-${botId}`} style={{ display: "none" }} aria-hidden="true" />
    </>
  );
};

export default FastBotsChat;
