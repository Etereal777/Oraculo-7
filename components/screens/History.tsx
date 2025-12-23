
import React from 'react';
import { Screen, Reading } from '../../types';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';

interface HistoryProps {
  history: Reading[];
  onNavigate: (screen: Screen) => void;
}

const History: React.FC<HistoryProps> = ({ history, onNavigate }) => {
  const [selectedReading, setSelectedReading] = React.useState<Reading | null>(null);

  const clearHistory = () => {
    if (confirm("Deseja apagar todo o histórico de mensagens?")) {
      localStorage.removeItem('oraculo7_history');
      window.location.reload();
    }
  };

  if (selectedReading) {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-300 pb-20">
        <header className="flex items-center gap-4">
          <button onClick={() => setSelectedReading(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold font-serif truncate">{selectedReading.title}</h1>
        </header>
        <div className="glass-card rounded-2xl p-6 prose prose-invert max-w-none">
          <p className="text-xs text-amber-500 mb-4 tracking-widest uppercase">
            {new Date(selectedReading.date).toLocaleString('pt-BR')}
          </p>
          <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
            {selectedReading.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-20">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif">Sua Jornada</h1>
        {history.length > 0 && (
          <button onClick={clearHistory} className="text-slate-600 hover:text-red-400 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <Clock className="w-12 h-12 text-slate-800" />
          <p className="text-slate-500 italic">Sua trilha ainda não foi registrada.<br/>Realize sua primeira leitura para começar.</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-amber-500 font-bold uppercase tracking-widest text-xs"
          >
            Ir para o Dashboard
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedReading(item)}
              className="w-full glass-card p-5 rounded-2xl flex items-center justify-between group hover:border-amber-500/30 transition-all text-left"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold">
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </span>
                <h3 className="font-bold text-lg text-slate-200">{item.title}</h3>
              </div>
              <div className="text-slate-600 group-hover:translate-x-1 transition-transform">→</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
