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
      {/* Enhanced mystical background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating mystical particles */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute mystical-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          >
            <div 
              className={`w-1 h-1 rounded-full ${
                i % 4 === 0 ? 'bg-primary' :
                i % 4 === 1 ? 'bg-fire' :
                i % 4 === 2 ? 'bg-magic-purple' : 'bg-accent'
              }`} 
            />
          </div>
        ))}
        
        {/* Arcane symbols floating */}
        {['⚡', '🔮', '✨', '🌟', '⭐', '💫', '🌙', '☄️'].map((symbol, i) => (
          <div
            key={symbol}
            className="absolute arcane-symbol text-2xl opacity-20"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 2.5}s`,
              color: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--fire))'
            }}
          >
            {symbol}
          </div>
        ))}
        
        {/* Magical energy swirls */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magic-purple/5 rounded-full blur-3xl magical-aura" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-fire/5 rounded-full blur-3xl magical-aura" 
               style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl magical-aura" 
               style={{ animationDelay: '6s' }} />
        </div>
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
