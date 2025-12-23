
import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Initialization strictly follows the named parameter requirement and direct process.env usage
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateContemplativeContent(type: string, context?: string): Promise<string> {
  const prompts: Record<string, string> = {
    oracle: "Crie uma frase simbólica diária, reflexiva e universal para o Oráculo do Dia. Tom sábio e minimalista. Máximo 120 caracteres.",
    moon: "Com base na fase lunar de hoje (pesquise se necessário), forneça uma influência simbólica curta e contemplativa em 1 linha.",
    element: "Escolha um elemento (Fogo, Água, Ar ou Terra) e forneça uma orientação prática curta de 1 linha para o dia.",
    mirror: "Crie uma frase curta de auto-observação silenciosa para a seção Espelho. Deve induzir presença.",
    cycle: `Com base na energia de ${context} (Início, Expansão ou Fechamento), forneça uma frase orientadora profunda e simples.`
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompts[type] || "O silêncio é a resposta.",
  });
  
  return response.text?.trim() || "Aguarde o momento de clareza.";
}

export async function generateDailyMessage(): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Mensagem oracular curta e profunda (máximo 150 caracteres).",
  });
  return response.text?.trim() || "O universo sussurra no silêncio.";
}

export async function generateTarotReading(cardName: string): Promise<string> {
  // Fixed: Tarot interpretation requires advanced reasoning; using pro model
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Interprete '${cardName}' no Tarot. Significado e Prática.`,
  });
  return response.text?.trim() || "Interpretação indisponível.";
}

export async function generateAstrologyReading(data: any): Promise<string> {
  // Fixed: Astrology involves complex reasoning; using pro model
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Signo solar e conselho para nascimento em ${data.date} em ${data.city}.`,
  });
  return response.text?.trim() || "Os astros em silêncio.";
}

export async function generateNumerologyReading(value: string): Promise<string> {
  // Fixed: Numerology involves complex symbolic reasoning; using pro model
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Numerologia pitagórica para '${value}'.`,
  });
  return response.text?.trim() || "Segredos numéricos ocultos.";
}
