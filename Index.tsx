import { useState, useEffect } from "react";
import GradeSelection from "@/components/GradeSelection";
import Dashboard from "@/components/Dashboard";

interface Student {
  name: string;
  grade: number;
}

const Index = () => {
  const [student, setStudent] = useState<Student | null>(null);

  // Check if student info is stored locally
  useEffect(() => {
    const storedStudent = localStorage.getItem("elearning-student");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  const handleGradeSelected = (grade: number, name: string) => {
    const studentData = { name, grade };
    setStudent(studentData);
    localStorage.setItem("elearning-student", JSON.stringify(studentData));
  };

  if (!student) {
    return <GradeSelection onGradeSelected={handleGradeSelected} />;
  }

  return <Dashboard studentName={student.name} grade={student.grade} />;
};

export default Index;
