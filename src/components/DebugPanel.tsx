import { useState, useCallback } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Settings, RefreshCw, Trash2, Dice1 } from 'lucide-react';
import { DEFAULT_FLAGS, type GameFlags } from '@/types/flags';
import { getSeedInfo, resetRNG } from '@/lib/rng';

interface DebugPanelProps {
  mockFlags?: Partial<GameFlags>;
  onMockFlagsChange?: (flags: Partial<GameFlags>) => void;
  mockMode: boolean;
  onMockModeChange: (enabled: boolean) => void;
}

export const DebugPanel = ({ 
  mockFlags = {}, 
  onMockFlagsChange, 
  mockMode, 
  onMockModeChange 
}: DebugPanelProps) => {
  const ldClient = useLDClient();
  const [seedInput, setSeedInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current user context (if available)
  const userContext = ldClient?.getContext();
  const seedInfo = getSeedInfo();
  
  // Get all flag values (either from LD client or mock)
  const getAllFlagValues = useCallback((): Record<string, any> => {
    if (mockMode) {
      return { ...DEFAULT_FLAGS, ...mockFlags };
    }
    
    if (!ldClient) {
      return DEFAULT_FLAGS;
    }
    
    const flagValues: Record<string, any> = {};
    Object.keys(DEFAULT_FLAGS).forEach(flagKey => {
      try {
        flagValues[flagKey] = ldClient.variation(flagKey, DEFAULT_FLAGS[flagKey as keyof GameFlags]);
      } catch {
        flagValues[flagKey] = DEFAULT_FLAGS[flagKey as keyof GameFlags];
      }
    });
    
    return flagValues;
  }, [ldClient, mockMode, mockFlags]);

  // Handle mock flag changes
  const handleMockFlagChange = useCallback((flagKey: keyof GameFlags, value: any) => {
    if (!onMockFlagsChange) return;
    
    onMockFlagsChange({
      ...mockFlags,
      [flagKey]: value
    });
  }, [mockFlags, onMockFlagsChange]);

  // Reset session data
  const handleResetSession = useCallback(() => {
    localStorage.removeItem('ld-user-id');
    window.location.reload();
  }, []);

  // Apply demo seed
  const handleApplyDemoSeed = useCallback(() => {
    if (!seedInput.trim()) return;
    
    const url = new URL(window.location.href);
    url.searchParams.set('seed', seedInput.trim());
    window.location.href = url.toString();
  }, [seedInput]);

  // Re-evaluate flags
  const handleReEvaluateFlags = useCallback(() => {
    if (ldClient) {
      ldClient.flush().then(() => {
        console.log('Flags re-evaluated');
      });
    }
  }, [ldClient]);

  const flagValues = getAllFlagValues();
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed top-4 right-4 z-50"
        >
          <Settings className="w-4 h-4" />
          Debug
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>🔧 Debug Panel</SheetTitle>
          <SheetDescription>
            Control flags and inspect LaunchDarkly integration
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${ldClient ? 'bg-green-500' : 'bg-red-500'}`} />
                LaunchDarkly Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client:</span>
                <Badge variant={ldClient ? 'default' : 'destructive'}>
                  {ldClient ? 'Connected' : 'Offline'}
                </Badge>
              </div>
              {userContext && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID:</span>
                    <code className="text-xs">{(userContext as any).key}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Device:</span>
                    <span>{(userContext as any).deviceType}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">RNG Seed:</span>
                <span className="text-xs">{seedInfo.source}</span>
              </div>
            </CardContent>
          </Card>

          {/* Mock Mode Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Demo Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={mockMode}
                  onCheckedChange={onMockModeChange}
                  id="mock-mode"
                />
                <Label htmlFor="mock-mode" className="text-sm">
                  Force mock values (offline demo)
                </Label>
              </div>
              {mockMode && (
                <p className="text-xs text-muted-foreground mt-2">
                  Using local overrides instead of LaunchDarkly
                </p>
              )}
            </CardContent>
          </Card>

          {/* Flag Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Current Flag Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(flagValues).map(([flagKey, value]) => (
                  <div key={flagKey}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground font-mono">
                        {flagKey}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
                      </Badge>
                    </div>
                    
                    {/* Mock controls */}
                    {mockMode && onMockFlagsChange && (
                      <div className="mt-1">
                        {typeof value === 'boolean' ? (
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => 
                              handleMockFlagChange(flagKey as keyof GameFlags, checked)
                            }
                            className="scale-75"
                          />
                        ) : typeof value === 'number' ? (
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => 
                              handleMockFlagChange(flagKey as keyof GameFlags, Number(e.target.value))
                            }
                            className="h-6 text-xs"
                            step={flagKey.includes('rtpTarget') ? '0.01' : '1'}
                            min={flagKey.includes('rtpTarget') ? '0.5' : '1'}
                            max={flagKey.includes('rtpTarget') ? '0.99' : '100'}
                          />
                        ) : (
                          <Input
                            value={String(value)}
                            onChange={(e) => 
                              handleMockFlagChange(flagKey as keyof GameFlags, e.target.value)
                            }
                            className="h-6 text-xs"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Demo Seed Input */}
              <div className="space-y-2">
                <Label htmlFor="seed-input" className="text-xs">Apply Demo Seed</Label>
                <div className="flex gap-2">
                  <Input
                    id="seed-input"
                    placeholder="e.g., demo1, abc123"
                    value={seedInput}
                    onChange={(e) => setSeedInput(e.target.value)}
                    className="text-xs"
                  />
                  <Button
                    onClick={handleApplyDemoSeed}
                    size="sm"
                    disabled={!seedInput.trim()}
                  >
                    <Dice1 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Makes game outcomes deterministic for consistent demos
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleReEvaluateFlags}
                  variant="outline"
                  size="sm"
                  disabled={!ldClient}
                  className="text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Re-evaluate Flags
                </Button>
                
                <Button
                  onClick={handleResetSession}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Reset Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};