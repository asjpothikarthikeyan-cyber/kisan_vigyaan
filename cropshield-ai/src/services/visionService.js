export const analyzeLeafWithGroq = async (base64Image, lang = 'en') => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    console.error("Groq API key not found in VITE_GROQ_API_KEY");
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
                text: `You are a world-class agricultural pathologist API. 
Analyze the image for diseases, pests, or deficiencies. 
Return ONLY a raw JSON object with the following schema:
{
  "crop": "Crop name (e.g., Tomato)",
  "verdict": "Disease Name or Healthy",
  "plainAdviceEn": "Short, clear advice for the farmer in English",
  "plainAdviceTa": "Short, clear advice for the farmer in Tamil",
  "plainAdviceMr": "Short, clear advice for the farmer in Marathi",
  "medicineName": "Recommended chemical or organic medicine (or null if healthy)",
  "price": 320,
  "confidence": 94.2
}
Make sure the advice and verdict are accurate based on the visual symptoms.`
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
      let content = data.choices[0].message.content;
      // Extract JSON if wrapped in markdown
      if (content.includes('\`\`\`json')) {
        content = content.split('\`\`\`json')[1].split('\`\`\`')[0].trim();
      } else if (content.includes('\`\`\`')) {
        content = content.split('\`\`\`')[1].split('\`\`\`')[0].trim();
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
