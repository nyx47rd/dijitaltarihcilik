import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Metni sese çeviren fonksiyon (Gemini 2.5 Flash TTS)
export const generateSpeechFromText = async (text: string): Promise<ArrayBuffer> => {
  try {
    // Metin çok uzunsa özetleyerek veya sadece ilk paragrafı okutarak API limitlerini koruyabiliriz
    // Ancak burada doğrudan metni gönderiyoruz.
    const cleanText = text.replace(/[#*]/g, ''); // Markdown karakterlerini temizle
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Aşağıdaki blog yazısını net, anlaşılır ve profesyonel bir Türkçe ile seslendir: ${cleanText}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore, Fenrir, Puck, Charon
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("Ses verisi oluşturulamadı.");
    }

    // Base64 string'i ArrayBuffer'a çevir
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  } catch (error) {
    console.error("TTS Hatası:", error);
    throw error;
  }
};