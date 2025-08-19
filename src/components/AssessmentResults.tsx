import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "@/contexts/AssessmentContext";
import { 
  TrendingUp, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Brain,
  Cog,
  Target,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Star
} from "lucide-react";

const ScoreCard = ({ title, score, icon, description }: {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="shadow-md border-0 bg-card/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="text-tech mr-3">{icon}</div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Badge variant="outline" className={getScoreColor(score)}>
            {score}/100
          </Badge>
        </div>
        <Progress value={score} className="h-3" />
      </CardContent>
    </Card>
  );
};

const WiscarRadar = ({ scores }: { scores: any }) => {
  const dimensions = [
    { key: 'will', label: 'Will', color: 'tech' },
    { key: 'interest', label: 'Interest', color: 'legal' },
    { key: 'skill', label: 'Skill', color: 'tech' },
    { key: 'cognitive', label: 'Cognitive', color: 'legal' },
    { key: 'ability', label: 'Ability', color: 'tech' },
    { key: 'realWorld', label: 'Real World', color: 'legal' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {dimensions.map((dimension) => (
        <div key={dimension.key} className="text-center">
          <div className="mb-2">
            <div className="text-2xl font-bold text-primary">{scores[dimension.key]}</div>
            <div className="text-sm text-muted-foreground">{dimension.label}</div>
          </div>
          <Progress value={scores[dimension.key]} className="h-2" />
        </div>
      ))}
    </div>
  );
};

const AssessmentResults = () => {
  const navigate = useNavigate();
  const { state, resetAssessment } = useAssessment();
  
  if (!state.results) {
    return <div>Loading results...</div>;
  }

  const { results } = state;
  
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'maybe':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'no':
        return <XCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const getRecommendationMessage = () => {
    switch (results.recommendation) {
      case 'yes':
        return "Excellent fit! You show strong potential for a career in Legal Tech Consulting.";
      case 'maybe':
        return "Good potential with some development needed. Consider the recommended next steps.";
      case 'no':
        return "Consider alternative paths that better align with your current profile.";
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return "bg-green-50 border-green-200 text-green-800";
      case 'maybe':
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case 'no':
        return "bg-red-50 border-red-200 text-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Award className="h-4 w-4 mr-2" />
            Assessment Complete
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Your Legal Tech Assessment Results
          </h1>
          
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl font-bold text-primary mr-4">
              {results.overallScore}
            </div>
            <div className="text-left">
              <div className="text-xl font-semibold">Overall Score</div>
              <div className="text-muted-foreground">
                {results.confidenceLevel.charAt(0).toUpperCase() + results.confidenceLevel.slice(1)} Confidence
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation Banner */}
        <Card className={`mb-8 shadow-lg border-2 ${getRecommendationColor()}`}>
          <CardContent className="p-6">
            <div className="flex items-start">
              {getRecommendationIcon()}
              <div className="ml-4">
                <h2 className="text-xl font-bold mb-2">
                  {results.recommendation === 'yes' ? 'Recommended' : 
                   results.recommendation === 'maybe' ? 'Potentially Suitable' : 'Not Recommended'}
                </h2>
                <p className="text-lg">{getRecommendationMessage()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ScoreCard
            title="Psychological Fit"
            score={results.psychometricFit}
            icon={<Brain className="h-6 w-6" />}
            description="Personality and mindset alignment"
          />
          
          <ScoreCard
            title="Technical Readiness"
            score={results.technicalReadiness}
            icon={<Cog className="h-6 w-6" />}
            description="Domain knowledge and technical skills"
          />
        </div>

        {/* WISCAR Framework */}
        <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 mr-2 text-tech" />
              WISCAR Framework Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WiscarRadar scores={results.wiscarScores} />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          
          {/* Career Matches */}
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-legal" />
                Top Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.careerMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">{match.role}</div>
                      <div className="text-sm text-muted-foreground">{match.match}% match</div>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: Math.ceil(match.match / 20) }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-tech" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-tech text-tech-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Paths */}
        {results.alternativePaths.length > 0 && (
          <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Alternative Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.alternativePaths.map((path, index) => (
                  <Badge key={index} variant="outline" className="p-2">
                    {path}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="assessment" size="lg">
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              resetAssessment();
              navigate('/');
            }}
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Take Again
          </Button>
          
          <Button 
            variant="tech" 
            size="lg"
            onClick={() => navigate('/')}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Explore Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;