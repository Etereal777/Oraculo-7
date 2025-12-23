
import React, { useState } from 'react';
import { generateTarotReading } from '../../services/gemini';
import { TAROT_CARDS } from '../../constants';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'https://esm.sh/react-markdown';
import Logo from '../Logo';

interface TarotProps {
  onBack: () => void;
  onSave: (reading: any) => void;
}

const Tarot: React.FC<TarotProps> = ({ onBack, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);

  const pullCard = async () => {
    setLoading(true);
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setCard(randomCard);
    
    try {
      const result = await generateTarotReading(randomCard);
      setReading(result);
      onSave({
        type: 'tarot',
        title: `Tarot: ${randomCard}`,
        content: result
      });
    } catch (err) {
      setReading("Houve uma interferência energética. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold font-serif">Tarot Oracular</h1>
      </header>

      {!reading ? (
        <div className="flex flex-col items-center justify-center space-y-8 py-8">
          <div className="w-56 h-80 glass-card border-amber-500/30 rounded-[2rem] flex flex-col items-center justify-center bg-slate-900/90 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden group transition-all duration-700 hover:scale-105">
            <div className="absolute inset-4 border border-amber-500/10 rounded-[1.5rem]" />
            <Logo className="w-40 h-40 opacity-40 group-hover:opacity-100 transition-opacity duration-700" showText={false} />
            <div className="mt-4 text-[#D4AF37] opacity-20 text-[10px] tracking-[1em] font-bold uppercase">ORÁCULO 7</div>
          </div>
          <p className="text-slate-400 text-center px-12 text-sm italic leading-relaxed">
            Concentre-se em sua intenção e toque no portal para revelar sua mensagem.
          </p>
          <button
            disabled={loading}
            onClick={pullCard}
            className="px-12 py-4 gold-bg text-[#050510] font-bold rounded-full tracking-[0.2em] flex items-center gap-3 disabled:opacity-50 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
          >
            {loading ? <RefreshCw className="animate-spin" /> : null}
            {loading ? 'INVOCANDO...' : 'REVELAR DESTINO'}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="glass-card rounded-3xl overflow-hidden border-amber-500/20">
            <div className="bg-amber-500/10 p-5 border-b border-amber-500/20 text-center">
              <h2 className="text-2xl font-bold text-[#D4AF37] font-serif uppercase tracking-widest">{card}</h2>
            </div>
            <div className="p-6 prose prose-invert prose-amber max-w-none">
              <ReactMarkdown className="text-slate-200 leading-relaxed space-y-4 text-base font-light">
                {reading}
              </ReactMarkdown>
            </div>
          </div>
          
          <button
            onClick={() => { setReading(null); setCard(null); }}
            className="w-full py-4 border border-amber-500/20 rounded-2xl font-bold text-amber-500/70 tracking-widest hover:bg-amber-500/5 transition-colors"
          >
            NOVA CONSULTA
          </button>
        </div>
      )}
    </div>
  );
};

export default Tarot;
