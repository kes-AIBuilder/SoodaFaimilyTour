'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Flame } from 'lucide-react';

export default function Header() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const targetDate = new Date('2026-02-15T09:30:00+09:00'); // KST
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('여행 시작!');
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      const dayString = days > 0 ? `D-${days}` : 'D-DAY';
      const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      setTimeLeft(`${dayString} ${timeString}`);
    }, 1000);

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
          <div className="font-headline text-white text-xl mb-4 bg-destructive px-4 py-1 inline-block shadow-lg rounded-sm tabular-nums">
            {timeLeft}
          </div>
        )}
        <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight text-shadow-hard-primary">
          2026 설특집<br />경주 패밀리 아케이드
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
