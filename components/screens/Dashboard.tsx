
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile } from '../../types';
import { generateDailyMessage } from '../../services/gemini';
import { Moon, Sparkles, Hash, Library, Bell, Flame, Star, Eye, Sunrise, Layers, Compass } from 'lucide-react';
import Logo from '../Logo';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userProfile }) => {
  const [dailyMessage, setDailyMessage] = useState<string>("Sintonizando...");
  const [loading, setLoading] = useState(true);
  const [bellMsg, setBellMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkCacheAndFetch = async () => {
      const today = new Date().toDateString();
      const cached = localStorage.getItem('oraculo7_daily_cache');
      
      if (cached) {
        const { date, message } = JSON.parse(cached);
        if (date === today) {
          setDailyMessage(message);
          setLoading(false);
          return;
        }
      }

      try {
        const msg = await generateDailyMessage(userProfile);
        setDailyMessage(msg);
        localStorage.setItem('oraculo7_daily_cache', JSON.stringify({ date: today, message: msg }));
      } catch (err) {
        setDailyMessage("O equilíbrio é a chave para a clareza hoje.");
      } finally {
        setLoading(false);
      }
    };

    checkCacheAndFetch();
  }, [userProfile]);

  const ringBell = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    const messages = ["Respire fundo.", "Sinta o agora.", "Presença absoluta."];
    setBellMsg(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setBellMsg(null), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-24">
      <header className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h2 className="text-[9px] tracking-[0.5em] text-amber-500/50 font-bold uppercase">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' })}
          </h2>
          <h1 className="text-2xl font-bold font-serif">
            Saudações, <span className="text-[#D4AF37]">{userProfile?.name?.split(' ')[0] || 'Buscador'}</span>
          </h1>
        </div>
        <button onClick={ringBell} className="relative p-3 bg-slate-900/30 rounded-full border border-amber-500/10 active:scale-90 transition-all">
          <Bell className="w-5 h-5 text-amber-500/70" />
          {bellMsg && (
            <div className="absolute top-14 right-0 w-32 glass-card p-3 rounded-2xl text-[9px] text-center font-serif text-amber-200 animate-in slide-in-from-top-2 duration-300 z-50">
              {bellMsg}
            </div>
          )}
        </button>
      </header>

      <section className="relative px-6 py-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/5 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
          <Logo className="w-full h-full scale-150" showText={false} />
        </div>
        <div className="space-y-4 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/40 font-bold block text-center italic">Mensagem Pessoal</span>
          <p className={`text-xl font-serif italic text-slate-100 leading-relaxed text-center ${loading ? 'animate-pulse opacity-50' : ''}`}>
            "{dailyMessage}"
          </p>
          <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] text-slate-500 uppercase tracking-widest">Sintonizado: {userProfile?.intention?.substring(0, 15)}...</span>
             </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold px-2">Portais de Profundidade</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'tarot', label: 'Tarot', icon: <Moon className="w-5 h-5 text-amber-400" /> },
              { id: 'astrology', label: 'Mapa', icon: <Sparkles className="w-5 h-5 text-blue-400" /> },
              { id: 'numerology', label: 'Números', icon: <Hash className="w-5 h-5 text-emerald-400" /> },
              { id: 'kabbalah', label: 'Cabala', icon: <Library className="w-5 h-5 text-rose-400" /> },
            ].map((card) => (
              <button key={card.id} onClick={() => onNavigate(card.id as Screen)} className="glass-card rounded-[2rem] p-6 text-center flex flex-col items-center gap-3 active:scale-95 transition-all">
                <div className="p-3 bg-slate-900/50 rounded-2xl border border-white/5">{card.icon}</div>
                <h4 className="font-bold text-xs tracking-widest uppercase text-slate-300">{card.label}</h4>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold px-2">Sintonias Sutis</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'oracle', label: 'Oráculo', icon: <Compass className="w-5 h-5 text-indigo-400" /> },
              { id: 'moon', label: 'Lua', icon: <Sunrise className="w-5 h-5 text-slate-300" /> },
              { id: 'intention', label: 'Intenção', icon: <Star className="w-5 h-5 text-yellow-500" /> },
              { id: 'element', label: 'Elemento', icon: <Flame className="w-5 h-5 text-orange-400" /> },
              { id: 'cycle', label: 'Ciclo', icon: <Layers className="w-5 h-5 text-teal-400" /> },
              { id: 'mirror', label: 'Espelho', icon: <Eye className="w-5 h-5 text-purple-400" /> },
            ].map((card) => (
              <button key={card.id} onClick={() => onNavigate(card.id as Screen)} className="glass-card rounded-3xl py-6 px-2 text-center flex flex-col items-center gap-2 active:scale-95 transition-all">
                <div className="p-2.5 bg-slate-900/30 rounded-full">{card.icon}</div>
                <h4 className="text-[10px] font-medium tracking-wider uppercase text-slate-400">{card.label}</h4>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
