import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Psychological Fit Assessment',
    description: 'Understanding your personality traits, interests, and cognitive style for Legal Tech Consulting.',
    questions: [
      {
        id: 'psych-1',
        type: 'likert',
        section: 'psychometric',
        category: 'Interest',
        question: 'I enjoy finding ways to improve legal work with automation and technology.',
        required: true,
      },
      {
        id: 'psych-2',
        type: 'likert',
        section: 'psychometric',
        category: 'Personality',
        question: 'I can stay focused on long, detailed documents and complex processes.',
        required: true,
      },
      {
        id: 'psych-3',
        type: 'multiple-choice',
        section: 'psychometric',
        category: 'Cognitive Style',
        question: 'When approaching a new project, I prefer to:',
        options: [
          'Start with a detailed checklist and systematic approach',
          'Brainstorm creative solutions first, then organize',
          'Research best practices and follow proven methods',
          'Jump in and figure it out as I go'
        ],
        required: true,
      },
      {
        id: 'psych-4',
        type: 'likert',
        section: 'psychometric',
        category: 'Motivation',
        question: 'I am motivated by the opportunity to modernize how law firms and legal departments work.',
        required: true,
      },
      {
        id: 'psych-5',
        type: 'likert',
        section: 'psychometric',
        category: 'Ethics',
        question: 'I understand the importance of confidentiality and ethical considerations in legal technology.',
        required: true,
      },
      {
        id: 'psych-6',
        type: 'likert',
        section: 'psychometric',
        category: 'Communication',
        question: 'I enjoy explaining complex technical concepts to non-technical stakeholders.',
        required: true,
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Domain Knowledge',
    description: 'Evaluating your current technical skills and legal domain knowledge.',
    questions: [
      {
        id: 'tech-1',
        type: 'multiple-choice',
        section: 'technical',
        category: 'Legal Knowledge',
        question: 'What is e-discovery in the legal context?',
        options: [
          'The process of digitizing physical legal documents',
          'Electronic identification, collection, and production of electronically stored information',
          'A method for encrypting sensitive legal data',
          'A system for scheduling legal proceedings'
        ],
        required: true,
      },
      {
        id: 'tech-2',
        type: 'multiple-choice',
        section: 'technical',
        category: 'Legal Knowledge',
        question: 'Due diligence in legal tech typically refers to:',
        options: [
          'Regular system maintenance and updates',
          'Investigation and evaluation process for legal transactions',
          'Training legal staff on new technology',
          'Compliance with data protection regulations'
        ],
        required: true,
      },
      {
        id: 'tech-3',
        type: 'multiple-choice',
        section: 'technical',
        category: 'Tech Concepts',
        question: 'What is an API in the context of legal software?',
        options: [
          'A security protocol for legal documents',
          'An interface that allows different software systems to communicate',
          'A type of legal contract template',
          'A method for backing up legal data'
        ],
        required: true,
      },
      {
        id: 'tech-4',
        type: 'multiple-choice',
        section: 'technical',
        category: 'Legal Tech Tools',
        question: 'CLM in legal technology stands for:',
        options: [
          'Client Lifecycle Management',
          'Contract Lifecycle Management',
          'Case Law Management',
          'Compliance and Legal Monitoring'
        ],
        required: true,
      },
      {
        id: 'tech-5',
        type: 'likert',
        section: 'technical',
        category: 'Technical Skills',
        question: 'I am comfortable working with databases and understanding how data flows between systems.',
        required: true,
      },
      {
        id: 'tech-6',
        type: 'likert',
        section: 'technical',
        category: 'Analytical Thinking',
        question: 'I can analyze complex workflows and identify opportunities for automation.',
        required: true,
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive evaluation of your readiness across six critical dimensions.',
    questions: [
      {
        id: 'wiscar-1',
        type: 'likert',
        section: 'wiscar',
        category: 'Will',
        question: 'I follow through on projects even when they become technically challenging.',
        required: true,
      },
      {
        id: 'wiscar-2',
        type: 'likert',
        section: 'wiscar',
        category: 'Will',
        question: 'I am committed to continuous learning in both legal and technical domains.',
        required: true,
      },
      {
        id: 'wiscar-3',
        type: 'likert',
        section: 'wiscar',
        category: 'Interest',
        question: 'I find it exciting to solve technology problems in legal settings.',
        required: true,
      },
      {
        id: 'wiscar-4',
        type: 'likert',
        section: 'wiscar',
        category: 'Interest',
        question: 'I enjoy staying up-to-date with the latest legal technology trends.',
        required: true,
      },
      {
        id: 'wiscar-5',
        type: 'likert',
        section: 'wiscar',
        category: 'Skill',
        question: 'I have experience with project management and implementation processes.',
        required: true,
      },
      {
        id: 'wiscar-6',
        type: 'likert',
        section: 'wiscar',
        category: 'Skill',
        question: 'I can effectively train others on new software and systems.',
        required: true,
      },
      {
        id: 'wiscar-7',
        type: 'likert',
        section: 'wiscar',
        category: 'Cognitive',
        question: 'I can break down complex problems into manageable components.',
        required: true,
      },
      {
        id: 'wiscar-8',
        type: 'likert',
        section: 'wiscar',
        category: 'Ability',
        question: 'Feedback helps me improve my performance rapidly.',
        required: true,
      },
      {
        id: 'wiscar-9',
        type: 'likert',
        section: 'wiscar',
        category: 'Ability',
        question: 'I adapt quickly to new software tools and platforms.',
        required: true,
      },
      {
        id: 'wiscar-10',
        type: 'single-choice',
        section: 'wiscar',
        category: 'Real World',
        question: 'Which activity would you find most engaging?',
        options: [
          'Testing and deploying new legal tech tools',
          'Training legal staff on technology adoption',
          'Analyzing legal processes for improvement opportunities',
          'Managing technology vendor relationships'
        ],
        required: true,
      }
    ]
  }
];