import React, { useState } from "react";
import { questions } from "@/data/questions";
import { QuizState } from "@/types/quiz";
import QuizStartScreen from "@/components/quiz/QuizStartScreen";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";

export default function Index() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null,
    showResult: false,
    gameStarted: false,
    showExplanation: false,
  });

  const handleStart = () => {
    setQuizState((prev) => ({ ...prev, gameStarted: true }));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState((prev) => ({ ...prev, selectedAnswer: answerIndex }));
  };

  const handleShowAnswer = () => {
    setQuizState((prev) => ({ ...prev, showExplanation: true }));
  };

  const handleNextQuestion = () => {
    const newScore =
      quizState.selectedAnswer === questions[quizState.currentQuestion].correct
        ? quizState.score + 1
        : quizState.score;

    if (quizState.currentQuestion + 1 < questions.length) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        score: newScore,
        selectedAnswer: null,
        showExplanation: false,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        score: newScore,
        showResult: true,
      }));
    }
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      selectedAnswer: null,
      showResult: false,
      gameStarted: false,
      showExplanation: false,
    });
  };

  if (!quizState.gameStarted) {
    return <QuizStartScreen onStart={handleStart} />;
  }

  if (quizState.showResult) {
    return (
      <QuizResults
        score={quizState.score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <QuizQuestion
      question={questions[quizState.currentQuestion]}
      questionIndex={quizState.currentQuestion}
      totalQuestions={questions.length}
      score={quizState.score}
      selectedAnswer={quizState.selectedAnswer}
      showExplanation={quizState.showExplanation}
      onAnswerSelect={handleAnswerSelect}
      onShowAnswer={handleShowAnswer}
      onNextQuestion={handleNextQuestion}
    />
  );
}
