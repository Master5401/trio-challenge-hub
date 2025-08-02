import { useEffect, useState } from "react";
import gobletImage from "@/assets/goblet-of-fire.jpg";

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-magic to-background"></div>
      
      <div className="relative z-10 text-center">
        <div className="floating fire-effect rounded-full p-8 mb-8 inline-block">
          <img 
            src={gobletImage} 
            alt="Goblet of Fire" 
            className="w-32 h-32 object-contain"
          />
        </div>
        
        <div className="fade-in-up">
          <h1 className="text-6xl font-bold magic-text mb-4">
            GenAisis
          </h1>
          <p className="text-2xl text-primary/80 font-semibold">
            Triwizard Challenge
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-gradient-to-r from-fire to-fire-glow rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;