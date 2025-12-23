
import React, { useState } from 'react';
import { generateAstrologyReading } from '../../services/gemini';
import { ArrowLeft, Star, Send } from 'lucide-react';
import ReactMarkdown from 'https://esm.sh/react-markdown';

interface AstrologyProps {
  onBack: () => void;
  onSave: (reading: any) => void;
}

const Astrology: React.FC<AstrologyProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({ date: '', city: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.city) return;

    setLoading(true);
    try {
      const result = await generateAstrologyReading(formData);
      setReading(result);
      onSave({
        type: 'astrology',
        title: `Astrologia: ${formData.date}`,
        content: result
      });
    } catch (err) {
      setReading("Os astros se ocultaram atrás das nuvens. Tente novamente.");
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
        <h1 className="text-2xl font-bold font-serif">Mapa Astral</h1>
      </header>

      {!reading ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Data de Nascimento</label>
              <input
                type="date"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-slate-200 focus:border-amber-500 outline-none transition-colors"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Cidade de Nascimento</label>
              <input
                type="text"
                required
                placeholder="Ex: São Paulo, Brasil"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-slate-200 focus:border-amber-500 outline-none transition-colors"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Hora (Opcional)</label>
              <input
                type="time"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-slate-200 focus:border-amber-500 outline-none transition-colors"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 gold-bg text-[#050510] font-bold rounded-xl tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Star className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
            {loading ? 'ALINHANDO ASTROS...' : 'GERAR LEITURA'}
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
            NOVA CONSULTA ASTRAL
          </button>
        </div>
      )}
    </div>
  );
};

export default Astrology;
