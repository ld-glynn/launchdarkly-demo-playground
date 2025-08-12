# LaunchDarkly Integration Guide

This document explains how to configure and use LaunchDarkly feature flags in the Gaming1 demo application.

## Overview

This demo showcases how Gaming1 could use LaunchDarkly to run A/B tests, gradual rollouts, and targeted feature releases. All flags are currently using mock implementations for demonstration purposes.

## Feature Flags

### 1. Hero Section Variants (`hero.variant`)

**Purpose**: A/B test different hero section layouts and messaging

**Default**: `"A"`

**Variations**:
- `"A"` (Control): "Next level entertainment" with standard messaging
- `"B"` (Treatment 1): "Revolutionary gaming" with innovation-focused copy  
- `"C"` (Treatment 2): "Leading the future in technology" with tech-forward messaging

**Component**: `src/components/Hero.tsx`

**Metrics**: Track `cta_click` events from the hero CTA button

**Test Scenario**:
```json
{
  "flagKey": "hero.variant",
  "variations": {
    "A": { "value": "A", "name": "Control - Next Level" },
    "B": { "value": "B", "name": "Revolutionary" },
    "C": { "value": "C", "name": "Future Tech" }
  },
  "targeting": {
    "rules": [
      {
        "variation": "B",
        "clauses": [{ "attribute": "country", "op": "in", "values": ["US", "UK"] }]
      }
    ],
    "fallthrough": { "variation": "A" }
  }
}
```

### 2. Hero CTA Text (`hero.cta-text`)

**Purpose**: Test different call-to-action button copy

**Default**: `"Learn more"`

**Variations**:
- `"Learn more"` (Standard)
- `"See platform"` (Product-focused)
- `"Get in touch"` (Contact-focused)

**Component**: `src/components/Hero.tsx`

**Metrics**: Track `cta_click` events with variant information

### 3. News Layout (`news.layout`)

**Purpose**: Test grid vs carousel layout for news section

**Default**: `"grid"`

**Variations**:
- `"grid"` - 4-column responsive grid layout
- `"carousel"` - Horizontal scrolling carousel

**Component**: `src/components/NewsGrid.tsx`

**Metrics**: 
- `cta_click` from "Read all news" button
- `card_click` when individual news cards are clicked

### 4. Section Order (`who.section-order`)

**Purpose**: Test optimal order of "Who we are" vs "What we do" sections

**Default**: `"who-first"`

**Variations**:
- `"who-first"` - Who we are section appears before What we do
- `"what-first"` - What we do section appears before Who we are

**Component**: `src/pages/Index.tsx`

**Metrics**: Track `contact_click` and scroll depth events

### 5. Careers Section (`careers.show`)

**Purpose**: Show/hide the careers section for different audiences

**Default**: `true`

**Variations**:
- `true` - Show careers section
- `false` - Hide careers section

**Component**: `src/pages/Index.tsx`

**Metrics**: Track engagement with "Join us" CTA when visible

### 6. Cookie Banner (`cookie.banner`)

**Purpose**: Enable/disable cookie consent banner

**Default**: `true`

**Variations**:
- `true` - Show cookie banner
- `false` - Hide cookie banner

**Component**: `src/components/CookieBanner.tsx`

### 7. Video Modal (`video.modal`)

**Purpose**: Enable/disable video modal functionality in What we do section

**Default**: `true`

**Variations**:
- `true` - Enable video modal with play button overlay
- `false` - Show static image only

**Component**: `src/components/VideoModal.tsx`

**Metrics**: Track `video_play` events when video is opened

### 8. Contact Banner Gradient (`contact.banner-gradient`)

**Purpose**: A/B test gradient vs solid background on contact callout

**Default**: `true`

**Variations**:
- `true` - Use gradient background
- `false` - Use solid background

**Component**: `src/components/ContactCallout.tsx`

### 9. Responsible Gaming Banner (`regulatory.duty-of-care-banner`)

**Purpose**: Show targeted responsible gaming messaging for specific audiences

**Default**: `false` 

**Variations**:
- `true` - Show responsible gaming banner below header
- `false` - Hide banner

**Component**: `src/components/ResponsibleGamingBanner.tsx`

**Targeting Example**: Show for users in specific countries or segments
```json
{
  "rules": [
    {
      "variation": true,
      "clauses": [
        { "attribute": "country", "op": "in", "values": ["UK", "DE", "FR"] }
      ]
    }
  ]
}
```

### 10. Navigation Dark on Scroll (`nav.dark-on-scroll`)

**Purpose**: Enable/disable navigation background change on scroll

**Default**: `true`

**Variations**:
- `true` - Add dark background when scrolling
- `false` - Keep transparent navigation

**Component**: `src/components/Header.tsx`

## Event Tracking

The application tracks several key events for experiment measurement:

### Core Events

1. **`cta_click`** - Primary conversion event
   - `location`: Where the CTA was clicked (hero, news, section, etc.)
   - `variant`: Which variant was shown (for hero experiments)

2. **`video_play`** - Video engagement
   - `location`: Section where video was played

3. **`contact_click`** - Contact intent
   - `source`: Which component triggered the contact action

4. **`card_click`** - Content engagement
   - `cardType`: Type of card (news, service, etc.)
   - `cardId`: Unique identifier

5. **`lead_submitted`** - Lead generation (conversion)
   - `source`: Form source (contact-form, homepage)
   - Additional form data (anonymized)

### Implementation Example

```typescript
import { trackCTAClick } from '@/lib/launchdarkly';

const handleButtonClick = () => {
  trackCTAClick('hero', heroVariant);
  // Navigate or perform action
};
```

## Setting Up Experiments in LaunchDarkly

### Experiment 1: Hero Optimization

**Hypothesis**: Changing hero messaging will improve CTA click-through rate

**Setup**:
1. Create flag `hero.variant` with variations A, B, C
2. Set up experiment with 33% traffic to each variant
3. Set primary metric to `cta_click` events
4. Set secondary metrics to time on page, scroll depth

**Success Criteria**: 20% improvement in CTA click rate

### Experiment 2: News Layout

**Hypothesis**: Carousel layout will increase news engagement

**Setup**:
1. Create flag `news.layout` with grid/carousel variations
2. Split traffic 50/50
3. Track `card_click` events as primary metric
4. Track `cta_click` from "Read all news" as secondary

**Success Criteria**: 15% increase in news card clicks

### Experiment 3: Regulatory Compliance

**Hypothesis**: Showing responsible gaming banner will improve trust metrics

**Setup**:
1. Create flag `regulatory.duty-of-care-banner`
2. Target specific countries (UK, Germany) with banner
3. Track contact form completion rates
4. Monitor user feedback sentiment

## Environment Setup

### Mock Implementation (Current)

The demo uses a mock LaunchDarkly client for demonstration:

```typescript
// Mock client with demo variations
const mockClient = {
  variation: (flagKey: string, defaultValue: any) => {
    switch (flagKey) {
      case 'hero.variant':
        return Math.random() > 0.5 ? 'B' : 'A';
      case 'regulatory.duty-of-care-banner':
        return Math.random() > 0.7; // 30% show rate
      default:
        return flagDefaults[flagKey] ?? defaultValue;
    }
  },
  track: (eventKey: string, data?: any) => {
    console.log(`[LaunchDarkly Demo] Tracked: ${eventKey}`, data);
  }
};
```

### Production Setup

For production deployment:

1. **Environment Variables**:
   ```bash
   NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID=your_client_side_id
   LAUNCHDARKLY_SDK_KEY=your_server_sdk_key
   ```

2. **User Context**:
   ```typescript
   const user = {
     key: userId,
     name: userName,
     email: userEmail,
     country: userCountry,
     custom: {
       segment: 'premium',
       device: 'mobile'
     }
   };
   ```

3. **Flag Configuration**: Create flags in LaunchDarkly dashboard matching the keys above

## Testing Feature Flags

### Manual Testing

1. **Local Development**: Flags randomize on page refresh for demo purposes
2. **Flag Override**: Modify `flagDefaults` in `src/lib/launchdarkly.ts`
3. **User Attributes**: Test targeting by modifying user object in LaunchDarkly context

### Automated Testing

Example test for hero variants:

```typescript
// __tests__/hero.test.tsx
import { render, screen } from '@testing-library/react';
import { LaunchDarklyProvider } from '@/contexts/LaunchDarklyContext';
import Hero from '@/components/Hero';

test('shows variant B messaging', () => {
  const mockUser = { key: 'test-user' };
  
  render(
    <LaunchDarklyProvider user={mockUser}>
      <Hero />
    </LaunchDarklyProvider>
  );
  
  // Assert variant B content appears
  expect(screen.getByTestId('hero-section')).toHaveAttribute('data-variant', 'B');
});
```

## Best Practices

1. **Always provide defaults** for flag values to prevent errors
2. **Use semantic flag keys** that describe the feature, not the implementation
3. **Track meaningful events** that align with business objectives
4. **Test flag changes** in development before production deployment
5. **Document flag purposes** and expected variations
6. **Clean up unused flags** after experiments conclude
7. **Use targeting rules** for gradual rollouts and user segmentation

## Troubleshooting

### Common Issues

1. **Flag not updating**: Check flag key spelling and LaunchDarkly client initialization
2. **Events not tracking**: Verify client is properly initialized before tracking calls
3. **Targeting not working**: Ensure user attributes are set correctly in context

### Debug Mode

Enable debug logging:

```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  console.log('Current flags:', flags);
  console.log('User context:', user);
}
```

## Additional Resources

- [LaunchDarkly React SDK Documentation](https://docs.launchdarkly.com/sdk/client-side/react)
- [Experiment Design Best Practices](https://docs.launchdarkly.com/guides/experimentation)
- [Feature Flag Lifecycle Management](https://docs.launchdarkly.com/guides/flags/flag-lifecycle)