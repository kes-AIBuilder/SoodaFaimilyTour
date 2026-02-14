import { schedule } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const colorVariants: { [key: string]: { text: string; shadow: string } } = {
  blue: { text: 'text-blue-600', shadow: 'hard-shadow' },
  pink: { text: 'text-pink-500', shadow: 'hard-shadow-primary' },
  green: { text: 'text-green-500', shadow: 'hard-shadow-green' },
};

export default function ScheduleSection() {
  return (
    <section className="space-y-10">
      <h2 className="font-headline text-4xl text-center text-shadow-hard-primary">경주 아케이드 일정</h2>
      <div className="relative border-l-8 border-foreground ml-4 pl-8 space-y-12">
        {schedule.map((dayItem) => {
          const colors = colorVariants[dayItem.color] || colorVariants.blue;
          return (
            <div key={dayItem.day} className="relative">
              <div className="absolute -left-[54px] top-0 w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-headline text-2xl shadow-lg">
                {dayItem.day}
              </div>
              <Card className={cn('border-4 border-foreground rounded-lg', colors.shadow)}>
                <CardHeader>
                  <CardTitle className={cn('font-headline text-2xl underline', colors.text)}>
                    {dayItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dayItem.events && (
                    <ul className="text-lg space-y-3">
                      {dayItem.events.map((event) => (
                        <li key={event.description} className="flex items-center gap-2">
                          <span className="text-2xl">{event.icon}</span>
                          <div>
                            <span className="font-bold">{event.time}:</span> {event.description}
                            {event.highlight && (
                              <Badge className="ml-2 bg-blue-500 text-white">Highlight</Badge>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {dayItem.mission && (
                    <div className="bg-blue-50 p-4 border-4 border-blue-400 rounded-lg text-center">
                      <span className="text-xl font-bold text-blue-700">{dayItem.mission.title}</span>
                      <p className="mt-1">{dayItem.mission.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
