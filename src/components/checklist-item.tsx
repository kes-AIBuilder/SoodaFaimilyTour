'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';

export function ChecklistItem({ id, text }: { id: string; text: string }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      import('canvas-confetti').then((confettiModule: any) => {
        const confetti = confettiModule.default || confettiModule;
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      });
    }
  };

  return (
    <Label
      htmlFor={id}
      className={`flex items-center gap-3 cursor-pointer text-lg transition-colors ${
        isChecked ? 'text-muted-foreground line-through' : ''
      }`}
    >
      <input
        type="checkbox"
        id={id}
        onChange={handleCheck}
        checked={isChecked}
        className="w-6 h-6"
      />
      <span>{text}</span>
    </Label>
  );
}
