# Omni-Channel Integration Demo Guide

This guide demonstrates how Gaming1 can implement omni-channel experimentation using LaunchDarkly, where user context and data are shared between the website and gaming app.

## 🎯 Demo Overview

The integration showcases:
- **Shared User Context**: Persistent user data across website and gaming app
- **Cross-Platform Targeting**: Feature flags based on behavior from both platforms
- **Engagement Scoring**: Automatic user segmentation based on activity
- **Real-time Updates**: Live flag changes affecting both platforms

## 🚀 How to Test

### Step 1: Start with the Website
1. Navigate to the homepage (`/`)
2. Click on various CTAs and navigate to different pages
3. Visit the Games page (`/games`) and view some games
4. Notice how your engagement score increases with each interaction

### Step 2: Transition to Gaming App
1. From the Games page, click "Play Now" on "Lucky Slots Deluxe"
2. This will redirect you to the Gaming Demo (`/gaming`)
3. Notice the "Omni-Channel User Context" banner showing your:
   - Engagement Score
   - User Segment
   - Session Duration

### Step 3: Observe Cross-Platform Behavior
1. The slot machine will show different variants based on your website behavior
2. High-engagement users might see different UI variants or game economy settings
3. Your gaming activity is tracked and added to your shared context

### Step 4: Return to Website
1. Navigate back to the website
2. Your gaming session data is now part of your user context
3. Future website interactions can be influenced by your gaming behavior

## 🔧 Technical Implementation

### Shared Context System
```typescript
// User context is automatically created and persisted
const sharedContext = createSharedUserContext();

// Website engagement tracking
trackPageVisit('/games');
trackCTAClick('hero');
trackGameView('lucky-slots');

// Gaming engagement tracking
trackGamingSession('slot-machine', 1, 10, 50, 1200);
```

### User Segmentation
Users are automatically segmented based on engagement:
- **New User**: 0-49 points
- **Low Engagement**: 50-99 points
- **Medium Engagement**: 100-199 points
- **High Engagement**: 200+ points

### Engagement Scoring
- Website page visit: +10 points
- CTA click: +20 points
- Game view: +15 points
- Contact submission: +50 points
- Gaming session: +25 points per game
- Spin activity: +1 point per 10 spins
- Session duration: +1 point per minute

## 🎮 Feature Flag Examples

### Website → Gaming Targeting
```typescript
// Target users who viewed specific games
if (user.custom.viewedGames.includes('lucky-slots')) {
  // Show special welcome bonus
}

// Target high-engagement users
if (user.custom.userSegment === 'high-engagement') {
  // Show premium UI variant
}
```

### Gaming → Website Targeting
```typescript
// Target users with gaming history
if (user.custom.hasGamingHistory) {
  // Show gaming-focused content
}

// Target based on gaming preferences
if (user.custom.favoriteGames.includes('slots')) {
  // Show slot machine promotions
}
```

## 📊 Analytics & Metrics

### Cross-Platform Events
- `session_started`: When user starts gaming session
- `spin_clicked`: User interaction with gaming
- `round_completed`: Game completion with results
- `win`: Winning events with payout data
- `daily_bonus_claimed`: Bonus feature usage

### User Context Data
```typescript
{
  engagementScore: 150,
  userSegment: 'medium-engagement',
  hasGamingHistory: true,
  hasWebsiteHistory: true,
  favoriteGames: ['slot-machine'],
  viewedGames: ['lucky-slots', 'blackjack-pro'],
  ctaClickCount: 3,
  totalSpins: 25,
  totalWagered: 250,
  totalWon: 180
}
```

## 🎯 Real-World Applications

### Personalization
- Show different game recommendations based on website behavior
- Adjust difficulty/RTG based on user engagement level
- Personalize UI themes based on user preferences

### Retention
- Target users who haven't played recently
- Offer bonuses to high-value users
- Re-engage users based on their activity patterns

### Conversion
- Show different CTAs based on gaming behavior
- Target users who viewed games but didn't play
- Optimize onboarding based on user segment

## 🔍 Debugging & Testing

### View User Context
1. Open browser developer tools
2. Check localStorage for `omni-user-context`
3. View the shared context data structure

### Test Different Scenarios
1. **New User**: Clear localStorage and start fresh
2. **High Engagement**: Interact extensively with both platforms
3. **Gaming Focused**: Play games extensively, minimal website use
4. **Website Focused**: Browse website extensively, minimal gaming

### Feature Flag Testing
1. Use the Debug Panel in the Gaming Demo
2. Toggle different flag values
3. Observe real-time changes in the UI and game behavior

## 🚀 Next Steps

### Production Implementation
1. Replace localStorage with secure user database
2. Implement real LaunchDarkly client IDs
3. Add server-side flag evaluation
4. Implement proper user authentication
5. Add comprehensive analytics tracking

### Advanced Features
1. Real-time user context synchronization
2. Machine learning-based user segmentation
3. A/B testing across multiple games
4. Predictive user behavior modeling
5. Automated flag optimization

---

**This demo showcases the power of omni-channel experimentation for gaming companies, enabling personalized experiences that span across all user touchpoints.**
