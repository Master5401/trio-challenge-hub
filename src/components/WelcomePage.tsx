import { useEffect, useState } from "react";
import burningParchment from "@/assets/burning-parchment.jpg";
import gobletImage from "@/assets/goblet-of-fire.jpg";

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage = ({ onComplete }: WelcomePageProps) => {
  const [phase, setPhase] = useState<"goblet" | "flames-ignite" | "parchment-emerge" | "text-reveal" | "complete">("goblet");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const phaseTimers = [
      { phase: "flames-ignite", delay: 2000 },
      { phase: "parchment-emerge", delay: 4000 },
      { phase: "text-reveal", delay: 6500 },
      { phase: "complete", delay: 12000 }
    ];

    const timers = phaseTimers.map(({ phase: nextPhase, delay }) =>
      setTimeout(() => setPhase(nextPhase as any), delay)
    );

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => onComplete(), 1500);
    }, 13000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-1500 ${
      isComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Enhanced magical background with depth and movement */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-magic via-background to-dark-magic overflow-hidden">
        {/* Multi-layered floating magical particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div 
                className={`rounded-full ${
                  i % 4 === 0 ? 'w-1 h-1 bg-fire' :
                  i % 4 === 1 ? 'w-2 h-2 bg-primary' : 
                  i % 4 === 2 ? 'w-1.5 h-1.5 bg-magic-purple' : 'w-1 h-1 bg-accent'
                }`}
                style={{
                  boxShadow: i % 4 === 0 ? '0 0 12px hsl(var(--fire))' : 
                            i % 4 === 1 ? '0 0 10px hsl(var(--primary))' : 
                            i % 4 === 2 ? '0 0 8px hsl(var(--magic-purple))' : '0 0 6px hsl(var(--accent))'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Enhanced swirling magical energy with multiple layers */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-magic-purple/10 rounded-full blur-3xl animate-spin" 
               style={{ animationDuration: '40s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fire/10 rounded-full blur-3xl animate-spin" 
               style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse"
               style={{ animationDuration: '6s' }} />
        </div>
        
        {/* Mystical fog effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-magic/20 via-transparent to-dark-magic/20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 flex items-center justify-center min-h-screen">
        {/* Initial Goblet phase with enhanced effects */}
        {phase === "goblet" && (
          <div className="text-center">
            <div className="relative">
              <div className="fire-effect rounded-full p-16 inline-block floating"
                   style={{ 
                     background: 'radial-gradient(circle, hsl(15 100% 55% / 0.8), hsl(25 100% 65% / 0.6), transparent)',
                     boxShadow: '0 0 60px hsl(15 100% 55% / 0.4), 0 0 120px hsl(15 100% 55% / 0.2)'
                   }}>
                <img 
                  src={gobletImage} 
                  alt="Goblet of Fire" 
                  className="w-56 h-56 object-contain brightness-110 contrast-110 drop-shadow-2xl"
                />
              </div>
              
              {/* Magical energy rings around goblet */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-primary/30 rounded-full animate-ping"
                    style={{
                      width: `${200 + i * 40}px`,
                      height: `${200 + i * 40}px`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-12">
              <div className="w-40 h-1 bg-gradient-to-r from-fire to-fire-glow rounded-full animate-pulse mx-auto" />
            </div>
          </div>
        )}

        {/* Enhanced parchment emergence with natural animations */}
        {(phase === "flames-ignite" || phase === "parchment-emerge" || phase === "text-reveal" || phase === "complete") && (
          <div className="relative max-w-6xl w-full">
            {/* Goblet in background with flames */}
            <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-0 opacity-40">
              <div className="relative">
                <div className="fire-effect rounded-full p-8 floating">
                  <img 
                    src={gobletImage} 
                    alt="Goblet of Fire" 
                    className="w-32 h-32 object-contain"
                  />
                </div>
                
                {/* Enhanced flames shooting upward */}
                {phase === "flames-ignite" && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-fire rounded-full"
                        style={{
                          left: `${40 + Math.random() * 20}%`,
                          top: `${50 + Math.random() * 10}%`,
                          animation: `flame-rise 3s ease-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                          boxShadow: '0 0 10px hsl(var(--fire))'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced magical parchment with natural emergence */}
            <div className={`relative z-10 transition-all duration-4000 ease-out ${
              phase === "flames-ignite" ? 'transform translate-y-16 opacity-0 scale-90 rotate-2' :
              phase === "parchment-emerge" ? 'transform translate-y-8 opacity-70 scale-95 rotate-1' :
              phase === "text-reveal" ? 'transform translate-y-0 opacity-95 scale-100 rotate-0' :
              'transform translate-y-0 opacity-100 scale-100 rotate-0'
            }`}>
              <div className="relative">
                {/* Enhanced parchment background */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl"
                     style={{
                       background: 'linear-gradient(135deg, hsl(45 55% 90%), hsl(35 50% 85%), hsl(45 45% 88%), hsl(40 40% 82%))',
                       boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 40px hsl(45 100% 70% / 0.3), inset 0 1px 0 hsl(45 60% 95%)',
                       border: '3px solid hsl(45 35% 78%)',
                       minHeight: '600px'
                     }}>
                  
                  {/* Parchment texture and aging effects */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-gradient-to-br from-transparent via-amber-900/10 to-amber-800/20" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/5 via-transparent to-amber-600/10" />
                  </div>
                  
                  {/* Enhanced burning edges with animation */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl"
                         style={{
                           background: `
                             radial-gradient(circle at 95% 5%, hsl(15 100% 50% / 0.6) 0%, hsl(25 100% 60% / 0.4) 20%, transparent 40%),
                             radial-gradient(circle at 5% 95%, hsl(15 100% 50% / 0.5) 0%, hsl(25 100% 60% / 0.3) 25%, transparent 45%),
                             radial-gradient(circle at 95% 95%, hsl(15 100% 50% / 0.4) 0%, hsl(25 100% 60% / 0.2) 30%, transparent 50%),
                             linear-gradient(45deg, transparent 85%, hsl(15 100% 50% / 0.3) 92%, hsl(25 100% 60% / 0.5) 96%, hsl(15 100% 40% / 0.7) 100%)
                           `,
                           animation: 'burning-edge 4s ease-in-out infinite alternate'
                         }} />
                    
                    {/* Ember particles */}
                    {phase === "parchment-emerge" && (
                      <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-fire rounded-full animate-pulse"
                            style={{
                              right: `${5 + Math.random() * 10}%`,
                              top: `${10 + Math.random() * 80}%`,
                              animationDelay: `${i * 0.3}s`,
                              boxShadow: '0 0 8px hsl(var(--fire))'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Main content area */}
                  <div className="relative z-10 flex items-center justify-center p-16 md:p-20 lg:p-24 min-h-[600px]">
                    <div className={`text-center transition-all duration-3000 ${
                      phase === "text-reveal" || phase === "complete" ? 
                      'opacity-100 transform translate-y-0 scale-100' : 
                      'opacity-0 transform translate-y-8 scale-95'
                    }`}>
                      
                      {/* Enhanced title with magical effects */}
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-serif leading-tight"
                          style={{
                            background: 'linear-gradient(135deg, hsl(220 25% 15%), hsl(15 85% 30%), hsl(220 20% 20%))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
                            filter: 'drop-shadow(0 0 20px hsl(15 100% 50% / 0.3))'
                          }}>
                        Welcome to the
                      </h1>
                      
                      {/* Enhanced main title */}
                      <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-serif magic-text leading-tight"
                          style={{
                            background: 'linear-gradient(135deg, hsl(15 100% 55%), hsl(25 100% 65%), hsl(45 100% 70%), hsl(15 100% 50%))',
                            backgroundSize: '300% 300%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'text-shimmer 6s ease-in-out infinite',
                            filter: 'drop-shadow(0 0 30px hsl(15 100% 55% / 0.5))',
                            textShadow: '4px 4px 8px rgba(0,0,0,0.5)'
                          }}>
                        GenAisis
                      </h2>
                      
                      {/* Enhanced subtitle */}
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 font-serif"
                          style={{
                            color: 'hsl(220 25% 15%)',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            filter: 'drop-shadow(0 0 15px hsl(220 25% 15% / 0.3))'
                          }}>
                        Triwizard Challenge
                      </h3>
                      
                      {/* Enhanced decorative elements */}
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-center items-center gap-4">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-fire to-fire-glow rounded-full animate-pulse" />
                          <div className="text-fire text-2xl animate-pulse">⚡</div>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-fire-glow via-fire to-transparent rounded-full animate-pulse" />
                        </div>
                        
                        {/* Enhanced description */}
                        <p className="text-lg md:text-xl lg:text-2xl font-medium max-w-4xl mx-auto leading-relaxed"
                           style={{
                             color: 'hsl(220 20% 25%)',
                             textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                           }}>
                          Three mystical challenges await those brave enough to test their magical prowess. 
                          Only the worthy shall claim the title of <span className="font-bold text-fire">Digital Wizard</span>.
                        </p>
                        
                        <div className="flex justify-center items-center gap-4 mt-6">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-magic-purple to-primary rounded-full animate-pulse" 
                               style={{ animationDelay: '0.5s' }} />
                          <div className="text-primary text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🔮</div>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-primary via-magic-purple to-transparent rounded-full animate-pulse" 
                               style={{ animationDelay: '0.5s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced magical sparkles and effects */}
                  {phase === "text-reveal" && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute animate-pulse"
                          style={{
                            left: `${5 + Math.random() * 90}%`,
                            top: `${5 + Math.random() * 90}%`,
                            fontSize: `${10 + Math.random() * 8}px`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                            color: i % 3 === 0 ? 'hsl(var(--fire))' : 
                                   i % 3 === 1 ? 'hsl(var(--primary))' : 'hsl(var(--magic-purple))',
                            filter: `drop-shadow(0 0 6px ${
                              i % 3 === 0 ? 'hsl(var(--fire))' : 
                              i % 3 === 1 ? 'hsl(var(--primary))' : 'hsl(var(--magic-purple))'
                            })`
                          }}
                        >
                          {['✨', '⭐', '💫', '🌟'][i % 4]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Enhanced magical aura around entire parchment */}
                <div className="absolute -inset-8 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-r from-fire/15 via-primary/15 to-magic-purple/15 rounded-3xl blur-2xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Enhanced mystical corner decorations with better positioning */}
        <div className="absolute top-12 left-12 text-primary/40 text-7xl animate-pulse">✦</div>
        <div className="absolute top-12 right-12 text-fire/40 text-7xl animate-pulse" style={{ animationDelay: '1s' }}>◆</div>
        <div className="absolute bottom-12 left-12 text-magic-purple/40 text-7xl animate-pulse" style={{ animationDelay: '2s' }}>✧</div>
        <div className="absolute bottom-12 right-12 text-accent/40 text-7xl animate-pulse" style={{ animationDelay: '1.5s' }}>◇</div>
      </div>
    </div>
  );
};

export default WelcomePage;