
import React from 'react';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-muted-foreground animate-pulse" />
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as Language)}
      >
        <SelectTrigger className="w-[130px] h-8 text-sm border border-green-100 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-md focus:ring-green-500 focus:border-green-500 shadow-sm">
          <SelectValue placeholder={t('select.language')} />
        </SelectTrigger>
        <SelectContent className="border border-green-100 rounded-xl shadow-lg animate-fade-in bg-white">
          <SelectItem value="english" className="hover:bg-green-50 transition-colors rounded-md my-1">
            <div className="flex items-center justify-between w-full">
              <span>{t('english')}</span>
              {language === 'english' && (
                <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              )}
            </div>
          </SelectItem>
          <SelectItem value="hindi" className="hover:bg-green-50 transition-colors rounded-md my-1">
            <div className="flex items-center justify-between w-full">
              <span>{t('hindi')}</span>
              {language === 'hindi' && (
                <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              )}
            </div>
          </SelectItem>
          <SelectItem value="punjabi" className="hover:bg-green-50 transition-colors rounded-md my-1">
            <div className="flex items-center justify-between w-full">
              <span>{t('punjabi')}</span>
              {language === 'punjabi' && (
                <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              )}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
