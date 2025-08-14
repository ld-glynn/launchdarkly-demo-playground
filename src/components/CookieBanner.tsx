import React, { useState } from 'react';
import { Button } from '@/components/ui/button';


const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const showCookieBanner = true;

  if (!showCookieBanner || !isVisible) return null;

  const handleAllowAll = () => {
    // In a real app, this would set cookie preferences
    localStorage.setItem('cookie-preferences', JSON.stringify({ 
      essential: true,
      analytics: true,
      marketing: true,
      accepted: true,
      timestamp: Date.now()
    }));
    setIsVisible(false);
  };

  const handleSettings = () => {
    // In a real app, this would open cookie settings modal
    console.log('Cookie settings clicked');
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-gaming-navy border-t border-gaming-navy-lighter shadow-2xl"
      data-testid="cookie-banner"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-foreground text-sm leading-relaxed">
              We use cookies to offer you the best experience on our site. You can find out more about the cookies we use or 
              disable them in the {' '}
              <button 
                onClick={handleSettings}
                className="text-gaming-gold underline hover:no-underline"
              >
                Cookie settings
              </button>
              .
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleSettings}
              className="border-gaming-navy-lighter text-foreground hover:bg-gaming-navy-light"
              data-testid="cookie-settings-button"
            >
              Settings
            </Button>
            <Button 
              size="sm"
              onClick={handleAllowAll}
              className="gaming-button text-gaming-navy"
              data-testid="cookie-allow-all-button"
            >
              Allow all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;