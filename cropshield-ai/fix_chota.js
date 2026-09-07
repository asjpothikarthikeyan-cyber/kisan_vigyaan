const fs = require('fs');
const filePath = 'src/services/chotaKissanEngine.js';
let content = fs.readFileSync(filePath, 'utf-8');

// The function is:
// export function classifyAgriculturalIntent(query = '', context = {}) { ... }

// We want to insert the new logic just before the return { intent: 'general_query' ... }
const insertionCode = 
  // --- 0. SETTINGS / LANGUAGE CONTROL ---
  const langKeywords = ['change language', 'language setting', 'speak in', 'talk in', 'bhasha badal', 'bhasha change', 'translate to', 'switch to', 'mozi', 'baashe', 'basha'];
  if (textMatchesAny(q, langKeywords)) {
    // Try to extract language name
    let targetLang = 'en';
    if (textMatchesAny(q, ['hindi', 'hind', 'हिन्दी'])) targetLang = 'hi';
    if (textMatchesAny(q, ['marathi', 'marat', 'मराठी'])) targetLang = 'mr';
    if (textMatchesAny(q, ['tamil', 'தமிழ்'])) targetLang = 'ta';
    if (textMatchesAny(q, ['telugu', 'తెలుగు'])) targetLang = 'te';
    if (textMatchesAny(q, ['kannada', 'ಕನ್ನಡ'])) targetLang = 'kn';
    if (textMatchesAny(q, ['gujarati', 'ગુજરાતી'])) targetLang = 'gu';
    if (textMatchesAny(q, ['bengali', 'বাংলা'])) targetLang = 'bn';
    if (textMatchesAny(q, ['malayalam', 'മലയാളം'])) targetLang = 'ml';
    if (textMatchesAny(q, ['punjabi', 'ਪੰਜਾਬੀ'])) targetLang = 'pa';
    if (textMatchesAny(q, ['english', 'angrezi'])) targetLang = 'en';
    
    return { intent: 'change_language', targetLang, rawQuery: q };
  }
;

const marker = "return {\n    intent: 'general_query',";
if (content.includes(marker)) {
    content = content.replace(marker, insertionCode + '\n  ' + marker);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("Successfully injected change_language intent");
} else {
    console.log("Could not find marker in classifyAgriculturalIntent");
}

// Now we need to modify generateChotaKissanResponse to handle this intent
const marker2 = "switch (classifiedIntent.intent) {";
const insertionCode2 = 
    case 'change_language':
      return {
        intent: 'change_language',
        responseText: lang === 'hi' ? \मैंने भाषा बदल दी है। अब मैं इसी भाषा में बात करूँगा।\ :
                      lang === 'mr' ? \मी भाषा बदलली आहे. आता मी याच भाषेत बोलेन.\ :
                      lang === 'ta' ? \மொழியை மாற்றியுள்ளேன். இப்போது நான் இந்த மொழியிலேயே பேசுவேன்.\ :
                      \I have changed the language. I will now speak in this language.\,
        actionButtons: [],
        navigationTarget: 'CHANGE_LANG_' + (classifiedIntent.targetLang || 'en')
      };
;

if (content.includes(marker2)) {
    content = content.replace(marker2, marker2 + '\n' + insertionCode2);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("Successfully injected generateChotaKissanResponse handler");
} else {
    console.log("Could not find switch statement in generateChotaKissanResponse");
}

