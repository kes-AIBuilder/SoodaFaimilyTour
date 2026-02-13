import { checklist, restaurants } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChecklistItem } from '../checklist-item';
import { ThemeSongSuggester } from '../theme-song-suggester';

export default function InfoSection() {
  return (
    <section className="space-y-10">
      <Card className="border-4 border-foreground p-2 rounded-xl hard-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-headline border-b-4 border-accent inline-block pb-1">
            🎒 체크리스트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklist.map((item) => (
              <ChecklistItem key={item.id} id={item.id} text={item.text} />
            ))}
          </div>
        </CardContent>
      </Card>

      <ThemeSongSuggester />

      <Card className="border-4 border-foreground p-2 rounded-xl hard-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-headline border-b-4 border-primary inline-block pb-1">
            🗺️ 맛집/명소 링크
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {restaurants.map((place) => (
            <Button
              key={place.name}
              asChild
              variant="outline"
              className="font-bold text-base h-12 border-2 border-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <a href={place.url} target="_blank" rel="noopener noreferrer">
                <place.icon className="mr-2 h-5 w-5" />
                {place.name}
              </a>
            </Button>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
