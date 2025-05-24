import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Question {
  id: number;
  artist: string;
  song: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    artist: "Баста",
    song: "Сансара",
    options: [
      "Статья 228 УК РФ (Незаконные приобретение, хранение наркотических средств)",
      "Статья 213 УК РФ (Хулиганство)",
      "Статья 282 УК РФ (Возбуждение ненависти либо вражды)",
      "Статья 318 УК РФ (Применение насилия в отношении представителя власти)",
    ],
    correct: 0,
    explanation: "В тексте песни упоминаются наркотические вещества",
  },
  {
    id: 2,
    artist: "Оксимирон",
    song: "Город под подошвой",
    options: [
      "Статья 280 УК РФ (Публичные призывы к экстремистской деятельности)",
      "Статья 319 УК РФ (Оскорбление представителя власти)",
      "Статья 130 УК РФ (Оскорбление)",
      "Статья 213 УК РФ (Хулиганство)",
    ],
    correct: 1,
    explanation: "Содержит критику в адрес представителей власти",
  },
  {
    id: 3,
    artist: "Витя АК",
    song: "Делаю музыку",
    options: [
      "Статья 228 УК РФ (Незаконные приобретение, хранение наркотических средств)",
      "Статья 282 УК РФ (Возбуждение ненависти либо вражды)",
      "Статья 213 УК РФ (Хулиганство)",
      "Статья 167 УК РФ (Умышленные уничтожение или повреждение имущества)",
    ],
    correct: 2,
    explanation: "Агрессивные высказывания и призывы к беспорядкам",
  },
  {
    id: 4,
    artist: "Контейнеры",
    song: "Роллтон",
    options: [
      "Статья 319 УК РФ (Оскорбление представителя власти)",
      "Статья 228 УК РФ (Незаконные приобретение, хранение наркотических средств)",
      "Статья 282 УК РФ (Возбуждение ненависти либо вражды)",
      "Статья 213 УК РФ (Хулиганство)",
    ],
    correct: 1,
    explanation: "Упоминание запрещенных веществ в тексте",
  },
  {
    id: 5,
    artist: "Моргенштерн",
    song: "Cadillac",
    options: [
      "Статья 213 УК РФ (Хулиганство)",
      "Статья 282 УК РФ (Возбуждение ненависти либо вражды)",
      "Статья 228 УК РФ (Незаконные приобретение, хранение наркотических средств)",
      "Статья 319 УК РФ (Оскорбление представителя власти)",
    ],
    correct: 2,
    explanation: "Пропаганда наркотических веществ в клипе и тексте",
  },
];

export default function Index() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStarted(false);
    setShowExplanation(false);
  };

  const showAnswer = () => {
    setShowExplanation(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-lg border-purple-500/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Icon name="Music" size={64} className="text-purple-400" />
            </div>
            <CardTitle className="text-4xl font-bold text-white mb-4">
              🎵 Музыкальная Викторина
            </CardTitle>
            <p className="text-xl text-purple-200 mb-6">
              Угадай, какую статью УК РФ нарушают в песнях популярных рэперов
            </p>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                • 5 вопросов о песнях Басты, Оксимирона, Вити АК, Контейнеров и
                Моргенштерна
              </p>
              <p>• Выбери правильную статью из 4 вариантов</p>
              <p>• Узнай свой результат в конце!</p>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
            >
              <Icon name="Play" className="mr-2" />
              Начать викторину
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultMessage = "";
    let resultColor = "";

    if (percentage >= 80) {
      resultMessage = "Отлично! Ты настоящий знаток музыки и права! 🏆";
      resultColor = "text-green-400";
    } else if (percentage >= 60) {
      resultMessage = "Хорошо! Неплохое знание темы! 👍";
      resultColor = "text-yellow-400";
    } else {
      resultMessage = "Стоит подучить законодательство! 📚";
      resultColor = "text-red-400";
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-lg border-purple-500/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Icon name="Trophy" size={64} className="text-yellow-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-4">
              Результаты викторины
            </CardTitle>
            <div className="text-6xl font-bold text-purple-400 mb-4">
              {score}/{questions.length}
            </div>
            <p className={`text-xl mb-6 ${resultColor}`}>{resultMessage}</p>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-gray-300">Правильных ответов: {percentage}%</p>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={restartQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
            >
              <Icon name="RotateCcw" className="mr-2" />
              Пройти снова
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-black/40 backdrop-blur-lg border-purple-500/30">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="text-purple-400 font-semibold">
              Вопрос {currentQuestion + 1} из {questions.length}
            </div>
            <div className="text-purple-400 font-semibold">Очки: {score}</div>
          </div>
          <Progress
            value={((currentQuestion + 1) / questions.length) * 100}
            className="mb-6"
          />

          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Icon name="Music" size={48} className="text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              {current.artist} - "{current.song}"
            </CardTitle>
            <p className="text-gray-300">
              Какую статью УК РФ нарушают в этой песне?
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 mb-6">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === current.correct
                        ? "bg-green-500/20 border-green-500 text-green-300"
                        : "bg-red-500/20 border-red-500 text-red-300"
                      : "bg-purple-500/20 border-purple-500 text-purple-300"
                    : showExplanation && index === current.correct
                      ? "bg-green-500/20 border-green-500 text-green-300"
                      : "bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                }`}
                disabled={showExplanation}
              >
                <span className="font-semibold mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300">
                <Icon name="Info" className="inline mr-2" />
                {current.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            {selectedAnswer !== null && !showExplanation && (
              <Button
                onClick={showAnswer}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
              >
                <Icon name="Eye" className="mr-2" />
                Показать ответ
              </Button>
            )}

            {showExplanation && (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
              >
                {currentQuestion + 1 < questions.length ? (
                  <>
                    Следующий вопрос
                    <Icon name="ArrowRight" className="ml-2" />
                  </>
                ) : (
                  <>
                    Показать результат
                    <Icon name="Trophy" className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
