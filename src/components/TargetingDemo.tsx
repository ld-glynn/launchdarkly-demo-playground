import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  createUKUserContext, 
  createBelgiumUserContext, 
  createVIPUserContext, 
  createPremiumUserContext,
  setTargetingContext,
  getCurrentTargetingContext
} from '@/lib/targeting-service';
import { useLaunchDarkly } from '@/contexts/LaunchDarklyContext';

export const TargetingDemo = () => {
  const { useFlag } = useLaunchDarkly();
  const currentContext = getCurrentTargetingContext();
  
  // Get flag values for display
  const welcomeMessage = useFlag('geo.welcome-message', 'Welcome to Gaming1');
  const currencySymbol = useFlag('geo.currency-symbol', '£');
  const experienceTier = useFlag('vip.experience-tier', 'standard');
  const bonusMultiplier = useFlag('vip.bonus-multiplier', 1.0);
  const heroTitle = useFlag('content.hero-title', 'Next Level Gaming Experience');
  const mainCta = useFlag('content.main-cta', 'Start Playing');
  
  const handleContextChange = (contextType: string) => {
    let newContext;
    switch (contextType) {
      case 'uk-standard':
        newContext = createUKUserContext();
        break;
      case 'uk-vip':
        newContext = createVIPUserContext('UK');
        break;
      case 'uk-premium':
        newContext = createPremiumUserContext('UK');
        break;
      case 'be-standard':
        newContext = createBelgiumUserContext();
        break;
      case 'be-vip':
        newContext = createVIPUserContext('BE');
        break;
      case 'be-premium':
        newContext = createPremiumUserContext('BE');
        break;
      default:
        newContext = createUKUserContext();
    }
    setTargetingContext(newContext);
  };

  const getContextBadgeVariant = (type: string) => {
    if (currentContext.country === 'UK' && currentContext.vipStatus === 'standard' && type === 'uk-standard') return 'default';
    if (currentContext.country === 'UK' && currentContext.vipStatus === 'vip' && type === 'uk-vip') return 'default';
    if (currentContext.country === 'UK' && currentContext.vipStatus === 'premium' && type === 'uk-premium') return 'default';
    if (currentContext.country === 'BE' && currentContext.vipStatus === 'standard' && type === 'be-standard') return 'default';
    if (currentContext.country === 'BE' && currentContext.vipStatus === 'vip' && type === 'be-vip') return 'default';
    if (currentContext.country === 'BE' && currentContext.vipStatus === 'premium' && type === 'be-premium') return 'default';
    return 'outline';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎯 LaunchDarkly Targeting Demo
          <Badge variant="secondary">Live Flags</Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Switch between different user contexts to see targeted content in real-time
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Context Display */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Current User Context</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div><strong>Country:</strong> {currentContext.country}</div>
            <div><strong>VIP Status:</strong> {currentContext.vipStatus}</div>
            <div><strong>Locale:</strong> {currentContext.custom?.locale}</div>
            <div><strong>Segment:</strong> {currentContext.custom?.segment}</div>
          </div>
        </div>

        {/* Flag Values Display */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Active Flag Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="bg-background rounded p-2">
              <strong>Welcome Message:</strong><br />
              <span className="text-primary">{welcomeMessage}</span>
            </div>
            <div className="bg-background rounded p-2">
              <strong>Currency:</strong><br />
              <span className="text-primary">{currencySymbol}</span>
            </div>
            <div className="bg-background rounded p-2">
              <strong>Experience Tier:</strong><br />
              <span className="text-primary">{experienceTier}</span>
            </div>
            <div className="bg-background rounded p-2">
              <strong>Bonus Multiplier:</strong><br />
              <span className="text-primary">{bonusMultiplier}x</span>
            </div>
            <div className="bg-background rounded p-2">
              <strong>Hero Title:</strong><br />
              <span className="text-primary">{heroTitle}</span>
            </div>
            <div className="bg-background rounded p-2">
              <strong>Main CTA:</strong><br />
              <span className="text-primary">{mainCta}</span>
            </div>
          </div>
        </div>

        {/* Context Switcher */}
        <div>
          <h3 className="font-semibold mb-3">Switch User Context</h3>
          
          <div className="space-y-4">
            {/* UK Users */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">🇬🇧 UK Users</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={getContextBadgeVariant('uk-standard') === 'default' ? 'default' : 'outline'}
                  onClick={() => handleContextChange('uk-standard')}
                >
                  UK Standard
                </Button>
                <Button
                  size="sm"
                  variant={getContextBadgeVariant('uk-vip') === 'default' ? 'default' : 'outline'}
                  onClick={() => handleContextChange('uk-vip')}
                >
                  UK VIP
                </Button>
                <Button
                  size="sm"
                  variant={getContextBadgeVariant('uk-premium') === 'default' ? 'default' : 'outline'}
                  onClick={() => handleContextChange('uk-premium')}
                >
                  UK Premium
                </Button>
              </div>
            </div>

            {/* Belgium Users */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">🇧🇪 Belgium Users</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={getContextBadgeVariant('be-standard') === 'default' ? 'default' : 'outline'}
                  onClick={() => handleContextChange('be-standard')}
                >
                  BE Standard
                </Button>
                <Button
                  size="sm"
                  variant={getContextBadgeVariant('be-vip') === 'default' ? 'default' : 'outline'}
                  onClick={() => handleContextChange('be-vip')}
                >
                  BE VIP
                </Button>
                <Button
                  size="sm"
                  variant={getContextBadgeVariant('be-premium') === 'default' ? 'default' : 'outline'}
                  onClick={() => handleContextChange('be-premium')}
                >
                  BE Premium
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 text-sm">
          <h4 className="font-semibold mb-2">How to use:</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Click any user context button above to switch targeting</li>
            <li>• Flag values will update in real-time based on your selection</li>
            <li>• Geographic flags target UK vs Belgium users</li>
            <li>• VIP flags provide different experiences for user tiers</li>
            <li>• String flags allow dynamic content updates from LaunchDarkly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};