
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { INTENTIONS_MAP } from '../../constants';

interface IntentionProps {
  onBack: () => void;
}

const Intention: React.FC<IntentionProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const words = Object.keys(INTENTIONS_MAP);

  useEffect(() => {
    const saved = localStorage.getItem('oraculo7_intention');
    const today = new Date().toDateString();
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) setSelected(parsed.word);
    }
  }, []);

  const handleSelect = (word: string) => {
    if (selected) return;
    const today = new Date().toDateString();
    localStorage.setItem('oraculo7_intention', JSON.stringify({ date: today, word }));
    setSelected(word);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-500" />
        </button>
        <h1 className="text-2xl font-bold font-serif">Intenção</h1>
      </header>

      {selected ? (
        <div className="py-20 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-700">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500/50 font-bold">Sua Semente de Hoje</span>
            <h2 className="text-5xl font-serif text-amber-500 uppercase tracking-widest">{selected}</h2>
          </div>
          <div className="h-px w-16 bg-white/10" />
          <p className="text-xl font-serif italic text-slate-300 px-6 leading-relaxed">
            "{INTENTIONS_MAP[selected]}"
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-slate-500 text-sm italic px-2">Escolha a vibração que guiará sua consciência nas próximas 24 horas.</p>
          <div className="grid grid-cols-2 gap-3">
            {words.map((word) => (
              <button
                key={word}
                onClick={() => handleSelect(word)}
                className="glass-card py-6 rounded-[1.5rem] text-sm font-bold tracking-widest uppercase hover:border-amber-500/40 transition-all active:scale-95"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Intention;
