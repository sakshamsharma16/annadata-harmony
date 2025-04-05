
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, ChevronDown, Languages, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { sendMessageToGemini } from "@/services/geminiService";
import { getCacheItem, setCacheItem } from "@/utils/cacheUtils";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Supported languages for the chatbot
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

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Initial greeting message
  useEffect(() => {
    const initialMessage = {
      type: 'bot' as const,
      content: "Hello! I'm Annadata AI Assistant. How can I help you with farming, produce, or connecting with vendors today?",
      timestamp: new Date()
    };
    
    // Load saved chat history and language preference
    const savedMessages = getCacheItem('annadata-gemini-messages');
    const savedLanguage = getCacheItem('annadata-gemini-language');
    
    if (savedMessages && Array.isArray(savedMessages)) {
      setMessages(savedMessages);
    } else {
      setMessages([initialMessage]);
    }
    
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
    // Save messages to cache
    if (messages.length > 0) {
      setCacheItem('annadata-gemini-messages', messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setCacheItem('annadata-gemini-language', langCode);
    setIsLanguageMenuOpen(false);
    
    // Add a system message about language change
    const langMessage: Message = {
      type: 'bot',
      content: `Language changed to ${languages.find(l => l.code === langCode)?.name}.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, langMessage]);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      // Create a language context for the AI
      const langContext = selectedLanguage !== 'en' 
        ? `Please respond in ${languages.find(l => l.code === selectedLanguage)?.name}. ` 
        : '';
      
      // Send message to Gemini API
      const response = await sendMessageToGemini(langContext + message.trim());
      
      if (response.error) {
        toast({
          title: "Error",
          description: "Failed to connect to Gemini AI. Please check your API key.",
          variant: "destructive"
        });
      }
      
      // Add AI response
      const botMessage: Message = {
        type: 'bot',
        content: response.text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const initialMessage = {
      type: 'bot' as const,
      content: "Chat history cleared. How can I help you today?",
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    setCacheItem('annadata-gemini-messages', [initialMessage]);
  };

  return (
    <>
      {/* Chat Trigger Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-[#138808] text-white rounded-full p-4 shadow-lg hover:bg-[#0d6b06] transition-all duration-300 z-50 flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl transition-all duration-300 z-50 overflow-hidden border border-gray-200",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#138808] text-white p-3 flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium">Annadata AI Assistant</span>
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
                  <Languages className="h-4 w-4" aria-hidden="true" />
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
            
            {/* Close Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-[#0d6b06]"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Chat Body */}
        <Tabs defaultValue="chat" className="h-[400px]">
          <TabsList className="w-full grid grid-cols-2 bg-gray-100">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="h-[calc(100%-40px)] flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      msg.type === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 relative",
                        msg.type === 'user'
                          ? "bg-blue-100 text-gray-800"
                          : "bg-[#138808] text-white"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <div
                        className={cn(
                          "absolute w-3 h-3 transform rotate-45",
                          msg.type === 'user'
                            ? "right-[-5px] bottom-2 bg-blue-100"
                            : "left-[-5px] bottom-2 bg-[#138808]"
                        )}
                      ></div>
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {isLoading && (
                <div className="flex justify-center my-2">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-[#138808]" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="border-t p-3">
              <div className="flex items-center">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none mr-2 focus:ring-[#138808]"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="bg-[#138808] hover:bg-[#0d6b06] h-10"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="h-[calc(100%-40px)] p-4 overflow-y-auto">
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">About Annadata AI Assistant</h3>
                  <p className="text-sm text-gray-600">
                    I'm powered by Google's Gemini AI and designed to help with agricultural queries, market information, and connecting farmers with consumers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">How to Use</h3>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Ask about crop information and management</li>
                    <li>• Inquire about market prices and trends</li>
                    <li>• Get guidance on connecting with vendors</li>
                    <li>• Learn about sustainable farming practices</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={clearChat}
              >
                Clear Chat History
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default GeminiChat;
