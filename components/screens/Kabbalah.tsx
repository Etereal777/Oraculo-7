
import React from 'react';
import { ArrowLeft, Library } from 'lucide-react';

interface KabbalahProps {
  onBack: () => void;
}

const Kabbalah: React.FC<KabbalahProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold font-serif">Cabala Moderna</h1>
      </header>

      <section className="space-y-6">
        <div className="glass-card rounded-2xl p-6 border-amber-500/30">
          <h2 className="text-xl font-bold font-serif text-[#D4AF37] mb-4">O Significado do 7</h2>
          <p className="text-slate-300 leading-relaxed italic">
            "Na tradição cabalística, o número sete representa a perfeição, a totalidade e a santidade no mundo físico."
          </p>
        </div>

        <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
          <p>
            A Cabala (ou Qabbalah) é uma sabedoria milenar que oferece chaves para entender o universo e a alma humana. O 7 está presente na Árvore da Vida, nos sete dias da criação e nos sete níveis de consciência.
          </p>
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <h4 className="font-bold text-slate-200 mb-2 uppercase tracking-widest text-xs">Reflexão do Ciclo</h4>
            <p>Estamos em constante movimento entre a recepção e a doação. O Oráculo 7 é sua ponte para alinhar sua vontade pessoal com o fluxo divino das Sephirot.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="glass-card p-4 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-[#D4AF37] font-bold">1</div>
            <div>
              <p className="font-bold">Ciclos</p>
              <p className="text-xs text-slate-500">Tudo o que sobe, deve descer com consciência.</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-[#D4AF37] font-bold">2</div>
            <div>
              <p className="font-bold">Consciência</p>
              <p className="text-xs text-slate-500">A observação é o primeiro passo para a mudança.</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-[#D4AF37] font-bold">3</div>
            <div>
              <p className="font-bold">Alinhamento</p>
              <p className="text-xs text-slate-500">A harmonia entre mente e coração abre portais.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kabbalah;
