import React from 'react';
import { ChevronLeft, Users, Award, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ResponsibleGamingBanner from '@/components/ResponsibleGamingBanner';

const WorkWithUs: React.FC = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with passionate professionals in a supportive, innovation-driven environment.'
    },
    {
      icon: Award,
      title: 'Top Employer',
      description: 'Certified as a Top Employer for 4 consecutive years, reflecting our commitment to our people.'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Career opportunities across our offices in Brussels, London, Malta, and Paris.'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible working arrangements and comprehensive benefits to support your wellbeing.'
    }
  ];

  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Brussels, Belgium',
      type: 'Full-time'
    },
    {
      title: 'Product Manager - Gaming',
      department: 'Product',
      location: 'London, UK',
      type: 'Full-time'
    },
    {
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Malta',
      type: 'Full-time'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Paris, France',
      type: 'Full-time'
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
                  Careers
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Work with <span className="text-gaming-gold">us</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Join our team of innovators and help shape the future of gaming technology. We're always looking for talented individuals who share our passion.
                </p>
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

        {/* Benefits */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why join Demo1?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  We believe in creating an environment where talented individuals can thrive and make a meaningful impact.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <Card 
                    key={benefit.title}
                    className={`gaming-card border-gaming-navy-lighter fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="bg-gaming-gold/20 rounded-full p-4 w-fit">
                          <benefit.icon className="h-8 w-8 text-gaming-gold" />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground">
                            {benefit.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {benefit.description}
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

        {/* Open Positions */}
        <section className="py-24 bg-gaming-navy-light">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Open Positions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Explore current opportunities to join our growing team.
                </p>
              </div>

              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <Card 
                    key={position.title}
                    className={`gaming-card border-gaming-navy-lighter hover:border-gaming-gold/30 transition-all duration-300 cursor-pointer fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground hover:text-gaming-gold transition-colors">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>• {position.department}</span>
                            <span>• {position.location}</span>
                            <span>• {position.type}</span>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          className="border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-gaming-navy transition-all duration-300 w-fit"
                        >
                          View Details
                        </Button>
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
                  Don't see the perfect role?
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We're always interested in hearing from talented individuals. Send us your resume and let us know how you'd like to contribute.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="gaming-button text-gaming-navy font-semibold px-8 py-4 text-lg"
                >
                  Send Your Resume
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-gaming-navy transition-all duration-300"
                >
                  Learn About Our Culture
                </Button>
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

export default WorkWithUs;