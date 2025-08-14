import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { ldService } from '@/lib/launchdarkly';
import { DEFAULT_FLAGS, FlagKey } from '@/types/flags';
import { DEFAULT_TARGETING_FLAGS, TargetingFlagKey } from '@/types/targeting-flags';
import { getCurrentUserContext } from '@/lib/shared-context';
import { getCurrentTargetingContext } from '@/lib/targeting-service';

interface LaunchDarklyContextType {
  client: LDClient.LDClient | null;
  flags: Record<string, any>;
  loading: boolean;
  useFlag: (flagKey: FlagKey | TargetingFlagKey, defaultValue?: any) => any;
}

const LaunchDarklyContext = createContext<LaunchDarklyContextType | null>(null);

interface LaunchDarklyProviderProps {
  children: React.ReactNode;
}

export const LaunchDarklyProvider: React.FC<LaunchDarklyProviderProps> = ({ 
  children
}) => {
  const [client, setClient] = useState<LDClient.LDClient | null>(null);
  const [flags, setFlags] = useState<Record<string, any>>({...DEFAULT_FLAGS, ...DEFAULT_TARGETING_FLAGS});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLD = async () => {
      try {
        // Get current user context (both legacy and targeting)
        const ldUser = getCurrentUserContext();
        const targetingUser = getCurrentTargetingContext();
        
        // Merge both contexts for comprehensive targeting
        const mergedUser = {
          ...ldUser,
          country: targetingUser.country,
          vipStatus: targetingUser.vipStatus,
          custom: {
            ...ldUser.custom,
            ...targetingUser.custom,
            targetingSegment: targetingUser.custom?.segment
          }
        };
        
        console.log('🚀 LaunchDarkly initializing with merged user:', mergedUser);
        console.log('  - User key:', mergedUser.key);
        console.log('  - Country:', mergedUser.country);
        console.log('  - VIP status:', mergedUser.vipStatus);
        
        const ldClient = await ldService.initialize(mergedUser);
        setClient(ldClient);

        // Get all flag values (both legacy and targeting flags)
        const flagValues: Record<string, any> = {};
        
        // Legacy flags
        Object.keys(DEFAULT_FLAGS).forEach((key) => {
          const value = ldClient.variation(key, DEFAULT_FLAGS[key as FlagKey]);
          flagValues[key] = value;
          console.log(`  - Legacy flag ${key}:`, value);
        });
        
        // Targeting flags
        Object.keys(DEFAULT_TARGETING_FLAGS).forEach((key) => {
          const value = ldClient.variation(key, DEFAULT_TARGETING_FLAGS[key as TargetingFlagKey]);
          flagValues[key] = value;
          console.log(`  - Targeting flag ${key}:`, value);
        });
        
        console.log('✅ All flag values set:', flagValues);
        setFlags(flagValues);
        setLoading(false);

        // Listen for flag changes
        if (typeof ldClient.on === 'function') {
          ldClient.on('change', (settings: Record<string, any>) => {
            console.log('🔄 LaunchDarkly flags changed:', settings);
            setFlags(settings);
          });
        }
      } catch (error) {
        console.error('❌ Failed to initialize LaunchDarkly:', error);
        setFlags({...DEFAULT_FLAGS, ...DEFAULT_TARGETING_FLAGS});
        setLoading(false);
      }
    };

    initLD();

    // Listen for storage changes to re-initialize when context changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'omni-user-context' || e.key === 'ld-targeting-context') {
        console.log('🔄 User context changed (storage event), re-initializing LaunchDarkly');
        initLD();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events in case of same-tab changes
    const handleCustomStorageChange = () => {
      console.log('🔄 Custom storage change detected, re-initializing LaunchDarkly');
      initLD();
    };
    
    const handleTargetingChange = () => {
      console.log('🔄 Targeting context changed, re-initializing LaunchDarkly');
      initLD();
    };

    window.addEventListener('userContextChanged', handleCustomStorageChange);
    window.addEventListener('targetingContextChanged', handleTargetingChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userContextChanged', handleCustomStorageChange);
      window.removeEventListener('targetingContextChanged', handleTargetingChange);
    };
  }, []);

  const useFlag = (flagKey: FlagKey | TargetingFlagKey, defaultValue?: any) => {
    const legacyDefault = DEFAULT_FLAGS[flagKey as FlagKey];
    const targetingDefault = DEFAULT_TARGETING_FLAGS[flagKey as TargetingFlagKey];
    const fallbackDefault = legacyDefault ?? targetingDefault;
    
    const value = flags[flagKey] ?? defaultValue ?? fallbackDefault;
    return value;
  };

  const contextValue: LaunchDarklyContextType = {
    client,
    flags,
    loading,
    useFlag,
  };

  return (
    <LaunchDarklyContext.Provider value={contextValue}>
      {children}
    </LaunchDarklyContext.Provider>
  );
};

export const useLaunchDarkly = () => {
  const context = useContext(LaunchDarklyContext);
  if (!context) {
    throw new Error('useLaunchDarkly must be used within a LaunchDarklyProvider');
  }
  return context;
};

// Hook for easy flag access
export const useFlag = (flagKey: FlagKey | TargetingFlagKey, defaultValue?: any) => {
  const { useFlag } = useLaunchDarkly();
  return useFlag(flagKey, defaultValue);
};

// Hook for client access
export const useLDClient = () => {
  const { client } = useLaunchDarkly();
  return client;
};