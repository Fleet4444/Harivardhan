
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAssistant } from '../services/geminiService';
import { BotIcon, SendIcon, XIcon, ChevronDownIcon } from './icons';

const SkillAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m SkillBot. How can I help you find a new skill today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await chatWithAssistant(newMessages);
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Oops! Something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        aria-label="Open Skill Assistant"
      >
        <BotIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full h-full md:w-96 md:h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
      <header className="bg-brand-dark text-white p-4 flex justify-between items-center rounded-t-2xl md:rounded-t-lg">
        <div className="flex items-center space-x-2">
          <BotIcon className="w-6 h-6" />
          <h3 className="font-bold text-lg">SkillBot Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
          <ChevronDownIcon className="w-6 h-6 md:hidden" />
          <XIcon className="w-6 h-6 hidden md:block" />
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 bg-brand-light/50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-2.5 my-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <div className="bg-brand-primary text-white p-2 rounded-full"><BotIcon className="w-5 h-5"/></div>}
            <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-brand-secondary text-brand-dark rounded-br-none' : 'bg-gray-200 text-brand-dark rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2.5 my-2">
             <div className="bg-brand-primary text-white p-2 rounded-full"><BotIcon className="w-5 h-5"/></div>
             <div className="p-3 rounded-lg bg-gray-200 text-brand-dark rounded-bl-none">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white md:rounded-b-lg">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about a skill..."
            className="w-full p-3 pr-12 border rounded-full focus:ring-2 focus:ring-brand-primary focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2 rounded-full hover:bg-opacity-90 disabled:bg-gray-400"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillAssistant;
