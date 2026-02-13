'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Flame } from 'lucide-react';

export default function Header() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set the target date in UTC to avoid timezone issues.
      // Month is 0-indexed, so 1 is February.
      const ddayUTC = Date.UTC(2026, 1, 15);
      
      // Get today's date in UTC
      const now = new Date();
      const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

      const differenceInMs = ddayUTC - todayUTC;
      
      if (differenceInMs < 0) {
        setTimeLeft('여행 시작!');
        return;
      }
      
      const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      
      if (days === 0) {
        setTimeLeft('D-DAY!');
      } else {
        setTimeLeft(`D-${days}`);
      }
    };

    calculateTimeLeft();
    // Update once a day is sufficient for a D-day counter.
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60 * 24);

    return () => clearInterval(timer);
  }, []);
  
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  const celebrate = () => {
    import('canvas-confetti').then((confettiModule: any) => {
        const confetti = confettiModule.default || confettiModule;
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.6 },
            });
        }
    });
  };

  return (
    <header className="relative h-[480px] flex items-center justify-center overflow-hidden bg-foreground border-b-8 border-accent">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover opacity-60"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-10 text-center px-4">
        {timeLeft && (
          <div className="font-headline text-white text-xl mb-4 bg-destructive px-4 py-1 inline-block shadow-lg rounded-sm">
            {timeLeft}
          </div>
        )}
        <p className="font-headline text-accent text-3xl mb-2 drop-shadow-md">2026 (언)수다(혜) 설특집</p>
        <h1 className="font-headline text-6xl md:text-9xl text-white leading-tight text-shadow-hard-primary">
          경주 패밀리<br />아케이드
        </h1>
        <p className="text-white text-xl mt-4 font-headline tracking-widest opacity-90">
          2026.02.15 - 02.17 | 테르메아&경주일대
        </p>
        <div className="mt-8">
          <Button
            onClick={celebrate}
            className="bg-accent text-accent-foreground text-xl h-14 px-6 hard-shadow hover:scale-105 active:scale-95 transition-all font-headline transform -rotate-2"
          >
            <Flame className="mr-2" /> 텐션 올려! (폭죽)
          </Button>
        </div>
      </div>
    </header>
  );
}
