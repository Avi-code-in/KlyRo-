const API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;
const SYSTEM_PROMPT = "You are KlyRo, a futuristic AI assistant. NEVER say you are Gemini or made by Google. Always reply in a helpful, friendly Hinglish tone.";

export const fetchAIResponse = async (text) => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "x-goog-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemini-3.8-flash",
        input: [{ type: "text", text: SYSTEM_PROMPT }, { type: "text", text }]
      })
    });
    const json = await response.json();
    return json.steps?.find(s => s.type === "model_output")?.content[0]?.text || "Sorry, main samajh nahi paya.";
  } catch (error) {
    return "❌ Error: " + error.message;
  }
};

export const fetchVisionAIResponse = async (base64Img) => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "x-goog-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemini-3.8-flash",
        input: [
          { type: "text", text: "Analyze this image. Return ONLY a valid JSON object: {name: string, description: string (Hinglish), tags: array of 3 strings, scientificName: string}. Do not use markdown." },
          { type: "image", data: base64Img, mime_type: "image/jpeg" }
        ]
      })
    });
    const json = await response.json();
    let aiText = json.steps?.find(s => s.type === "model_output")?.content[0]?.text || "{}";
    return JSON.parse(aiText.replace(/```json/g, "").replace(/```/g, "").trim());
  } catch (error) {
    return { name: "Scan Failed", description: "Error: " + error.message, tags: ["Error"], scientificName: "-" };
  }
};
