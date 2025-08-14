import { SYMBOLS, type Symbol } from '@/lib/game-logic';

interface ReelsProps {
  result: [Symbol, Symbol, Symbol];
  isSpinning: boolean;
  isWinning: boolean;
}

export const Reels = ({ result, isSpinning, isWinning }: ReelsProps) => {
  return (
    <div className="bg-card rounded-xl border-2 border-border p-8">
      <div className="flex justify-center items-center gap-4">
        {result.map((symbol, index) => (
          <div
            key={index}
            className={`
              relative w-24 h-24 md:w-32 md:h-32 
              bg-reel-bg rounded-xl border-2 
              flex items-center justify-center
              text-4xl md:text-5xl font-bold
              transition-all duration-200
              ${isSpinning ? 'animate-reel-spin' : ''}
              ${isWinning ? 'border-reel-winning shadow-lg shadow-reel-winning/50 animate-reel-bounce' : 'border-border'}
            `}
            style={{
              animationDelay: isSpinning ? `${index * 200}ms` : '0ms',
            }}
            aria-label={`Reel ${index + 1}: ${symbol}`}
          >
            {/* Symbol Display */}
            <span
              className={`
                transition-colors duration-200
                ${isWinning ? 'text-reel-winning' : 'text-reel-symbol'}
              `}
            >
              {SYMBOLS[symbol].emoji}
            </span>
            
            {/* Winning Glow Effect */}
            {isWinning && !isSpinning && (
              <div className="absolute inset-0 rounded-xl bg-reel-winning/20 animate-pulse" />
            )}
          </div>
        ))}
      </div>
      
      {/* Winning Message */}
      {isWinning && !isSpinning && (
        <div className="mt-4 text-center" role="status" aria-live="polite">
          <p className="text-casino-gold font-bold text-lg animate-pulse">
            🎊 WINNING COMBINATION! 🎊
          </p>
        </div>
      )}
      
      {/* Spinning Status */}
      {isSpinning && (
        <div className="mt-4 text-center" role="status" aria-live="polite">
          <p className="text-muted-foreground font-medium">
            Reels spinning...
          </p>
        </div>
      )}
    </div>
  );
};