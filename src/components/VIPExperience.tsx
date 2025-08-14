import { useLaunchDarkly } from '@/contexts/LaunchDarklyContext';
import { useEffect, useState } from 'react';

export const VIPExperience = () => {
  const { useFlag, flags, loading, client } = useLaunchDarkly();
  const vipStatus = useFlag('vip-gaming-experience', 'none');
  const [directVIPStatus, setDirectVIPStatus] = useState<'none' | 'vip'>('none');
  
  // Also check localStorage directly as a fallback
  useEffect(() => {
    const checkDirectVIPStatus = () => {
      try {
        const stored = localStorage.getItem('omni-user-context');
        if (stored) {
          const context = JSON.parse(stored);
          const status = context?.custom?.vipStatus || 'none';
          setDirectVIPStatus(status);
        }
      } catch (error) {
        console.error('Error checking direct VIP status:', error);
      }
    };
    
    checkDirectVIPStatus();
    // Check every second to catch changes
    const interval = setInterval(checkDirectVIPStatus, 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    console.log('VIPExperience component - Debug info:');
    console.log('  - loading:', loading);
    console.log('  - vipStatus from LaunchDarkly:', vipStatus);
    console.log('  - direct VIP status from localStorage:', directVIPStatus);
    
    // Additional debugging for context investigation
    if (!loading) {
      console.log('🔍 VIP Context Investigation:');
      console.log('  - Current localStorage context:', localStorage.getItem('omni-user-context'));
      console.log('  - LaunchDarkly client available:', !!client);
      console.log('  - LaunchDarkly flags state:', flags);
      
      // Check if we're using mock client by checking clientSideID from environment
      const isMockClient = import.meta.env.VITE_LD_CLIENT_ID === 'demo-client-side-id';
      console.log('  - Using mock client:', isMockClient);
      
      if (client) {
        try {
          // Try to get the current user context from LaunchDarkly
          const ldUser = (client as any).getUser?.();
          console.log('  - LaunchDarkly current user:', ldUser);
        } catch (error) {
          console.log('  - Could not get LaunchDarkly user:', error);
        }
      }
    }
  }, [vipStatus, loading, directVIPStatus, client, flags]);
  
  // Wait for LaunchDarkly to finish loading
  if (loading) {
    return null; // Don't show anything while loading
  }
  
  // Then check LaunchDarkly first, fallback to localStorage only if needed
  const shouldShowVIP = vipStatus === 'vip' || (vipStatus === 'none' && directVIPStatus === 'vip');
  
  // Log when fallback is triggered (LaunchDarkly says 'none' but localStorage says 'vip')
  if (vipStatus === 'none' && directVIPStatus === 'vip') {
    console.warn('🚨 VIP FALLBACK TRIGGERED:', {
      message: 'LaunchDarkly returned "none" but localStorage indicates VIP status',
      launchDarklyStatus: vipStatus,
      localStorageStatus: directVIPStatus,
      timestamp: new Date().toISOString(),
      userContext: localStorage.getItem('omni-user-context')
    });
  }
  
  if (!shouldShowVIP) {
    return null;
  }
  
  console.log('VIPExperience component - showing VIP banner');
  
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-3 px-6 shadow-lg sticky top-16 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl">👑</div>
          <div>
            <h2 className="text-sm md:text-base font-bold">
              Welcome back, VIP Member!
            </h2>
            <p className="text-yellow-100 text-xs">
              Your exclusive VIP experience is now active
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
              VIP MEMBER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
