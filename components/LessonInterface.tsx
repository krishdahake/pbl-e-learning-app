import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Volume2, CheckCircle, Circle, Star, Award, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  title: string;
  hindiTitle: string;
  character: string;
  gradientClass: string;
}

interface LessonInterfaceProps {
  subject: Subject;
  studentName: string;
  grade: number;
  onBack: () => void;
}

interface Question {
  id: string;
  type: "multiple-choice" | "drag-drop" | "true-false";
  question: string;
  hindiQuestion: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hindiExplanation: string;
}

const LessonInterface = ({ subject, studentName, grade, onBack }: LessonInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const { toast } = useToast();

  // Sample questions based on subject
  const getQuestionsForSubject = (): Question[] => {
    switch (subject.id) {
      case "math":
        return [
          {
            id: "1",
            type: "multiple-choice",
            question: "What is 5 + 3?",
            hindiQuestion: "5 + 3 क्या होता है?",
            options: ["6", "7", "8", "9"],
            correctAnswer: 2,
            explanation: "5 + 3 = 8. When we add 5 and 3, we get 8.",
            hindiExplanation: "5 + 3 = 8। जब हम 5 और 3 जोड़ते हैं, तो हमें 8 मिलता है।"
          },
          {
            id: "2",
            type: "multiple-choice",
            question: "Which number comes after 10?",
            hindiQuestion: "10 के बाद कौन सी संख्या आती है?",
            options: ["9", "11", "12", "8"],
            correctAnswer: 1,
            explanation: "After 10 comes 11. Numbers go in order: 10, 11, 12...",
            hindiExplanation: "10 के बाद 11 आता है। संख्याएं क्रम में होती हैं: 10, 11, 12..."
          },
          {
            id: "3",
            type: "multiple-choice",
            question: "How many sides does a triangle have?",
            hindiQuestion: "त्रिभुज की कितनी भुजाएं होती हैं?",
            options: ["2", "3", "4", "5"],
            correctAnswer: 1,
            explanation: "A triangle has 3 sides. Tri means three.",
            hindiExplanation: "त्रिभुज की 3 भुजाएं होती हैं। त्रि का मतलब तीन है।"
          },
          {
            id: "4",
            type: "multiple-choice",
            question: "What is 2 × 4?",
            hindiQuestion: "2 × 4 क्या होता है?",
            options: ["6", "8", "10", "12"],
            correctAnswer: 1,
            explanation: "2 × 4 = 8. We can think of it as 2 + 2 + 2 + 2 = 8.",
            hindiExplanation: "2 × 4 = 8। हम इसे 2 + 2 + 2 + 2 = 8 के रूप में सोच सकते हैं।"
          },
          {
            id: "5",
            type: "multiple-choice",
            question: "Which is the largest number?",
            hindiQuestion: "सबसे बड़ी संख्या कौन सी है?",
            options: ["15", "7", "23", "19"],
            correctAnswer: 2,
            explanation: "23 is the largest number among these options.",
            hindiExplanation: "इन विकल्पों में 23 सबसे बड़ी संख्या है।"
          }
        ];
      case "science":
        return [
          {
            id: "1",
            type: "multiple-choice",
            question: "What do plants need to grow?",
            hindiQuestion: "पौधों को बढ़ने के लिए क्या चाहिए?",
            options: ["Water and Sunlight", "Only water", "Only soil", "Nothing"],
            correctAnswer: 0,
            explanation: "Plants need water, sunlight, and soil to grow healthy and strong.",
            hindiExplanation: "पौधों को स्वस्थ और मजबूत बढ़ने के लिए पानी, धूप और मिट्टी की जरूरत होती है।"
          },
          {
            id: "2",
            type: "multiple-choice",
            question: "Which part of the plant makes food?",
            hindiQuestion: "पौधे का कौन सा हिस्सा भोजन बनाता है?",
            options: ["Root", "Stem", "Leaves", "Flower"],
            correctAnswer: 2,
            explanation: "Leaves make food for the plant using sunlight and water.",
            hindiExplanation: "पत्तियां धूप और पानी का उपयोग करके पौधे के लिए भोजन बनाती हैं।"
          },
          {
            id: "3",
            type: "multiple-choice",
            question: "How many bones are there in human body?",
            hindiQuestion: "मानव शरीर में कितनी हड्डियां होती हैं?",
            options: ["106", "206", "306", "406"],
            correctAnswer: 1,
            explanation: "An adult human body has 206 bones.",
            hindiExplanation: "एक वयस्क मानव शरीर में 206 हड्डियां होती हैं।"
          },
          {
            id: "4",
            type: "multiple-choice",
            question: "What do we breathe in?",
            hindiQuestion: "हम क्या सांस में लेते हैं?",
            options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
            correctAnswer: 1,
            explanation: "We breathe in oxygen and breathe out carbon dioxide.",
            hindiExplanation: "हम ऑक्सीजन सांस में लेते हैं और कार्बन डाइऑक्साइड छोड़ते हैं।"
          },
          {
            id: "5",
            type: "multiple-choice",
            question: "Which animal gives us milk?",
            hindiQuestion: "कौन सा जानवर हमें दूध देता है?",
            options: ["Lion", "Cow", "Tiger", "Eagle"],
            correctAnswer: 1,
            explanation: "Cows give us milk, which is very nutritious.",
            hindiExplanation: "गाय हमें दूध देती है, जो बहुत पौष्टिक होता है।"
          }
        ];
      case "language":
        return [
          {
            id: "1",
            type: "multiple-choice",
            question: "What is the first letter of the alphabet?",
            hindiQuestion: "वर्णमाला का पहला अक्षर कौन सा है?",
            options: ["B", "A", "C", "D"],
            correctAnswer: 1,
            explanation: "A is the first letter of the alphabet.",
            hindiExplanation: "A वर्णमाला का पहला अक्षर है।"
          },
          {
            id: "2",
            type: "multiple-choice",
            question: "Which word rhymes with 'CAT'?",
            hindiQuestion: "कौन सा शब्द 'CAT' के साथ तुकबंदी करता है?",
            options: ["DOG", "BAT", "PIG", "COW"],
            correctAnswer: 1,
            explanation: "BAT rhymes with CAT. They both end with 'AT' sound.",
            hindiExplanation: "BAT, CAT के साथ तुकबंदी करता है। दोनों 'AT' की आवाज़ के साथ खत्म होते हैं।"
          },
          {
            id: "3",
            type: "multiple-choice",
            question: "How many vowels are there in English?",
            hindiQuestion: "अंग्रेजी में कितने स्वर होते हैं?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 2,
            explanation: "There are 5 vowels in English: A, E, I, O, U.",
            hindiExplanation: "अंग्रेजी में 5 स्वर होते हैं: A, E, I, O, U।"
          },
          {
            id: "4",
            type: "multiple-choice",
            question: "What is the opposite of 'BIG'?",
            hindiQuestion: "'BIG' का विपरीत क्या है?",
            options: ["LARGE", "HUGE", "SMALL", "TALL"],
            correctAnswer: 2,
            explanation: "SMALL is the opposite of BIG.",
            hindiExplanation: "SMALL, BIG का विपरीत है।"
          },
          {
            id: "5",
            type: "multiple-choice",
            question: "Which is a naming word?",
            hindiQuestion: "कौन सा एक नाम वाला शब्द है?",
            options: ["RUN", "BOOK", "JUMP", "SLEEP"],
            correctAnswer: 1,
            explanation: "BOOK is a naming word (noun). It names a thing.",
            hindiExplanation: "BOOK एक नाम वाला शब्द (संज्ञा) है। यह किसी चीज़ का नाम है।"
          }
        ];
      default:
        return [
          {
            id: "1",
            type: "multiple-choice",
            question: "What should we do to keep our environment clean?",
            hindiQuestion: "अपने पर्यावरण को साफ रखने के लिए हमें क्या करना चाहिए?",
            options: ["Throw garbage anywhere", "Plant trees", "Waste water", "Ignore pollution"],
            correctAnswer: 1,
            explanation: "We should plant trees and keep our environment clean.",
            hindiExplanation: "हमें पेड़ लगाने चाहिए और अपने पर्यावरण को साफ रखना चाहिए।"
          },
          {
            id: "2",
            type: "multiple-choice",
            question: "Where should we throw garbage?",
            hindiQuestion: "हमें कचरा कहाँ फेंकना चाहिए?",
            options: ["On the road", "In the river", "In dustbin", "Anywhere"],
            correctAnswer: 2,
            explanation: "We should always throw garbage in the dustbin to keep our surroundings clean.",
            hindiExplanation: "हमें अपने आसपास को साफ रखने के लिए हमेशा कचरा डस्टबिन में फेंकना चाहिए।"
          },
          {
            id: "3",
            type: "multiple-choice",
            question: "What gives us fresh air?",
            hindiQuestion: "हमें स्वच्छ हवा क्या देती है?",
            options: ["Cars", "Trees", "Factories", "Smoke"],
            correctAnswer: 1,
            explanation: "Trees give us fresh air and clean oxygen to breathe.",
            hindiExplanation: "पेड़ हमें स्वच्छ हवा और सांस लेने के लिए साफ ऑक्सीजन देते हैं।"
          },
          {
            id: "4",
            type: "multiple-choice",
            question: "How should we use water?",
            hindiQuestion: "हमें पानी का उपयोग कैसे करना चाहिए?",
            options: ["Waste it", "Use it carefully", "Leave taps open", "Pollute it"],
            correctAnswer: 1,
            explanation: "We should use water carefully because it is precious and limited.",
            hindiExplanation: "हमें पानी का सावधानी से उपयोग करना चाहिए क्योंकि यह कीमती और सीमित है।"
          },
          {
            id: "5",
            type: "multiple-choice",
            question: "What happens when we cut too many trees?",
            hindiQuestion: "जब हम बहुत सारे पेड़ काटते हैं तो क्या होता है?",
            options: ["More oxygen", "Pollution increases", "Better air", "More rain"],
            correctAnswer: 1,
            explanation: "When we cut trees, pollution increases and we get less clean air.",
            hindiExplanation: "जब हम पेड़ काटते हैं, तो प्रदूषण बढ़ता है और हमें कम स्वच्छ हवा मिलती है।"
          }
        ];
    }
  };

  const questions = getQuestionsForSubject();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer • कृपया एक उत्तर चुनें",
        variant: "destructive"
      });
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = isCorrect;
    setAnsweredQuestions(newAnsweredQuestions);

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! • सही!",
        description: "Great job! • बहुत बढ़िया!",
        variant: "default"
      });
    } else {
      toast({
        title: "Try again! • फिर कोशिश करें!",
        description: "Don't worry, keep learning! • चिंता न करें, सीखते रहें!",
        variant: "destructive"
      });
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Show final score
      toast({
        title: `Lesson Complete! • पाठ पूरा!`,
        description: `You scored ${score}/${questions.length}! • आपका स्कोर ${score}/${questions.length}!`,
      });
    }
  };

  const playAudio = () => {
    // Audio functionality would be implemented here
    toast({
      title: "Audio playing... • ऑडियो चल रहा है...",
      description: "Voice assistance feature • आवाज सहायता सुविधा"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="touch-target"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <img
                  src={subject.character}
                  alt={subject.title}
                  className="w-12 h-12 animate-bounce-gentle"
                />
                <div>
                  <h1 className="text-xl font-bold">
                    {subject.title} • {subject.hindiTitle}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={playAudio}
              className="touch-target"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round(progress)}% complete • {Math.round(progress)}% पूर्ण
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 shadow-medium">
          {/* Question */}
          <div className="mb-8">
            <div className={`${subject.gradientClass} p-6 rounded-xl text-white mb-6`}>
              <h2 className="text-2xl font-bold mb-2">
                {currentQuestion.question}
              </h2>
              <p className="text-lg opacity-90">
                {currentQuestion.hindiQuestion}
              </p>
            </div>
          </div>

          {/* Options */}
          {currentQuestion.type === "multiple-choice" && (
            <div className="space-y-4 mb-8">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    w-full p-6 text-left rounded-xl border-2 transition-all duration-300
                    ${selectedAnswer === index
                      ? 'border-primary bg-primary/10 shadow-medium'
                      : 'border-border hover:border-primary/50 hover:shadow-soft'}
                    ${showResult && index === currentQuestion.correctAnswer
                      ? 'border-success bg-success/10'
                      : ''}
                    ${showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'border-destructive bg-destructive/10'
                      : ''}
                    disabled:cursor-not-allowed
                    touch-target text-lg font-semibold
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center
                      ${selectedAnswer === index ? 'border-primary bg-primary text-white' : 'border-gray-300'}
                    `}>
                      {selectedAnswer === index ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <Star className="w-6 h-6 text-success ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Result Explanation */}
          {showResult && (
            <Card className="p-6 mb-8 bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold">Explanation • स्पष्टीकरण</h3>
              </div>
              <p className="text-foreground mb-2">{currentQuestion.explanation}</p>
              <p className="text-muted-foreground">{currentQuestion.hindiExplanation}</p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="flex-1 py-6 text-lg font-bold bg-gradient-primary hover:shadow-medium transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Submit Answer • उत्तर जमा करें
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex-1 py-6 text-lg font-bold bg-gradient-success hover:shadow-medium transform transition-all duration-300 hover:scale-105"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question • अगला प्रश्न"
                  : "Complete Lesson • पाठ पूरा करें"}
              </Button>
            )}
          </div>
        </Card>

        {/* Score Display */}
        <Card className="mt-6 p-4 bg-gradient-secondary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6" />
              <span className="font-semibold">Current Score • वर्तमान स्कोर</span>
            </div>
            <span className="text-2xl font-bold">
              {score}/{questions.length}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LessonInterface;