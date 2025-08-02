import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import harryImage from "@/assets/harry-battle.jpg";
import voldemortImage from "@/assets/voldemort-battle.jpg";
import { toast } from "sonner";

interface MLChallengeProps {
  onComplete: () => void;
}

const MLChallenge = ({ onComplete }: MLChallengeProps) => {
  const [accuracy, setAccuracy] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setIsUploaded(true);
      setIsEvaluating(true);
      toast("Dataset uploaded! Evaluating your magical predictions...");
      
      // Simulate evaluation process
      setTimeout(() => {
        const randomAccuracy = Math.random() * 40 + 60; // 60-100% accuracy
        setAccuracy(randomAccuracy);
        setIsEvaluating(false);
        
        if (randomAccuracy >= 85) {
          toast("Outstanding! Your model shows exceptional power!");
          setTimeout(() => {
            toast("Congratulations! You have completed all challenges!");
            onComplete();
          }, 3000);
        } else if (randomAccuracy >= 70) {
          toast("Good work! Your model shows promise.");
        } else {
          toast("Your model needs more training. Try improving your approach!");
        }
      }, 3000);
    } else {
      toast("Please upload a valid CSV file!");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Calculate positions based on accuracy
  const harryPosition = Math.max(10, Math.min(80, accuracy));
  const voldemortPosition = 100 - harryPosition;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold magic-text mb-2">Challenge 3</h2>
          <p className="text-primary/80 text-lg">The Final Battle - ML Prediction Challenge</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenge Description */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-6">
            <h3 className="text-2xl font-bold text-primary mb-4">The Prophecy Dataset</h3>
            <div className="space-y-4 text-foreground/80">
              <p>
                Your final challenge involves predicting magical outcomes using machine learning.
                The fate of the wizarding world depends on the accuracy of your predictions!
              </p>
              <div className="bg-dark-magic/30 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Dataset Information:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Magical creature behavior patterns</li>
                  <li>• Spell effectiveness measurements</li>
                  <li>• Potion brewing success rates</li>
                  <li>• Weather influence on magic</li>
                </ul>
              </div>
              <div className="bg-fire/20 p-4 rounded-lg border border-fire/30">
                <h4 className="font-semibold text-fire mb-2">Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Upload your predictions as a CSV file</li>
                  <li>• Achieve 85%+ accuracy to win the battle</li>
                  <li>• Format: prediction_id, predicted_value</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
              />
              <Button 
                onClick={handleUploadClick}
                className="w-full bg-fire hover:bg-fire/80 text-dark-magic"
                disabled={isEvaluating}
              >
                {isEvaluating ? "Evaluating..." : "Upload Predictions"}
              </Button>
            </div>
          </Card>

          {/* Battle Animation */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-6">
            <h3 className="text-xl font-bold text-primary mb-4">The Final Duel</h3>
            
            {/* Battle Arena */}
            <div className="relative h-96 bg-gradient-to-b from-dark-magic to-background rounded-lg overflow-hidden border border-magic-purple/30">
              
              {/* Spell Beam */}
              {isUploaded && (
                <div 
                  className="absolute top-1/2 h-2 bg-gradient-to-r from-fire via-magic-blue to-magic-purple transform -translate-y-1/2 transition-all duration-1000"
                  style={{
                    left: `${harryPosition}%`,
                    width: `${Math.abs(voldemortPosition - harryPosition)}%`,
                  }}
                >
                  <div className="w-full h-full animate-pulse"></div>
                </div>
              )}
              
              {/* Harry Potter */}
              <div 
                className="absolute bottom-4 w-20 h-24 transition-all duration-1000 ease-out"
                style={{ left: `${harryPosition}%`, transform: 'translateX(-50%)' }}
              >
                <img 
                  src={harryImage}
                  alt="Harry Potter"
                  className="w-full h-full object-cover rounded-lg magic-glow"
                />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-primary">
                  Harry
                </div>
              </div>
              
              {/* Voldemort */}
              <div 
                className="absolute bottom-4 w-20 h-24 transition-all duration-1000 ease-out"
                style={{ right: `${voldemortPosition}%`, transform: 'translateX(50%)' }}
              >
                <img 
                  src={voldemortImage}
                  alt="Voldemort"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-destructive">
                  Voldemort
                </div>
              </div>
            </div>
            
            {/* Accuracy Display */}
            {isUploaded && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-primary">Model Accuracy</span>
                  <span className="text-sm font-bold text-fire">
                    {isEvaluating ? "Evaluating..." : `${accuracy.toFixed(1)}%`}
                  </span>
                </div>
                <Progress 
                  value={accuracy} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
            
            {!isUploaded && (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">Upload your predictions to begin the final battle!</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MLChallenge;