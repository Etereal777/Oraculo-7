
import React, { useState } from 'react';
import { UserProfile, LifeMoment } from '../../types';
import { Sparkles, ArrowRight, User, Calendar, Target, Zap, Clock, MapPin } from 'lucide-react';
import Logo from '../Logo';

interface RitualProps {
  onComplete: (profile: UserProfile) => void;
}

const Ritual: React.FC<RitualProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthCity: '',
    intention: '',
    lifeMoment: 'seed'
  });

  const moments: { id: LifeMoment; label: string; icon: string; desc: string }[] = [
    { id: 'seed', label: 'Início', icon: '🌱', desc: 'Plantando novas sementes e ideias.' },
    { id: 'transition', label: 'Transição', icon: '🌊', desc: 'Mudanças e fluxos inesperados.' },
    { id: 'conflict', label: 'Conflito', icon: '🔥', desc: 'Desafios que pedem força e coragem.' },
    { id: 'closing', label: 'Encerramento', icon: '🌑', desc: 'Conclusão de ciclos e colheita.' },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(profile as UserProfile);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 text-center">
              <User className="w-8 h-8 text-amber-500/50 mx-auto mb-4" />
              <h2 className="text-2xl font-serif">Como devemos te chamar?</h2>
              <p className="text-slate-500 text-sm">Seu nome real ou o arquétipo que você assume agora.</p>
            </div>
            <input
              autoFocus
              type="text"
              placeholder="Seu nome simbólico..."
              className="w-full bg-slate-900/50 border-b border-amber-500/20 py-4 text-2xl text-center outline-none focus:border-amber-500 transition-colors font-serif"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 text-center">
              <Calendar className="w-8 h-8 text-amber-500/50 mx-auto mb-2" />
              <h2 className="text-2xl font-serif">Seu Portal de Chegada</h2>
              <p className="text-slate-500 text-sm mb-4">Seus dados de nascimento ancoram seu mapa astral.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/30" />
                <input
                  type="date"
                  className="w-full bg-slate-900/50 border border-amber-500/10 rounded-xl py-4 pl-12 pr-4 text-slate-300 outline-none focus:border-amber-500 transition-colors"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/30" />
                  <input
                    type="time"
                    className="w-full bg-slate-900/50 border border-amber-500/10 rounded-xl py-4 pl-12 pr-4 text-slate-300 outline-none focus:border-amber-500 transition-colors"
                    value={profile.birthTime}
                    onChange={(e) => setProfile({ ...profile, birthTime: e.target.value })}
                  />
                  <span className="absolute -bottom-5 left-1 text-[8px] uppercase tracking-widest text-slate-600">Hora (Opcional)</span>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/30" />
                  <input
                    type="text"
                    placeholder="Cidade"
                    className="w-full bg-slate-900/50 border border-amber-500/10 rounded-xl py-4 pl-12 pr-4 text-slate-300 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-700"
                    value={profile.birthCity}
                    onChange={(e) => setProfile({ ...profile, birthCity: e.target.value })}
                  />
                  <span className="absolute -bottom-5 left-1 text-[8px] uppercase tracking-widest text-slate-600">Cidade de Nascimento</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 text-center">
              <Target className="w-8 h-8 text-amber-500/50 mx-auto mb-4" />
              <h2 className="text-2xl font-serif">Qual sua intenção atual?</h2>
              <p className="text-slate-500 text-sm">O que sua alma busca neste momento?</p>
            </div>
            <textarea
              placeholder="Ex: clareza, direção, paz, cura..."
              className="w-full bg-slate-900/50 border border-amber-500/10 rounded-2xl p-6 h-32 text-lg outline-none focus:border-amber-500 transition-colors text-slate-300"
              value={profile.intention}
              onChange={(e) => setProfile({ ...profile, intention: e.target.value })}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 text-center">
              <Zap className="w-8 h-8 text-amber-500/50 mx-auto mb-4" />
              <h2 className="text-2xl font-serif">Seu momento de vida?</h2>
              <p className="text-slate-500 text-sm">O Oráculo sintoniza sua frequência atual.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {moments.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setProfile({ ...profile, lifeMoment: m.id })}
                  className={`p-4 rounded-xl border flex items-center gap-4 transition-all text-left ${
                    profile.lifeMoment === m.id 
                    ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'border-white/5 bg-slate-900/30'
                  }`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{m.label}</h4>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-none mt-1">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  const isStepValid = () => {
    if (step === 1) return (profile.name?.length || 0) > 2;
    if (step === 2) return (profile.birthDate?.length || 0) > 0 && (profile.birthCity?.length || 0) > 2;
    if (step === 3) return (profile.intention?.length || 0) > 3;
    return true;
  };

  return (
    <div className="h-full flex flex-col items-center justify-between py-12 px-6">
      <div className="flex flex-col items-center gap-4">
        <Logo className="w-20 h-20" showText={false} />
        <div className="flex gap-2">
          {[1,2,3,4].map(s => (
            <div key={s} className={`h-1 w-8 rounded-full transition-colors ${s <= step ? 'bg-amber-500' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm">
        {renderStep()}
      </div>

      <button
        disabled={!isStepValid()}
        onClick={handleNext}
        className="w-full max-w-sm py-5 gold-bg text-[#050510] font-bold rounded-full tracking-widest flex items-center justify-center gap-3 disabled:opacity-20 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95"
      >
        {step === 4 ? 'ESTÁ FEITO' : 'CONTINUAR'}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Ritual;
