
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageToggle }) => {
  const isAr = language === 'ar';

  return (
    <header className={`w-full bg-[#1b263b] border-b-4 border-[#415a77] py-4 px-6 shadow-xl flex justify-between items-center sticky top-0 z-50 ${isAr ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-[#e0e1dd]">
          {isAr ? 'امتحان أساسيات علوم المنطق' : 'Logic Fundamentals Final Exam'}
        </h1>
        <p className="text-xs md:text-sm text-[#778da9]">
          {isAr ? 'كلية الهندسة | هندسة الامن السيبراني' : 'College of Engineering | Cyber Security'}
        </p>
      </div>

      <button
        onClick={onLanguageToggle}
        className="bg-[#415a77] hover:bg-[#778da9] text-[#e0e1dd] px-4 py-2 rounded-full font-bold transition-all border border-[#778da9] shadow-inner text-sm md:text-base"
      >
        {isAr ? 'English' : 'العربية'}
      </button>
    </header>
  );
};

export default Header;
