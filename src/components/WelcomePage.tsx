import { useEffect, useState } from "react";
import burningParchment from "@/assets/burning-parchment.jpg";

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage = ({ onComplete }: WelcomePageProps) => {
  const [showText, setShowText] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Show text after a short delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Complete after 7 seconds
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => onComplete(), 1000);
    }, 7000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-1000 ${
      isComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-dark-magic via-background to-dark-magic"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <div className="relative">
          <img 
            src={burningParchment}
            alt="Burning Parchment"
            className="w-full max-w-3xl mx-auto opacity-90 fire-effect rounded-lg"
          />
          
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className={`text-center transition-all duration-2000 ${
              showText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <h1 className="text-5xl md:text-7xl font-bold text-dark-magic mb-6 font-serif">
                Welcome to the
              </h1>
              <h2 className="text-6xl md:text-8xl font-bold text-fire mb-4 font-serif magic-text">
                GenAisis
              </h2>
              <h3 className="text-4xl md:text-5xl font-semibold text-dark-magic font-serif">
                Triwizard Challenge
              </h3>
              
              <p className="text-lg md:text-xl text-dark-magic/80 mt-8 font-medium">
                Prepare yourself for three magical challenges that will test your wit, courage, and skill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;