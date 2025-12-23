
import React, { useState } from 'react';
import { generateNumerologyReading } from '../../services/gemini';
import { ArrowLeft, Hash } from 'lucide-react';
import ReactMarkdown from 'https://esm.sh/react-markdown';
// Added UserProfile import
import { UserProfile } from '../../types';

interface NumerologyProps {
  onBack: () => void;
  onSave: (reading: any) => void;
  // Added profile prop
  profile: UserProfile | null;
}

// Added profile to destructuring
const Numerology: React.FC<NumerologyProps> = ({ onBack, onSave, profile }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    setLoading(true);
    try {
      // Pass profile as second argument
      const result = await generateNumerologyReading(value, profile);
      setReading(result);
      onSave({
        type: 'numerology',
        title: `Numerologia: ${value}`,
        content: result
      });
    } catch (err) {
      setReading("A matemática sagrada está em silêncio agora.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold font-serif">Numerologia</h1>
      </header>

      {!reading ? (
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-slate-400 text-sm">Insira seu nome completo ou uma data importante para descobrir os segredos numéricos por trás dela.</p>
            <input
              type="text"
              required
              placeholder="Nome ou Data (DD/MM/AAAA)"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-5 text-center text-xl text-slate-200 focus:border-amber-500 outline-none transition-colors"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 gold-bg text-[#050510] font-bold rounded-xl tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Hash className="animate-spin w-5 h-5" /> : null}
            {loading ? 'CALCULANDO...' : 'REVELAR PADRÕES'}
          </button>
        </form>
      ) : (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="glass-card rounded-2xl p-6 prose prose-invert prose-amber max-w-none">
            <ReactMarkdown className="text-slate-300 leading-relaxed space-y-4">
              {reading}
            </ReactMarkdown>
          </div>
          
          <button
            onClick={() => setReading(null)}
            className="w-full py-4 border border-amber-500/20 rounded-xl font-bold text-amber-500/70 tracking-widest hover:bg-amber-500/5"
          >
            ANALISAR OUTRO NÚMERO
          </button>
        </div>
      )}
    </div>
  );
};

export default Numerology;
