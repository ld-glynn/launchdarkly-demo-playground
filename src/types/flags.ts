export interface GameFlags {
  // VIP experience flag
  'vip-gaming-experience': 'none' | 'vip';
  
  // UI Variant flag for A/B testing button styles
  'ui.variant': 'control' | 'bold';
  
  // Theme flag for visual variant testing
  'theme.name': 'classic' | 'neon';
  
  // Economy flags for game balance experimentation
  'economy.spinCost': number;
  'economy.rtpTarget': number;
  
  // Feature flags for A/B testing features
  'features.dailyBonus': boolean;
  'features.confettiOnWin': boolean;
  
  // Copy testing for CTA optimization
  'copy.spinCta': string;
  
  // RNG seeding for deterministic demos
  'rng.seedFromFlag': string;
}

export type FlagKey = keyof GameFlags;

// Default flag values for offline mode
export const DEFAULT_FLAGS: GameFlags = {
  'vip-gaming-experience': 'none',
  'ui.variant': 'control',
  'theme.name': 'classic',
  'economy.spinCost': 10,
  'economy.rtpTarget': 0.92,
  'features.dailyBonus': true,
  'features.confettiOnWin': true,
  'copy.spinCta': 'Spin Now',
  'rng.seedFromFlag': ''
};

// LaunchDarkly user context attributes
export interface LDUserContext {
  key: string;
  anonymous: boolean;
  appVersion: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  locale: string;
  countryGuess: string;
  demoSeed?: string;
}