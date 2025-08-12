import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlag, useLDClient } from '@/contexts/LaunchDarklyContext';
import { trackCTAClick } from '@/lib/launchdarkly';
import heroImage from '@/assets/hero-gaming.jpg';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroVariant = useFlag('hero.variant', 'A');
  const ctaText = useFlag('hero.cta-text', 'Learn more');
  const client = useLDClient();

  // Hero content variants based on flag
  const getHeroContent = (variant: string): HeroSlide[] => {
    const baseSlides = [
      {
        id: 'slide1',
        title: 'We are Demo1',
        subtitle: variant === 'B' ? 'Revolutionary' : variant === 'C' ? 'Leading the future in' : 'Next level',
        description: variant === 'B' 
          ? 'Transforming the gaming industry with cutting-edge technology and innovative solutions for the digital age.'
          : variant === 'C'
          ? 'Building tomorrow\'s gaming experiences today with advanced platforms and responsible gaming practices.'
          : 'With 30 years\' experience, Demo1 is a leader on the game of chance market. We offer a unique omnichannel experience based on a responsible approach.',
        image: heroImage,
      },
      {
        id: 'slide2', 
        title: 'Technology Platform',
        subtitle: variant === 'B' ? 'Advanced Solutions' : variant === 'C' ? 'Enterprise Gaming' : 'Gaming Excellence',
        description: variant === 'B'
          ? 'Our state-of-the-art platform delivers unmatched performance and scalability for modern gaming operators.'
          : variant === 'C'
          ? 'Enterprise-grade gaming solutions designed for regulated markets and institutional operators.'
          : 'Drawing on experience from our own casinos, we offer comprehensive technology platforms for online gaming operations.',
        image: heroImage,
      }
    ];

    return baseSlides;
  };

  const slides = getHeroContent(heroVariant);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCTAClick = () => {
    trackCTAClick('hero', heroVariant);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      className="min-h-screen relative gaming-hero-bg overflow-hidden"
      data-testid="hero-section"
      data-variant={heroVariant}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-gaming-navy/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase">
                {currentSlideData.title}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                {currentSlideData.subtitle}
                {heroVariant === 'A' && (
                  <>
                    <br />
                    <span className="text-gaming-gold">entertainment</span>
                  </>
                )}
                {heroVariant === 'B' && (
                  <>
                    <br />
                    <span className="text-gaming-gold">gaming</span>
                  </>
                )}
                {heroVariant === 'C' && (
                  <>
                    <br />
                    <span className="text-gaming-gold">technology</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {currentSlideData.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="gaming-button text-gaming-navy font-semibold px-8 py-4 text-lg"
                onClick={handleCTAClick}
                data-testid="hero-cta-button"
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Slide Controls */}
          <div className="flex flex-col items-end space-y-8">
            
            {/* Navigation Dots */}
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gaming-gold scale-125' 
                      : 'bg-gaming-gold/40 hover:bg-gaming-gold/60'
                  }`}
                  data-testid={`hero-dot-${index}`}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="text-gaming-gold hover:text-gaming-gold hover:bg-gaming-navy-light border border-gaming-gold/30 w-12 h-12"
                data-testid="hero-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="text-gaming-gold hover:text-gaming-gold hover:bg-gaming-navy-light border border-gaming-gold/30 w-12 h-12"
                data-testid="hero-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="text-gaming-gold/60 uppercase text-sm font-medium tracking-wider">
              <span className="block mb-1">Previous</span>
              <span className="block mb-8">Next</span>
              <span className="block">Scroll Down</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;