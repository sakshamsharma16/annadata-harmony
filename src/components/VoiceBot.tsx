import React, { useState, useRef, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// ElevenLabs voices for different languages
const VOICES = {
  english: {
    id: 'EXAVITQu4vr4xnSDxMaL', // Sarah
    name: 'Sarah (English)'
  },
  hindi: {
    id: '9BWtsMINqrJLrRacOk9x', // Aria (supports multilingual)
    name: 'Aria (Hindi/Multilingual)'
  }
};

// Language models for speech recognition
const STT_MODELS = {
  english: 'onnx-community/whisper-tiny.en',
  hindi: 'onnx-community/whisper-small' // Supports multilingual including Hindi
};

export const VoiceBot: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi'>('english');
  const [text, setText] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sttPipelineRef = useRef<any>(null);

  // Initialize speech-to-text pipeline
  const initializeSTT = useCallback(async () => {
    if (!sttPipelineRef.current) {
      try {
        toast.info('Loading speech recognition model...');
        sttPipelineRef.current = await pipeline(
          'automatic-speech-recognition',
          STT_MODELS[selectedLanguage],
          { device: 'webgpu' }
        );
        toast.success('Speech recognition ready!');
      } catch (error) {
        console.error('Error initializing STT:', error);
        toast.error('Failed to load speech recognition');
      }
    }
  }, [selectedLanguage]);

  // Text-to-Speech using ElevenLabs
  const textToSpeech = async (textToSpeak: string) => {
    if (!textToSpeak.trim()) return;

    setIsSpeaking(true);
    setIsProcessing(true);

    try {
      const response = await fetch('/functions/v1/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSpeak,
          voice_id: VOICES[selectedLanguage].id,
          model_id: 'eleven_multilingual_v2'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
          setAudioUrl(null);
        }
      };

      await audio.play();
      toast.success('Playing speech...');
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      toast.error('Failed to generate speech. Please check your ElevenLabs API key.');
      setIsSpeaking(false);
    } finally {
      setIsProcessing(false);
    }
  };

  // Speech-to-Text using Hugging Face
  const speechToText = async (audioBlob: Blob) => {
    if (!sttPipelineRef.current) {
      await initializeSTT();
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const result = await sttPipelineRef.current(arrayBuffer);
      const transcribedText = result.text || '';
      
      setTranscript(transcribedText);
      setText(transcribedText);
      toast.success('Speech transcribed successfully!');
      
      return transcribedText;
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      toast.error('Failed to transcribe speech');
      return '';
    } finally {
      setIsProcessing(false);
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await speechToText(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
      toast.info('Recording started... Speak now!');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to access microphone');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      toast.info('Recording stopped. Processing...');
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    }
  };

  // Handle language change
  const handleLanguageChange = (language: 'english' | 'hindi') => {
    setSelectedLanguage(language);
    sttPipelineRef.current = null; // Reset STT pipeline for new language
    setText('');
    setTranscript('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Bot className="h-6 w-6 text-primary" />
            AI Voice Assistant
          </CardTitle>
          <p className="text-muted-foreground">
            Speak in Hindi or English, and I'll help you with market information
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Language:</label>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">🇬🇧 English</SelectItem>
                <SelectItem value="hindi">🇮🇳 हिंदी (Hindi)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Voice Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={isListening ? stopRecording : startRecording}
              disabled={isProcessing || isSpeaking}
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className="flex items-center gap-2"
            >
              {isListening ? (
                <>
                  <MicOff className="h-5 w-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Start Recording
                </>
              )}
            </Button>

            <Button
              onClick={isSpeaking ? stopSpeaking : () => textToSpeech(text)}
              disabled={isProcessing || !text.trim() || isListening}
              variant={isSpeaking ? "destructive" : "secondary"}
              size="lg"
              className="flex items-center gap-2"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="h-5 w-5" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" />
                  Speak Text
                </>
              )}
            </Button>
          </div>

          {/* Status Indicators */}
          <AnimatePresence>
            {(isListening || isSpeaking || isProcessing) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20"
              >
                {isListening && (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Mic className="h-5 w-5 animate-pulse" />
                    <span>Listening...</span>
                  </div>
                )}
                {isSpeaking && (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Volume2 className="h-5 w-5 animate-pulse" />
                    <span>Speaking...</span>
                  </div>
                )}
                {isProcessing && (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <MessageCircle className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Text to speak or transcribed speech:
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                selectedLanguage === 'hindi'
                  ? "यहाँ टेक्स्ट लिखें या बोलें..."
                  : "Type text here or speak..."
              }
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Transcript Display */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium">Last Transcript:</label>
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="text-sm">{transcript}</p>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Market Queries:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedLanguage === 'hindi' ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("आज के गेहूं के भाव क्या हैं?")}
                  >
                    गेहूं के भाव
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("बासमती धान की कीमत बताएं")}
                  >
                    बासमती की कीमत
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("What are today's wheat prices?")}
                  >
                    Wheat Prices
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("Tell me basmati rice rates")}
                  >
                    Basmati Rates
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};