import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  kicker,
  title,
  description,
  ctaText,
  ctaHref,
  image,
  imageAlt,
  reverse = false,
  className = '',
}) => {
  const handleCTAClick = () => {
    console.log('Section CTA clicked');
  };

  return (
    <section className={`py-24 ${className}`} data-testid={`section-${id}`}>
      <div className="container mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-16 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
          
          {/* Content */}
          <div className={`space-y-8 fade-in-up ${reverse ? 'md:col-start-2' : ''}`}>
            <div className="space-y-6">
              <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase">
                {kicker}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={handleCTAClick}
              className="border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-gaming-navy transition-all duration-300 group"
              data-testid={`section-${id}-cta`}
            >
              {ctaText}
              <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image */}
          <div className={`fade-in-up delay-1 ${reverse ? 'md:col-start-1' : ''}`}>
            <div className="relative">
              <img 
                src={image}
                alt={imageAlt}
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl gaming-card"
              />
              <div className="absolute inset-0 bg-gaming-gold/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;