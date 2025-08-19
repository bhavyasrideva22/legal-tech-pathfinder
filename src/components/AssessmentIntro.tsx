import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Users, 
  Target, 
  Brain, 
  Cog, 
  CheckCircle, 
  ArrowRight,
  AlertCircle
} from "lucide-react";

const AssessmentIntro = () => {
  const navigate = useNavigate();

  const assessmentSections = [
    {
      title: "Psychological Fit",
      description: "Personality traits, interests, and cognitive style assessment",
      questions: 6,
      duration: "5 minutes",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Technical & Domain Knowledge", 
      description: "Legal knowledge, tech concepts, and domain-specific skills",
      questions: 6,
      duration: "8 minutes",
      icon: <Cog className="h-5 w-5" />
    },
    {
      title: "WISCAR Framework",
      description: "Will, Interest, Skill, Cognitive, Ability, Real-world alignment",
      questions: 10,
      duration: "7 minutes",
      icon: <Target className="h-5 w-5" />
    }
  ];

  const traits = [
    "Hybrid thinking: legal + technical mindset",
    "Strong attention to detail and accuracy",
    "Openness to change and innovation",
    "Problem-solving with systems thinking",
    "Excellent communication and training skills"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Clock className="h-4 w-4 mr-2" />
            Total Time: ~20 minutes
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Legal Tech Consultant Assessment
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Evaluate your suitability, readiness, and roadmap to become a Legal Tech Consultant
          </p>
        </div>

        {/* Assessment Overview */}
        <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 mr-2 text-tech" />
              Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {assessmentSections.map((section, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="text-tech">{section.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{section.questions} questions</span>
                      <span>•</span>
                      <span>{section.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traits for Success */}
        <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-legal" />
              Traits That Succeed in Legal Tech
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tech mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-8 shadow-lg border-legal/20 bg-legal-light/10 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-legal mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Important Notes</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Answer honestly for the most accurate results</li>
                  <li>• There are no "right" or "wrong" answers</li>
                  <li>• You can pause and resume the assessment at any time</li>
                  <li>• Results include personalized career recommendations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="assessment" 
            size="xl"
            onClick={() => navigate('/assessment')}
            className="group"
          >
            Start Assessment
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="xl"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;