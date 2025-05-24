import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface QuizStartScreenProps {
  onStart: () => void;
}

export default function QuizStartScreen({ onStart }: QuizStartScreenProps) {
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
            onClick={onStart}
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
