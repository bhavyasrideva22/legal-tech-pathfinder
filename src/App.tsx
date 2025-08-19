import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import Index from "./pages/Index";
import AssessmentIntroPage from "./pages/AssessmentIntroPage";
import AssessmentPage from "./pages/AssessmentPage";
import AssessmentResultsPage from "./pages/AssessmentResultsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AssessmentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment/intro" element={<AssessmentIntroPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/assessment/results" element={<AssessmentResultsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
