'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { generateGamePrompt } from '@/ai/flows/generate-game-prompt';
import type { GenerateGamePromptInput } from '@/ai/flows/generate-game-prompt';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type GameCardProps = {
  game: {
    id: GenerateGamePromptInput['gameType'];
    title: string;
    color: string;
    description: string;
  };
};

const colorVariants: { [key: string]: string } = {
    red: 'text-red-600',
    orange: 'text-orange-600',
    pink: 'text-pink-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    blue: 'text-blue-700',
    teal: 'text-teal-600',
    indigo: 'text-indigo-600',
};
const bgColorVariants: { [key: string]: string } = {
    blue: 'bg-yellow-50',
};

export function GameCard({ game }: GameCardProps) {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('READY?');
  const [isLoading, setIsLoading] = useState(false);
  const [previousPrompts, setPreviousPrompts] = useState<string[]>([]);

  const handleDraw = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const result = await generateGamePrompt({
        gameType: game.id,
        previousPrompts,
      });
      const newPrompt = result.prompt;
      setPrompt(newPrompt);
      setPreviousPrompts((prev) => [...prev, newPrompt]);
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: '오류 발생',
        description: '제시어를 생성하는 데 실패했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
      setPrompt('ERROR!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className={`w-full border-4 border-foreground rounded-lg hard-shadow transition-all ${bgColorVariants[game.color] || 'bg-card'}`}>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="p-5 hover:no-underline">
          <h4 className={`font-headline text-xl ${colorVariants[game.color]}`}>{game.title}</h4>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          {game.description && (
            <p className="text-sm text-muted-foreground mb-4 font-bold">{game.description}</p>
          )}
          <div className="bg-[#1a1a1a] text-[#00ff00] font-mono p-4 rounded-lg text-center text-2xl border-2 border-[#333] shadow-inner mb-2 h-20 flex items-center justify-center">
            {isLoading ? <Loader2 className="animate-spin" /> : prompt}
          </div>
          <Button
            onClick={handleDraw}
            disabled={isLoading}
            className="w-full bg-foreground text-background font-bold h-12 text-base hover:bg-primary active:scale-95 transition-transform"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : '제시어 뽑기'}
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
