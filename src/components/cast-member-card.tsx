'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type CastMember = {
  emoji: string;
  name: string;
  tags: string[];
  color: string;
};

const colorVariants: { [key: string]: string } = {
  blue: 'bg-blue-100 text-blue-800',
  pink: 'bg-pink-100 text-pink-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
  red: 'bg-red-100 text-red-800',
};

export function CastMemberCard({ member }: { member: CastMember }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="bg-card border-4 border-foreground p-4 rounded-xl hard-shadow relative cursor-pointer active:scale-95 transition-transform"
      onClick={handleLike}
    >
      <Heart
        className={cn(
          'absolute top-3 right-3 text-gray-200 transition-colors duration-300',
          isLiked && 'heart-active'
        )}
        fill={isLiked ? 'hsl(var(--primary))' : 'transparent'}
        size={24}
        aria-label="Like"
      />
      <div className="text-6xl mb-2 text-center">{member.emoji}</div>
      <h3 className="text-xl font-bold text-center font-headline">{member.name}</h3>
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {member.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className={cn('text-xs border-0', colorVariants[member.color] || 'bg-gray-100 text-gray-800')}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
