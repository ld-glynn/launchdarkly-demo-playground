import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type SessionStats } from '@/lib/game-logic';

interface SessionMetricsProps {
  stats: SessionStats;
  variants: Record<string, any>;
  sessionDurationMs: number;
}

export const SessionMetrics = ({ stats, variants, sessionDurationMs }: SessionMetricsProps) => {
  const sessionMinutes = Math.floor(sessionDurationMs / 60000);
  const sessionSeconds = Math.floor((sessionDurationMs % 60000) / 1000);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-casino-silver text-lg">Session Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time & Spins */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-3 bg-secondary/30 rounded-lg">
            <p className="text-muted-foreground">Session Time</p>
            <p className="font-bold">{sessionMinutes}:{sessionSeconds.toString().padStart(2, '0')}</p>
          </div>
          <div className="text-center p-3 bg-secondary/30 rounded-lg">
            <p className="text-muted-foreground">Total Spins</p>
            <p className="font-bold">{stats.totalSpins}</p>
          </div>
        </div>

        {/* Win Statistics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Win Rate</span>
            <Badge variant={stats.winRate > 30 ? 'default' : 'secondary'}>
              {stats.winRate.toFixed(1)}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Biggest Win</span>
            <span className="font-bold text-casino-gold">
              {stats.biggestWin > 0 ? `${stats.biggestWin} coins` : '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Avg Payout</span>
            <span className="font-bold">
              {stats.avgPayoutPerSpin.toFixed(1)} coins
            </span>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Wagered</span>
            <span className="font-mono">{stats.totalWagered} coins</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Won</span>
            <span className="font-mono text-casino-green">{stats.totalWon} coins</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Net Result</span>
            <span className={`font-mono font-bold ${
              stats.totalWon - stats.totalWagered >= 0 
                ? 'text-casino-green' 
                : 'text-casino-red'
            }`}>
              {stats.totalWon - stats.totalWagered >= 0 ? '+' : ''}{stats.totalWon - stats.totalWagered} coins
            </span>
          </div>
        </div>

        {/* Current Variants */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Active Variants</p>
          <div className="space-y-1">
            {Object.entries(variants).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{key}</span>
                <Badge variant="outline" className="text-xs">
                  {String(value)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};