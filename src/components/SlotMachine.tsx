import { useState, useEffect, useCallback } from 'react';
import { useFlag, useLDClient } from '@/contexts/LaunchDarklyContext';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reels } from './Reels';
import { Paytable } from './Paytable';
import { SessionMetrics } from './SessionMetrics';
import { performSpin, calculatePayout, isWinningResult, type SpinResult, calculateSessionStats } from '@/lib/game-logic';
import { trackEvent } from '@/lib/launchdarkly';
import { GameFlags } from '@/types/flags';
import { trackGamingSession } from '@/lib/shared-context';

interface SpinRecord {
  result: SpinResult;
  betAmount: number;
  payout: number;
  timestamp: number;
}

interface SlotMachineProps {
  mockFlags?: Partial<GameFlags>;
}

export const SlotMachine = ({ mockFlags }: SlotMachineProps) => {
  const ldClient = useLDClient();
  
  // Game state
  const [balance, setBalance] = useState(1000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentResult, setCurrentResult] = useState<SpinResult>(['Cherry', 'Cherry', 'Cherry']);
  const [lastWin, setLastWin] = useState(0);
  const [spinHistory, setSpinHistory] = useState<SpinRecord[]>([]);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);
  const [sessionStartTime] = useState(Date.now());

  // Get flag values - simplified (only essential flags)
  const uiVariant = useFlag('ui.variant', 'control');
  const spinCost = useFlag('economy.spinCost', 10);
  const dailyBonusEnabled = useFlag('features.dailyBonus', true);
  const spinCta = useFlag('copy.spinCta', 'Spin Now');
  const themeName = 'classic';
  const rtpTarget = 0.92;

  // Apply theme (hardcoded to classic)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'classic');
  }, []);

  // Track session start
  useEffect(() => {
    const variants = {
      uiVariant,
      themeName,
      rtpTarget,
      spinCost
    };
    trackEvent('session_started');
  }, [uiVariant, spinCost, sessionStartTime]);

  // Trigger confetti on big wins (always enabled)
  const triggerConfetti = useCallback((multiplier: number) => {
    if (multiplier >= 10) {
      // Big win - gold confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
    } else if (multiplier >= 5) {
      // Good win - silver confetti  
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#C0C0C0', '#E6E6FA', '#F0F8FF']
      });
    }
  }, []);

  // Handle spin
  const handleSpin = useCallback(async () => {
    if (isSpinning || balance < spinCost) return;

    // Track spin click
    const variants = {
      uiVariant,
      themeName,
      rtpTarget,
      spinCost
    };
    trackEvent('spin_clicked');

    setIsSpinning(true);
    setBalance(prev => prev - spinCost);
    
    // Perform the spin with RTP target
    const result = performSpin(0.92, '');
    const payout = calculatePayout(result, spinCost);
    const isWin = payout > 0;
    
    // Animate reels (delay for effect)
    setTimeout(() => {
      setCurrentResult(result);
      
      if (isWin) {
        setLastWin(payout);
        setBalance(prev => prev + payout);
        
        // Trigger confetti for big wins
        const multiplier = payout / spinCost;
        triggerConfetti(multiplier);
      } else {
        setLastWin(0);
      }
      
      // Record spin
      const spinRecord: SpinRecord = {
        result,
        betAmount: spinCost,
        payout,
        timestamp: Date.now()
      };
      setSpinHistory(prev => [...prev, spinRecord]);
      
      // Track events
      trackEvent('round_completed');
      
      if (isWin) {
        trackEvent('win', payout); // Use payout as metric value
      }
      
      // Track gaming session data for omni-channel context
      trackGamingSession('slot-machine', 1, spinCost, payout, 1200); // 1.2 seconds per spin
      
      setIsSpinning(false);
    }, 1200); // Match reel animation duration
  }, [isSpinning, balance, spinCost, ldClient, triggerConfetti]);

  // Handle daily bonus
  const handleDailyBonus = useCallback(() => {
    if (dailyBonusClaimed) return;
    
    setBalance(prev => prev + 100);
    setDailyBonusClaimed(true);
    
    const variants = {
      uiVariant,
      themeName,
      rtpTarget,
      spinCost
    };
    trackEvent('daily_bonus_claimed');
  }, [dailyBonusClaimed, uiVariant, spinCost]);

  // Calculate session statistics
  const sessionStats = calculateSessionStats(spinHistory, balance);
  
  // Determine if spin is disabled
  const spinDisabled = isSpinning || balance < spinCost;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-4 text-2xl md:text-3xl">
            <span className="text-casino-gold">Gaming1</span>
            <span className="text-muted-foreground">×</span>
            <span className="text-casino-silver">LaunchDarkly</span>
          </CardTitle>
          <p className="text-muted-foreground">Experimentation Demo</p>
        </CardHeader>
      </Card>

      {/* Demo Banner */}
      <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-3 text-center">
        <p className="text-destructive font-semibold">
          🚫 DEMO ONLY — NO REAL MONEY — FOR EXPERIMENTATION SHOWCASE ONLY 🚫
        </p>
      </div>

      {/* Game Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Balance & Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-casino-gold">Balance</h3>
                  <p className="text-3xl font-bold">{balance} coins</p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-casino-silver">Bet</h3>
                  <p className="text-2xl font-bold">{spinCost} coins</p>
                </div>
              </div>

              {/* Daily Bonus */}
              {dailyBonusEnabled && !dailyBonusClaimed && (
                <div className="mb-4">
                  <Button
                    onClick={handleDailyBonus}
                    variant="outline"
                    className="w-full animate-gold-glow"
                  >
                    🎁 Claim Daily Bonus +100 coins
                  </Button>
                </div>
              )}

              {/* Spin Button */}
              <Button
                onClick={handleSpin}
                disabled={spinDisabled}
                className={`w-full text-xl py-6 transition-all duration-200 ${
                  uiVariant === 'bold' 
                    ? 'text-2xl py-8 font-bold bg-casino-gold hover:bg-casino-gold/90 text-primary-foreground shadow-lg hover:shadow-xl' 
                    : ''
                }`}
                aria-live="polite"
                aria-label={spinDisabled ? 'Insufficient balance' : 'Spin the reels'}
              >
                {isSpinning ? '🎰 Spinning...' : spinCta}
              </Button>

              {/* Win Display */}
              {lastWin > 0 && (
                <div className="mt-4 text-center animate-pulse-win">
                  <Badge variant="secondary" className="text-lg py-2 px-4 bg-casino-green">
                    🎉 You won {lastWin} coins! (+{(lastWin / spinCost).toFixed(1)}x)
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Slot Machine Reels */}
          <Reels
            result={currentResult}
            isSpinning={isSpinning}
            isWinning={isWinningResult(currentResult)}
          />

          {/* Paytable */}
          <Paytable />
        </div>

        {/* Session Metrics Sidebar */}
        <div className="lg:col-span-1">
          <SessionMetrics
            stats={sessionStats}
            variants={{
              uiVariant,
              themeName,
              rtpTarget,
              spinCost
            }}
            sessionDurationMs={Date.now() - sessionStartTime}
          />
        </div>
      </div>
    </div>
  );
};