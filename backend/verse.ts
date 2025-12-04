import { GoogleGenAI, Type } from "@google/genai";
import { Verse } from "../types";

const CACHE_KEY = "fire_rise_daily_verse_data";

export const verseController = {
  // Récupérer le verset (Logique 24h)
  getVerseOfTheDay: async (): Promise<Verse> => {
    const today = new Date().toDateString();
    const cachedDataStr = localStorage.getItem(CACHE_KEY);

    if (cachedDataStr) {
      const cachedData = JSON.parse(cachedDataStr);
      // Si la date stockée correspond à aujourd'hui, on retourne le cache
      if (cachedData.date === today) {
        return cachedData.verse;
      }
    }

    // Sinon, on génère un nouveau verset via Gemini
    return await verseController.fetchFromAI(today);
  },

  // Appel API Gemini (Scheduler simulé au moment de la requête)
  fetchFromAI: async (dateString: string): Promise<Verse> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Prompt strict pour le thème demandé
      const prompt = `
        Donne-moi un verset biblique puissant (Louis Segond) spécifiquement sur les thèmes : Le Feu de Dieu, Le Saint-Esprit, le Réveil spirituel ou la Puissance de Dieu.
        Le verset doit encourager la foi et le zèle.
        Réponds UNIQUEMENT au format JSON.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reference: { type: Type.STRING, description: "La référence (ex: Actes 2:4)" },
              text: { type: Type.STRING, description: "Le texte du verset" }
            },
            required: ["reference", "text"]
          }
        }
      });

      const verse = JSON.parse(response.text || '{}') as Verse;
      
      // Sauvegarde en base (cache)
      const dataToStore = {
        date: dateString,
        verse: verse
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(dataToStore));
      
      return verse;
    } catch (e) {
      console.error("Erreur API Verse", e);
      // Verset de secours si l'API échoue
      return {
        reference: "Actes 1:8",
        text: "Mais vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins."
      };
    }
  }
};