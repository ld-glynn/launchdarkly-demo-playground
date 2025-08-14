// LaunchDarkly Feature Flags for Targeting Demo
export interface TargetingFlags {
  // Geographic targeting: UK vs Belgium
  'geo.welcome-message': string;
  'geo.currency-symbol': '£' | '€';
  'geo.language-hint': 'en' | 'fr' | 'nl';
  'geo.compliance-banner': boolean;
  'geo.payment-methods': string;
  
  // VIP targeting: VIP vs Regular users
  'vip.experience-tier': 'standard' | 'vip' | 'premium';
  'vip.bonus-multiplier': number;
  'vip.support-priority': 'standard' | 'priority' | 'dedicated';
  'vip.interface-theme': 'default' | 'gold' | 'platinum';
  'vip.exclusive-games': boolean;
  
  // String flags for dynamic content
  'content.hero-title': string;
  'content.main-cta': string;
  'content.news-section-title': string;
  'content.footer-disclaimer': string;
  'content.promo-banner': string;
  
  // A/B Test flags
  'experiment.cta-button-variant': 'control' | 'variant-a' | 'variant-b';
  'experiment.cta-button-text': string;
  'experiment.cta-button-style': 'default' | 'gradient' | 'glow';
}

export type TargetingFlagKey = keyof TargetingFlags;

// Default flag values
export const DEFAULT_TARGETING_FLAGS: TargetingFlags = {
  // Geographic defaults (UK)
  'geo.welcome-message': 'Welcome to Gaming1 UK',
  'geo.currency-symbol': '£',
  'geo.language-hint': 'en',
  'geo.compliance-banner': true,
  'geo.payment-methods': 'PayPal, Visa, Mastercard',
  
  // VIP defaults (Standard)
  'vip.experience-tier': 'standard',
  'vip.bonus-multiplier': 1.0,
  'vip.support-priority': 'standard',
  'vip.interface-theme': 'default',
  'vip.exclusive-games': false,
  
  // String content defaults
  'content.hero-title': 'Next Level Gaming Experience',
  'content.main-cta': 'Start Playing',
  'content.news-section-title': 'Latest News',
  'content.footer-disclaimer': 'Demo site for LaunchDarkly integration showcase',
  'content.promo-banner': 'Welcome! Enjoy our gaming platform',
  
  // A/B Test defaults
  'experiment.cta-button-variant': 'control',
  'experiment.cta-button-text': 'Start Playing Now',
  'experiment.cta-button-style': 'default'
};

// User context for targeting
export interface UserContext {
  key: string;
  country: 'UK' | 'BE' | 'other';
  vipStatus: 'standard' | 'vip' | 'premium';
  anonymous: boolean;
  custom?: Record<string, any>;
}