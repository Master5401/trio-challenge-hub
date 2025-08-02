import { useEffect, useState } from "react";
import burningParchment from "@/assets/burning-parchment.jpg";
import gobletImage from "@/assets/goblet-of-fire.jpg";

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage = ({ onComplete }: WelcomePageProps) => {
  const [phase, setPhase] = useState<"goblet" | "parchment-emerge" | "text-reveal" | "complete">("goblet");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const phaseTimers = [
      { phase: "parchment-emerge", delay: 1500 },
      { phase: "text-reveal", delay: 3000 },
      { phase: "complete", delay: 8000 }
    ];

    const timers = phaseTimers.map(({ phase: nextPhase, delay }) =>
      setTimeout(() => setPhase(nextPhase as any), delay)
    );

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => onComplete(), 1000);
    }, 9000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-1000 ${
      isComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Enhanced magical background with moving elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-magic via-background to-dark-magic">
        {/* Floating magical particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-fire rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Swirling magical energy */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magic-purple/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fire/10 rounded-full blur-3xl animate-pulse" 
               style={{ animationDelay: '2s' }} />
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 flex items-center justify-center min-h-screen">
        {/* Goblet emerges first */}
        {phase === "goblet" && (
          <div className="text-center">
            <div className="fire-effect rounded-full p-12 inline-block floating">
              <img 
                src={gobletImage} 
                alt="Goblet of Fire" 
                className="w-48 h-48 object-contain brightness-110"
              />
            </div>
            <div className="mt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-fire to-fire-glow rounded-full animate-pulse mx-auto" />
            </div>
          </div>
        )}

        {/* Parchment emerges from goblet with welcome message */}
        {(phase === "parchment-emerge" || phase === "text-reveal" || phase === "complete") && (
          <div className="relative max-w-5xl">
            {/* Goblet in background, smaller */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-0 opacity-30">
              <div className="fire-effect rounded-full p-6 floating">
                <img 
                  src={gobletImage} 
                  alt="Goblet of Fire" 
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
            
            {/* Magical parchment emerging with text */}
            <div className={`relative z-10 transition-all duration-2000 ${
              phase === "parchment-emerge" ? 'transform translate-y-8 opacity-70 scale-95' :
              phase === "text-reveal" ? 'transform translate-y-0 opacity-90 scale-100' :
              'transform translate-y-0 opacity-100 scale-100'
            }`}>
              <div className="relative">
                <img 
                  src={burningParchment}
                  alt="Burning Parchment"
                  className="w-full max-w-4xl mx-auto opacity-95 fire-effect rounded-xl shadow-2xl"
                />
                
                {/* Magical flames around the parchment */}
                <div className="absolute -inset-4 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-fire/60 rounded-full blur-sm animate-pulse"
                      style={{
                        left: `${10 + (i % 4) * 25}%`,
                        top: `${i < 4 ? '5%' : '90%'}`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                  <div className={`text-center transition-all duration-3000 ${
                    phase === "text-reveal" || phase === "complete" ? 
                    'opacity-100 transform translate-y-0 scale-100' : 
                    'opacity-0 transform translate-y-12 scale-95'
                  }`}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-magic mb-4 font-serif 
                                 drop-shadow-lg">
                      Welcome to the
                    </h1>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-fire mb-4 font-serif magic-text 
                                 drop-shadow-2xl">
                      GenAisis
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-dark-magic font-serif 
                                 drop-shadow-lg">
                      Triwizard Challenge
                    </h3>
                    
                    <div className="mt-6 space-y-2">
                      <div className="w-24 h-1 bg-gradient-to-r from-fire to-fire-glow rounded-full mx-auto animate-pulse" />
                      <p className="text-base md:text-lg lg:text-xl text-dark-magic/90 font-medium max-w-2xl mx-auto 
                                   leading-relaxed drop-shadow">
                        Three mystical challenges await those brave enough to test their magical prowess. 
                        Only the worthy shall claim the title of Digital Wizard.
                      </p>
                      <div className="w-24 h-1 bg-gradient-to-r from-fire-glow to-fire rounded-full mx-auto animate-pulse" 
                           style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mystical corner decorations */}
        <div className="absolute top-8 left-8 text-primary/30 text-6xl animate-pulse">✦</div>
        <div className="absolute top-8 right-8 text-fire/30 text-6xl animate-pulse" style={{ animationDelay: '1s' }}>◆</div>
        <div className="absolute bottom-8 left-8 text-magic-purple/30 text-6xl animate-pulse" style={{ animationDelay: '2s' }}>✧</div>
        <div className="absolute bottom-8 right-8 text-accent/30 text-6xl animate-pulse" style={{ animationDelay: '1.5s' }}>◇</div>
      </div>
    </div>
  );
};

export default WelcomePage;