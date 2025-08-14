# LaunchDarkly Targeting Integration Guide

This document outlines the LaunchDarkly feature flags implementation for geographic and VIP user targeting in the Gaming1 demo application.

## Features Implemented

### 1. Geographic Targeting (UK vs Belgium)

#### Flags:
- `geo.welcome-message`: Localized welcome message
- `geo.currency-symbol`: Currency symbol (£ for UK, € for Belgium)  
- `geo.language-hint`: Language preference (en, fr, nl)
- `geo.compliance-banner`: Regional compliance banner display
- `geo.payment-methods`: Available payment methods by region

#### Targeting Rules:
- **UK Users**: `country = 'UK'`
  - Welcome message: "Welcome to Gaming1 UK"
  - Currency: £
  - Language: en
  - Compliance banner: true
  
- **Belgium Users**: `country = 'BE'`
  - Welcome message: "Bienvenue sur Gaming1 Belgique"
  - Currency: €
  - Language: fr
  - Compliance banner: true

### 2. VIP Targeting (VIP vs Regular Users)

#### Flags:
- `vip.experience-tier`: User tier (standard, vip, premium)
- `vip.bonus-multiplier`: Bonus multiplier for VIP users
- `vip.support-priority`: Support queue priority
- `vip.interface-theme`: UI theme variant
- `vip.exclusive-games`: Access to exclusive games

#### Targeting Rules:
- **Standard Users**: `vipStatus = 'standard'`
  - Experience tier: standard
  - Bonus multiplier: 1.0x
  - Support: standard queue
  
- **VIP Users**: `vipStatus = 'vip'`
  - Experience tier: vip
  - Bonus multiplier: 2.0x
  - Support: priority queue
  
- **Premium Users**: `vipStatus = 'premium'`
  - Experience tier: premium
  - Bonus multiplier: 3.0x
  - Support: dedicated manager

### 3. Dynamic String Flags

#### Flags:
- `content.hero-title`: Main hero section title
- `content.main-cta`: Primary call-to-action text
- `content.news-section-title`: News section heading
- `content.footer-disclaimer`: Footer disclaimer text
- `content.promo-banner`: Promotional banner message

## Implementation Details

### User Context Structure

```typescript
interface UserContext {
  key: string;
  country: 'UK' | 'BE' | 'other';
  vipStatus: 'standard' | 'vip' | 'premium';
  anonymous: boolean;
  custom?: {
    timezone: string;
    locale: string;
    segment: string;
    lifetimeValue?: number;
    accountAge?: string;
  };
}
```

### Flag Evaluation

Flags are evaluated in real-time using the LaunchDarkly React SDK:

```typescript
const welcomeMessage = useFlag('geo.welcome-message', 'Welcome to Gaming1');
const experienceTier = useFlag('vip.experience-tier', 'standard');
const heroTitle = useFlag('content.hero-title', 'Next Level Gaming');
```

### Context Switching

The demo includes a targeting panel that allows switching between different user contexts:

- UK Standard User
- UK VIP User  
- UK Premium User
- Belgium Standard User
- Belgium VIP User
- Belgium Premium User

## Usage Instructions

### 1. Switch User Context

Use the targeting demo panel to switch between different user contexts and see how flags change in real-time.

### 2. Observe Flag Changes

Watch how the following components update based on the active context:

- Hero section title and CTA text
- News section title
- Welcome messages and currency symbols
- VIP banners and bonus indicators
- Regional compliance banners

### 3. LaunchDarkly Dashboard

In your LaunchDarkly dashboard, you can:

1. **Create targeting rules** based on user attributes
2. **Set flag variations** for different user segments
3. **Monitor flag evaluations** and user targeting
4. **Perform A/B tests** with different flag combinations

### Example LaunchDarkly Rules

#### Geographic Targeting Rule:
```
IF user.country is one of ["UK"]
THEN serve variation: uk_content
ELSE IF user.country is one of ["BE"] 
THEN serve variation: be_content
ELSE serve default variation
```

#### VIP Targeting Rule:
```
IF user.custom.vipStatus is "premium"
THEN serve variation: premium_experience
ELSE IF user.custom.vipStatus is "vip"
THEN serve variation: vip_experience  
ELSE serve variation: standard_experience
```

## Benefits Demonstrated

1. **Localization**: Serve region-specific content and currency
2. **Personalization**: Tailor experience based on user tier
3. **Compliance**: Show regulatory banners by jurisdiction
4. **Dynamic Content**: Update messaging without code deployments
5. **Real-time Changes**: Instant flag updates across all users

## Technical Integration

The integration uses:
- `launchdarkly-react-client-sdk` for client-side flags
- React Context for flag state management
- Custom hooks for easy flag access
- Local storage for user context persistence
- Event listeners for real-time context switching

This setup demonstrates how LaunchDarkly enables sophisticated user targeting and dynamic content delivery in modern web applications.