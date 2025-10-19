import React, { useState } from 'react';
import { View } from './types';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CommunityWall from './pages/CommunityWall';
import CareerQuiz from './pages/CareerQuiz';
import SkillAssistant from './components/SkillAssistant';
import Marketplace from './pages/Marketplace';
import Leaderboard from './pages/Leaderboard';
import Certificates from './pages/Certificates';
import Profile from './pages/Profile';
import { currentUser } from './data/mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [searchTerm, setSearchTerm] = useState('');

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard searchTerm={searchTerm} />;
      case View.MARKETPLACE:
        return <Marketplace searchTerm={searchTerm} />;
      case View.COMMUNITY:
        return <CommunityWall />;
      case View.QUIZ:
        return <CareerQuiz />;
      case View.LEADERBOARD:
        return <Leaderboard />;
      case View.CERTIFICATES:
        return <Certificates user={currentUser} />;
      case View.PROFILE:
        return <Profile user={currentUser} />;
      default:
        return <Dashboard searchTerm={searchTerm} />;
    }
  };

  return (
    <div className="bg-brand-light min-h-screen font-sans text-brand-dark">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        user={currentUser}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
      <SkillAssistant />
    </div>
  );
};

export default App;