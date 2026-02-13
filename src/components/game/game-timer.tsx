'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function GameTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, time]);

  const startTimer = (seconds: number) => {
    setTime(seconds);
    setIsActive(true);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl text-center border-4 border-foreground hard-shadow-primary">
      <h3 className="text-2xl font-headline mb-2 text-accent">⏱️ 예능 전용 타이머</h3>
      <div
        className={cn(
          'text-6xl font-mono mb-4 transition-colors',
          isActive && time > 0 && 'timer-active'
        )}
      >
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-2">
        <Button onClick={() => startTimer(3)} variant="destructive" className="font-bold">인물(3s)</Button>
        <Button onClick={() => startTimer(60)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold">몸말(60s)</Button>
        <Button onClick={resetTimer} variant="secondary" className="font-bold">리셋</Button>
      </div>
    </div>
  );
}
