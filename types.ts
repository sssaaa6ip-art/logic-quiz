
export type Language = 'en' | 'ar';

export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE'
}

export interface Question {
  id: number;
  type: QuestionType;
  question: {
    en: string;
    ar: string;
  };
  options?: {
    en: string[];
    ar: string[];
  };
  correctAnswer: number; // For MCQ: index (0-3), For TF: 0 for True, 1 for False
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  completed: boolean;
  language: Language;
}
