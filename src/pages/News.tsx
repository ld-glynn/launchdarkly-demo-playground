import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ResponsibleGamingBanner from '@/components/ResponsibleGamingBanner';
import { formatDate } from '@/lib/date';
import newsData from '@/data/news.json';
import news1 from '@/assets/news-1.jpg';
import news2 from '@/assets/news-2.jpg';
import news3 from '@/assets/news-3.jpg';
import news4 from '@/assets/news-4.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/news-1.jpg': news1,
  '/src/assets/news-2.jpg': news2,
  '/src/assets/news-3.jpg': news3,
  '/src/assets/news-4.jpg': news4,
};

const News: React.FC = () => {
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
                  What's up?
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  News
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Stay updated with the latest developments, insights, and announcements from Demo1.
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

        {/* News Articles */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 max-w-4xl mx-auto">
              {newsData.map((article, index) => (
                <Card 
                  key={article.id}
                  className={`gaming-card border-gaming-navy-lighter hover:border-gaming-gold/30 transition-all duration-300 fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-1">
                        <div className="relative overflow-hidden rounded-lg">
                          <img 
                            src={imageMap[article.image] || article.image}
                            alt={article.title}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-gaming-gold text-gaming-navy px-3 py-1 rounded-full text-sm font-semibold">
                              {formatDate(article.dateISO)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 space-y-6">
                        <div className="space-y-4">
                          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight hover:text-gaming-gold transition-colors cursor-pointer">
                            {article.title}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed">
                            This would be a preview excerpt of the article content. In a real implementation, this would come from the article's meta description or first paragraph.
                          </p>
                        </div>
                        
                        <Button 
                          variant="ghost"
                          className="text-gaming-gold hover:text-gaming-gold hover:bg-gaming-navy-light p-0 h-auto font-semibold group"
                        >
                          Read full article
                          <svg className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default News;