
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import ScriptLoader from '@/components/ui/script-loader';

interface FastBotsChatProps {
  botId: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonSize?: 'sm' | 'md' | 'lg';
}

const FastBotsChat = ({ 
  botId = 'cm4bojr9l0j5zsvbm6faemmyn',
  position = 'bottom-right',
  buttonSize = 'lg' 
}: FastBotsChatProps) => {
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // If script fails to load after 5 seconds, show fallback
    const timeout = setTimeout(() => {
      if (!loaded) {
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loaded]);

  const handleScriptLoad = () => {
    setLoaded(true);
    setShowFallback(false);
    console.log('FastBots script loaded successfully');
  };

  const handleScriptError = () => {
    setScriptError(true);
    setShowFallback(true);
    console.error('Failed to load FastBots script');
  };

  const positionClass = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }[position];

  const sizeClass = {
    'sm': 'h-10 w-10',
    'md': 'h-12 w-12',
    'lg': 'h-14 w-14'
  }[buttonSize];

  return (
    <>
      <ScriptLoader 
        src="https://app.fastbots.ai/embed.js" 
        attributes={{ 'data-bot-id': botId, 'defer': 'true' }}
        onLoad={handleScriptLoad} 
      />
      
      {showFallback && (
        <div className={`fixed ${positionClass} z-50`}>
          <Button 
            size="icon" 
            className={`${sizeClass} rounded-full shadow-lg bg-[#138808] hover:bg-[#138808]/90 transition-transform duration-300 hover:scale-105`}
            onClick={() => {
              if (scriptError) {
                window.open(`https://app.fastbots.ai/bot/${botId}`, '_blank');
              } else {
                // Try to trigger the FastBots chat if it exists but is hidden
                if (window.FastBots) {
                  window.FastBots.open();
                }
              }
            }}
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        </div>
      )}
    </>
  );
};

export default FastBotsChat;
