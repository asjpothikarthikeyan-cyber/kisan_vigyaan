// Browser Text-To-Speech (TTS) Voice Engine with Regional Indian Phonetics
export const speakText = (text, lang = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text) return;

  // Sanitize text to remove raw numeric compounds and unicode digits that confuse TTS engines
  let cleanText = text
    .replace(/[•|→←↑↓]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Spoken number expansions per language to prevent "62" or digit mispronunciations
  if (lang === 'mr') {
    cleanText = cleanText
      .replace(/६\s*पैकी\s*२|6\s*पैकी\s*2/g, 'सहा पैकी दोन')
      .replace(/\b२\b|\b2\b/g, 'दोन')
      .replace(/\b६\b|\b6\b/g, 'सहा')
      .replace(/\b४\b|\b4\b/g, 'चार')
      .replace(/\b३\b|\b3\b/g, 'तीन')
      .replace(/\b१\b|\b1\b/g, 'एक');
  } else if (lang === 'hi') {
    cleanText = cleanText
      .replace(/6\s*में\s*से\s*2/g, 'छह में से दो')
      .replace(/\b2\b/g, 'दो')
      .replace(/\b6\b/g, 'छह')
      .replace(/\b4\b/g, 'चार')
      .replace(/\b3\b/g, 'तीन')
      .replace(/\b1\b/g, 'एक');
  } else if (lang === 'ta') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ஆறு நிலங்களில் இரண்டு நிலங்களுக்கு')
      .replace(/\b2\b/g, 'இரண்டு')
      .replace(/\b6\b/g, 'ஆறு');
  } else if (lang === 'te') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ఆరు ప్లాట్లలో రెండు ప్లాట్లకు')
      .replace(/\b2\b/g, 'రెండు')
      .replace(/\b6\b/g, 'ఆరు');
  } else if (lang === 'kn') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ಆರು ಪ್ಲಾಟ್‌ಗಳಲ್ಲಿ ಎರಡು ಪ್ಲಾಟ್‌ಗಳಿಗೆ')
      .replace(/\b2\b/g, 'ಎರಡು')
      .replace(/\b6\b/g, 'ಆರು');
  } else if (lang === 'gu') {
    cleanText = cleanText
      .replace(/6.*2/g, 'છ ખેતરોમાંથી બે ખેતરોમાં')
      .replace(/\b2\b/g, 'બે')
      .replace(/\b6\b/g, 'છ');
  } else if (lang === 'bn') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ছয়টি জমির মধ্যে দুটি জমিতে')
      .replace(/\b2\b/g, 'দুই')
      .replace(/\b6\b/g, 'ছয়');
  } else if (lang === 'pa') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ਛੇ ਪਲਾਟਾਂ ਵਿੱਚੋਂ ਦੋ ਪਲਾਟਾਂ ਨੂੰ')
      .replace(/\b2\b/g, 'ਦੋ')
      .replace(/\b6\b/g, 'ਛੇ');
  } else if (lang === 'ml') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ആറ് പ്ലോട്ടുകളിൽ രണ്ടെണ്ണത്തിന്')
      .replace(/\b2\b/g, 'രണ്ട്')
      .replace(/\b6\b/g, 'ആറ്');
  } else if (lang === 'en') {
    cleanText = cleanText
      .replace(/2\s*of\s*6/gi, 'two of your six')
      .replace(/\b2\b/g, 'two')
      .replace(/\b6\b/g, 'six');
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  // Set language voice codes for all 10 major Indian languages
  const langCodeMap = {
    'mr': 'mr-IN', // Marathi
    'hi': 'hi-IN', // Hindi
    'ta': 'ta-IN', // Tamil
    'te': 'te-IN', // Telugu
    'kn': 'kn-IN', // Kannada
    'gu': 'gu-IN', // Gujarati
    'bn': 'bn-IN', // Bengali
    'pa': 'pa-IN', // Punjabi
    'ml': 'ml-IN', // Malayalam
    'en': 'en-IN'  // Indian English
  };

  const targetLang = langCodeMap[lang] || 'en-IN';
  utterance.lang = targetLang;
  utterance.rate = 0.88; // Slightly slower, highly intelligible cadence
  utterance.pitch = 1.0;

  // Match native voice if available in browser
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const langPrefix = targetLang.substring(0, 2);
    let matchedVoice = voices.find(v => v.lang === targetLang) ||
                       voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(langPrefix));
    
    // Regional fallback hierarchy
    if (!matchedVoice && (lang === 'mr' || lang === 'gu' || lang === 'pa')) {
      matchedVoice = voices.find(v => v.lang.startsWith('hi'));
    }
    if (!matchedVoice && (lang === 'kn' || lang === 'te' || lang === 'ml')) {
      matchedVoice = voices.find(v => v.lang.startsWith('ta'));
    }
    if (!matchedVoice) {
      matchedVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
