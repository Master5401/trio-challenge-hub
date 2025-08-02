import { useEffect, useState } from "react";
import gobletImage from "@/assets/goblet-of-fire.jpg";

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [phase, setPhase] = useState<"entrance" | "goblet-glow" | "flames-rise" | "paper-emerge" | "text-reveal" | "exit">("entrance");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const phases = [
      { phase: "goblet-glow", delay: 1500 },
      { phase: "flames-rise", delay: 3000 },
      { phase: "paper-emerge", delay: 4500 },
      { phase: "text-reveal", delay: 6500 },
      { phase: "exit", delay: 9000 }
    ];

    const timers = phases.map(({ phase: nextPhase, delay }) =>
      setTimeout(() => setPhase(nextPhase as any), delay)
    );

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 1000);
    }, 10000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Enhanced magical background with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-magic via-background to-dark-magic">
        {/* Layered magical particles with different speeds */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div 
                className={`rounded-full ${
                  i % 3 === 0 ? 'w-1 h-1 bg-fire' :
                  i % 3 === 1 ? 'w-2 h-2 bg-primary' : 'w-1.5 h-1.5 bg-magic-purple'
                }`}
                style={{
                  boxShadow: i % 3 === 0 ? '0 0 10px hsl(var(--fire))' : 
                            i % 3 === 1 ? '0 0 8px hsl(var(--primary))' : '0 0 6px hsl(var(--magic-purple))'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Swirling magical energy with multiple layers */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magic-purple/8 rounded-full blur-3xl animate-spin" 
               style={{ animationDuration: '25s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fire/8 rounded-full blur-3xl animate-spin" 
               style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/6 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
      
      <div className="relative z-10 text-center">
        {/* Enhanced Goblet with dynamic flame effects */}
        <div className="relative mb-12">
          <div className={`goblet-container relative transition-all duration-2000 ${
            phase === "goblet-glow" ? 'scale-110' : 'scale-100'
          }`}>
            
            {/* Goblet base with enhanced glow */}
            <div className={`relative rounded-full p-8 inline-block transition-all duration-2000 ${
              phase === "goblet-glow" || phase === "flames-rise" ? 'fire-effect' : ''
            }`}>
              <img 
                src={gobletImage} 
                alt="Goblet of Fire" 
                className={`w-40 h-40 object-contain transition-all duration-2000 ${
                  phase === "goblet-glow" ? 'brightness-125 contrast-110 drop-shadow-2xl' : ''
                }`}
              />
              
              {/* Enhanced magical flames with layers */}
              {(phase === "goblet-glow" || phase === "flames-rise" || phase === "paper-emerge" || phase === "text-reveal") && (
                <>
                  {/* Inner flame core */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`bg-gradient-to-t from-fire via-fire-glow to-transparent rounded-full blur-sm transition-all duration-1000 ${
                      phase === "flames-rise" ? 'w-32 h-32 opacity-80' : 'w-20 h-20 opacity-60'
                    }`} style={{ animation: 'fire-flicker 1.5s ease-in-out infinite alternate' }} />
                  </div>
                  
                  {/* Outer flame aura */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`bg-gradient-to-t from-fire/40 via-fire-glow/30 to-primary/20 rounded-full blur-lg transition-all duration-1000 ${
                      phase === "flames-rise" ? 'w-48 h-48 opacity-70' : 'w-28 h-28 opacity-40'
                    }`} style={{ animation: 'fire-flicker 2s ease-in-out infinite alternate-reverse' }} />
                  </div>
                  
                  {/* Flame particles rising */}
                  {phase === "flames-rise" && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-fire rounded-full"
                          style={{
                            left: `${45 + Math.random() * 10}%`,
                            top: `${60 + Math.random() * 10}%`,
                            animation: `flame-particle-rise 2s ease-out infinite`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Enhanced parchment emerging with natural animation */}
            {(phase === "paper-emerge" || phase === "text-reveal" || phase === "exit") && (
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-3000 ease-out ${
                phase === "paper-emerge" ? '-translate-y-4 opacity-60 scale-95 rotate-1' : 
                phase === "text-reveal" ? '-translate-y-12 opacity-90 scale-100 rotate-0' : 
                '-translate-y-16 opacity-100 scale-105 rotate-0'
              }`}>
                <div className="relative">
                  {/* Parchment with enhanced texture and glow */}
                  <div className="parchment rounded-lg p-8 shadow-2xl w-96 relative overflow-hidden"
                       style={{
                         background: 'linear-gradient(135deg, hsl(45 50% 88%), hsl(35 45% 82%), hsl(45 40% 85%))',
                         boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 30px hsl(45 100% 70% / 0.2)',
                         border: '2px solid hsl(45 30% 75%)'
                       }}>
                    
                    {/* Parchment texture overlay */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-amber-900/10 to-amber-800/20 rounded-lg" />
                    
                    {/* Burning edges effect */}
                    <div className="absolute inset-0 rounded-lg"
                         style={{
                           background: 'linear-gradient(45deg, transparent 70%, hsl(15 100% 50% / 0.3) 85%, hsl(25 100% 60% / 0.5) 95%, hsl(15 100% 40% / 0.7) 100%)',
                           animation: 'burning-edge 3s ease-in-out infinite alternate'
                         }} />
                    
                    {/* Text content with enhanced styling */}
                    <div className={`relative z-10 transition-all duration-2000 ${
                      phase === "text-reveal" || phase === "exit" ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}>
                      <h1 className="text-4xl font-bold mb-3 font-serif text-dark-magic"
                          style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px hsl(45 100% 70% / 0.3)',
                            background: 'linear-gradient(135deg, hsl(220 20% 8%), hsl(15 80% 25%))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                        The GenAisis
                      </h1>
                      <h2 className="text-3xl font-semibold mb-2 font-serif"
                          style={{
                            color: 'hsl(15 100% 45%)',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.4), 0 0 8px hsl(15 100% 50% / 0.4)'
                          }}>
                        Triwizard Challenge
                      </h2>
                      <div className="w-24 h-0.5 bg-gradient-to-r from-fire to-fire-glow rounded-full mx-auto mb-3 animate-pulse" />
                      <p className="text-sm font-medium text-dark-magic/90 leading-relaxed"
                         style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                        Three mystical trials await the worthy...
                      </p>
                    </div>
                    
                    {/* Magical sparkles on parchment */}
                    {phase === "text-reveal" && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute text-primary/60 animate-pulse"
                            style={{
                              left: `${10 + Math.random() * 80}%`,
                              top: `${10 + Math.random() * 80}%`,
                              fontSize: `${8 + Math.random() * 6}px`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: `${2 + Math.random()}s`
                            }}
                          >
                            ✨
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced magical aura around parchment */}
                  <div className="absolute -inset-4 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-fire/20 via-primary/20 to-magic-purple/20 rounded-xl blur-xl animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced mystical loading indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ 
                  background: i % 2 === 0 ? 'hsl(var(--fire))' : 'hsl(var(--primary))',
                  animationDelay: `${i * 0.3}s`,
                  boxShadow: i % 2 === 0 ? '0 0 10px hsl(var(--fire))' : '0 0 8px hsl(var(--primary))'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced arcane symbols with better positioning */}
        <div className="absolute inset-0 pointer-events-none">
          {['⚡', '🔮', '✨', '🌟'].map((symbol, i) => (
            <div
              key={symbol}
              className={`absolute text-3xl transition-all duration-2000 ${
                phase !== "entrance" ? 'opacity-60' : 'opacity-0'
              }`}
              style={{
                left: `${20 + (i % 2) * 60}%`,
                top: `${20 + Math.floor(i / 2) * 60}%`,
                animation: `symbol-float 8s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
                color: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--fire))',
                filter: `drop-shadow(0 0 10px ${i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--fire))'})`
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