import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ResponsibleGamingBanner from '@/components/ResponsibleGamingBanner';
import astronautDice from '@/assets/astronaut-dice.jpg';

const WhoWeAre: React.FC = () => {
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
                  This is us
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Who we <span className="text-gaming-gold">are</span>
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

        {/* Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              
              <div className="space-y-8 fade-in-up">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Leading the regulated gaming market
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      The Demo1 Group is a leader in the regulated gaming market, offering comprehensive casino, sports betting, and poker experiences across both land-based and online platforms.
                    </p>
                    <p>
                      With over three decades of experience, we have built our reputation on innovation, responsible gaming practices, and cutting-edge technology solutions.
                    </p>
                    <p>
                      Our mission is to become a global reference in regulated online gaming markets through the continuous development of our proprietary technology platform and our commitment to providing seamless omnichannel experiences.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Our Values</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Innovation in gaming technology</li>
                    <li>• Responsible gaming practices</li>
                    <li>• Regulatory compliance excellence</li>
                    <li>• Customer-centric approach</li>
                    <li>• Sustainable business growth</li>
                  </ul>
                </div>
              </div>

              <div className="fade-in-up delay-1">
                <div className="relative">
                  <img 
                    src={astronautDice}
                    alt="Gaming innovation concept"
                    className="w-full h-96 md:h-[500px] object-cover rounded-2xl gaming-card"
                  />
                  <div className="absolute inset-0 bg-gaming-gold/10 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gaming-navy-light">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-16 fade-in-up">
                Our Impact
              </h2>
              
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center space-y-4 fade-in-up">
                  <div className="text-4xl font-bold text-gaming-gold">30+</div>
                  <div className="text-foreground font-semibold">Years of Experience</div>
                  <p className="text-sm text-muted-foreground">
                    Three decades of gaming industry expertise
                  </p>
                </div>
                
                <div className="text-center space-y-4 fade-in-up delay-1">
                  <div className="text-4xl font-bold text-gaming-gold">4</div>
                  <div className="text-foreground font-semibold">Office Locations</div>
                  <p className="text-sm text-muted-foreground">
                    Serving clients across Europe and beyond
                  </p>
                </div>
                
                <div className="text-center space-y-4 fade-in-up delay-2">
                  <div className="text-4xl font-bold text-gaming-gold">100%</div>
                  <div className="text-foreground font-semibold">Compliant</div>
                  <p className="text-sm text-muted-foreground">
                    Fully regulated and compliant operations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default WhoWeAre;