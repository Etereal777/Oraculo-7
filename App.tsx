
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/screens/Onboarding';
import Dashboard from './components/screens/Dashboard';
import Tarot from './components/screens/Tarot';
import Astrology from './components/screens/Astrology';
import Numerology from './components/screens/Numerology';
import Kabbalah from './components/screens/Kabbalah';
import History from './components/screens/History';
import Glossary from './components/screens/Glossary';
import SimpleReading from './components/screens/SimpleReading';
import Intention from './components/screens/Intention';
import { Screen, Reading, UserProfile } from './types';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [history, setHistory] = useState<Reading[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('oraculo7_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (reading: Omit<Reading, 'id' | 'date'>) => {
    const newReading: Reading = {
      ...reading,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    const updated = [newReading, ...history];
    setHistory(updated);
    localStorage.setItem('oraculo7_history', JSON.stringify(updated));
  };

  const getPersonalCycle = () => {
    if (!userProfile?.birthDate) return "Início";
    const year = new Date().getFullYear();
    const [birthYear, birthMonth, birthDay] = userProfile.birthDate.split('-').map(Number);
    const sum = (birthDay || 1) + (birthMonth || 1) + year;
    const reduced = (sum % 9) || 9;
    if (reduced <= 3) return "Início";
    if (reduced <= 6) return "Expansão";
    return "Fechamento";
  };

  const renderScreen = () => {
    const backToDash = () => setScreen('dashboard');

    switch (screen) {
      case 'onboarding': return <Onboarding onComplete={backToDash} />;
      case 'dashboard': return <Dashboard onNavigate={setScreen} userProfile={userProfile} />;
      case 'tarot': return <Tarot onBack={backToDash} onSave={addToHistory} />;
      case 'astrology': return <Astrology onBack={backToDash} onSave={addToHistory} />;
      case 'numerology': return <Numerology onBack={backToDash} onSave={addToHistory} />;
      case 'kabbalah': return <Kabbalah onBack={backToDash} />;
      case 'history': return <History history={history} onNavigate={setScreen} />;
      case 'glossary': return <Glossary onBack={backToDash} />;
      case 'oracle': return <SimpleReading type="oracle" title="Oráculo do Dia" onBack={backToDash} />;
      case 'moon': return <SimpleReading type="moon" title="Lua & Ciclos" onBack={backToDash} />;
      case 'intention': return <Intention onBack={backToDash} />;
      case 'element': return <SimpleReading type="element" title="Elemento do Dia" onBack={backToDash} />;
      case 'cycle': return <SimpleReading type="cycle" title="Ciclo Pessoal" onBack={backToDash} context={getPersonalCycle()} />;
      case 'mirror': return <SimpleReading type="mirror" title="Espelho" onBack={backToDash} />;
      default: return <Dashboard onNavigate={setScreen} userProfile={userProfile} />;
    }
  };

  return (
    <Layout activeScreen={screen} onNavigate={setScreen} hideNav={screen === 'onboarding'}>
      {renderScreen()}
    </Layout>
  );
};

export default App;
