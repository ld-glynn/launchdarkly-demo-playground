import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFlag } from '@/contexts/LaunchDarklyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, MousePointer, Eye, Users } from 'lucide-react';

interface MetricData {
  variant: string;
  views: number;
  clicks: number;
  conversionRate: number;
}

const ABTestMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get current A/B test configuration
  const ctaVariant = useFlag('experiment.cta-button-variant', 'control');
  const ctaButtonText = useFlag('experiment.cta-button-text', 'Start Playing Now');
  const ctaButtonStyle = useFlag('experiment.cta-button-style', 'default');

  // Simulate metric data (in real app, this would come from LaunchDarkly or analytics)
  useEffect(() => {
    const generateMockData = (): MetricData[] => {
      const variants = [
        { variant: 'control', baseViews: 1000, baseCtr: 0.12 },
        { variant: 'variant-a', baseViews: 980, baseCtr: 0.15 },
        { variant: 'variant-b', baseViews: 1020, baseCtr: 0.18 }
      ];
      
      return variants.map(({ variant, baseViews, baseCtr }) => {
        const views = baseViews + Math.floor(Math.random() * 100);
        const clicks = Math.floor(views * baseCtr + Math.random() * 20);
        const conversionRate = clicks / views;
        
        return {
          variant,
          views,
          clicks,
          conversionRate: Math.round(conversionRate * 1000) / 10 // Round to 1 decimal
        };
      });
    };

    setMetrics(generateMockData());
    
    // Update metrics every 10 seconds to simulate real-time data
    const interval = setInterval(() => {
      setMetrics(generateMockData());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const getBestVariant = () => {
    return metrics.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    , metrics[0]);
  };

  const getVariantInfo = (variant: string) => {
    switch (variant) {
      case 'control':
        return { name: 'Control', style: 'Standard Gold Button', text: 'Start Playing' };
      case 'variant-a':
        return { name: 'Variant A', style: 'Gradient Button', text: 'Start Playing Now' };
      case 'variant-b':
        return { name: 'Variant B', style: 'Glow Effect Button', text: 'Join the Game' };
      default:
        return { name: 'Unknown', style: 'Unknown', text: 'Unknown' };
    }
  };

  if (!isVisible) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                A/B Test Metrics
              </CardTitle>
              <CardDescription>
                CTA Button Performance Analysis
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsVisible(true)}
            >
              Show Metrics
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const bestVariant = getBestVariant();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              A/B Test Metrics - CTA Button Performance
            </CardTitle>
            <CardDescription>
              Real-time conversion tracking for different button variants
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">
              Current: {getVariantInfo(ctaVariant).name}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              Hide
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Test Configuration */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Current Test Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Variant:</strong> {getVariantInfo(ctaVariant).name}
            </div>
            <div>
              <strong>Style:</strong> {getVariantInfo(ctaVariant).style}
            </div>
            <div>
              <strong>Text:</strong> {ctaButtonText}
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric) => {
            const variantInfo = getVariantInfo(metric.variant);
            const isWinner = metric.variant === bestVariant?.variant;
            
            return (
              <Card key={metric.variant} className={`relative ${isWinner ? 'ring-2 ring-gaming-gold' : ''}`}>
                {isWinner && (
                  <Badge className="absolute -top-2 left-4 bg-gaming-gold text-primary-foreground">
                    Best Performer
                  </Badge>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{variantInfo.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {variantInfo.style}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Views: <strong>{metric.views.toLocaleString()}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Clicks: <strong>{metric.clicks.toLocaleString()}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gaming-gold" />
                      <span className="text-sm">CTR: <strong>{metric.conversionRate}%</strong></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart */}
        <div className="h-64">
          <h4 className="font-semibold mb-4">Conversion Rate Comparison</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="variant" 
                tickFormatter={(value) => getVariantInfo(value).name}
              />
              <YAxis 
                domain={[0, 'dataMax + 2']}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                labelFormatter={(value) => getVariantInfo(value).name}
              />
              <Bar 
                dataKey="conversionRate" 
                fill="hsl(var(--gaming-gold))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Winner Summary */}
        {bestVariant && (
          <div className="p-4 bg-gaming-gold/10 border border-gaming-gold/20 rounded-lg">
            <h4 className="font-semibold text-gaming-gold mb-2">
              🏆 Test Results Summary
            </h4>
            <p className="text-sm">
              <strong>{getVariantInfo(bestVariant.variant).name}</strong> is currently performing best 
              with a <strong>{bestVariant.conversionRate}%</strong> conversion rate. 
              This variant uses {getVariantInfo(bestVariant.variant).style.toLowerCase()} 
              and has generated <strong>{bestVariant.clicks.toLocaleString()}</strong> clicks 
              from <strong>{bestVariant.views.toLocaleString()}</strong> views.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ABTestMetrics;