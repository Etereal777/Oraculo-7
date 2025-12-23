
export type Screen = 
  | 'onboarding' 
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
  birthCity?: string;
}

export interface DailyIntention {
  date: string;
  word: string;
  reflection: string;
}
