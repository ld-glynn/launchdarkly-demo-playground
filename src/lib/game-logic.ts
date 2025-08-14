import { getRNG, setSeedFromFlag } from './rng';

// Slot machine symbols with weights and payouts
export const SYMBOLS = {
  Cherry: { weight: 25, payout: { 3: 5 }, emoji: '🍒' },
  Lemon: { weight: 25, payout: { 3: 3 }, emoji: '🍋' },
  Bar: { weight: 20, payout: { 3: 10, 2: 1.5 }, emoji: '📊' },
  Seven: { weight: 15, payout: { 3: 25, 2: 3 }, emoji: '7️⃣' },
  Diamond: { weight: 15, payout: { 3: 50 }, emoji: '💎' }
} as const;

export type Symbol = keyof typeof SYMBOLS;
export type SpinResult = [Symbol, Symbol, Symbol];

// Generate weighted symbol array based on RTP target
function generateSymbolPool(rtpTarget: number): Symbol[] {
  const pool: Symbol[] = [];
  const symbols = Object.entries(SYMBOLS) as [Symbol, typeof SYMBOLS[Symbol]][];
  
  // Adjust weights slightly based on RTP target
  const rtpMultiplier = rtpTarget / 0.92; // Base RTP around 92%
  
  symbols.forEach(([symbol, config]) => {
    const adjustedWeight = Math.max(1, Math.round(config.weight * rtpMultiplier));
    for (let i = 0; i < adjustedWeight; i++) {
      pool.push(symbol);
    }
  });
  
  return pool;
}

// Calculate payout for a spin result
export function calculatePayout(result: SpinResult, betAmount: number): number {
  const [a, b, c] = result;
  
  // Check for exact matches first
  if (a === b && b === c) {
    const symbolConfig = SYMBOLS[a];
    const multiplier = symbolConfig.payout[3] || 0;
    return betAmount * multiplier;
  }
  
  // Check for two-of-a-kind (specific symbols only)
  if (a === b || b === c || a === c) {
    const symbol = a === b ? a : (b === c ? b : a);
    const symbolConfig = SYMBOLS[symbol];
    if (symbolConfig.payout[2]) {
      return betAmount * symbolConfig.payout[2];
    }
  }
  
  // Check for mixed bars (any two bars pay)
  const barCount = result.filter(s => s === 'Bar').length;
  if (barCount >= 2) {
    return betAmount * 1.5;
  }
  
  return 0; // No win
}

// Check if result is a winning combination
export function isWinningResult(result: SpinResult): boolean {
  return calculatePayout(result, 1) > 0;
}

// Perform a spin with RTP consideration
export function performSpin(rtpTarget: number, rngSeedFromFlag?: string): SpinResult {
  // Update RNG seed if flag changed
  if (rngSeedFromFlag) {
    setSeedFromFlag(rngSeedFromFlag);
  }
  
  const rng = getRNG();
  const symbolPool = generateSymbolPool(rtpTarget);
  
  // Generate three random symbols
  const result: SpinResult = [
    rng.pick(symbolPool),
    rng.pick(symbolPool),
    rng.pick(symbolPool)
  ];
  
  return result;
}

// Get paytable for display
export function getPaytable(): Array<{ symbols: string; payout: string }> {
  return [
    { symbols: '💎 💎 💎', payout: '50x' },
    { symbols: '7️⃣ 7️⃣ 7️⃣', payout: '25x' },
    { symbols: '📊 📊 📊', payout: '10x' },
    { symbols: '🍒 🍒 🍒', payout: '5x' },
    { symbols: '🍋 🍋 🍋', payout: '3x' },
    { symbols: '7️⃣ 7️⃣ any', payout: '3x' },
    { symbols: '📊 📊 any', payout: '1.5x' },
    { symbols: 'Any bars', payout: '1.5x' }
  ];
}

// Calculate session statistics
export interface SessionStats {
  totalSpins: number;
  totalWins: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
  avgPayoutPerSpin: number;
  currentBalance: number;
  biggestWin: number;
}

export function calculateSessionStats(
  spins: Array<{ result: SpinResult; betAmount: number; payout: number }>,
  currentBalance: number
): SessionStats {
  const totalSpins = spins.length;
  const totalWins = spins.filter(spin => spin.payout > 0).length;
  const totalWagered = spins.reduce((sum, spin) => sum + spin.betAmount, 0);
  const totalWon = spins.reduce((sum, spin) => sum + spin.payout, 0);
  const winRate = totalSpins > 0 ? (totalWins / totalSpins) * 100 : 0;
  const avgPayoutPerSpin = totalSpins > 0 ? totalWon / totalSpins : 0;
  const biggestWin = Math.max(0, ...spins.map(spin => spin.payout));
  
  return {
    totalSpins,
    totalWins,
    totalWagered,
    totalWon,
    winRate,
    avgPayoutPerSpin,
    currentBalance,
    biggestWin
  };
}