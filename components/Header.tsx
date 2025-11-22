import React from 'react';
import { ScrollText, Github } from 'lucide-react';

interface HeaderProps {
  onHome: () => void;
  onAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHome, onAbout }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onHome}>
          <div className="bg-indigo-900 p-2.5 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-md">
            <ScrollText className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-serif font-bold text-slate-900 leading-none">
              Dijital Tarihçilik
            </span>
            <span className="text-xs text-slate-500 font-medium mt-1 tracking-wide uppercase">
              Yaşar Efe Çelik
            </span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={onHome} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Ana Sayfa</button>
          <button onClick={onAbout} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Hakkımda</button>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://github.com/nyx47rd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <span className="text-xs font-medium hidden sm:inline">nyx47rd</span>
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};