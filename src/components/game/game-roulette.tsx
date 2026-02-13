'use client';

import { useState } from 'react';
import { games } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function GameRoulette() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('?');

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult('...');
    const randomIndex = Math.floor(Math.random() * games.length);
    const selectedGame = games[randomIndex];
    
    // Each slice is 360 / games.length degrees.
    const sliceAngle = 360 / games.length;
    // Add multiple spins for visual effect
    const randomSpins = 5 + Math.random() * 5;
    const targetRotation = rotation + (360 * randomSpins) - (randomIndex * sliceAngle);

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedGame.title);
    }, 4000); // Corresponds to the transition duration in CSS
  };

  return (
    <div className="bg-card border-4 border-foreground p-6 rounded-3xl text-center hard-shadow">
      <h3 className="text-2xl font-headline mb-4">🎰 게임 추첨 룰렛</h3>
      <div className="relative w-64 h-64 mx-auto mb-4">
        <div
          className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-destructive z-10"
        />
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4000ms cubic-bezier(0.15, 0, 0.15, 1)',
          }}
          className="w-full h-full rounded-full border-8 border-foreground bg-accent flex items-center justify-center shadow-lg"
        >
          <div className="font-headline text-4xl text-foreground">
            {isSpinning ? '?' : result}
          </div>
        </div>
      </div>
      <Button
        onClick={spinRoulette}
        disabled={isSpinning}
        className="bg-foreground text-background px-8 py-2 rounded-full font-headline text-lg hover:bg-primary transition-colors active:scale-95"
      >
        {isSpinning ? '돌아가는 중...' : '돌려라!'}
      </Button>
    </div>
  );
}
