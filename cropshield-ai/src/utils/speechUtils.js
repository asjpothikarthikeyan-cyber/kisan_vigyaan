// Browser Text-To-Speech (TTS) Voice Engine for Farmer Accessibility
export const speakText = (text, lang = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language voice codes
  if (lang === 'mr') {
    utterance.lang = 'mr-IN'; // Marathi
  } else if (lang === 'hi') {
    utterance.lang = 'hi-IN'; // Hindi
  } else if (lang === 'te') {
    utterance.lang = 'te-IN';
  } else if (lang === 'ta') {
    utterance.lang = 'ta-IN';
  } else if (lang === 'kn') {
    utterance.lang = 'kn-IN';
  } else if (lang === 'gu') {
    utterance.lang = 'gu-IN';
  } else if (lang === 'bn') {
    utterance.lang = 'bn-IN';
  } else {
    utterance.lang = 'en-IN'; // Indian English
  }

  utterance.rate = 0.95; // Slightly slower for clear understanding in the field
  utterance.pitch = 1.0;

  // Try to match native voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.substring(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
