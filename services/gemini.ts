
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_GUIDELINE = `
FILOSOFIA: "O Oráculo não diz quem você é. Ele revela aquilo que você já está pronto para reconhecer."
DIRETRIZES: 
- Seja simbólico, poético e reflexivo.
- Nunca seja determinista ou preditivo (evite "vai acontecer").
- Use o contexto pessoal do usuário para espelhar sua realidade atual.
- Tom sábio, calmo e inspirador.
`;

function getContextPrompt(profile: UserProfile | null): string {
  if (!profile) return "";
  const momentLabels: Record<string, string> = {
    seed: "Início (Plantio)",
    transition: "Transição (Fluxo)",
    conflict: "Conflito (Fogo)",
    closing: "Encerramento (Vazio)"
  };
  return `
  DADOS DO BUSCADOR:
  - Nome: ${profile.name}
  - Nascimento: ${profile.birthDate} ${profile.birthTime ? 'às ' + profile.birthTime : ''} em ${profile.birthCity}
  - Intenção Atual: ${profile.intention}
  - Momento de Vida: ${momentLabels[profile.lifeMoment]}
  - Data Atual: ${new Date().toLocaleDateString()}
  `;
}

export async function generateContemplativeContent(type: string, profile: UserProfile | null, contextData?: string): Promise<string> {
  const context = getContextPrompt(profile);
  const prompts: Record<string, string> = {
    oracle: "Crie uma frase simbólica diária, reflexiva e universal para o Oráculo do Dia.",
    moon: "Influência simbólica da lua atual no campo vibracional do buscador.",
    element: "Elemento do dia e sua orientação prática na jornada atual.",
    mirror: "Frase de auto-observação silenciosa para o buscador se olhar hoje.",
    cycle: `Interpretação do ciclo atual (${contextData}) sob a luz da sabedoria ancestral.`
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${SYSTEM_GUIDELINE}\n${context}\n${prompts[type]} Máximo 150 caracteres.`,
  });
  
  return response.text?.trim() || "O silêncio é a resposta.";
}

export async function generateDailyMessage(profile: UserProfile | null): Promise<string> {
  const context = getContextPrompt(profile);
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `${SYSTEM_GUIDELINE}\n${context}\nCrie a Mensagem Oracular Pessoal para este buscador hoje. Deve ser única, profunda e conectada à sua intenção e momento. Máximo 180 caracteres.`,
  });
  return response.text?.trim() || "O universo sussurra no silêncio.";
}

export async function generateTarotReading(cardName: string, profile: UserProfile | null): Promise<string> {
  const context = getContextPrompt(profile);
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `${SYSTEM_GUIDELINE}\n${context}\nInterprete a carta '${cardName}' especificamente para este buscador, considerando sua intenção e momento de vida atual. Foque no significado interno e aplicação espiritual.`,
  });
  return response.text?.trim() || "Interpretação indisponível.";
}

export async function generateAstrologyReading(data: any, profile: UserProfile | null): Promise<string> {
  const context = getContextPrompt(profile);
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `${SYSTEM_GUIDELINE}\n${context}\nInterprete o Mapa Astral e a posição solar do buscador baseando-se em seus dados natais sob a luz do seu momento atual. Forneça conselhos simbólicos sobre como os astros refletem sua intenção de '${profile?.intention}'.`,
  });
  return response.text?.trim() || "Os astros em silêncio.";
}

export async function generateNumerologyReading(value: string, profile: UserProfile | null): Promise<string> {
  const context = getContextPrompt(profile);
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `${SYSTEM_GUIDELINE}\n${context}\nAnalise '${value}' na numerologia pitagórica, traçando paralelos com o caminho atual do buscador.`,
  });
  return response.text?.trim() || "Segredos numéricos ocultos.";
}
