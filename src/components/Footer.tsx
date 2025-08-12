import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import navData from '@/data/nav.json';
import officesData from '@/data/offices.json';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const headquarters = officesData.find(office => office.isHeadquarters);

  return (
    <footer className="bg-gaming-navy-light border-t border-gaming-navy-lighter" data-testid="footer">
      <div className="container mx-auto px-6 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="text-2xl font-bold text-gaming-gold mb-4">
                DEMO<span className="text-foreground">1</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A leader in the regulated gaming market, providing innovative omnichannel experiences with a focus on responsible gaming.
              </p>
            </div>
            
            {/* Headquarters */}
            {headquarters && (
              <div>
                <h4 className="text-foreground font-semibold mb-2">Headquarters</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {headquarters.address}
                </p>
              </div>
            )}
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {navData.footer.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-gaming-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Solutions</h4>
            <ul className="space-y-3">
              {navData.footer.solutions.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-gaming-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices & Social */}
          <div className="space-y-8">
            <div>
              <h4 className="text-foreground font-semibold mb-6">Our Offices</h4>
              <ul className="space-y-2">
                {officesData.map((office, index) => (
                  <li key={index}>
                    <a 
                      href="#"
                      className="text-muted-foreground hover:text-gaming-gold transition-colors text-sm"
                    >
                      {office.city}, {office.country}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#"
                  className="text-muted-foreground hover:text-gaming-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#"
                  className="text-muted-foreground hover:text-gaming-gold transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#"
                  className="text-muted-foreground hover:text-gaming-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#"
                  className="text-muted-foreground hover:text-gaming-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gaming-navy-lighter pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright & Disclaimer */}
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm mb-1">
                © {currentYear} Demo1 Gaming Platform. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs">
                <span className="text-gaming-gold font-semibold">Demo Only:</span> This is a demonstration website created for LaunchDarkly presentation purposes.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {navData.footer.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-gaming-gold transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;