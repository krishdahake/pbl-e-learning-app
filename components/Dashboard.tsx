import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SubjectCard from "./SubjectCard";
import LessonInterface from "./LessonInterface";
import { User, Settings, Award, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Character imports
import mathCharacter from "@/assets/math-character.png";
import scienceCharacter from "@/assets/science-character.png";
import languageCharacter from "@/assets/language-character.png";
import environmentCharacter from "@/assets/environment-character.png";

interface DashboardProps {
  studentName: string;
  grade: number;
}

interface Subject {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  character: string;
  gradientClass: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastActivity: string;
}

const Dashboard = ({ studentName, grade }: DashboardProps) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const { toast } = useToast();

  const subjects: Subject[] = [
    {
      id: "math",
      title: "Mathematics",
      hindiTitle: "गणित",
      description: "Numbers, counting, and fun calculations • संख्या, गिनती और मजेदार गणना",
      character: mathCharacter,
      gradientClass: "bg-gradient-math",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      lastActivity: "2 days ago",
    },
    {
      id: "science",
      title: "Science",
      hindiTitle: "विज्ञान",
      description: "Explore the world around us • हमारे आसपास की दुनिया की खोज करें",
      character: scienceCharacter,
      gradientClass: "bg-gradient-science",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      lastActivity: "1 day ago",
    },
    {
      id: "language",
      title: "Language",
      hindiTitle: "भाषा",
      description: "Reading, writing, and storytelling • पढ़ना, लिखना और कहानी सुनाना",
      character: languageCharacter,
      gradientClass: "bg-gradient-language",
      progress: 80,
      totalLessons: 30,
      completedLessons: 24,
      lastActivity: "Today",
    },
    {
      id: "environment",
      title: "Environmental Studies",
      hindiTitle: "पर्यावरण अध्ययन",
      description: "Nature, animals, and our planet • प्रकृति, जानवर और हमारा ग्रह",
      character: environmentCharacter,
      gradientClass: "bg-gradient-environment",
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      lastActivity: "3 days ago",
    },
  ];

  const totalProgress = Math.round(
    subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length
  );

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    toast({
      title: `${subject.title} • ${subject.hindiTitle}`,
      description: "Loading your lessons... • आपके पाठ लोड हो रहे हैं...",
    });
  };

  const handleBackToDashboard = () => {
    setSelectedSubject(null);
  };

  if (selectedSubject) {
    return (
      <LessonInterface
        subject={selectedSubject}
        studentName={studentName}
        grade={grade}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  नमस्ते {studentName}! • Hello {studentName}!
                </h1>
                <p className="text-muted-foreground">
                  Grade {grade} • कक्षा {grade}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="touch-target">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="p-6 mb-8 shadow-medium">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-warning" />
              <div>
                <h2 className="text-2xl font-bold">Your Progress • आपकी प्रगति</h2>
                <p className="text-muted-foreground">Keep up the great work!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{totalProgress}%</div>
              <p className="text-sm text-muted-foreground">Overall</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="text-center p-4 bg-muted/50 rounded-lg">
                <img
                  src={subject.character}
                  alt={subject.title}
                  className="w-12 h-12 mx-auto mb-2 animate-float"
                />
                <div className="font-semibold text-sm">{subject.title}</div>
                <div className="text-lg font-bold text-primary">{subject.progress}%</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Subjects Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">
              Choose a Subject • एक विषय चुनें
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                {...subject}
                onClick={() => handleSubjectClick(subject)}
              />
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="mt-8 p-6 bg-gradient-primary text-white">
          <h3 className="text-xl font-bold mb-3">
            Learning Tips • सीखने की युक्तियाँ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Study a little every day • हर दिन थोड़ा सा पढ़ें</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Ask questions when confused • संदेह होने पर प्रश्न पूछें</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Practice makes perfect • अभ्यास से सिद्धि मिलती है</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;