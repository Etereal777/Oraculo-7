
import React from 'react';
import { Sparkles, Moon, Star, Hash, Library, History, Compass, BookOpen, Bell, Eye, Sunrise, Wind, Layers } from 'lucide-react';

export const COLORS = {
  primary: '#050510',
  accent: '#D4AF37',
  text: '#F8FAFC',
  muted: '#94A3B8'
};

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Início', icon: <Compass className="w-5 h-5" /> },
  { id: 'history', label: 'Histórico', icon: <History className="w-5 h-5" /> },
  { id: 'glossary', label: 'Saberes', icon: <BookOpen className="w-5 h-5" /> },
];

export const TAROT_CARDS = [
  "O Louco", "O Mago", "A Sacerdotisa", "A Imperatriz", "O Imperador", 
  "O Hierofante", "Os Enamorados", "O Carro", "A Justiça", "O Eremita", 
  "A Roda da Fortuna", "A Força", "O Pendurado", "A Morte", "A Temperança", 
  "O Diabo", "A Torre", "A Estrela", "A Lua", "O Sol", "O Julgamento", "O Mundo"
];

export const INTENTIONS_MAP: Record<string, string> = {
  "Clareza": "Que seus olhos vejam além das sombras do ego hoje.",
  "Coragem": "A força que você busca já reside no centro do seu peito.",
  "Silêncio": "No vazio da mente, a voz da alma se torna audível.",
  "Ação": "O movimento consciente é a prece mais poderosa da matéria.",
  "Paciência": "O tempo do universo é perfeito; confie no ritmo das marés.",
  "Cura": "Permita que a luz suave da aceitação dissolva as tensões.",
  "Foco": "Onde sua atenção flui, sua energia cria mundos.",
  "Gratidão": "Reconhecer a abundância é o convite para que ela permaneça.",
  "Presença": "O único portal para o eterno é o batimento deste instante.",
  "Verdade": "Sua voz autêntica é a bússola que nunca falha."
};

export const GLOSSARY_CONTENT = [
  {
    title: "O que é um Oráculo?",
    text: "Um oráculo não é uma previsão imutável do futuro, mas um espelho do momento presente. Ele oferece chaves simbólicas para que a alma possa reconhecer seus próprios caminhos."
  },
  {
    title: "Os Arcanos Maiores",
    text: "No Tarot, os 22 Arcanos Maiores representam a Jornada do Herói — as grandes fases arquetípicas da vida humana."
  },
  {
    title: "A Árvore da Vida",
    text: "A Cabala descreve como a energia divina descende para o mundo físico através de dez emanações ou Sephirot."
  },
  {
    title: "O Elemento do Dia",
    text: "Fogo (Ação/Vontade), Água (Emoção/Intuição), Ar (Mente/Comunicação) e Terra (Matéria/Estabilidade) são as forças que compõem nossa realidade."
  }
];
