
import React from 'react';
import Logo from '../Logo';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in duration-1000">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full scale-150 animate-pulse" />
        <Logo className="w-56 h-56 relative z-10" showText={false} />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-[0.2em] text-[#D4AF37] font-serif">ORÁCULO 7</h1>
        <p className="text-xl italic text-slate-300 px-8 font-serif leading-relaxed">
          “O universo fala. Você está pronto para ouvir?”
        </p>
        <p className="text-slate-400 text-sm px-10 leading-relaxed font-light">
          A sabedoria ancestral da Cabala, Tarot e Astrologia, 
          revelada através da consciência moderna.
        </p>
      </div>

      <button
        onClick={onComplete}
        className="px-10 py-4 gold-bg text-[#050510] font-bold rounded-full tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] mt-8"
      >
        INICIAR JORNADA
      </button>
    </div>
  );
};

export default Onboarding;
