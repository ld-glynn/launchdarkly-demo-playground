import { useLaunchDarkly } from '@/contexts/LaunchDarklyContext';

export const VIPExperience = () => {
  const { useFlag } = useLaunchDarkly();
  const vipStatus = useFlag('vip-gaming-experience', 'none');
  
  // Only show VIP content if flag is active
  if (vipStatus !== 'vip') return null;
  
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-3 px-6 shadow-lg fixed top-20 left-0 right-0 z-40">
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
