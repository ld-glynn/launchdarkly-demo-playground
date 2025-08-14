import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { ldService } from '@/lib/launchdarkly';
import { DEFAULT_FLAGS, FlagKey } from '@/types/flags';
import { getCurrentUserContext } from '@/lib/shared-context';

interface LaunchDarklyContextType {
  client: LDClient.LDClient | null;
  flags: Record<string, any>;
  loading: boolean;
  useFlag: (flagKey: FlagKey, defaultValue?: any) => any;
}

const LaunchDarklyContext = createContext<LaunchDarklyContextType | null>(null);

interface LaunchDarklyProviderProps {
  children: React.ReactNode;
}

export const LaunchDarklyProvider: React.FC<LaunchDarklyProviderProps> = ({ 
  children
}) => {
  const [client, setClient] = useState<LDClient.LDClient | null>(null);
  const [flags, setFlags] = useState<Record<string, any>>(DEFAULT_FLAGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLD = async () => {
      try {
        // Get current user context
        const ldUser = getCurrentUserContext();
        console.log('🚀 LaunchDarkly initializing with user:', ldUser);
        console.log('  - User key:', ldUser.key);
        console.log('  - VIP status:', ldUser.custom?.vipStatus);
        
        const ldClient = await ldService.initialize(ldUser);
        setClient(ldClient);

        // Get all flag values
        const flagValues: Record<string, any> = {};
        Object.keys(DEFAULT_FLAGS).forEach((key) => {
          const value = ldClient.variation(key, DEFAULT_FLAGS[key as FlagKey]);
          flagValues[key] = value;
          console.log(`  - Flag ${key}:`, value);
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
        setFlags(DEFAULT_FLAGS);
        setLoading(false);
      }
    };

    initLD();

    // Listen for storage changes to re-initialize when VIP status changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'omni-user-context') {
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

    window.addEventListener('userContextChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userContextChanged', handleCustomStorageChange);
    };
  }, []);

  const useFlag = (flagKey: FlagKey, defaultValue?: any) => {
    const value = flags[flagKey] ?? defaultValue ?? DEFAULT_FLAGS[flagKey];
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
export const useFlag = (flagKey: FlagKey, defaultValue?: any) => {
  const { useFlag } = useLaunchDarkly();
  return useFlag(flagKey, defaultValue);
};

// Hook for client access
export const useLDClient = () => {
  const { client } = useLaunchDarkly();
  return client;
};