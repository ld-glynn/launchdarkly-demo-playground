# Environment Setup Guide

This guide explains how to set up environment variables for the LaunchDarkly Demo Playground project.

## 📁 Environment Files

### Local Development

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your values:**
   ```bash
   # LaunchDarkly Configuration
   VITE_LAUNCHDARKLY_CLIENT_SIDE_ID=your-actual-client-side-id
   
   # Cross-Domain Configuration (Development)
   VITE_WEBSITE_DOMAIN=localhost:5173
   VITE_GAMING_DOMAIN=localhost:5174
   ```

### Production (Vercel)

When deploying to Vercel, add these environment variables in the Vercel dashboard:

#### For Main Website Project (`launchdarkly-demo-playground`):
```bash
VITE_LAUNCHDARKLY_CLIENT_SIDE_ID=your-actual-client-side-id
VITE_WEBSITE_DOMAIN=gaming1-demo.vercel.app
VITE_GAMING_DOMAIN=games.gaming1-demo.vercel.app
```

#### For Gaming App Project (`game-spin-labs`):
```bash
VITE_LD_CLIENT_ID=your-actual-client-side-id
VITE_WEBSITE_DOMAIN=gaming1-demo.vercel.app
VITE_GAMING_DOMAIN=games.gaming1-demo.vercel.app
```

## 🌐 Environment-Based URL Determination

The application automatically determines URLs based on the environment:

### Development Environment (`import.meta.env.DEV === true`)
- **Website**: `http://localhost:5173`
- **Gaming App**: `http://localhost:5174`
- **Cross-domain messaging**: Uses localhost URLs
- **Protocol**: HTTP

### Production Environment (`import.meta.env.DEV === false`)
- **Website**: `https://${VITE_WEBSITE_DOMAIN}`
- **Gaming App**: `https://${VITE_GAMING_DOMAIN}`
- **Cross-domain messaging**: Uses environment variables
- **Protocol**: HTTPS

### URL Helper Functions

The following functions automatically handle environment detection:

```typescript
// Get current domain (with port in dev, without in prod)
getCurrentDomain(): string

// Get target domain for cross-domain messaging
getTargetDomain(): string

// Get full URL with protocol
getTargetUrl(): string

// Get current full URL with protocol
getCurrentUrl(): string
```

## 🔑 Getting Your LaunchDarkly Client-Side ID

1. Go to [LaunchDarkly Dashboard](https://app.launchdarkly.com)
2. Navigate to your project
3. Go to **Account Settings** → **Projects** → **Your Project**
4. Copy the **Client-side ID** (not the server-side ID)

## 🌐 Domain Configuration

### Development URLs:
- **Website**: `http://localhost:5173`
- **Gaming App**: `http://localhost:5174`

### Production URLs (example):
- **Website**: `https://gaming1-demo.vercel.app`
- **Gaming App**: `https://games.gaming1-demo.vercel.app`

## 🔒 Security Notes

- ✅ **Client-side IDs are safe** to expose in environment variables
- ✅ **Never commit `.env.local`** to version control
- ✅ **Vercel environment variables** are encrypted and secure
- ❌ **Server-side IDs** should never be exposed to the client

## 🚀 Quick Start

1. **Set up local environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your LaunchDarkly client-side ID
   ```

2. **Start development servers:**
   ```bash
   # Terminal 1: Website
   cd launchdarkly-demo-playground
   npm run dev
   
   # Terminal 2: Gaming App
   cd game-spin-labs
   npm run dev
   ```

3. **Test cross-domain functionality:**
   - Visit `http://localhost:5173/games`
   - Click "Lucky Slots Deluxe"
   - Should open `http://localhost:5174` in new tab

## 🔧 Troubleshooting

### "Demo mode" message
If you see "Running in demo mode" or similar messages, it means:
- No LaunchDarkly client-side ID is configured
- The app will use mock feature flags instead

### Cross-domain not working
Check that:
- Both servers are running on correct ports
- Environment variables are properly set
- No browser security restrictions are blocking the connection

### Vercel deployment issues
Ensure:
- Environment variables are added to Vercel dashboard
- Both projects are deployed
- Custom domains are configured correctly

## 🔄 Cross-Domain Messaging

The application uses `window.postMessage` for real-time communication between domains:

### Development:
- **Allowed origins**: `http://localhost:5173`, `http://localhost:5174`
- **Protocol**: HTTP
- **Ports**: Included in URLs

### Production:
- **Allowed origins**: Environment variable domains
- **Protocol**: HTTPS
- **Ports**: Not included (standard ports)

### Security:
- Origin verification prevents unauthorized messages
- Only trusted domains can send/receive user context
- Fallback localhost URLs for development
