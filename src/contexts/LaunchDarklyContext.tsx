import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { ldService, defaultUser, flagDefaults, FlagKey, User } from '@/lib/launchdarkly';

interface LaunchDarklyContextType {
  client: LDClient.LDClient | null;
  flags: Record<string, any>;
  loading: boolean;
  useFlag: (flagKey: FlagKey, defaultValue?: any) => any;
}

const LaunchDarklyContext = createContext<LaunchDarklyContextType | null>(null);

interface LaunchDarklyProviderProps {
  children: React.ReactNode;
  user?: User;
}

export const LaunchDarklyProvider: React.FC<LaunchDarklyProviderProps> = ({ 
  children, 
  user = defaultUser 
}) => {
  const [client, setClient] = useState<LDClient.LDClient | null>(null);
  const [flags, setFlags] = useState<Record<string, any>>(flagDefaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLD = async () => {
      try {
        const ldClient = await ldService.initialize(user);
        setClient(ldClient);

        // Get all flag values
        const flagValues: Record<string, any> = {};
        Object.keys(flagDefaults).forEach((key) => {
          flagValues[key] = ldClient.variation(key, flagDefaults[key as FlagKey]);
        });
        
        setFlags(flagValues);
        setLoading(false);

        // Listen for flag changes (only works with real LD client)
        if (typeof ldClient.on === 'function') {
          ldClient.on('change', (settings: Record<string, any>) => {
            setFlags(settings);
          });
        }
      } catch (error) {
        console.error('Failed to initialize LaunchDarkly:', error);
        setFlags(flagDefaults);
        setLoading(false);
      }
    };

    initLD();
  }, [user]);

  const useFlag = (flagKey: FlagKey, defaultValue?: any) => {
    const value = flags[flagKey] ?? defaultValue ?? flagDefaults[flagKey];
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