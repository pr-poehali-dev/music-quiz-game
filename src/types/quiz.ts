export interface Question {
  id: number;
  artist: string;
  song: string;
  audioUrl: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  selectedAnswer: number | null;
  showResult: boolean;
  gameStarted: boolean;
  showExplanation: boolean;
}
