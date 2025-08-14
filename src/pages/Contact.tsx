import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ResponsibleGamingBanner from '@/components/ResponsibleGamingBanner';

import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Track the lead submission
          console.log('Lead submitted');

    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });

    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

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
                  Get in touch
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Contact <span className="text-gaming-gold">Us</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Ready to transform your gaming platform? Let's discuss how our innovative technology and industry expertise can help you succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16">
                
                {/* Form */}
                <Card className="gaming-card border-gaming-navy-lighter fade-in-up">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-gaming-navy-light border-gaming-navy-lighter text-foreground"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-gaming-navy-light border-gaming-navy-lighter text-foreground"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-foreground font-semibold">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-gaming-navy-light border-gaming-navy-lighter text-foreground"
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground font-semibold">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          className="bg-gaming-navy-light border-gaming-navy-lighter text-foreground min-h-[120px]"
                          placeholder="Tell us about your project or questions..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="gaming-button text-gaming-navy w-full font-semibold"
                        data-testid="contact-form-submit"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-8 fade-in-up delay-1">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">
                      Let's start a conversation
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Whether you're looking to integrate our gaming platform, explore partnership opportunities, or learn more about our technology, we're here to help.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                      <p className="text-muted-foreground">
                        We typically respond within 24 hours during business days.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM (CET)
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Office Locations</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Brussels, Belgium (HQ)</p>
                        <p>London, United Kingdom</p>
                        <p>Malta</p>
                        <p>Paris, France</p>
                      </div>
                    </div>
                  </div>

                  <Card className="gaming-card border-gaming-gold/30 bg-gaming-gold/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gaming-gold mb-2">
                        Demo Disclaimer
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        This contact form is for demonstration purposes only. In a real implementation, this would integrate with your CRM or email system.
                      </p>
                    </CardContent>
                  </Card>
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

export default Contact;