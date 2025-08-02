import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CodingChallengeProps {
  onComplete: () => void;
}

const CodingChallenge = ({ onComplete }: CodingChallengeProps) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [solutions, setSolutions] = useState(["", "", ""]);
  const [solved, setSolved] = useState([false, false, false]);

  const problems = [
    {
      title: "The Sorting Hat Algorithm",
      description: "Create a function that sorts students into Hogwarts houses based on their traits.",
      problem: `
Write a function 'sortingHat(traits)' that takes an array of traits and returns the appropriate house:
- If traits include 'brave' or 'daring': return 'Gryffindor'
- If traits include 'wise' or 'witty': return 'Ravenclaw'  
- If traits include 'loyal' or 'patient': return 'Hufflepuff'
- If traits include 'cunning' or 'ambitious': return 'Slytherin'
- Default: return 'Gryffindor'

Example: sortingHat(['brave', 'loyal']) should return 'Gryffindor'
      `,
      solution: "function sortingHat(traits) {\n  if (traits.includes('brave') || traits.includes('daring')) return 'Gryffindor';\n  if (traits.includes('wise') || traits.includes('witty')) return 'Ravenclaw';\n  if (traits.includes('loyal') || traits.includes('patient')) return 'Hufflepuff';\n  if (traits.includes('cunning') || traits.includes('ambitious')) return 'Slytherin';\n  return 'Gryffindor';\n}"
    },
    {
      title: "Spell Power Calculator",
      description: "Calculate the power of a magical spell based on wizard level and spell type.",
      problem: `
Write a function 'spellPower(level, spellType)' that calculates spell power:
- Base power = level * 10
- If spellType is 'attack': multiply by 1.5
- If spellType is 'defense': multiply by 1.2  
- If spellType is 'healing': multiply by 1.3
- Round the result to nearest integer

Example: spellPower(5, 'attack') should return 75
      `,
      solution: "function spellPower(level, spellType) {\n  let base = level * 10;\n  if (spellType === 'attack') base *= 1.5;\n  else if (spellType === 'defense') base *= 1.2;\n  else if (spellType === 'healing') base *= 1.3;\n  return Math.round(base);\n}"
    },
    {
      title: "Magical Inventory Manager",
      description: "Manage a wizard's inventory of magical items.",
      problem: `
Write a function 'manageInventory(inventory, action, item, quantity)' that:
- inventory: object with item names as keys and quantities as values
- action: 'add', 'remove', or 'check'
- item: string name of the item
- quantity: number (for add/remove actions)

For 'add': increase item quantity (create if doesn't exist)
For 'remove': decrease item quantity (don't go below 0)
For 'check': return current quantity of item (0 if doesn't exist)

Example: manageInventory({wand: 1}, 'add', 'potion', 3) should return {wand: 1, potion: 3}
      `,
      solution: "function manageInventory(inventory, action, item, quantity) {\n  if (action === 'add') {\n    inventory[item] = (inventory[item] || 0) + quantity;\n    return inventory;\n  }\n  if (action === 'remove') {\n    inventory[item] = Math.max(0, (inventory[item] || 0) - quantity);\n    return inventory;\n  }\n  if (action === 'check') {\n    return inventory[item] || 0;\n  }\n  return inventory;\n}"
    }
  ];

  const checkSolution = (problemIndex: number) => {
    const userSolution = solutions[problemIndex].trim();
    const expectedSolution = problems[problemIndex].solution.trim();
    
    // Simple solution checking (in a real app, you'd run test cases)
    if (userSolution.includes("function") && userSolution.length > 50) {
      const newSolved = [...solved];
      newSolved[problemIndex] = true;
      setSolved(newSolved);
      toast("Excellent! Problem solved!");
      
      // Check if all problems are solved
      if (newSolved.every(s => s)) {
        setTimeout(() => {
          toast("All challenges completed! Proceeding to final challenge...");
          onComplete();
        }, 2000);
      }
    } else {
      toast("Your solution needs more work. Try again!");
    }
  };

  const updateSolution = (value: string) => {
    const newSolutions = [...solutions];
    newSolutions[currentProblem] = value;
    setSolutions(newSolutions);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold magic-text mb-2">Challenge 2</h2>
          <p className="text-primary/80 text-lg">The Coding Trials</p>
          <div className="flex justify-center gap-2 mt-4">
            {problems.map((_, index) => (
              <Badge 
                key={index}
                variant={solved[index] ? "default" : "secondary"}
                className={`cursor-pointer ${solved[index] ? 'bg-accent' : ''}`}
                onClick={() => setCurrentProblem(index)}
              >
                Problem {index + 1} {solved[index] && "✓"}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-6">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {problems[currentProblem].title}
            </h3>
            <p className="text-foreground/80 mb-6">
              {problems[currentProblem].description}
            </p>
            <div className="bg-dark-magic/30 p-4 rounded-lg">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                {problems[currentProblem].problem}
              </pre>
            </div>
          </Card>

          {/* Code Editor */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-6">
            <h3 className="text-xl font-bold text-primary mb-4">Your Solution</h3>
            <Textarea
              value={solutions[currentProblem]}
              onChange={(e) => updateSolution(e.target.value)}
              placeholder="Write your magical code here..."
              className="min-h-96 font-mono bg-dark-magic/30 border-border/30"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentProblem(Math.max(0, currentProblem - 1))}
                  disabled={currentProblem === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentProblem(Math.min(2, currentProblem + 1))}
                  disabled={currentProblem === 2}
                >
                  Next
                </Button>
              </div>
              <Button 
                onClick={() => checkSolution(currentProblem)}
                className="bg-fire hover:bg-fire/80 text-dark-magic"
                disabled={solved[currentProblem]}
              >
                {solved[currentProblem] ? "Solved!" : "Test Solution"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;