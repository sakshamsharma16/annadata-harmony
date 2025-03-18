
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
import { Mic, Send, Bot, User, Loader2, ClipboardList, X, Globe, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCacheItem, setCacheItem } from "@/utils/cacheUtils";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  category?: "farmers" | "vendors" | "consumers" | "all";
};

const KrishiMitra = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryTab, setActiveHistoryTab] = useState("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize history from cache
  useEffect(() => {
    const cachedMessages = getCacheItem("krishiMitra-history");
    if (cachedMessages) {
      setMessages(cachedMessages);
    }
  }, []);

  // Save messages to cache when they change
  useEffect(() => {
    if (messages.length > 0) {
      setCacheItem("krishiMitra-history", messages, 1440); // Cache for 24 hours
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Get initial greeting based on selected language
  const getInitialGreeting = () => {
    switch(language) {
      case 'hindi':
        return "नमस्ते! मैं कृषि मित्र हूँ। मैं आपकी कृषि संबंधित प्रश्नों में मदद कर सकता हूँ। आप मुझसे व्यक्तिगत या तकनीकी प्रश्न भी पूछ सकते हैं!";
      case 'punjabi':
        return "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੇ ਖੇਤੀਬਾੜੀ ਨਾਲ ਸਬੰਧਤ ਸਵਾਲਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਮੈਨੂੰ ਨਿੱਜੀ ਜਾਂ ਤਕਨੀਕੀ ਸਵਾਲ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ!";
      default:
        return "Hello! I am Krishi Mitra. I can help with your agriculture-related questions as well as personal or technical questions. Feel free to ask me anything!";
    }
  };

  // Initial greeting message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = {
        role: "assistant" as const, 
        content: getInitialGreeting(),
        timestamp: new Date().toISOString(),
        category: "all" as const
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length, language]);

  // Categorize message based on content
  const categorizeMessage = (content: string): "farmers" | "vendors" | "consumers" | "all" => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("farm") || lowerContent.includes("crop") || lowerContent.includes("harvest") || 
        lowerContent.includes("खेती") || lowerContent.includes("फसल") || 
        lowerContent.includes("ਖੇਤੀ") || lowerContent.includes("ਫਸਲ")) {
      return "farmers";
    } else if (lowerContent.includes("sell") || lowerContent.includes("market") || lowerContent.includes("price") || 
               lowerContent.includes("बेचना") || lowerContent.includes("बाजार") || lowerContent.includes("मूल्य") || 
               lowerContent.includes("ਵੇਚਣਾ") || lowerContent.includes("ਬਾਜ਼ਾਰ") || lowerContent.includes("ਮੁੱਲ")) {
      return "vendors";
    } else if (lowerContent.includes("buy") || lowerContent.includes("purchase") || lowerContent.includes("order") || 
               lowerContent.includes("खरीदना") || lowerContent.includes("ऑर्डर") || 
               lowerContent.includes("ਖਰੀਦਣਾ") || lowerContent.includes("ਆਰਡਰ")) {
      return "consumers";
    }
    
    return "all";
  };

  // Enhanced AI response function with better natural language understanding
  const getAIResponse = async (userMessage: string): Promise<string> => {
    const msg = userMessage.toLowerCase();
    
    // Check if it's a personal question
    const personalQuestionPatterns = [
      'who are you', 'your name', 'about yourself', 'tell me about you', 
      'how are you', 'what can you do', 'help me with', 'आप कौन हैं', 
      'तुम्हारा नाम', 'अपने बारे में', 'कैसे हो', 'ਤੁਸੀਂ ਕੌਣ ਹੋ', 'ਤੁਹਾਡਾ ਨਾਮ',
      'what is your purpose', 'what do you do', 'who made you', 'how do you work',
      'where are you from', 'are you ai', 'are you human'
    ];
    
    // Check if it's a technical question
    const technicalQuestionPatterns = [
      'how to', 'explain', 'what is', 'definition', 'technology', 'coding', 
      'software', 'hardware', 'computer', 'machine learning', 'ai', 'artificial intelligence',
      'कैसे', 'समझाएं', 'क्या है', 'परिभाषा', 'प्रौद्योगिकी', 'कोडिंग',
      'ਕਿਵੇਂ', 'ਸਮਝਾਓ', 'ਕੀ ਹੈ', 'ਪਰਿਭਾਸ਼ਾ', 'ਤਕਨਾਲੋਜੀ'
    ];

    // Different responses based on language and message type
    const getLocalizedResponses = () => {
      if (language === 'hindi') {
        // Check if it's a personal question
        if (personalQuestionPatterns.some(pattern => msg.includes(pattern))) {
          return [
            "मैं कृषि मित्र हूँ, एक AI सहायक जो किसानों और कृषि से जुड़े लोगों की सहायता के लिए बनाया गया है। मैं फसलों, कीट प्रबंधन, मौसम के पूर्वानुमान, और कृषि संबंधित अन्य जानकारी प्रदान कर सकता हूँ।",
            "मेरा नाम कृषि मित्र है। मैं ANNADATA ऐप का हिस्सा हूँ, जिसे किसानों और कृषि समुदाय की सहायता के लिए डिज़ाइन किया गया है। मैं आपकी कैसे मदद कर सकता हूँ?",
            "मुझे आपकी सहायता करके बहुत खुशी हो रही है! मैं कृषि से संबंधित सवालों के जवाब देने के लिए यहां हूँ, लेकिन मैं अन्य विषयों पर भी बात कर सकता हूँ।"
          ];
        }
        // Check if it's a technical question
        else if (technicalQuestionPatterns.some(pattern => msg.includes(pattern))) {
          return [
            "अरहर की दाल (पिजन पी) की खेती के लिए, मिट्टी का pH मान 6.5-7.5 के बीच होना चाहिए। बुवाई से पहले गहरी जुताई करें और हेक्टेयर प्रति 20-25 किलो नाइट्रोजन तथा 40-50 किलो फॉस्फोरस का प्रयोग करें। बुवाई के लिए जून-जुलाई का समय उत्तम होता है।",
            "स्मार्ट कृषि में IoT सेंसर का उपयोग करके मिट्टी की नमी, तापमान, और पोषक तत्वों की निगरानी की जाती है। ये सेंसर डेटा एकत्र करके किसानों के स्मार्टफोन पर भेजते हैं, जिससे वे अपनी फसलों की स्थिति का वास्तविक समय में विश्लेषण कर सकते हैं और सही समय पर सही निर्णय ले सकते हैं।",
            "अगर आप जैविक खेती के बारे में पूछ रहे हैं, तो इसमें रासायनिक उर्वरकों और कीटनाशकों का उपयोग नहीं किया जाता। इसके बजाय, जैविक खादों, हरी खाद, और जैविक कीट नियंत्रण विधियों का उपयोग किया जाता है। जैविक खेती से मिट्टी का स्वास्थ्य सुधरता है और पर्यावरण पर नकारात्मक प्रभाव कम होता है।"
          ];
        }
        // Default agricultural responses
        return [
          "हमारी मौसम की भविष्यवाणी के अनुसार, अगले 5 दिनों में आपके क्षेत्र में हल्की से मध्यम बारिश होने की संभावना है। फसल की कटाई के लिए इस सप्ताह का समय बेहतर होगा।",
          "धान की फसल के लिए, हमारा सुझाव है कि आप NPK 18:18:18 उर्वरक का उपयोग करें, जिसमें नाइट्रोजन, फॉस्फोरस और पोटाश का संतुलित अनुपात हो। मिट्टी परीक्षण के आधार पर प्रति एकड़ 100-120 किलोग्राम की दर से प्रयोग करें।",
          "आपके क्षेत्र में गेहूं की बुवाई के लिए अक्टूबर के मध्य से नवंबर के शुरुआती सप्ताह तक का समय सबसे उपयुक्त है। HD-2967 या PBW-343 जैसी उन्नत किस्मों का चयन करें जो आपके क्षेत्र के लिए अनुकूलित हैं।"
        ];
      } 
      else if (language === 'punjabi') {
        // Check if it's a personal question
        if (personalQuestionPatterns.some(pattern => msg.includes(pattern))) {
          return [
            "ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹਾਂ, ਇੱਕ AI ਸਹਾਇਕ ਜੋ ਕਿਸਾਨਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਨਾਲ ਜੁੜੇ ਲੋਕਾਂ ਦੀ ਸਹਾਇਤਾ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਮੈਂ ਫਸਲਾਂ, ਕੀਟ ਪ੍ਰਬੰਧਨ, ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ, ਅਤੇ ਖੇਤੀਬਾੜੀ ਨਾਲ ਸਬੰਧਤ ਹੋਰ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦਾ ਹਾਂ।",
            "ਮੇਰਾ ਨਾਮ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹੈ। ਮੈਂ ANNADATA ਐਪ ਦਾ ਹਿੱਸਾ ਹਾਂ, ਜੋ ਕਿਸਾਨਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਭਾਈਚਾਰੇ ਦੀ ਸਹਾਇਤਾ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ ਹੈ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
            "ਮੈਨੂੰ ਤੁਹਾਡੀ ਸਹਾਇਤਾ ਕਰਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋ ਰਹੀ ਹੈ! ਮੈਂ ਖੇਤੀਬਾੜੀ ਨਾਲ ਸਬੰਧਤ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦੇਣ ਲਈ ਇੱਥੇ ਹਾਂ, ਪਰ ਮੈਂ ਹੋਰ ਵਿਸ਼ਿਆਂ 'ਤੇ ਵੀ ਗੱਲ ਕਰ ਸਕਦਾ ਹਾਂ।"
          ];
        } 
        // Check if it's a technical question
        else if (technicalQuestionPatterns.some(pattern => msg.includes(pattern))) {
          return [
            "ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਦੀ ਨਿਗਰਾਨੀ ਲਈ, IoT ਸੈਂਸਰਜ਼ ਦਾ ਇਸਤੇਮਾਲ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ ਜੋ ਪਾਣੀ ਦੇ ਪੱਧਰ ਅਤੇ ਗੁਣਵੱਤਾ ਦੀ ਰੀਅਲ-ਟਾਈਮ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ। ਇਹ ਡਾਟਾ ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੰਚਾਈ ਦੀਆਂ ਯੋਜਨਾਵਾਂ ਬਣਾਉਣ ਅਤੇ ਪਾਣੀ ਦੀ ਵਰਤੋਂ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
            "ਜੈਵਿਕ ਖੇਤੀ ਵਿੱਚ, ਤੁਸੀਂ ਵਰਮੀਕੰਪੋਸਟ ਬਣਾ ਸਕਦੇ ਹੋ ਜੋ ਗੋਬਰ, ਫਸਲ ਦੇ ਅਵਸ਼ੇਸ਼, ਅਤੇ ਕੇਂਚੁਆਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਤਿਆਰ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਇਹ ਮਿੱਟੀ ਨੂੰ ਜੈਵਿਕ ਪਦਾਰਥ ਅਤੇ ਪੌਸ਼ਟਿਕ ਤੱਤ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਵਿੱਚ ਸੁਧਾਰ ਹੁੰਦਾ ਹੈ ਅਤੇ ਫਸਲ ਦੀ ਪੈਦਾਵਾਰ ਵਧਦੀ ਹੈ।",
            "ਪ੍ਰੀਸੀਜ਼ਨ ਐਗਰੀਕਲਚਰ ਵਿੱਚ ਡਰੋਨ ਟੈਕਨੋਲੋਜੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ, ਤੁਸੀਂ ਆਪਣੇ ਖੇਤਾਂ ਦੀ ਹਵਾਈ ਨਿਗਰਾਨੀ ਕਰ ਸਕਦੇ ਹੋ। ਡਰੋਨ ਮਲਟੀਸਪੈਕਟਰਲ ਕੈਮਰਿਆਂ ਨਾਲ ਲੈਸ ਹੋ ਸਕਦੇ ਹਨ ਜੋ ਫਸਲ ਦੇ ਤਣਾਅ, ਕੀੜੇ ਦੇ ਹਮਲੇ, ਅਤੇ ਪੌਸ਼ਟਿਕ ਤੱਤਾਂ ਦੀ ਕਮੀ ਦਾ ਪਤਾ ਲਗਾਉਣ ਲਈ NDVI (ਨਾਰਮਲਾਈਜ਼ਡ ਡਿਫਰੈਂਸ ਵੈਜੀਟੇਸ਼ਨ ਇੰਡੈਕਸ) ਮੈਪ ਤਿਆਰ ਕਰਦੇ ਹਨ।"
          ];
        }
        // Default agricultural responses
        return [
          "ਸਾਡੀ ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ ਦੇ ਅਨੁਸਾਰ, ਅਗਲੇ 5 ਦਿਨਾਂ ਵਿੱਚ ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਹਲਕੀ ਤੋਂ ਦਰਮਿਆਨੀ ਬਾਰਸ਼ ਹੋਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਫਸਲ ਦੀ ਕਟਾਈ ਲਈ ਇਸ ਹਫਤੇ ਦਾ ਸਮਾਂ ਬਿਹਤਰ ਹੋਵੇਗਾ।",
          "ਝੋਨੇ ਦੀ ਫਸਲ ਲਈ, ਸਾਡੀ ਸਲਾਹ ਹੈ ਕਿ ਤੁਸੀਂ NPK 18:18:18 ਖਾਦ ਦੀ ਵਰਤੋਂ ਕਰੋ, ਜਿਸ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ, ਫਾਸਫੋਰਸ ਅਤੇ ਪੋਟਾਸ਼ ਦਾ ਸੰਤੁਲਿਤ ਅਨੁਪਾਤ ਹੈ। ਮਿੱਟੀ ਦੇ ਟੈਸਟ ਦੇ ਆਧਾਰ 'ਤੇ ਪ੍ਰਤੀ ਏਕੜ 100-120 ਕਿਲੋਗ੍ਰਾਮ ਦੀ ਦਰ ਨਾਲ ਵਰਤੋਂ ਕਰੋ।",
          "ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਕਣਕ ਦੀ ਬਿਜਾਈ ਲਈ ਅਕਤੂਬਰ ਦੇ ਮੱਧ ਤੋਂ ਨਵੰਬਰ ਦੇ ਸ਼ੁਰੂਆਤੀ ਹਫ਼ਤੇ ਤੱਕ ਦਾ ਸਮਾਂ ਸਭ ਤੋਂ ਢੁਕਵਾਂ ਹੈ। HD-2967 ਜਾਂ PBW-343 ਵਰਗੀਆਂ ਉੱਨਤ ਕਿਸਮਾਂ ਦੀ ਚੋਣ ਕਰੋ ਜੋ ਤੁਹਾਡੇ ਖੇਤਰ ਲਈ ਅਨੁਕੂਲ ਹਨ।"
        ];
      } 
      else {
        // English responses
        // Check if it's a personal question
        if (personalQuestionPatterns.some(pattern => msg.includes(pattern))) {
          return [
            "I am Krishi Mitra, an AI assistant designed to help farmers and people involved in agriculture. I can provide information about crops, pest management, weather forecasts, and other agriculture-related knowledge.",
            "My name is Krishi Mitra. I'm part of the ANNADATA app, designed to assist farmers and the agricultural community. How can I help you today?",
            "I'm delighted to assist you! I'm here to answer agriculture-related questions, but I can also chat about other topics. What would you like to know?"
          ];
        } 
        // Check if it's a technical question
        else if (technicalQuestionPatterns.some(pattern => msg.includes(pattern))) {
          return [
            "For monitoring soil health, you can use advanced soil sensors that measure key parameters like NPK (Nitrogen, Phosphorus, Potassium) levels, pH, moisture content, and organic matter. These sensors can connect to smartphones via Bluetooth and provide real-time analytics to help you make informed decisions about fertilization and irrigation.",
            "Vertical farming is an innovative agricultural technique where crops are grown in stacked layers, often in controlled environments like warehouses or shipping containers. It uses hydroponics or aeroponics systems, LED lighting, and precise climate control to maximize yield while minimizing land and water usage. This method can produce up to 350 times more crops per acre than conventional farming.",
            "Precision agriculture leverages technologies like GPS, remote sensing, and IoT to optimize field-level management. By using soil mapping and variable rate technology (VRT), farmers can apply the right amount of inputs (water, fertilizers, pesticides) at the right place and time. This approach typically reduces input costs by 15-20% while increasing yields by 10-15%."
          ];
        }
        // Default agricultural responses
        return [
          "Based on our advanced weather forecasting models, there's a 70% chance of light to moderate rainfall in your region over the next 5 days. Our satellite imagery shows an approaching weather system. This week would be optimal for harvesting your crops before the rain arrives.",
          "For rice cultivation, our soil analysis tools recommend using NPK 18:18:18 fertilizer with a balanced ratio of nitrogen, phosphorus, and potassium. Apply at a rate of 100-120 kg per acre based on your soil test results for optimal nutrient delivery and maximum yield potential.",
          "The ideal sowing time for wheat in your region, considering this year's climate patterns, is from mid-October to early November. Select advanced varieties like HD-2967 or PBW-343 that are adapted to your local conditions and have shown 15-20% higher yields in regional trials. Ensure seed treatment with fungicides for protection against soil-borne diseases."
        ];
      }
    };

    const responses = getLocalizedResponses();
    const randomIndex = Math.floor(Math.random() * responses.length);
    
    // Simulate more complex processing
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    return responses[randomIndex];
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isProcessing) return;

    // Add user message
    const category = categorizeMessage(input);
    const userMessage = { 
      role: "user" as const, 
      content: input,
      timestamp: new Date().toISOString(),
      category
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsProcessing(true);

    try {
      // Get AI response from our enhanced function
      const aiResponse = await getAIResponse(input);
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: aiResponse,
          timestamp: new Date().toISOString(),
          category 
        }
      ]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t("error"),
        description: t("message.send.error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
      // Focus input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  const getFilteredMessages = (category: string) => {
    if (category === "all") {
      return messages;
    }
    return messages.filter(msg => msg.category === category);
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: t("not.supported"),
        description: t("voice.recognition.not.supported"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("listening"),
      description: t("speak.now"),
    });
    
    // This is just a placeholder - in a real app you would implement the SpeechRecognition API
    setTimeout(() => {
      toast({
        title: t("sorry"),
        description: t("speech.recognition.configuration"),
      });
    }, 3000);
  };

  // Get title and description in the correct language
  const getBotTitle = () => {
    return t("krishi.mitra");
  };
  
  const getBotDescription = () => {
    return t("your.agricultural.assistant");
  };

  const getPlaceholder = () => {
    return t("type.your.message");
  };

  // Get chat history title based on language
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
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat History Panel */}
      {isHistoryOpen && (
        <div className="fixed left-20 bottom-24 z-50 w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <Card>
            <CardHeader className="bg-[#138808] text-white py-2 px-4 flex flex-row justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <ClipboardList className="h-4 w-4 mr-2" />
                {getChatTitle()}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleHistory}
                className="h-8 w-8 text-white hover:bg-[#0c5d04] hover:text-white"
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
                
                <TabsContent value="all" className="p-0 max-h-96 overflow-y-auto">
                  {messages.length > 0 ? (
                    <div className="p-4 space-y-3">
                      {messages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`p-3 rounded-lg ${
                            msg.role === 'user' 
                              ? 'bg-gray-100 ml-4 mr-1' 
                              : 'bg-[#E9F7E2] ml-1 mr-4'
                          }`}
                        >
                          <div className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleString()}
                          </div>
                          <div className="mt-1 flex gap-2">
                            {msg.role === 'assistant' && (
                              <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                            )}
                            <span>{msg.content}</span>
                            {msg.role === 'user' && (
                              <User className="h-4 w-4 mt-1 flex-shrink-0" />
                            )}
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

                {["farmers", "vendors", "consumers"].map((category) => (
                  <TabsContent key={category} value={category} className="p-0 max-h-96 overflow-y-auto">
                    {getFilteredMessages(category).length > 0 ? (
                      <div className="p-4 space-y-3">
                        {getFilteredMessages(category).map((msg, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg ${
                              msg.role === 'user' 
                                ? 'bg-gray-100 ml-4 mr-1' 
                                : 'bg-[#E9F7E2] ml-1 mr-4'
                            }`}
                          >
                            <div className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleString()}
                            </div>
                            <div className="mt-1 flex gap-2">
                              {msg.role === 'assistant' && (
                                <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                              )}
                              <span>{msg.content}</span>
                              {msg.role === 'user' && (
                                <User className="h-4 w-4 mt-1 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        No {category}-related conversations yet.
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col items-start space-y-2">
          <Button
            onClick={toggleHistory}
            size="icon"
            className="rounded-full bg-white text-[#138808] border border-[#138808] shadow-md hover:bg-gray-100 transition-transform duration-200 hover:scale-105"
          >
            <ClipboardList className="h-5 w-5" />
          </Button>
          
          <SheetTrigger asChild>
            <div className="relative">
              <Button 
                size="icon" 
                className="h-14 w-14 rounded-full shadow-lg bg-[#138808] hover:bg-[#138808]/90 transition-transform duration-300 hover:scale-105"
              >
                <Bot className="h-6 w-6 text-white" />
              </Button>
              
              {/* Multilingual badge */}
              <span className="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#138808]">
                <Globe className="h-4 w-4 text-[#138808]" />
              </span>
              
              {/* "Your Personal Assistant" floating label */}
              <div className="absolute bottom-full mb-2 left-0 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-[#138808] whitespace-nowrap border border-[#138808]">
                Your Personal Assistant
              </div>
            </div>
          </SheetTrigger>
        </div>

        <SheetContent 
          className="sm:max-w-md md:max-w-lg w-[90vw] bg-white border-l-4 border-[#138808]" 
          side="left"
        >
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center gap-2 text-[#138808]">
              <Bot className="h-5 w-5" />
              {getBotTitle()}
              <div className="flex items-center bg-[#E9F7E2] rounded-full px-2 py-0.5 text-xs font-medium text-[#138808] ml-2">
                <Globe className="h-3 w-3 mr-1" />
                Multilingual
              </div>
            </SheetTitle>
            <SheetDescription>
              {getBotDescription()}
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
                      } shadow-sm animate-fade-in`}
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
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 shadow-sm animate-pulse">
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
                disabled={isProcessing}
                className="rounded-full hover:bg-gray-100"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1 rounded-full border-gray-300 focus:border-[#138808] focus:ring-[#138808] transition-colors"
                disabled={isProcessing}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isProcessing}
                className="bg-[#138808] hover:bg-[#138808]/90 rounded-full transition-transform duration-200 hover:scale-105"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default KrishiMitra;
