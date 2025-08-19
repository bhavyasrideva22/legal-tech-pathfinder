export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'single-choice';
  question: string;
  section: 'psychometric' | 'technical' | 'wiscar';
  category?: string;
  options?: string[];
  required: boolean;
}

export interface Answer {
  questionId: string;
  value: number | string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResults {
  psychometricFit: number;
  technicalReadiness: number;
  wiscarScores: WiscarScores;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  confidenceLevel: 'high' | 'moderate' | 'low';
  nextSteps: string[];
  careerMatches: Array<{
    role: string;
    match: number;
  }>;
  alternativePaths: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  results?: AssessmentResults;
  isComplete: boolean;
}