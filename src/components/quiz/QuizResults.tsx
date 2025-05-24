import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  onRestart,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

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
            {score}/{totalQuestions}
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
            onClick={onRestart}
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
