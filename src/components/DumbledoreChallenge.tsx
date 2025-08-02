import { useState } from "react";
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
    { role: "dumbledore", content: "Welcome, young wizard. I am here to guide you through your first challenge." }
  ]);
  const [userInput, setUserInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [hasKeyword, setHasKeyword] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setMessages(prev => [...prev, newMessage]);

    // Simulate Dumbledore's responses
    setTimeout(() => {
      let response = "";
      const lowerInput = userInput.toLowerCase();
      
      if (lowerInput.includes("help") || lowerInput.includes("hint")) {
        response = "Ah, seeking guidance? The answer lies in the very essence of what this challenge represents. Think about what binds all magical knowledge together...";
      } else if (lowerInput.includes("challenge") || lowerInput.includes("test")) {
        response = "Indeed, this is a test of wisdom. The keyword you seek is the foundation of all magical learning. What do we call the institution where young witches and wizards learn magic?";
      } else if (lowerInput.includes("hogwarts") || lowerInput.includes("school")) {
        response = "Excellent deduction! The keyword you seek is... 'HOGWARTS'. Enter it in the box below to proceed to your next challenge.";
        setHasKeyword(true);
      } else if (lowerInput.includes("magic") || lowerInput.includes("spell")) {
        response = "Magic indeed surrounds us, but think more specifically. Where does one learn to harness such power?";
      } else {
        response = "Hmm, interesting thought. But perhaps you should consider what this academy of magic is called. The place where countless witches and wizards have learned their craft...";
      }

      setMessages(prev => [...prev, { role: "dumbledore", content: response }]);
    }, 1500);

    setUserInput("");
  };

  const handleKeywordSubmit = () => {
    if (keyword.toLowerCase() === "hogwarts") {
      toast("Excellent! The first challenge is complete.");
      setTimeout(() => onComplete(), 2000);
    } else {
      toast("That's not quite right. Try again!");
      setKeyword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Dumbledore Image */}
        <div className="flex justify-center items-center">
          <div className="relative magic-glow rounded-lg overflow-hidden">
            <img 
              src={dumbledoreImage}
              alt="Professor Dumbledore"
              className="w-full max-w-md h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-magic/50 to-transparent"></div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold magic-text mb-2">Challenge 1</h2>
            <p className="text-primary/80 text-lg">Speak with Professor Dumbledore</p>
          </div>

          {/* Chat Messages */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-6 h-96 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-magic-purple/20 text-foreground border border-magic-purple/30'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Input Area */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask Dumbledore for guidance..."
                className="bg-input/50 border-border/30"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/80">
                Send
              </Button>
            </div>

            {/* Keyword Input */}
            {hasKeyword && (
              <div className="space-y-2">
                <p className="text-primary font-semibold">Enter the keyword:</p>
                <div className="flex gap-2">
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter the keyword here..."
                    className="bg-input/50 border-fire/50 focus:border-fire"
                  />
                  <Button onClick={handleKeywordSubmit} className="bg-fire hover:bg-fire/80 text-dark-magic">
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DumbledoreChallenge;