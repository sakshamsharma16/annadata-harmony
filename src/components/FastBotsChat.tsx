
import React, { useEffect, useState } from "react";
import { MessageCircle, X, Volume2, VolumeX, Globe, Languages, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCacheItem, setCacheItem } from "@/utils/cacheUtils";

// Supported languages
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
];

interface FastBotsChatProps {
  botId: string;
}

const FastBotsChat: React.FC<FastBotsChatProps> = ({ botId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ type: string; message: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load user preferences from cache
    const cachedMuted = getCacheItem('annadata-chatbot-muted');
    const cachedLanguage = getCacheItem('annadata-chatbot-language');
    
    if (cachedMuted !== null) setIsMuted(cachedMuted);
    if (cachedLanguage) setSelectedLanguage(cachedLanguage);

    // Initialize FastBots with the correct configuration
    if (window.FastBots) {
      window.FastBots.init({
        botId,
        rasaProLicenseToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg",
        multilingual: true,
        voiceEnabled: !isMuted,
        language: selectedLanguage
      });
    }

    // Load FastBots script if not already loaded
    if (!document.getElementById("fastbots-script")) {
      const script = document.createElement("script");
      script.id = "fastbots-script";
      script.defer = true;
      script.src = "https://app.fastbots.ai/embed.js";
      script.setAttribute("data-bot-id", botId);
      document.body.appendChild(script);
    }

    // Get saved chat history
    const savedHistory = getCacheItem('annadata-chat-history');
    if (savedHistory) {
      setChatHistory(savedHistory);
    }

    return () => {
      const script = document.getElementById("fastbots-script");
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [botId, isMuted, selectedLanguage]);

  const toggleChatbot = () => {
    if (isOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
  };

  const openChatbot = () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (window.FastBots) {
      window.FastBots.open();
    }
  };

  const closeChatbot = () => {
    setIsOpen(false);
    if (window.FastBots) {
      window.FastBots.close();
    }
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
    if (window.FastBots) {
      window.FastBots.close();
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    setCacheItem('annadata-chatbot-muted', newMuteState);
    
    // Re-initialize with new mute setting
    if (window.FastBots) {
      window.FastBots.init({
        botId,
        rasaProLicenseToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg",
        multilingual: true,
        voiceEnabled: !newMuteState,
        language: selectedLanguage
      });
    }
  };

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setCacheItem('annadata-chatbot-language', langCode);
    setIsLanguageMenuOpen(false);
    
    // Re-initialize with new language
    if (window.FastBots) {
      window.FastBots.init({
        botId,
        rasaProLicenseToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg",
        multilingual: true,
        voiceEnabled: !isMuted,
        language: langCode
      });
    }
  };

  // Mock function to add message to chat history (for demonstration)
  const sendMessage = () => {
    if (message.trim()) {
      const newHistory = [
        ...chatHistory,
        { type: 'user', message: message }
      ];
      
      setChatHistory(newHistory);
      setCacheItem('annadata-chat-history', newHistory);
      setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const updatedHistory = [
          ...newHistory,
          { type: 'bot', message: `Thank you for your message: "${message}". How can I assist you further?` }
        ];
        setChatHistory(updatedHistory);
        setCacheItem('annadata-chat-history', updatedHistory);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chatbot Trigger Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-[#138808] text-white rounded-full p-4 shadow-lg hover:bg-[#0d6b06] transition-all duration-300 z-50 flex items-center justify-center"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* Chatbot Dialog */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl transition-all duration-300 z-50 overflow-hidden border border-gray-200",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
          isMinimized ? "h-14" : "h-[500px] md:h-[600px]"
        )}
      >
        {/* Header */}
        <div className="bg-[#138808] text-white p-3 flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium">Annadata Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <Popover open={isLanguageMenuOpen} onOpenChange={setIsLanguageMenuOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-[#0d6b06]"
                  aria-label="Select language"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Select Language</h3>
                  <div className="max-h-48 overflow-y-auto">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left",
                          selectedLanguage === lang.code && "bg-gray-100"
                        )}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                        {selectedLanguage === lang.code && (
                          <Check className="ml-auto h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Mute/Unmute Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-[#0d6b06]"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
            
            {/* Minimize/Maximize Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-[#0d6b06]"
              onClick={minimizeChatbot}
              aria-label="Minimize"
            >
              <span className="h-0.5 w-4 bg-white block" aria-hidden="true"></span>
            </Button>
            
            {/* Close Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-[#0d6b06]"
              onClick={closeChatbot}
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Tabs for different chat categories */}
        {!isMinimized && (
          <Tabs defaultValue="chat" className="h-[calc(100%-60px)]">
            <TabsList className="w-full grid grid-cols-3 bg-gray-100">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="h-full flex flex-col">
              {/* FastBots integration would normally go here */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  <div className="bg-[#138808] text-white rounded-lg p-3 ml-6 relative">
                    <p>Hello! I'm your Annadata Assistant. How can I help you today?</p>
                    <div className="absolute left-[-6px] bottom-2 w-3 h-3 bg-[#138808] transform rotate-45"></div>
                  </div>
                  
                  {chatHistory.map((chat, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 rounded-lg relative",
                        chat.type === 'user' 
                          ? "bg-blue-100 mr-6" 
                          : "bg-[#138808] text-white ml-6"
                      )}
                    >
                      <p>{chat.message}</p>
                      <div 
                        className={cn(
                          "absolute w-3 h-3 transform rotate-45",
                          chat.type === 'user'
                            ? "right-[-6px] bottom-2 bg-blue-100"
                            : "left-[-6px] bottom-2 bg-[#138808]"
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat input */}
              <div className="border-t p-3 flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  onClick={sendMessage}
                  className="rounded-l-none bg-[#138808] hover:bg-[#0d6b06]"
                >
                  Send
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="h-full p-4 overflow-y-auto">
              <h3 className="font-medium mb-4">Conversation History</h3>
              {chatHistory.length > 0 ? (
                <div className="space-y-4">
                  {chatHistory.map((chat, index) => (
                    <Card key={index}>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium mb-1">{chat.type === 'user' ? 'You' : 'Assistant'}</p>
                        <p className="text-gray-700">{chat.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No conversation history yet.</p>
              )}
            </TabsContent>
            
            <TabsContent value="faq" className="h-full p-4 overflow-y-auto">
              <h3 className="font-medium mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-3">
                    <p className="font-medium mb-1">How can I list my products?</p>
                    <p className="text-gray-700">Login to your farmer dashboard and navigate to "Manage Products" to list your agricultural products.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <p className="font-medium mb-1">How do I find nearby vendors?</p>
                    <p className="text-gray-700">As a consumer, visit the "Nearby Vendors" section to find vendors in your area using our interactive map.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <p className="font-medium mb-1">What payment methods are accepted?</p>
                    <p className="text-gray-700">We support various payment methods including online payments, UPI, and cash on delivery in some areas.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
};

export default FastBotsChat;
