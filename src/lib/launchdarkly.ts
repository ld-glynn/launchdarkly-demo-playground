import * as LDClient from 'launchdarkly-js-client-sdk';

const clientSideID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_SIDE_ID || 'demo-client-side-id';

export interface User {
  key: string;
  name?: string;
  email?: string;
  country?: string;
  custom?: Record<string, any>;
}

// Feature flag defaults - simplified to only essential flags
export const flagDefaults = {
  // VIP experience flag
  'vip-gaming-experience': 'none',
  
  // Essential gaming app flags (for website slot machine)
  'ui.variant': 'control',
  'economy.spinCost': 10,
  'features.dailyBonus': true,
  'copy.spinCta': 'Spin Now',
} as const;

export type FlagKey = keyof typeof flagDefaults;

class LaunchDarklyService {
  private client: LDClient.LDClient | null = null;
  private initialized = false;
  private currentUser: User | null = null;

  async initialize(user: User): Promise<LDClient.LDClient> {
    if (this.client && this.initialized) {
      return this.client;
    }

    this.currentUser = user;

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
        // Demo variations for remaining flags
        switch (flagKey) {
          case 'vip-gaming-experience':
            // Check if user qualifies for VIP based on context
            if (this.currentUser?.custom?.vipStatus === 'vip') {
              return 'vip';
            }
            return 'none';
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
      getUser: () => ({ key: 'demo-user', anonymous: true }),
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

  getUser(): User | null {
    return this.currentUser;
  }
}

export const ldService = new LaunchDarklyService();

// Simplified tracking helpers
export const trackEvent = (eventKey: string, metricValue?: number) => {
  const client = ldService.getClient();
  if (client) {
    client.track(eventKey, undefined, metricValue);
  }
};

