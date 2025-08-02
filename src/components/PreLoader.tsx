import { useEffect, useState } from "react";
import gobletImage from "@/assets/goblet-of-fire.jpg";

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [phase, setPhase] = useState<"entrance" | "goblet-glow" | "paper-emerge" | "text-reveal" | "exit">("entrance");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const phases = [
      { phase: "goblet-glow", delay: 1000 },
      { phase: "paper-emerge", delay: 2000 },
      { phase: "text-reveal", delay: 3500 },
      { phase: "exit", delay: 6000 }
    ];

    const timers = phases.map(({ phase: nextPhase, delay }) =>
      setTimeout(() => setPhase(nextPhase as any), delay)
    );

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 800);
    }, 7000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-800 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Dynamic magical background with floating particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-magic via-background to-dark-magic">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Swirling magical energy */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-magic-purple/10 to-transparent animate-spin" 
             style={{ animationDuration: '20s' }} />
      </div>
      
      <div className="relative z-10 text-center">
        {/* Goblet with dynamic effects */}
        <div className="relative mb-12">
          <div className={`goblet-container relative transition-all duration-1000 ${
            phase === "goblet-glow" ? 'scale-110' : 'scale-100'
          }`}>
            <div className={`fire-effect rounded-full p-8 inline-block transition-all duration-1000 ${
              phase === "goblet-glow" ? 'shadow-2xl' : ''
            }`}>
              <img 
                src={gobletImage} 
                alt="Goblet of Fire" 
                className={`w-40 h-40 object-contain transition-all duration-1000 ${
                  phase === "goblet-glow" ? 'brightness-125 contrast-110' : ''
                }`}
              />
              
              {/* Magical flames emanating from goblet */}
              {phase !== "entrance" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-gradient-to-t from-fire via-fire-glow to-transparent rounded-full 
                                opacity-60 animate-pulse blur-sm" />
                </div>
              )}
            </div>
            
            {/* Parchment emerging from goblet */}
            {(phase === "paper-emerge" || phase === "text-reveal" || phase === "exit") && (
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-2000 ${
                phase === "paper-emerge" ? '-translate-y-8 opacity-70' : 
                phase === "text-reveal" ? '-translate-y-16 opacity-90' : 
                '-translate-y-20 opacity-100'
              }`}>
                <div className="parchment rounded-lg p-6 shadow-2xl transform rotate-1 w-80">
                  <div className={`transition-all duration-1000 ${
                    phase === "text-reveal" || phase === "exit" ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <h1 className="text-3xl font-bold text-dark-magic mb-2 font-serif">
                      The GenAisis
                    </h1>
                    <h2 className="text-2xl font-semibold text-fire mb-1 font-serif">
                      Triwizard Challenge
                    </h2>
                    <p className="text-sm text-dark-magic/80 font-medium">
                      Awaits the worthy...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mystical loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-fire to-fire-glow rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        
        {/* Arcane symbols rotating around */}
        <div className="absolute inset-0 pointer-events-none">
          {['✦', '◆', '✧', '◇'].map((symbol, i) => (
            <div
              key={symbol}
              className={`absolute text-primary/40 text-2xl transition-all duration-1000 ${
                phase !== "entrance" ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${50 + 30 * Math.cos(i * Math.PI / 2)}%`,
                top: `${50 + 30 * Math.sin(i * Math.PI / 2)}%`,
                animation: `spin 10s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreLoader;