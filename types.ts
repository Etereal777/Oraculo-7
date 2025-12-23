
export type Screen = 
  | 'onboarding' 
  | 'ritual'
  | 'dashboard' 
  | 'tarot' 
  | 'astrology' 
  | 'numerology' 
  | 'kabbalah' 
  | 'history' 
  | 'glossary'
  | 'oracle'
  | 'moon'
  | 'intention'
  | 'element'
  | 'cycle'
  | 'mirror';

export type LifeMoment = 'seed' | 'transition' | 'conflict' | 'closing';

export interface Reading {
  id: string;
  type: string;
  date: string;
  title: string;
  content: string;
  details?: any;
}

export interface UserProfile {
  name: string;
  birthDate: string;
  birthTime?: string;
  birthCity: string;
  intention: string;
  lifeMoment: LifeMoment;
}

export interface DailyIntention {
  date: string;
  word: string;
  reflection: string;
}

export interface DailyCache {
  date: string;
  message: string;
}
