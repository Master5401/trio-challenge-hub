import { useState, useEffect } from "react";
import PreLoader from "@/components/PreLoader";
import WelcomePage from "@/components/WelcomePage";
import DumbledoreChallenge from "@/components/DumbledoreChallenge";
import CodingChallenge from "@/components/CodingChallenge";
import MLChallenge from "@/components/MLChallenge";
import { Card } from "@/components/ui/card";

type Stage = "preloader" | "welcome" | "dumbledore" | "coding" | "ml" | "complete";

const Index = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("preloader");

  const nextStage = () => {
    switch (currentStage) {
      case "preloader":
        setCurrentStage("welcome");
        break;
      case "welcome":
        setCurrentStage("dumbledore");
        break;
      case "dumbledore":
        setCurrentStage("coding");
        break;
      case "coding":
        setCurrentStage("ml");
        break;
      case "ml":
        setCurrentStage("complete");
        break;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background magical effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-fire rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-magic-purple rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-accent rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Stage Components */}
      {currentStage === "preloader" && <PreLoader onComplete={nextStage} />}
      {currentStage === "welcome" && <WelcomePage onComplete={nextStage} />}
      {currentStage === "dumbledore" && <DumbledoreChallenge onComplete={nextStage} />}
      {currentStage === "coding" && <CodingChallenge onComplete={nextStage} />}
      {currentStage === "ml" && <MLChallenge onComplete={nextStage} />}
      
      {/* Completion Page */}
      {currentStage === "complete" && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-12 text-center max-w-2xl">
            <div className="fire-effect rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
            <h1 className="text-5xl font-bold magic-text mb-6">
              Congratulations, Champion!
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              You have successfully completed all three challenges of the GenAisis Triwizard Tournament. 
              Your wisdom, coding prowess, and magical machine learning skills have proven you worthy 
              of the ultimate prize.
            </p>
            <div className="space-y-4 text-lg">
              <div className="flex items-center justify-center gap-4">
                <span className="text-primary">✓</span>
                <span>Wisdom Challenge - Completed</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-primary">✓</span>
                <span>Coding Challenge - Completed</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-primary">✓</span>
                <span>ML Challenge - Completed</span>
              </div>
            </div>
            <p className="text-fire font-semibold text-xl mt-8">
              Welcome to GenAisis - You are now a true digital wizard! 🪄
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
