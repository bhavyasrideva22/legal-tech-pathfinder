import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "@/contexts/AssessmentContext";
import { assessmentSections } from "@/data/questions";
import { Question } from "@/types/assessment";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Brain,
  Cog,
  Target
} from "lucide-react";

const LikertScale = ({ question, value, onChange }: {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}) => {
  const options = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              value === option.value
                ? 'border-tech bg-tech/10 shadow-md'
                : 'border-border hover:border-tech/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              {value === option.value && (
                <CheckCircle className="h-5 w-5 text-tech" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const MultipleChoice = ({ question, value, onChange }: {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(option)}
          className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
            value === option
              ? 'border-tech bg-tech/10 shadow-md'
              : 'border-border hover:border-tech/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{option}</span>
            {value === option && (
              <CheckCircle className="h-5 w-5 text-tech" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

const AssessmentFlow = () => {
  const navigate = useNavigate();
  const { state, addAnswer, calculateResults } = useAssessment();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  
  const totalQuestions = assessmentSections.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionNumber = assessmentSections
    .slice(0, currentSectionIndex)
    .reduce((acc, section) => acc + section.questions.length, 0) + currentQuestionIndex + 1;

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const getCurrentAnswer = () => {
    return state.answers.find(a => a.questionId === currentQuestion?.id);
  };

  const handleAnswer = (value: number | string) => {
    if (!currentQuestion) return;
    
    addAnswer({
      questionId: currentQuestion.id,
      value
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      calculateResults();
      navigate('/assessment/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(assessmentSections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'psychometric':
        return <Brain className="h-5 w-5" />;
      case 'technical':
        return <Cog className="h-5 w-5" />;
      case 'wiscar':
        return <Target className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const currentAnswer = getCurrentAnswer();
  const canProceed = currentAnswer !== undefined;

  if (!currentSection || !currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline">
              Question {currentQuestionNumber} of {totalQuestions}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              {getSectionIcon(currentSection.id)}
              <span className="ml-2">{currentSection.title}</span>
            </Badge>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{Math.round(progress)}% Complete</span>
            <span>{currentSection.description}</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
            {currentQuestion.category && (
              <Badge variant="outline" className="w-fit">
                {currentQuestion.category}
              </Badge>
            )}
          </CardHeader>
          
          <CardContent>
            {currentQuestion.type === 'likert' && (
              <LikertScale
                question={currentQuestion}
                value={currentAnswer?.value as number}
                onChange={handleAnswer}
              />
            )}
            
            {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'single-choice') && (
              <MultipleChoice
                question={currentQuestion}
                value={currentAnswer?.value as string}
                onChange={handleAnswer}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            variant="assessment"
            onClick={handleNext}
            disabled={!canProceed}
          >
            {currentSectionIndex === assessmentSections.length - 1 && 
             currentQuestionIndex === currentSection.questions.length - 1 
              ? 'Complete Assessment' 
              : 'Next Question'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;