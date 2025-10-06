import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, Trophy, Clock } from "lucide-react";

interface SubjectCardProps {
  title: string;
  hindiTitle: string;
  description: string;
  character: string;
  gradientClass: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastActivity: string;
  onClick: () => void;
}

const SubjectCard = ({
  title,
  hindiTitle,
  description,
  character,
  gradientClass,
  progress,
  totalLessons,
  completedLessons,
  lastActivity,
  onClick
}: SubjectCardProps) => {
  return (
    <Card className="interactive-card overflow-hidden cursor-pointer group">
      {/* Header with gradient background */}
      <div className={`${gradientClass} p-6 text-white relative overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-20">
          <div className="w-24 h-24 rounded-full bg-white/20 animate-pulse-soft"></div>
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <div className="w-16 h-16 rounded-full bg-white/30 animate-float"></div>
        </div>
        
        {/* Character Image */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <p className="text-lg opacity-90">{hindiTitle}</p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:animate-wiggle">
            <img
              src={character}
              alt={`${title} character`}
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm opacity-80 mb-4">{description}</p>
      </div>

      {/* Content Area */}
      <div className="p-6 space-y-4">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              <span className="font-semibold">Progress • प्रगति</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          
          <Progress value={progress} className="h-3" />
          
          <p className="text-sm text-muted-foreground">
            {progress}% complete • {progress}% पूर्ण
          </p>
        </div>

        {/* Last Activity */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last activity: {lastActivity}</span>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onClick}
          className="w-full py-6 text-lg font-semibold bg-gradient-primary hover:shadow-medium transform transition-all duration-300 hover:scale-105 group-hover:animate-bounce-gentle"
        >
          <Play className="w-5 h-5 mr-2" />
          Continue Learning • सीखना जारी रखें
        </Button>
      </div>
    </Card>
  );
};

export default SubjectCard;