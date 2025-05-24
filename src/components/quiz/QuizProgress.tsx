import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export default function QuizProgress({
  currentQuestion,
  totalQuestions,
  score,
}: QuizProgressProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-purple-400 font-semibold">
          Вопрос {currentQuestion + 1} из {totalQuestions}
        </div>
        <div className="text-purple-400 font-semibold">Очки: {score}</div>
      </div>
      <Progress
        value={((currentQuestion + 1) / totalQuestions) * 100}
        className="mb-6"
      />
    </>
  );
}
