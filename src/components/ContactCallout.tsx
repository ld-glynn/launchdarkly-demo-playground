import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


const ContactCallout: React.FC = () => {
  const gradientEnabled = true;

  const handleContactClick = () => {
    console.log('Contact CTA clicked');
  };

  const backgroundClass = gradientEnabled 
    ? 'bg-gradient-to-r from-gaming-gold to-gaming-gold-dark'
    : 'bg-gaming-gold';

  return (
    <section 
      className={`py-20 ${backgroundClass}`}
      data-testid="contact-callout"
      data-gradient={gradientEnabled}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gaming-navy leading-tight">
            Eager to hear more about us?
          </h2>
          <p className="text-xl text-gaming-navy/80 leading-relaxed max-w-2xl mx-auto">
            Get in touch with our team to learn how we can help transform your gaming platform with cutting-edge technology and industry expertise.
          </p>
          <Button 
            size="lg"
            variant="outline"
            onClick={handleContactClick}
            className="border-gaming-navy text-gaming-navy hover:bg-gaming-navy hover:text-gaming-gold bg-transparent transition-all duration-300 group px-8 py-4 text-lg font-semibold"
            data-testid="contact-callout-button"
          >
            Contact us
            <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCallout;