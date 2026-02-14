
import React from 'react';
import { Question, QuestionType, Language } from '../types';

interface QuizCardProps {
  question: Question;
  language: Language;
  onAnswer: (index: number) => void;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  language,
  onAnswer,
  selectedAnswer,
  isAnswered,
  onNext
}) => {
  const isAr = language === 'ar';
  const qText = isAr ? question.question.ar : question.question.en;

  const renderOptions = () => {
    if (question.type === QuestionType.MCQ && question.options) {
      const options = isAr ? question.options.ar : question.options.en;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {options.map((opt, idx) => {
            const isCorrect = idx === question.correctAnswer;
            const isSelected = selectedAnswer === idx;
            
            let bgClass = "bg-[#1b263b] hover:bg-[#415a77] text-[#e0e1dd] border-[#415a77]";
            if (isAnswered) {
              if (isCorrect) bgClass = "bg-green-600 text-white border-green-400 scale-105 shadow-lg shadow-green-900/50";
              else if (isSelected) bgClass = "bg-red-600 text-white border-red-400 opacity-90";
              else bgClass = "bg-[#1b263b] text-[#778da9] border-[#415a77] opacity-50";
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => onAnswer(idx)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium text-lg flex items-center gap-3 ${bgClass} ${isAnswered ? 'cursor-default' : 'cursor-pointer transform hover:-translate-y-1'}`}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-grow">{opt}</span>
              </button>
            );
          })}
        </div>
      );
    } else {
      // True/False
      const labels = isAr ? ["صح", "خطأ"] : ["True", "False"];
      return (
        <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center">
          {labels.map((label, idx) => {
            const isCorrect = idx === question.correctAnswer;
            const isSelected = selectedAnswer === idx;

            let bgClass = idx === 0 ? "bg-blue-900/30 hover:bg-blue-800/50 text-[#e0e1dd] border-blue-500/50" : "bg-orange-900/30 hover:bg-orange-800/50 text-[#e0e1dd] border-orange-500/50";
            
            if (isAnswered) {
              if (isCorrect) bgClass = "bg-green-600 text-white border-green-400 scale-110 shadow-xl shadow-green-900/50 ring-4 ring-green-400/20";
              else if (isSelected) bgClass = "bg-red-600 text-white border-red-400";
              else bgClass = "bg-[#1b263b] text-[#778da9] border-[#415a77] opacity-40";
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => onAnswer(idx)}
                className={`min-w-[160px] p-6 rounded-2xl border-4 transition-all duration-500 font-bold text-2xl uppercase tracking-wider ${bgClass} ${isAnswered ? 'cursor-default' : 'cursor-pointer transform hover:scale-105'}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={`w-full max-w-3xl bg-gradient-to-br from-[#1b263b] to-[#0d1b2a] rounded-[2rem] p-8 md:p-12 shadow-2xl border-2 border-[#415a77] transition-all animate-in fade-in zoom-in duration-500 ${isAr ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-6">
        <span className="bg-[#415a77] text-[#a8dadc] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          {question.type === QuestionType.MCQ ? (isAr ? 'اختيارات' : 'MCQ') : (isAr ? 'صح / خطأ' : 'True or False')}
        </span>
        <span className="text-[#778da9] font-mono font-bold">
          {question.id} / 75
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
        {qText}
      </h2>

      {renderOptions()}

      {isAnswered && (
        <div className="mt-10 flex flex-col items-center animate-in slide-in-from-bottom duration-500">
          <p className={`text-lg font-bold mb-4 ${selectedAnswer === question.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
            {isAr 
              ? (selectedAnswer === question.correctAnswer ? 'إجابة صحيحة! أحسنت' : 'إجابة خاطئة. حاول في السؤال القادم')
              : (selectedAnswer === question.correctAnswer ? 'Correct Answer! Well done' : 'Wrong Answer. Better luck next time')}
          </p>
          <button
            onClick={onNext}
            className="w-full md:w-auto min-w-[200px] bg-[#a8dadc] hover:bg-[#778da9] text-[#0d1b2a] font-black py-4 px-10 rounded-xl text-xl transition-all shadow-lg hover:shadow-[#a8dadc]/50 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {isAr ? 'السؤال التالي' : 'Next Question'}
            {isAr ? '←' : '→'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
