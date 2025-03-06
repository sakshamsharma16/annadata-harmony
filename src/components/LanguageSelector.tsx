
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
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as Language)}
      >
        <SelectTrigger className="w-[130px] h-8 text-sm border-none bg-background/80 hover:bg-background/90">
          <SelectValue placeholder={t('select.language')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="english">
            <div className="flex items-center justify-between w-full">
              <span>{t('english')}</span>
              {language === 'english' && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              )}
            </div>
          </SelectItem>
          <SelectItem value="hindi">
            <div className="flex items-center justify-between w-full">
              <span>{t('hindi')}</span>
              {language === 'hindi' && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              )}
            </div>
          </SelectItem>
          <SelectItem value="punjabi">
            <div className="flex items-center justify-between w-full">
              <span>{t('punjabi')}</span>
              {language === 'punjabi' && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              )}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
