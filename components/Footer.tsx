
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <footer className={`w-full bg-[#0d1b2a] border-t-2 border-[#415a77] py-6 px-4 mt-auto text-center ${isAr ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
        <div className="text-[#a8dadc] font-bold text-lg md:text-xl">
          {isAr ? 'تمت البرمجة بواسطة: علي عدنان كاظم' : 'Programmed by: Ali Adnan Kazem'}
        </div>
        <div className="text-[#778da9] text-sm md:text-base">
          {isAr 
            ? '© 2026 - جامعة المنارة | هندسة الامن السيبراني | المرحلة الاولى'
            : '© 2026 - Al-Manara University | Cyber Security Engineering | First Stage'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
