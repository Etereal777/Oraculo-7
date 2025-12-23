
import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { GLOSSARY_CONTENT } from '../../constants';

interface GlossaryProps {
  onBack: () => void;
}

const Glossary: React.FC<GlossaryProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-24">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold font-serif">Símbolos & Significados</h1>
      </header>

      <section className="space-y-6">
        <p className="text-slate-400 text-sm leading-relaxed px-2 italic">
          "A compreensão dos símbolos é o primeiro passo para a maestria da própria jornada."
        </p>

        <div className="space-y-4">
          {GLOSSARY_CONTENT.map((item, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 border-white/5">
              <h2 className="text-lg font-bold font-serif text-[#D4AF37] mb-3">{item.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-8 flex justify-center opacity-20">
        <BookOpen className="w-12 h-12 text-[#D4AF37]" />
      </div>
    </div>
  );
};

export default Glossary;
