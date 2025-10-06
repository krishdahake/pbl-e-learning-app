import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, BookOpen, Star } from "lucide-react";

interface GradeSelectionProps {
  onGradeSelected: (grade: number, name: string) => void;
}

const GradeSelection = ({ onGradeSelected }: GradeSelectionProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [name, setName] = useState("");
  const { toast } = useToast();

  const grades = [
    { number: 1, label: "Grade 1", description: "आयु 6-7 साल • Age 6-7 years", color: "bg-gradient-language" },
    { number: 2, label: "Grade 2", description: "आयु 7-8 साल • Age 7-8 years", color: "bg-gradient-science" },
    { number: 3, label: "Grade 3", description: "आयु 8-9 साल • Age 8-9 years", color: "bg-gradient-math" },
    { number: 4, label: "Grade 4", description: "आयु 9-10 साल • Age 9-10 years", color: "bg-gradient-environment" },
    { number: 5, label: "Grade 5", description: "आयु 10-11 साल • Age 10-11 years", color: "bg-gradient-primary" },
  ];

  const handleContinue = () => {
    if (!selectedGrade || !name.trim()) {
      toast({
        title: "कृपया सभी जानकारी भरें • Please fill all information",
        description: "कक्षा और नाम दोनों जरूरी हैं • Both grade and name are required",
        variant: "destructive",
      });
      return;
    }
    
    onGradeSelected(selectedGrade, name.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary p-4 rounded-full shadow-glow animate-bounce-gentle">
              <BookOpen className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            शिक्षा मित्र • Learning Friend
          </h1>
          <p className="text-xl text-muted-foreground">
            अपनी कक्षा चुनें और सीखना शुरू करें • Choose your grade and start learning
          </p>
        </div>

        {/* Name Input */}
        <Card className="p-6 shadow-medium">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-primary" />
              <label className="text-lg font-semibold">
                आपका नाम • Your Name
              </label>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="यहाँ अपना नाम लिखें • Enter your name here"
              className="w-full p-4 text-lg border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-smooth"
              maxLength={50}
            />
          </div>
        </Card>

        {/* Grade Selection */}
        <Card className="p-6 shadow-medium">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">
                अपनी कक्षा चुनें • Choose Your Grade
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grades.map((grade) => (
                <button
                  key={grade.number}
                  onClick={() => setSelectedGrade(grade.number)}
                  className={`
                    p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                    ${selectedGrade === grade.number
                      ? 'ring-4 ring-primary shadow-strong scale-105'
                      : 'hover:shadow-medium'}
                    ${grade.color} text-white font-semibold text-center
                  `}
                >
                  <div className="text-3xl font-bold mb-2">{grade.number}</div>
                  <div className="text-lg mb-1">{grade.label}</div>
                  <div className="text-sm opacity-90">{grade.description}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedGrade || !name.trim()}
            className="px-12 py-6 text-xl font-bold bg-gradient-primary hover:shadow-glow transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            शुरू करें • Start Learning
            <BookOpen className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GradeSelection;