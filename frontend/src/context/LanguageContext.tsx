import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string; nativeName: string }[];
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.explore': 'Explore',
    'nav.map': 'Map',
    'nav.virtualTour': 'Virtual Tour',
    'nav.aiGuide': 'AI Guide',
    'nav.community': 'Community',
    'nav.plan': 'Plan Trip',
    'hero.title': 'Preserve the Past. Experience the Present.',
    'hero.subtitle': 'Explore the world\'s cultural heritage through AI-powered storytelling, immersive virtual tours, 3D digital twins, and intelligent tourism.',
    'explore.title': 'Explore Heritage',
    'explore.search': 'Search heritage sites...',
    'common.learnMore': 'Learn More',
    'common.exploreNow': 'Explore Now',
    'common.virtualTour': 'Virtual Tour',
    'common.view3D': 'View in 3D',
    'common.askAI': 'Ask AI',
    'common.directions': 'Get Directions',
    'common.addTrip': 'Add to Trip',
    'ai.title': 'Heritage AI Guide',
    'ai.placeholder': 'Ask me anything about heritage...',
    'ai.disclaimer': '⚠️ Historical information should be verified against authoritative sources.',
  },
  hi: {
    'nav.explore': 'अन्वेषण करें',
    'nav.map': 'नक्शा',
    'nav.virtualTour': 'वर्चुअल टूर',
    'nav.aiGuide': 'AI गाइड',
    'nav.community': 'समुदाय',
    'nav.plan': 'यात्रा योजना',
    'hero.title': 'अतीत को संरक्षित करें। वर्तमान का अनुभव करें।',
    'hero.subtitle': 'AI-संचालित कहानी, इमर्सिव वर्चुअल टूर और 3D डिजिटल जुड़वां के माध्यम से विश्व की सांस्कृतिक विरासत का अन्वेषण करें।',
    'explore.title': 'विरासत का अन्वेषण करें',
    'explore.search': 'विरासत स्थल खोजें...',
    'common.learnMore': 'अधिक जानें',
    'common.exploreNow': 'अभी अन्वेषण करें',
    'common.virtualTour': 'वर्चुअल टूर',
    'common.view3D': '3D में देखें',
    'common.askAI': 'AI से पूछें',
    'common.directions': 'दिशाएं प्राप्त करें',
    'common.addTrip': 'यात्रा में जोड़ें',
    'ai.title': 'विरासत AI गाइड',
    'ai.placeholder': 'विरासत के बारे में कुछ भी पूछें...',
    'ai.disclaimer': '⚠️ ऐतिहासिक जानकारी को आधिकारिक स्रोतों से सत्यापित किया जाना चाहिए।',
  },
  ta: {
    'nav.explore': 'ஆராயுங்கள்',
    'nav.map': 'வரைபடம்',
    'nav.virtualTour': 'மெய்நிகர் சுற்றுப்பயணம்',
    'nav.aiGuide': 'AI வழிகாட்டி',
    'nav.community': 'சமுதாயம்',
    'nav.plan': 'பயண திட்டம்',
    'hero.title': 'கடந்த காலத்தை பாதுகாக்கவும். நிகழ்காலத்தை அனுபவிக்கவும்.',
    'hero.subtitle': 'AI-இயங்கும் கதைகள், மெய்நிகர் சுற்றுப்பயணங்கள் மூலம் உலகின் கலாச்சார பாரம்பரியத்தை ஆராயுங்கள்.',
    'explore.title': 'பாரம்பரியத்தை ஆராயுங்கள்',
    'explore.search': 'பாரம்பரிய இடங்களை தேடுங்கள்...',
    'common.learnMore': 'மேலும் அறிக',
    'common.exploreNow': 'இப்போது ஆராயுங்கள்',
    'common.virtualTour': 'மெய்நிகர் சுற்றுப்பயணம்',
    'common.view3D': '3D-ல் பாருங்கள்',
    'common.askAI': 'AI-யிடம் கேளுங்கள்',
    'common.directions': 'வழிகள் பெறுங்கள்',
    'common.addTrip': 'பயணத்தில் சேர்க்கவும்',
    'ai.title': 'பாரம்பரிய AI வழிகாட்டி',
    'ai.placeholder': 'பாரம்பரியம் பற்றி எதையும் கேளுங்கள்...',
    'ai.disclaimer': '⚠️ வரலாற்று தகவல்கள் அதிகாரப்பூர்வ ஆதாரங்களுடன் சரிபார்க்கப்பட வேண்டும்.',
  },
  te: {
    'nav.explore': 'అన్వేషించండి',
    'nav.map': 'మ్యాప్',
    'nav.virtualTour': 'వర్చువల్ టూర్',
    'nav.aiGuide': 'AI గైడ్',
    'nav.community': 'సమాజం',
    'nav.plan': 'పర్యటన ప్రణాళిక',
    'hero.title': 'గతాన్ని సంరక్షించండి. వర్తమానాన్ని అనుభవించండి.',
    'hero.subtitle': 'AI-ఆధారిత కథలు, వర్చువల్ పర్యటనల ద్వారా ప్రపంచ సాంస్కృతిక వారసత్వాన్ని అన్వేషించండి.',
    'explore.title': 'వారసత్వాన్ని అన్వేషించండి',
    'explore.search': 'వారసత్వ స్థలాలు వెతకండి...',
    'common.learnMore': 'మరింత తెలుసుకోండి',
    'common.exploreNow': 'ఇప్పుడు అన్వేషించండి',
    'common.virtualTour': 'వర్చువల్ టూర్',
    'common.view3D': '3D లో చూడండి',
    'common.askAI': 'AI ని అడగండి',
    'common.directions': 'దిశలు పొందండి',
    'common.addTrip': 'పర్యటనకు జోడించండి',
    'ai.title': 'వారసత్వ AI గైడ్',
    'ai.placeholder': 'వారసత్వం గురించి ఏదైనా అడగండి...',
    'ai.disclaimer': '⚠️ చారిత్రక సమాచారాన్ని అధికారిక మూలాల నుండి ధృవీకరించాలి.',
  },
  kn: {
    'nav.explore': 'ಅನ್ವೇಷಿಸಿ',
    'nav.map': 'ನಕ್ಷೆ',
    'nav.virtualTour': 'ವರ್ಚುವಲ್ ಪ್ರವಾಸ',
    'nav.aiGuide': 'AI ಮಾರ್ಗದರ್ಶಿ',
    'nav.community': 'ಸಮುದಾಯ',
    'nav.plan': 'ಪ್ರವಾಸ ಯೋಜನೆ',
    'hero.title': 'ಭೂತಕಾಲವನ್ನು ಸಂರಕ್ಷಿಸಿ. ವರ್ತಮಾನವನ್ನು ಅನುಭವಿಸಿ.',
    'hero.subtitle': 'AI ಆಧಾರಿತ ಕಥೆಗಳು, ವರ್ಚುವಲ್ ಪ್ರವಾಸಗಳ ಮೂಲಕ ವಿಶ್ವದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.',
    'explore.title': 'ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    'explore.search': 'ಪರಂಪರೆ ತಾಣಗಳನ್ನು ಹುಡುಕಿ...',
    'common.learnMore': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'common.exploreNow': 'ಈಗ ಅನ್ವೇಷಿಸಿ',
    'common.virtualTour': 'ವರ್ಚುವಲ್ ಪ್ರವಾಸ',
    'common.view3D': '3D ನಲ್ಲಿ ನೋಡಿ',
    'common.askAI': 'AI ಕೇಳಿ',
    'common.directions': 'ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ',
    'common.addTrip': 'ಪ್ರವಾಸಕ್ಕೆ ಸೇರಿಸಿ',
    'ai.title': 'ಪರಂಪರೆ AI ಮಾರ್ಗದರ್ಶಿ',
    'ai.placeholder': 'ಪರಂಪರೆಯ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...',
    'ai.disclaimer': '⚠️ ಐತಿಹಾಸಿಕ ಮಾಹಿತಿಯನ್ನು ಅಧಿಕೃತ ಮೂಲಗಳ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಬೇಕು.',
  },
  ml: {
    'nav.explore': 'പര്യവേക്ഷണം ചെയ്യുക',
    'nav.map': 'ഭൂപടം',
    'nav.virtualTour': 'വെർച്വൽ ടൂർ',
    'nav.aiGuide': 'AI ഗൈഡ്',
    'nav.community': 'കമ്മ്യൂണിറ്റി',
    'nav.plan': 'യാത്ര ആസൂത്രണം',
    'hero.title': 'ഭൂതകാലം സംരക്ഷിക്കുക. വർത്തമാനം അനുഭവിക്കുക.',
    'hero.subtitle': 'AI-ചോദിത കഥകൾ, വെർച്വൽ ടൂറുകൾ വഴി ലോകത്തിന്റെ സാംസ്കാരിക പൈതൃകം പര്യവേക്ഷണം ചെയ്യുക.',
    'explore.title': 'പൈതൃകം പര്യവേക്ഷണം ചെയ്യുക',
    'explore.search': 'പൈതൃക സ്ഥലങ്ങൾ തിരയുക...',
    'common.learnMore': 'കൂടുതൽ അറിയുക',
    'common.exploreNow': 'ഇപ്പോൾ പര്യവേക്ഷണം ചെയ്യുക',
    'common.virtualTour': 'വെർച്വൽ ടൂർ',
    'common.view3D': '3D-ൽ കാണുക',
    'common.askAI': 'AI-യോട് ചോദിക്കുക',
    'common.directions': 'ദിശകൾ നേടുക',
    'common.addTrip': 'യാത്രയ്ക്ക് ചേർക്കുക',
    'ai.title': 'പൈതൃക AI ഗൈഡ്',
    'ai.placeholder': 'പൈതൃകത്തെക്കുറിച്ച് എന്തും ചോദിക്കുക...',
    'ai.disclaimer': '⚠️ ചരിത്ര വിവരങ്ങൾ ആധികാരിക സ്രോതസ്സുകളുമായി ഉറപ്പാക്കണം.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
