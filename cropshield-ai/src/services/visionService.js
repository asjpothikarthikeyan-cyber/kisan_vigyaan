export const analyzeLeafWithGroq = async (base64Image, lang = 'en') => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    console.warn("Groq API key not configured in VITE_GROQ_API_KEY. Add VITE_GROQ_API_KEY to your deployment environment variables.");
    return null;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert AI Agricultural Pathologist and Plant Doctor for Indian farming.
Analyze this crop leaf specimen accurately for diseases, pests, fungal/bacterial spots, or nutrient deficiencies.
Return ONLY valid JSON (no extra markdown outside) in this exact schema:
{
  "crop": "Crop Name (e.g., Tomato, Cotton, Rice, Soybean, Potato, Wheat)",
  "verdict": "Specific Disease Name with Pathogen or 'Optimal Canopy Health (No Pathogen)'",
  "verdictHi": "रोग का नाम और स्थिति हिंदी में",
  "verdictTa": "நோயின் பெயர் மற்றும் நிலை தமிழில்",
  "verdictMr": "रोगाचे नाव आणि स्थिती मराठीत",
  "plainAdviceEn": "2-3 sentences of clear actionable treatment advice in English",
  "plainAdviceHi": "हिंदी में किसान के लिए 2-3 वाक्यों में स्पष्ट उपचार सलाह",
  "plainAdviceTa": "தமிழில் விவசாயிக்கான 2-3 வரிகளில் நேரடி சிகிச்சை ஆலோசனை",
  "plainAdviceMr": "मराठीत शेतकऱ्यासाठी 2-3 ओळींत थेट उपचार सल्ला",
  "medicineName": "Recommended chemical/bio fungicide or pesticide name (or null if healthy)",
  "medicineNameHi": "दवा का नाम हिंदी में",
  "medicineNameTa": "மருந்து பெயர் தமிழில்",
  "medicineNameMr": "औषधाचे नाव मराठीत",
  "price": 280,
  "confidence": 94.5,
  "severity": "High Critical / Medium Alert / Low / Healthy",
  "dosage": "e.g. 2.0g per Liter of water (30g per 15L pump)",
  "waitingPeriod": "e.g. 7 Days before harvest (PHI)",
  "activeCompound": "e.g. Mancozeb 75% WP or Streptocycline 90%"
}`
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      let content = data.choices[0].message.content.trim();
      
      // Extract JSON cleanly
      if (content.includes('```json')) {
        content = content.split('```json')[1].split('```')[0].trim();
      } else if (content.includes('```')) {
        content = content.split('```')[1].split('```')[0].trim();
      }
      
      try {
        const parsed = JSON.parse(content);
        return parsed;
      } catch (e) {
        console.error("Failed to parse Groq JSON response", content);
        return null;
      }
    } else {
      console.error("Groq API returned an unexpected response", data);
      return null;
    }
  } catch (err) {
    console.error("Error calling Groq API", err);
    return null;
  }
};
