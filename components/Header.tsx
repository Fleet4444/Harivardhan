
import React, { useState, useEffect, useRef } from 'react';
import { View, User } from '../types';
import { MenuIcon, XIcon, SearchIcon, MicrophoneIcon } from './icons';

// FIX: Add type definitions for the Web Speech API to resolve TypeScript errors.
// This provides type safety for browser-specific APIs not included in default TS libs.
interface SpeechRecognitionAlternative {
  transcript: string;
}
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent {
    error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  user: User;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const navItems = [
  { view: View.DASHBOARD, label: 'Dashboard' },
  { view: View.MARKETPLACE, label: 'Marketplace' },
  { view: View.COMMUNITY, label: 'Community' },
  { view: View.QUIZ, label: 'Career Quiz' },
];

// Web Speech API setup
// FIX: Rename variable to avoid conflict with the SpeechRecognition interface type.
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition: SpeechRecognition | null = null;
if (SpeechRecognitionAPI) {
    recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}


const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, user, searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

  }, [setSearchTerm]);


  const handleVoiceSearch = () => {
    if (!recognition || isListening) return;
    setIsListening(true);
    recognition.start();
  };

  const NavLink: React.FC<{ view: View; label: string; isMobile?: boolean }> = ({ view, label, isMobile = false }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMenuOpen(false);
      }}
      className={`rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
        currentView === view
          ? 'bg-brand-primary text-white'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      } ${isMobile ? 'block w-full text-left px-3 py-2' : 'px-3 py-2'}`}
    >
      {label}
    </button>
  );
  
  const ProfileMenuLink: React.FC<{ view: View; label: string; }> = ({ view, label }) => (
    <button
        onClick={() => {
            setCurrentView(view);
            setIsProfileMenuOpen(false);
            setIsMenuOpen(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
        {label}
    </button>
  );

  return (
    <header className="bg-brand-dark shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center">
             <button onClick={() => setCurrentView(View.DASHBOARD)} className="flex-shrink-0">
                <h1 className="text-white text-2xl font-bold">Skill<span className="text-brand-secondary">Connect</span></h1>
            </button>
            <nav className="hidden md:flex md:ml-10 md:space-x-2">
              {navItems.map(item => (
                <NavLink key={item.view} view={item.view} label={item.label} />
              ))}
            </nav>
          </div>

           <div className="flex-1 min-w-0 px-2">
               <div className="relative w-full max-w-md mx-auto">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400"/>
                   </div>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search courses, products..."
                        className="block w-full bg-white/20 text-white placeholder-gray-300 rounded-full py-2 pl-10 pr-10 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
                    />
                    {recognition && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button onClick={handleVoiceSearch} className={`text-gray-300 hover:text-white ${isListening ? 'animate-pulse' : ''}`}>
                                <MicrophoneIcon className={`h-5 w-5 ${isListening ? 'text-brand-primary' : ''}`} />
                            </button>
                        </div>
                    )}
               </div>
           </div>

          <div className="hidden md:block">
            <div className="flex items-center">
                <div className="relative">
                    <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 text-white p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt={user.name} />
                    </button>
                    {isProfileMenuOpen && (
                         <div onMouseLeave={() => setIsProfileMenuOpen(false)} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <ProfileMenuLink view={View.PROFILE} label="My Profile" />
                            <ProfileMenuLink view={View.LEADERBOARD} label="Leaderboard" />
                            <ProfileMenuLink view={View.CERTIFICATES} label="My Certificates" />
                         </div>
                    )}
                </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/20 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => (
                <NavLink key={item.view} view={item.view} label={item.label} isMobile={true} />
            ))}
          </div>
           <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                </div>
                <div className="mt-3 px-2 space-y-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <ProfileMenuLink view={View.PROFILE} label="My Profile" />
                    <ProfileMenuLink view={View.LEADERBOARD} label="Leaderboard" />
                    <ProfileMenuLink view={View.CERTIFICATES} label="My Certificates" />
                </div>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
