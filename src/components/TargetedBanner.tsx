import React from 'react';
import { useFlag } from '@/contexts/LaunchDarklyContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export const TargetedBanner = () => {
  const promoBanner = useFlag('content.promo-banner', 'Welcome! Enjoy our gaming platform');
  const welcomeMessage = useFlag('geo.welcome-message', 'Welcome to Gaming1');
  const currencySymbol = useFlag('geo.currency-symbol', '£');
  const complianceBanner = useFlag('geo.compliance-banner', false);
  const experienceTier = useFlag('vip.experience-tier', 'standard');
  const bonusMultiplier = useFlag('vip.bonus-multiplier', 1.0);
  
  if (!complianceBanner && experienceTier === 'standard') {
    return null;
  }

  const isVIP = experienceTier !== 'standard';

  return (
    <div className="space-y-2">
      {/* Geographic targeting banner */}
      {complianceBanner && (
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/50">
          <AlertDescription className="text-sm">
            <strong>Regional Notice:</strong> {welcomeMessage} - 
            Playing responsibly is important. Currency: {currencySymbol}
          </AlertDescription>
        </Alert>
      )}
      
      {/* VIP targeting banner */}
      {isVIP && (
        <Alert className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50">
          <AlertDescription className="flex items-center gap-2 text-sm">
            <span className="text-lg">👑</span>
            <span>
              <strong>VIP Experience Active:</strong> {promoBanner} 
              {bonusMultiplier > 1 && (
                <Badge variant="secondary" className="ml-2">
                  {bonusMultiplier}x Bonus
                </Badge>
              )}
            </span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};