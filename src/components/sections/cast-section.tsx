import { cast } from '@/lib/data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CastMemberCard } from '../cast-member-card';

export default function CastSection() {
  return (
    <section className="space-y-8 text-center">
      <h2 className="font-headline text-4xl mb-2 text-shadow-hard-accent inline-block">환상의 6인 라인업</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {cast.map((member) => (
          <CastMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
