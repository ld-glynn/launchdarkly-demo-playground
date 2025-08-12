import * as LDClient from 'launchdarkly-js-client-sdk';

const clientSideID = 'demo-client-side-id'; // In real app: process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID

export interface User {
  key: string;
  name?: string;
  email?: string;
  country?: string;
  custom?: Record<string, any>;
}

// Default user for demo purposes
export const defaultUser: User = {
  key: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
  country: 'BE', // Belgium for gaming1 demo
  custom: {
    segment: 'demo',
    device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'desktop'
  }
};

// Feature flag defaults
export const flagDefaults = {
  'hero.variant': 'A',
  'hero.cta-text': 'Learn more',
  'news.layout': 'grid',
  'who.section-order': 'who-first',
  'careers.show': true,
  'cookie.banner': true,
  'video.modal': true,
  'contact.banner-gradient': true,
  'regulatory.duty-of-care-banner': false,
  'nav.dark-on-scroll': true,
} as const;

export type FlagKey = keyof typeof flagDefaults;

class LaunchDarklyService {
  private client: LDClient.LDClient | null = null;
  private initialized = false;

  async initialize(user: User = defaultUser): Promise<LDClient.LDClient> {
    if (this.client && this.initialized) {
      return this.client;
    }

    // For demo purposes, we'll use a mock client if no real client ID is provided
    if (clientSideID === 'demo-client-side-id') {
      return this.createMockClient();
    }

    try {
      this.client = LDClient.initialize(clientSideID, user);
      await this.client.waitForInitialization(5);
      this.initialized = true;
      return this.client;
    } catch (error) {
      console.warn('LaunchDarkly initialization failed, using mock client:', error);
      return this.createMockClient();
    }
  }

  private createMockClient(): LDClient.LDClient {
    // Create a mock client for demo purposes
    const mockClient = {
      variation: (flagKey: string, defaultValue: any) => {
        // Demo variations for different flags
        switch (flagKey) {
          case 'hero.variant':
            return Math.random() > 0.5 ? 'B' : 'A';
          case 'hero.cta-text':
            const ctaOptions = ['Learn more', 'See platform', 'Get in touch'];
            return ctaOptions[Math.floor(Math.random() * ctaOptions.length)];
          case 'news.layout':
            return Math.random() > 0.5 ? 'carousel' : 'grid';
          case 'regulatory.duty-of-care-banner':
            return Math.random() > 0.7; // 30% chance to show
          default:
            return flagDefaults[flagKey as FlagKey] ?? defaultValue;
        }
      },
      track: (eventKey: string, data?: any, metricValue?: number) => {
        console.log(`[LaunchDarkly Demo] Tracked event: ${eventKey}`, data, metricValue);
      },
      flush: () => Promise.resolve(),
      identify: (user: User) => Promise.resolve(),
      close: () => Promise.resolve(),
      on: () => {},
      off: () => {},
      allFlags: () => ({}),
      getUser: () => defaultUser,
      setStreaming: () => {},
      isOffline: () => false,
    } as any;

    this.client = mockClient;
    this.initialized = true;
    return mockClient;
  }

  getClient(): LDClient.LDClient | null {
    return this.client;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const ldService = new LaunchDarklyService();

// Tracking helpers
export const trackEvent = (eventKey: string, data?: any, metricValue?: number) => {
  const client = ldService.getClient();
  if (client) {
    client.track(eventKey, data, metricValue);
  }
};

// Common event tracking functions
export const trackCTAClick = (location: string, variant?: string) => {
  trackEvent('cta_click', { location, variant });
};

export const trackVideoPlay = (location: string) => {
  trackEvent('video_play', { location });
};

export const trackContactClick = (source: string) => {
  trackEvent('contact_click', { source });
};

export const trackLeadSubmitted = (source: string, data?: any) => {
  trackEvent('lead_submitted', { source, ...data });
};

export const trackCardClick = (cardType: string, cardId: string) => {
  trackEvent('card_click', { cardType, cardId });
};