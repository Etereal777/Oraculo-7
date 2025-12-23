
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { generateContemplativeContent } from '../../services/gemini';
import { Screen, UserProfile } from '../../types';

interface SimpleReadingProps {
  type: Screen;
  title: string;
  onBack: () => void;
  userProfile?: UserProfile | null;
  context?: string;
}

const SimpleReading: React.FC<SimpleReadingProps> = ({ type, title, onBack, userProfile, context }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const result = await generateContemplativeContent(type, userProfile || null, context);
        setContent(result);
      } catch (err) {
        setContent("O silêncio é a resposta neste momento.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [type, context, userProfile]);

  return (
    <div className="space-y-12 animate-in slide-in-from-right duration-500 h-full flex flex-col">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-500" />
        </button>
        <h1 className="text-2xl font-bold font-serif">{title}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10 px-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full scale-150" />
          <div className={`text-center space-y-8 relative z-10 transition-all duration-1000 ${loading ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
            <p className="text-2xl font-serif italic text-slate-100 leading-relaxed max-w-sm">
              {content ? `"${content}"` : "Sintonizando..."}
            </p>
            {!loading && <div className="h-px w-12 bg-amber-500/30 mx-auto" />}
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-amber-500/30 animate-spin" />
            </div>
          )}
        </div>
      </div>

      <footer className="text-center pb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-bold">Oráculo 7 • Para {userProfile?.name?.split(' ')[0]}</p>
      </footer>
    </div>
  );
};

export default SimpleReading;
