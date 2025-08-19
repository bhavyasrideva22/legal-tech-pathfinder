import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Scale, 
  Cog, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Zap
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Psychological Assessment",
      description: "Evaluate personality traits, interests, and cognitive alignment for Legal Tech roles"
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Technical Evaluation",
      description: "Test your knowledge of legal processes, technology concepts, and domain expertise"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis across Will, Interest, Skill, Cognitive readiness, Ability, and Real-world alignment"
    }
  ];

  const roles = [
    "Legal Tech Consultant",
    "Legal Operations Specialist", 
    "Legal Innovation Manager",
    "Legal Automation Engineer",
    "Legal Solution Architect"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Career Assessment
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-tech bg-clip-text text-transparent">
            Legal Tech Consultant
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Is a Career as a Legal Tech Consultant Right for You?
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover your fit for bridging law and technology through our comprehensive assessment system
          </p>

          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate('/assessment/intro')}
            className="group"
          >
            Start Your Assessment
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* What is Legal Tech Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">What is Legal Tech Consulting?</h2>
                  <p className="text-muted-foreground mb-6">
                    Legal Tech Consultants bridge the gap between law and technology. They help legal 
                    departments and law firms implement, integrate, and optimize tools like e-discovery 
                    platforms, contract lifecycle management systems, legal analytics tools, and 
                    AI-driven document review systems.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-tech mr-2" />
                      Implement legal technology solutions
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-tech mr-2" />
                      Train legal teams on new tools
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-tech mr-2" />
                      Optimize legal workflows and processes
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Typical Roles in Legal Tech:</h3>
                  <div className="grid gap-2">
                    {roles.map((role, index) => (
                      <Badge key={index} variant="outline" className="justify-start p-3">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered assessment evaluates your suitability across multiple dimensions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-0 bg-card/80 backdrop-blur">
                <CardContent className="p-0">
                  <div className="text-tech mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Legal Tech Potential?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take our comprehensive assessment to get personalized insights into your career readiness and next steps
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="assessment" 
              size="lg"
              onClick={() => navigate('/assessment/intro')}
              className="group"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Begin Assessment
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;