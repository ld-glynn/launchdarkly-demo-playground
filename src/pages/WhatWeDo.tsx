import React from 'react';
import { ChevronLeft, Gamepad2, TrendingUp, Shield, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ResponsibleGamingBanner from '@/components/ResponsibleGamingBanner';
import casinoRoulette from '@/assets/casino-roulette.jpg';

const WhatWeDo: React.FC = () => {
  const services = [
    {
      icon: Gamepad2,
      title: 'Casino Platform',
      description: 'Complete casino gaming platform with hundreds of games, live dealers, and seamless user experience.'
    },
    {
      icon: TrendingUp,
      title: 'Sports Betting',
      description: 'Advanced sportsbook technology with real-time odds, in-play betting, and comprehensive market coverage.'
    },
    {
      icon: Shield,
      title: 'Compliance & Security',
      description: 'Built-in regulatory compliance tools and enterprise-grade security measures for all jurisdictions.'
    },
    {
      icon: Code,
      title: 'Custom Solutions',
      description: 'Tailored gaming solutions and API integrations to meet specific business requirements.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ResponsibleGamingBanner />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 gaming-hero-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
              <div className="space-y-4">
                <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase">
                  In pursuit of next level entertainment
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  What we <span className="text-gaming-gold">do</span>
                </h1>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-gaming-gold hover:text-gaming-gold hover:bg-gaming-navy-light"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              
              <div className="space-y-8 fade-in-up">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Comprehensive gaming technology solutions
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Drawing on extensive experience from our own gaming operations, Demo1 offers a complete technology platform for operating casino websites and online sports betting platforms.
                    </p>
                    <p>
                      Our solutions encompass the full spectrum of gaming activities including casino games, sports betting, poker, bingo, and more, all built on our proprietary technology stack.
                    </p>
                    <p>
                      We provide end-to-end services from platform development to ongoing support, ensuring our clients can focus on growing their business while we handle the technology.
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in-up delay-1">
                <div className="relative">
                  <img 
                    src={casinoRoulette}
                    alt="Gaming platform technology"
                    className="w-full h-96 md:h-[500px] object-cover rounded-2xl gaming-card"
                  />
                  <div className="absolute inset-0 bg-gaming-gold/10 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-gaming-navy-light">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Solutions
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Everything you need to launch and operate a successful gaming platform in today's regulated markets.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <Card 
                    key={service.title}
                    className={`gaming-card border-gaming-navy-lighter fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="bg-gaming-gold/20 rounded-full p-4 w-fit">
                          <service.icon className="h-8 w-8 text-gaming-gold" />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Ready to get started?
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Let's discuss how our gaming technology platform can help you launch or enhance your gaming operations.
                </p>
              </div>
              
              <Button 
                size="lg"
                className="gaming-button text-gaming-navy font-semibold px-8 py-4 text-lg"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default WhatWeDo;