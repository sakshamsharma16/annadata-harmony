
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available languages
export type Language = 'english' | 'hindi' | 'punjabi';

// Translation key structure
type Translations = {
  [key: string]: {
    english: string;
    hindi: string;
    punjabi: string;
  };
};

// Translation data
const translations: Translations = {
  // Navigation
  'nav.home': {
    english: 'Home',
    hindi: 'होम',
    punjabi: 'ਹੋਮ',
  },
  'nav.products': {
    english: 'Products',
    hindi: 'उत्पाद',
    punjabi: 'ਉਤਪਾਦ',
  },
  'nav.about': {
    english: 'About',
    hindi: 'हमारे बारे में',
    punjabi: 'ਸਾਡੇ ਬਾਰੇ',
  },
  'nav.contact': {
    english: 'Contact',
    hindi: 'संपर्क',
    punjabi: 'ਸੰਪਰਕ',
  },
  'nav.login': {
    english: 'Login',
    hindi: 'लॉगिन',
    punjabi: 'ਲਾਗਇਨ',
  },
  'nav.register': {
    english: 'Register',
    hindi: 'रजिस्टर',
    punjabi: 'ਰਜਿਸਟਰ',
  },
  // Hero Section
  'hero.title': {
    english: 'Empowering Farmers, Enriching Communities',
    hindi: 'किसानों को सशक्त बनाना, समुदायों को समृद्ध बनाना',
    punjabi: 'ਕਿਸਾਨਾਂ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ, ਸਮੁਦਾਇਆਂ ਨੂੰ ਸਮਰਿਧ ਬਣਾਉਣਾ',
  },
  'hero.subtitle': {
    english: 'Connecting farmers, vendors, and consumers in a sustainable ecosystem',
    hindi: 'किसानों, विक्रेताओं और उपभोक्ताओं को एक टिकाऊ पारिस्थितिकी तंत्र में जोड़ना',
    punjabi: 'ਕਿਸਾਨਾਂ, ਵਿਕਰੇਤਾਵਾਂ ਅਤੇ ਉਪਭੋਗਤਾਵਾਂ ਨੂੰ ਇੱਕ ਟਿਕਾਊ ਪਾਰਿਸਥਿਤੀ ਤੰਤਰ ਵਿੱਚ ਜੋੜਨਾ',
  },
  // User Roles
  'roles.title': {
    english: 'Join Our Agricultural Ecosystem',
    hindi: 'हमारे कृषि पारिस्थितिकी तंत्र में शामिल हों',
    punjabi: 'ਸਾਡੇ ਖੇਤੀਬਾੜੀ ਪਾਰਿਸਥਿਤੀ ਤੰਤਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  },
  'roles.farmer': {
    english: 'Farmer',
    hindi: 'किसान',
    punjabi: 'ਕਿਸਾਨ',
  },
  'roles.vendor': {
    english: 'Vendor',
    hindi: 'विक्रेता',
    punjabi: 'ਵਿਕਰੇਤਾ',
  },
  'roles.consumer': {
    english: 'Consumer',
    hindi: 'उपभोक्ता',
    punjabi: 'ਉਪਭੋਗਤਾ',
  },
  // Common
  'language': {
    english: 'Language',
    hindi: 'भाषा',
    punjabi: 'ਭਾਸ਼ਾ',
  },
  'english': {
    english: 'English',
    hindi: 'अंग्रेज़ी',
    punjabi: 'ਅੰਗਰੇਜ਼ੀ',
  },
  'hindi': {
    english: 'Hindi',
    hindi: 'हिंदी',
    punjabi: 'ਹਿੰਦੀ',
  },
  'punjabi': {
    english: 'Punjabi',
    hindi: 'पंजाबी',
    punjabi: 'ਪੰਜਾਬੀ',
  },
  'select.language': {
    english: 'Select Language',
    hindi: 'भाषा चुनें',
    punjabi: 'ਭਾਸ਼ਾ ਚੁਣੋ',
  },
  // Chatbot
  'krishi.mitra': {
    english: 'Krishi Mitra',
    hindi: 'कृषि मित्र',
    punjabi: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ',
  },
  'your.agricultural.assistant': {
    english: 'Your Agricultural Assistant',
    hindi: 'आपका कृषि सहायक',
    punjabi: 'ਤੁਹਾਡਾ ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ',
  },
  'type.your.message': {
    english: 'Type your message...',
    hindi: 'अपना संदेश लिखें...',
    punjabi: 'ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ...',
  },
  'error': {
    english: 'Error',
    hindi: 'त्रुटि',
    punjabi: 'ਗਲਤੀ',
  },
  'message.send.error': {
    english: 'Could not send message. Please try again.',
    hindi: 'संदेश नहीं भेज सका। कृपया पुनः प्रयास करें।',
    punjabi: 'ਸੁਨੇਹਾ ਨਹੀਂ ਭੇਜ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
  },
  'not.supported': {
    english: 'Not Supported',
    hindi: 'समर्थित नहीं',
    punjabi: 'ਸਮਰਥਿਤ ਨਹੀਂ',
  },
  'voice.recognition.not.supported': {
    english: 'Voice recognition is not supported in your browser.',
    hindi: 'आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।',
    punjabi: 'ਤੁਹਾਡੇ ਬਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਰਿਕਗਨੀਸ਼ਨ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ।',
  },
  'listening': {
    english: 'Listening',
    hindi: 'सुन रहा है',
    punjabi: 'ਸੁਣ ਰਿਹਾ ਹੈ',
  },
  'speak.now': {
    english: 'Speak now...',
    hindi: 'अब बोलें...',
    punjabi: 'ਹੁਣ ਬੋਲੋ...',
  },
  'sorry': {
    english: 'Sorry',
    hindi: 'क्षमा करें',
    punjabi: 'ਮਾਫ਼ ਕਰਨਾ',
  },
  'speech.recognition.configuration': {
    english: 'Speech recognition implementation requires backend configuration.',
    hindi: 'स्पीच रिकग्निशन कार्यान्वयन के लिए बैकएंड कॉन्फ़िगरेशन की आवश्यकता है।',
    punjabi: 'ਸਪੀਚ ਰਿਕਗਨੀਸ਼ਨ ਲਾਗੂ ਕਰਨ ਲਈ ਬੈਕਐਂਡ ਕੌਨਫਿਗਰੇਸ਼ਨ ਦੀ ਲੋੜ ਹੈ।',
  },
  // Buttons & Common UI
  'submit': {
    english: 'Submit',
    hindi: 'जमा करें',
    punjabi: 'ਜਮ੍ਹਾਂ ਕਰੋ',
  },
  'cancel': {
    english: 'Cancel',
    hindi: 'रद्द करें',
    punjabi: 'ਰੱਦ ਕਰੋ',
  },
  'save': {
    english: 'Save',
    hindi: 'सहेजें',
    punjabi: 'ਸੰਭਾਲੋ',
  },
  'delete': {
    english: 'Delete',
    hindi: 'हटाएं',
    punjabi: 'ਮਿਟਾਓ',
  },
  'edit': {
    english: 'Edit',
    hindi: 'संपादित करें',
    punjabi: 'ਸੰਪਾਦਿਤ ਕਰੋ',
  },
  'loading': {
    english: 'Loading...',
    hindi: 'लोड हो रहा है...',
    punjabi: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
  },
  'continue': {
    english: 'Continue',
    hindi: 'जारी रखें',
    punjabi: 'ਜਾਰੀ ਰੱਖੋ',
  },
  'back': {
    english: 'Back',
    hindi: 'वापस',
    punjabi: 'ਵਾਪਸ',
  },
  'search': {
    english: 'Search',
    hindi: 'खोजें',
    punjabi: 'ਖੋਜ',
  },
  'filter': {
    english: 'Filter',
    hindi: 'फ़िल्टर',
    punjabi: 'ਫਿਲਟਰ',
  },
  'sort': {
    english: 'Sort',
    hindi: 'क्रमबद्ध करें',
    punjabi: 'ਕ੍ਰਮਬੱਧ ਕਰੋ',
  },
  'view.details': {
    english: 'View Details',
    hindi: 'विवरण देखें',
    punjabi: 'ਵੇਰਵੇ ਵੇਖੋ',
  },
  'learn.more': {
    english: 'Learn More',
    hindi: 'और जानें',
    punjabi: 'ਹੋਰ ਜਾਣੋ',
  },
  'get.started': {
    english: 'Get Started',
    hindi: 'शुरू करें',
    punjabi: 'ਸ਼ੁਰੂ ਕਰੋ',
  },
  // Auth
  'auth.login': {
    english: 'Login',
    hindi: 'लॉगिन',
    punjabi: 'ਲਾਗਇਨ',
  },
  'auth.register': {
    english: 'Register',
    hindi: 'रजिस्टर',
    punjabi: 'ਰਜਿਸਟਰ',
  }
};

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  t: () => '',
});

// Provider component - Fixed to ensure hooks are used properly
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language preference from localStorage on initial render
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['english', 'hindi', 'punjabi'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading language preference:', error);
      setIsLoaded(true);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem('language', language);
      
      // Update HTML lang attribute
      document.documentElement.lang = language === 'english' ? 'en' : language === 'hindi' ? 'hi' : 'pa';
      
      // Update direction attribute if needed (all these languages are LTR so not changing)
      document.documentElement.dir = 'ltr';
      
      // Add a class to the body to allow language-specific styling
      document.body.classList.remove('lang-english', 'lang-hindi', 'lang-punjabi');
      document.body.classList.add(`lang-${language}`);
      
      // Dispatch a custom event so other components can respond to language changes
      window.dispatchEvent(new CustomEvent('language-changed', { detail: { language } }));
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, [language, isLoaded]);

  // Translation function
  const t = (key: string): string => {
    // Check if the key exists
    if (translations[key]) {
      return translations[key][language];
    }
    
    // Fallback to the key if translation is not found
    console.warn(`Translation not found for key: ${key}`);
    return key;
  };

  // Create the context value object
  const contextValue = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
