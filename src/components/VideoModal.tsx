import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';


interface VideoModalProps {
  triggerImage: string;
  triggerAlt: string;
  videoTitle: string;
  className?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  triggerImage,
  triggerAlt,
  videoTitle,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoModalEnabled = true;

  const handleVideoPlay = () => {
    console.log('Video play tracked');
    setIsOpen(true);
  };

  if (!videoModalEnabled) {
    return (
      <div className={`relative ${className}`}>
        <img 
          src={triggerImage}
          alt={triggerAlt}
          className="w-full h-96 md:h-[500px] object-cover rounded-2xl gaming-card"
        />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div 
          className={`relative cursor-pointer group ${className}`}
          onClick={handleVideoPlay}
          data-testid="video-modal-trigger"
        >
          <img 
            src={triggerImage}
            alt={triggerAlt}
            className="w-full h-96 md:h-[500px] object-cover rounded-2xl gaming-card transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-gaming-navy/40 rounded-2xl transition-all duration-300 group-hover:bg-gaming-navy/20">
            <div className="bg-gaming-gold/90 rounded-full p-6 transition-all duration-300 group-hover:bg-gaming-gold group-hover:scale-110">
              <Play className="h-12 w-12 text-gaming-navy fill-gaming-navy ml-1" />
            </div>
          </div>

          {/* Play Indicator */}
          <div className="absolute bottom-4 left-4 bg-gaming-navy/80 rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <Play className="h-4 w-4 text-gaming-gold fill-gaming-gold" />
              <span className="text-foreground text-sm font-medium">Play Video</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full bg-gaming-navy border-gaming-navy-lighter p-0">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {/* Mock Video Player */}
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gaming-navy to-gaming-navy-light">
            <div className="text-center space-y-4">
              <div className="bg-gaming-gold/20 rounded-full p-8 mx-auto w-fit">
                <Play className="h-16 w-16 text-gaming-gold fill-gaming-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">{videoTitle}</h3>
                <p className="text-muted-foreground">
                  Demo video content would play here
                </p>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            data-testid="video-modal-close"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;