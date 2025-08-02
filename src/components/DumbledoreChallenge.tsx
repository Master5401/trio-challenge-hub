import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import dumbledoreImage from "@/assets/dumbledore.jpg";
import { toast } from "sonner";

interface DumbledoreChallengeProps {
  onComplete: () => void;
}

const DumbledoreChallenge = ({ onComplete }: DumbledoreChallengeProps) => {
  const [messages, setMessages] = useState([
    { role: "dumbledore", content: "Welcome, brave soul. You stand before the first trial of wisdom. I sense great potential within you, but potential alone will not suffice. You must prove your understanding of the ancient magical arts through cunning and knowledge." }
  ]);
  const [userInput, setUserInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [riddlesSolved, setRiddlesSolved] = useState(0);
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // More complex riddles that require actual thinking
  const riddles = [
    {
      question: "I am the place where young minds learn to bend reality, where wands choose their masters, and where the greatest wizards once walked as students. Four houses unite under one roof, and a headmaster's wisdom guides all. What am I?",
      answer: "hogwarts",
      hint: "Think of the most famous school of witchcraft and wizardry..."
    },
    {
      question: "I am ancient beyond measure, yet I burn without consuming. I choose the worthy through trials of fire, and from my depths, fates are revealed. Champions are selected by my mystical judgment. What am I?",
      answer: "goblet",
      hint: "The very vessel that brought you here..."
    },
    {
      question: "We are four, each with our own virtue: courage bold and daring heart, wisdom sharp and ready mind, loyalty and patience true, ambition with cunning pride. Together we form a legacy. What are we?",
      answer: "houses",
      hint: "Gryffindor, Ravenclaw, Hufflepuff, and Slytherin..."
    }
  ];

  useEffect(() => {
    // Add some mystical ambiance
    const interval = setInterval(() => {
      // Random mystical thoughts from Dumbledore
      if (Math.random() < 0.1 && messages.length > 2) {
        const mysticalThoughts = [
          "The room grows heavy with ancient magic...",
          "I sense your determination, but wisdom requires patience...",
          "The portraits whisper of your progress...",
          "Even the greatest wizards once struggled with their first trials..."
        ];
        const randomThought = mysticalThoughts[Math.floor(Math.random() * mysticalThoughts.length)];
        setMessages(prev => [...prev, { role: "dumbledore", content: `*${randomThought}*` }]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setAttempts(prev => prev + 1);

    // Enhanced Dumbledore responses with multiple riddles
    setTimeout(() => {
      let response = "";
      const lowerInput = userInput.toLowerCase();
      
      if (lowerInput.includes("help") || lowerInput.includes("hint")) {
        if (currentRiddle < riddles.length) {
          response = `Ah, seeking guidance? Very well. ${riddles[currentRiddle].hint}`;
        } else {
          response = "You have solved all the riddles, young wizard. Now speak the first answer to unlock the final secret.";
        }
      } else if (lowerInput.includes(riddles[currentRiddle]?.answer)) {
        if (currentRiddle < riddles.length - 1) {
          setRiddlesSolved(prev => prev + 1);
          setCurrentRiddle(prev => prev + 1);
          response = `Excellent! Your wisdom grows. But the trial continues... ${riddles[currentRiddle + 1].question}`;
        } else {
          setRiddlesSolved(prev => prev + 1);
          response = "Remarkable! You have solved all three riddles. Your mind is indeed sharp. Now, to unlock the passage forward, enter the answer to the first riddle in the mystical box below. But beware - many false seekers have tried before you...";
          setIsComplete(true);
        }
      } else if (attempts > 5 && riddlesSolved === 0) {
        response = "I see you struggle, young one. Perhaps we should begin with the ancient riddle: " + riddles[0].question;
      } else if (lowerInput.includes("riddle") || lowerInput.includes("challenge") || lowerInput.includes("test")) {
        response = `Indeed, this is a test of true wisdom. ${riddles[currentRiddle].question}`;
      } else if (lowerInput.includes("dumbledore") || lowerInput.includes("professor")) {
        response = "Yes, I am Albus Dumbledore, and I have seen many students face this trial. Few possess the patience and wisdom to complete it. Will you be one of them?";
      } else {
        const crypticResponses = [
          "Interesting... but not quite what the ancient magic seeks. Think deeper about the foundations of magical learning.",
          "Your thoughts wander, but wisdom lies in focus. Consider the riddle more carefully.",
          "Even the wisest wizards must sometimes sit in silence and truly listen to what is being asked.",
          "The answer you seek is woven into the very fabric of magical history. What institution shaped us all?",
          "Perhaps you rush too quickly to respond. True wisdom comes to those who contemplate.",
        ];
        response = crypticResponses[Math.floor(Math.random() * crypticResponses.length)];
      }

      setMessages(prev => [...prev, { role: "dumbledore", content: response }]);
    }, 2000 + Math.random() * 1000); // Variable delay for more realism

    setUserInput("");
  };

  const handleKeywordSubmit = () => {
    if (keyword.toLowerCase() === "hogwarts") {
      toast("Magnificent! You have proven yourself worthy. The first challenge is complete.");
      setTimeout(() => onComplete(), 3000);
    } else {
      toast("The ancient magic rejects your answer. Think carefully about the first riddle...");
      setKeyword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced mystical background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating magical particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Swirling magical energy */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-magic-purple/5 to-transparent animate-spin" 
             style={{ animationDuration: '30s' }} />
        
        {/* Mystical corners */}
        <div className="absolute top-8 left-8 text-magic-purple/20 text-8xl animate-pulse">⚡</div>
        <div className="absolute top-8 right-8 text-fire/20 text-8xl animate-pulse" style={{ animationDelay: '2s' }}>🔮</div>
        <div className="absolute bottom-8 left-8 text-primary/20 text-8xl animate-pulse" style={{ animationDelay: '4s' }}>✨</div>
        <div className="absolute bottom-8 right-8 text-accent/20 text-8xl animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>
      </div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 relative z-10">
        {/* Enhanced Dumbledore Image */}
        <div className="flex justify-center items-center">
          <div className="relative magic-glow rounded-xl overflow-hidden group">
            <img 
              src={dumbledoreImage}
              alt="Professor Dumbledore"
              className="w-full max-w-md h-auto object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-magic/60 to-transparent"></div>
            
            {/* Magical aura effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-magic-purple/20 via-primary/20 to-fire/20 rounded-xl blur-md -z-10 animate-pulse"></div>
            
            {/* Progress indicator */}
            <div className="absolute top-4 left-4 bg-dark-magic/80 rounded-lg p-2 backdrop-blur-sm">
              <div className="text-xs text-primary font-bold">
                Riddles: {riddlesSolved}/3
              </div>
              <div className="text-xs text-fire">
                Attempts: {attempts}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Chat Interface */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold magic-text mb-2">Trial of Wisdom</h2>
            <p className="text-primary/80 text-lg">Face the Ancient Riddles</p>
            <div className="w-32 h-1 bg-gradient-to-r from-fire to-fire-glow rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>

          {/* Enhanced Chat Messages */}
          <Card className="bg-card/30 backdrop-blur-lg border-magic-purple/30 p-6 h-96 overflow-y-auto space-y-4 
                         shadow-2xl">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : message.content.startsWith('*') 
                      ? 'bg-magic-purple/10 text-magic-purple border border-magic-purple/20 italic'
                      : 'bg-card/80 text-foreground border border-fire/30 backdrop-blur-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Enhanced Input Area */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Speak your thoughts to the wise professor..."
                className="bg-input/30 border-magic-purple/50 focus:border-fire backdrop-blur-sm text-foreground
                         placeholder:text-muted-foreground/60"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage} 
                className="bg-primary hover:bg-primary/80 shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Cast
              </Button>
            </div>

            {/* Always visible keyword input for confusion */}
            <div className="space-y-2">
              <p className="text-fire font-semibold flex items-center gap-2">
                <span className="text-lg">🔑</span>
                Enter the Sacred Word {!isComplete && "(Complete all riddles first)"}:
              </p>
              <div className="flex gap-2">
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="The answer to the first riddle..."
                  className={`bg-input/30 backdrop-blur-sm transition-all duration-300 ${
                    isComplete 
                      ? 'border-fire/70 focus:border-fire shadow-lg shadow-fire/20' 
                      : 'border-muted/30 opacity-60'
                  }`}
                  disabled={!isComplete}
                />
                <Button 
                  onClick={handleKeywordSubmit} 
                  disabled={!isComplete}
                  className={`transition-all duration-300 ${
                    isComplete 
                      ? 'bg-fire hover:bg-fire/80 text-dark-magic shadow-lg hover:shadow-fire/25' 
                      : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Unlock
                </Button>
              </div>
              {!isComplete && (
                <p className="text-xs text-muted-foreground/60 italic">
                  * The sacred box awaits, but ancient magic seals it until wisdom is proven...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DumbledoreChallenge;