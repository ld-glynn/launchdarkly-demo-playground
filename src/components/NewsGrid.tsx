import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useFlag } from '@/contexts/LaunchDarklyContext';
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

interface NewsItem {
  id: string;
  dateISO: string;
  title: string;
  image: string;
  href: string;
}

const NewsGrid: React.FC = () => {
  const newsSectionTitle = useFlag('content.news-section-title', 'Latest News');

  const handleCardClick = (newsItem: NewsItem) => {
    console.log('News card clicked:', newsItem.title);
  };

  const handleReadAllClick = () => {
    console.log('Read all news clicked');
  };

  return (
    <section className="py-24 bg-background" data-testid="news-section">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase mb-4">
            What's up?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {newsSectionTitle}
          </h2>
        </div>

        {/* News Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 fade-in-up delay-1"
          data-testid="news-grid"
        >
          {newsData.map((item: NewsItem, index) => (
            <Card 
              key={item.id}
              className="gaming-card border-gaming-navy-lighter cursor-pointer"
              onClick={() => handleCardClick(item)}
              data-testid={`news-card-${item.id}`}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={imageMap[item.image] || item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gaming-gold text-gaming-navy px-3 py-1 rounded-full text-sm font-semibold">
                      {formatDate(item.dateISO)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground leading-tight hover:text-gaming-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center text-gaming-gold text-sm font-medium">
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Read All News Button */}
        <div className="text-center fade-in-up delay-2">
          <Button 
            variant="outline"
            size="lg"
            onClick={handleReadAllClick}
            className="border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-gaming-navy transition-all duration-300"
            data-testid="read-all-news-button"
          >
            Read all news
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;