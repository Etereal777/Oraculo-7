
import React, { useState, useEffect } from 'react';
import { generateAstrologyReading } from '../../services/gemini';
import { ArrowLeft, Star, RefreshCw, MapPin, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'https://esm.sh/react-markdown';
import { UserProfile } from '../../types';

interface AstrologyProps {
  onBack: () => void;
  onSave: (reading: any) => void;
  profile: UserProfile | null;
}

const Astrology: React.FC<AstrologyProps> = ({ onBack, onSave, profile }) => {
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);

  const fetchReading = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const result = await generateAstrologyReading(profile, profile);
      setReading(result);
      onSave({
        type: 'astrology',
        title: `Mapa Astral: ${profile.name}`,
        content: result
      });
    } catch (err) {
      setReading("Os astros se ocultaram atrás das nuvens. Tente novamente em silêncio.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold font-serif">Mapa Astral</h1>
      </header>

      <section className="glass-card rounded-[2rem] p-6 border-amber-500/10 shadow-xl space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-bold mb-2">Dados de Origem</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-slate-300">
            <Calendar className="w-4 h-4 text-amber-500/40" />
            <span className="text-sm">{profile ? formatDate(profile.birthDate) : '...'}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <MapPin className="w-4 h-4 text-amber-500/40" />
            <span className="text-sm">{profile?.birthCity || '...'}</span>
          </div>
          {profile?.birthTime && (
            <div className="flex items-center gap-3 text-slate-300">
              <Clock className="w-4 h-4 text-amber-500/40" />
              <span className="text-sm">{profile.birthTime}</span>
            </div>
          )}
        </div>
      </section>

      {!reading ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-8 text-center">
          <div className="relative">
             <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full scale-150 animate-pulse" />
             <Star className="w-16 h-16 text-amber-500/20 relative z-10" />
          </div>
          <p className="text-slate-400 text-sm italic px-8 leading-relaxed">
            "{profile?.name}, seus dados natais foram reconhecidos. Invoque a sabedoria dos astros para o seu momento atual."
          </p>
          <button
            onClick={fetchReading}
            disabled={loading}
            className="px-10 py-4 gold-bg text-[#050510] font-bold rounded-full tracking-[0.2em] flex items-center gap-3 disabled:opacity-50 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95"
          >
            {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : <Star className="w-5 h-5" />}
            {loading ? 'ALINHANDO...' : 'CONSULTAR ASTROS'}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="glass-card rounded-[2rem] p-8 prose prose-invert prose-amber max-w-none border-amber-500/10">
            <ReactMarkdown className="text-slate-200 leading-relaxed space-y-4 text-base font-light">
              {reading}
            </ReactMarkdown>
          </div>
          
          <button
            onClick={() => setReading(null)}
            className="w-full py-4 border border-amber-500/20 rounded-2xl font-bold text-amber-500/70 tracking-widest hover:bg-amber-500/5 transition-colors"
          >
            RECALIBRAR MAPA
          </button>
        </div>
      )}
    </div>
  );
};

export default Astrology;
