import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentState, Answer, AssessmentResults } from '@/types/assessment';

interface AssessmentContextType {
  state: AssessmentState;
  addAnswer: (answer: Answer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToSection: (section: number) => void;
  calculateResults: () => void;
  resetAssessment: () => void;
}

type AssessmentAction =
  | { type: 'ADD_ANSWER'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'GO_TO_SECTION'; payload: number }
  | { type: 'SET_RESULTS'; payload: AssessmentResults }
  | { type: 'RESET' };

const initialState: AssessmentState = {
  currentSection: 0,
  currentQuestion: 0,
  answers: [],
  isComplete: false,
};

const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'ADD_ANSWER':
      const existingIndex = state.answers.findIndex(a => a.questionId === action.payload.questionId);
      const newAnswers = existingIndex >= 0 
        ? state.answers.map((a, i) => i === existingIndex ? action.payload : a)
        : [...state.answers, action.payload];
      
      return { ...state, answers: newAnswers };
    
    case 'NEXT_QUESTION':
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    
    case 'PREVIOUS_QUESTION':
      return { ...state, currentQuestion: Math.max(0, state.currentQuestion - 1) };
    
    case 'GO_TO_SECTION':
      return { ...state, currentSection: action.payload, currentQuestion: 0 };
    
    case 'SET_RESULTS':
      return { ...state, results: action.payload, isComplete: true };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const addAnswer = (answer: Answer) => {
    dispatch({ type: 'ADD_ANSWER', payload: answer });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const goToSection = (section: number) => {
    dispatch({ type: 'GO_TO_SECTION', payload: section });
  };

  const calculateResults = () => {
    // Simplified scoring logic - in real app this would be more sophisticated
    const psychometricScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const technicalScore = Math.floor(Math.random() * 40) + 60; // 60-100
    
    const wiscarScores = {
      will: Math.floor(Math.random() * 30) + 70,
      interest: Math.floor(Math.random() * 30) + 70,
      skill: Math.floor(Math.random() * 40) + 60,
      cognitive: Math.floor(Math.random() * 30) + 70,
      ability: Math.floor(Math.random() * 30) + 70,
      realWorld: Math.floor(Math.random() * 30) + 70,
    };

    const overallScore = Math.round(
      (psychometricScore + technicalScore + 
       Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3
    );

    const recommendation = overallScore >= 80 ? 'yes' : overallScore >= 60 ? 'maybe' : 'no';
    const confidenceLevel = overallScore >= 80 ? 'high' : overallScore >= 60 ? 'moderate' : 'low';

    const results: AssessmentResults = {
      psychometricFit: psychometricScore,
      technicalReadiness: technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      confidenceLevel,
      nextSteps: [
        'Enroll in a CLM (Contract Lifecycle Management) bootcamp',
        'Learn legal workflow tools like HighQ or Ironclad',
        'Study e-discovery platforms and processes',
        'Get familiar with legal analytics tools'
      ],
      careerMatches: [
        { role: 'Legal Tech Consultant', match: Math.max(85, overallScore) },
        { role: 'Legal Operations Analyst', match: Math.max(75, overallScore - 10) },
        { role: 'CLM Specialist', match: Math.max(70, overallScore - 15) },
        { role: 'Legal Innovation Manager', match: Math.max(80, overallScore - 5) }
      ],
      alternativePaths: [
        'Legal Operations Assistant',
        'Paralegal with Tech Focus',
        'Legal Support Specialist'
      ]
    };

    dispatch({ type: 'SET_RESULTS', payload: results });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <AssessmentContext.Provider value={{
      state,
      addAnswer,
      nextQuestion,
      previousQuestion,
      goToSection,
      calculateResults,
      resetAssessment,
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};