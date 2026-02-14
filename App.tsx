
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuizCard from './components/QuizCard';
import { QUESTIONS } from './questions';
import { Language, QuizState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    completed: false,
    language: 'en',
  });

  const toggleLanguage = useCallback(() => {
    setState(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'ar' : 'en'
    }));
  }, []);

  const handleAnswer = (answerIdx: number) => {
    const isCorrect = answerIdx === QUESTIONS[state.currentQuestionIndex].correctAnswer;
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIdx,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < QUESTIONS.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false
      }));
    } else {
      setState(prev => ({ ...prev, completed: true }));
    }
  };

  const resetQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      completed: false,
      language: state.language
    });
  };

  const isAr = state.language === 'ar';
  const progress = ((state.currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1b2a] text-[#e0e1dd] selection:bg-[#a8dadc] selection:text-[#0d1b2a]">
      <Header language={state.language} onLanguageToggle={toggleLanguage} />

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        {!state.completed ? (
          <>
            {/* Progress Bar */}
            <div className="w-full max-w-3xl mb-8 bg-[#1b263b] h-3 rounded-full overflow-hidden border border-[#415a77]">
              <div 
                className="h-full bg-gradient-to-r from-[#415a77] to-[#a8dadc] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(168,218,220,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <QuizCard
              question={currentQuestion}
              language={state.language}
              onAnswer={handleAnswer}
              selectedAnswer={state.selectedAnswer}
              isAnswered={state.isAnswered}
              onNext={handleNext}
            />
          </>
        ) : (
          /* Completion Screen */
          <div className={`w-full max-w-2xl bg-[#1b263b] rounded-3xl p-10 md:p-16 text-center shadow-2xl border-4 border-[#a8dadc] animate-in zoom-in duration-500 ${isAr ? 'rtl' : 'ltr'}`}>
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold mb-4 text-[#a8dadc]">
              {isAr ? 'اكتمل الامتحان!' : 'Exam Completed!'}
            </h2>
            <p className="text-xl text-[#778da9] mb-8">
              {isAr ? 'لقد انهيت جميع الاسئلة بنجاح.' : 'You have successfully finished all questions.'}
            </p>
            
            <div className="bg-[#0d1b2a] rounded-2xl p-8 mb-10 border-2 border-[#415a77]">
              <p className="text-[#778da9] text-lg uppercase tracking-widest mb-2 font-bold">
                {isAr ? 'درجتك النهائية' : 'Your Final Score'}
              </p>
              <div className="text-7xl font-black text-white">
                {state.score} <span className="text-3xl text-[#415a77]">/ 75</span>
              </div>
              <p className="mt-4 text-[#a8dadc] font-bold text-xl">
                {Math.round((state.score / 75) * 100)}%
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="bg-[#415a77] hover:bg-[#778da9] text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all shadow-xl"
            >
              {isAr ? 'إعادة الامتحان' : 'Retake Exam'}
            </button>
          </div>
        )}
      </main>

      <Footer language={state.language} />
    </div>
  );
};

export default App;
