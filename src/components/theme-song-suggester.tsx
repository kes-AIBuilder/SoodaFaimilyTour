'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tripInfo } from '@/lib/data';
import type { SuggestVacationThemeSongOutput } from '@/ai/flows/suggest-vacation-theme-song';
import { Loader2, Music, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ThemeSongSuggester() {
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState<SuggestVacationThemeSongOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestSong = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const response = await fetch('/api/genkit/suggestVacationThemeSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vacationName: tripInfo.name,
          vacationDates: tripInfo.dates,
          vacationDescription: tripInfo.description,
          activities: tripInfo.activities,
          familyMembers: tripInfo.familyMembers,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const result = await response.json();
      setSuggestion(result);
    } catch (error) {
      console.error('Failed to suggest theme song:', error);
      toast({
        title: '테마송 추천 실패',
        description: 'AI가 노래를 고르다 잠들었나봐요. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-4 border-foreground p-2 rounded-xl hard-shadow-accent">
      <CardHeader>
        <CardTitle className="text-2xl font-headline border-b-4 border-accent inline-block pb-1">
          🎵 여행 테마송 AI 추천
        </CardTitle>
        <CardDescription>우리 여행에 어울리는 노래를 AI에게 물어볼까요?</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {!suggestion && !isLoading && (
          <Button
            onClick={handleSuggestSong}
            className="w-full h-14 text-lg font-headline bg-foreground text-background hover:bg-primary"
            disabled={isLoading}
          >
            <Sparkles className="mr-2" />
            테마송 추천받기
          </Button>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="ml-4 text-lg">AI가 신중하게 고르는 중...</p>
          </div>
        )}
        {suggestion && (
          <div className="bg-accent/20 p-6 rounded-lg text-left animate-slide-in">
            <div className="flex items-center mb-4">
              <Music className="w-8 h-8 mr-3 text-primary" />
              <div>
                <p className="font-bold text-2xl font-headline">{suggestion.songTitle}</p>
                <p className="text-muted-foreground text-lg">{suggestion.artist}</p>
              </div>
            </div>
            <p className="text-lg mb-4">
              <strong className="font-headline text-primary">추천 이유:</strong> {suggestion.reason}
            </p>
            <Button
              onClick={handleSuggestSong}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : '다른 곡 추천받기'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
