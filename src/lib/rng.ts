// Simple seeded random number generator using mulberry32
class SeededRNG {
  private seed: number;

  constructor(seed: string | number) {
    // Convert string to number hash if needed
    if (typeof seed === 'string') {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      this.seed = Math.abs(hash);
    } else {
      this.seed = seed;
    }
  }

  // Generate next random number (0-1)
  next(): number {
    this.seed |= 0; // Ensure 32-bit
    this.seed = (this.seed + 0x6D2B79F5) | 0;
    let t = Math.imul(this.seed ^ (this.seed >>> 15), this.seed | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Random integer between min and max (inclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Pick random element from array
  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }

  // Shuffle array (Fisher-Yates)
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

// Global RNG instance
let globalRNG: SeededRNG | null = null;

// Initialize RNG with seed (from URL param or flag)
export function initializeRNG(): SeededRNG {
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const urlSeed = urlParams.get('seed');
  
  if (urlSeed) {
    console.log('Using URL seed:', urlSeed);
    globalRNG = new SeededRNG(urlSeed);
    return globalRNG;
  }

  // Fallback to timestamp for true randomness
  const timestampSeed = Date.now();
  globalRNG = new SeededRNG(timestampSeed);
  return globalRNG;
}

// Set seed from flag (used when flag changes)
export function setSeedFromFlag(flagSeed: string): void {
  if (flagSeed && !new URLSearchParams(window.location.search).has('seed')) {
    console.log('Using flag seed:', flagSeed);
    globalRNG = new SeededRNG(flagSeed);
  }
}

// Get current RNG instance
export function getRNG(): SeededRNG {
  if (!globalRNG) {
    return initializeRNG();
  }
  return globalRNG;
}

// Reset RNG with new seed (for debug panel)
export function resetRNG(seed?: string): SeededRNG {
  const newSeed = seed || Date.now().toString();
  globalRNG = new SeededRNG(newSeed);
  return globalRNG;
}

// Check if we're in deterministic mode
export function isDeterministic(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('seed');
}

// Get current seed info for debugging
export function getSeedInfo(): { source: string; value: string } {
  const urlParams = new URLSearchParams(window.location.search);
  const urlSeed = urlParams.get('seed');
  
  if (urlSeed) {
    return { source: 'URL Parameter', value: urlSeed };
  }
  
  return { source: 'Random Timestamp', value: 'Non-deterministic' };
}