import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPaytable } from '@/lib/game-logic';

export const Paytable = () => {
  const paytable = getPaytable();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-casino-gold">Paytable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paytable.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <span className="text-lg font-mono">{entry.symbols}</span>
              <span className="text-casino-gold font-bold">{entry.payout}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Payouts shown are multipliers of your bet amount</p>
        </div>
      </CardContent>
    </Card>
  );
};