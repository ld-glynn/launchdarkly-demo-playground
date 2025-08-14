// Targeting service for LaunchDarkly demo
import { UserContext } from '@/types/targeting-flags';

// Create user context based on geographic location
export function createUKUserContext(): UserContext {
  return {
    key: 'uk-user-' + Math.random().toString(36).substr(2, 9),
    country: 'UK',
    vipStatus: 'standard',
    anonymous: false,
    custom: {
      timezone: 'Europe/London',
      locale: 'en-GB',
      segment: 'uk-standard'
    }
  };
}

export function createBelgiumUserContext(): UserContext {
  return {
    key: 'be-user-' + Math.random().toString(36).substr(2, 9),
    country: 'BE',
    vipStatus: 'standard',
    anonymous: false,
    custom: {
      timezone: 'Europe/Brussels',
      locale: 'fr-BE',
      segment: 'be-standard'
    }
  };
}

// Create VIP user context
export function createVIPUserContext(country: 'UK' | 'BE' = 'UK'): UserContext {
  return {
    key: 'vip-user-' + Math.random().toString(36).substr(2, 9),
    country,
    vipStatus: 'vip',
    anonymous: false,
    custom: {
      timezone: country === 'UK' ? 'Europe/London' : 'Europe/Brussels',
      locale: country === 'UK' ? 'en-GB' : 'fr-BE',
      segment: `${country.toLowerCase()}-vip`,
      lifetimeValue: 5000,
      accountAge: 'veteran'
    }
  };
}

export function createPremiumUserContext(country: 'UK' | 'BE' = 'UK'): UserContext {
  return {
    key: 'premium-user-' + Math.random().toString(36).substr(2, 9),
    country,
    vipStatus: 'premium',
    anonymous: false,
    custom: {
      timezone: country === 'UK' ? 'Europe/London' : 'Europe/Brussels',
      locale: country === 'UK' ? 'en-GB' : 'fr-BE',
      segment: `${country.toLowerCase()}-premium`,
      lifetimeValue: 15000,
      accountAge: 'elite'
    }
  };
}

// Get current user from localStorage or create default
export function getCurrentTargetingContext(): UserContext {
  try {
    const stored = localStorage.getItem('ld-targeting-context');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading targeting context:', error);
  }
  return createUKUserContext();
}

// Set user context and notify app
export function setTargetingContext(context: UserContext): void {
  localStorage.setItem('ld-targeting-context', JSON.stringify(context));
  window.dispatchEvent(new CustomEvent('targetingContextChanged', { detail: context }));
  console.log('Targeting context updated:', context);
}