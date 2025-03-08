
import { useEffect, useState } from "react";
import ScriptLoader from "./ui/script-loader";

interface FastBotsChatProps {
  botId: string;
}

const FastBotsChat = ({ botId }: FastBotsChatProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Store the preference
    localStorage.setItem('preferredChatbot', 'fastBots');
    
    // When the component unmounts, close the chatbot if it's open
    return () => {
      if (window.FastBots && isVisible) {
        window.FastBots.close();
      }
    };
  }, [isVisible]);

  const handleScriptLoad = () => {
    console.info("FastBots script loaded successfully");
    setIsScriptLoaded(true);
    
    // Make sure the FastBots object is available
    if (window.FastBots) {
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

  return (
    <>
      <ScriptLoader 
        src="https://app.fastbots.ai/embed.js" 
        attributes={{ "data-bot-id": botId }}
        onLoad={handleScriptLoad}
      />
    </>
  );
};

export default FastBotsChat;
