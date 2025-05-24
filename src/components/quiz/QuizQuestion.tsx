import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Question } from "@/types/quiz";
import QuizProgress from "./QuizProgress";

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onShowAnswer: () => void;
  onNextQuestion: () => void;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  score,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
  onShowAnswer,
  onNextQuestion,
}: QuizQuestionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-black/40 backdrop-blur-lg border-purple-500/30">
        <CardHeader>
          <QuizProgress
            currentQuestion={questionIndex}
            totalQuestions={totalQuestions}
            score={score}
          />

          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Icon name="Music" size={48} className="text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              {question.artist} - "{question.song}"
            </CardTitle>
            <p className="text-gray-300">
              Какую статью УК РФ нарушают в этой песне?
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correct
                        ? "bg-green-500/20 border-green-500 text-green-300"
                        : "bg-red-500/20 border-red-500 text-red-300"
                      : "bg-purple-500/20 border-purple-500 text-purple-300"
                    : showExplanation && index === question.correct
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
                {question.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            {selectedAnswer !== null && !showExplanation && (
              <Button
                onClick={onShowAnswer}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
              >
                <Icon name="Eye" className="mr-2" />
                Показать ответ
              </Button>
            )}

            {showExplanation && (
              <Button
                onClick={onNextQuestion}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
              >
                {questionIndex + 1 < totalQuestions ? (
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
