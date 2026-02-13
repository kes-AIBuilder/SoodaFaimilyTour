import { games } from '@/lib/data';
import { GameCard } from '../game/game-card';
import { GameRoulette } from '../game/game-roulette';
import { GameTimer } from '../game/game-timer';

export default function GameSection() {
  return (
    <section className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GameRoulette />
        <GameTimer />
      </div>
      <div className="space-y-6">
        <p className="text-center text-muted-foreground italic text-sm">카드 클릭 ➔ 무작위 제시어 생성!</p>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
