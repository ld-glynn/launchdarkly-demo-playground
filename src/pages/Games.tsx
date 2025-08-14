import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUserContext } from "@/lib/shared-context";

// Import game images
import gameSlotsColorful from "@/assets/game-slots-colorful.jpg";
import gameBlackjackColorful from "@/assets/game-blackjack-colorful.jpg";
import gameRouletteColorful from "@/assets/game-roulette-colorful.jpg";
import gamePokerColorful from "@/assets/game-poker-colorful.jpg";
import gameBaccaratColorful from "@/assets/game-baccarat-colorful.jpg";
import gameDiceColorful from "@/assets/game-dice-colorful.jpg";
import gameGoldenPoker from "@/assets/game-golden-poker.jpg";
import gameGoldenSlots from "@/assets/game-golden-slots.jpg";
import gameGoldenRoulette from "@/assets/game-golden-roulette.jpg";

interface Game {
  id: string;
  title: string;
  image: string;
  category: string;
}

const Games = () => {
  const [allGames] = useState<Game[]>([
    { id: '1', title: 'Lucky Slots Deluxe', image: gameSlotsColorful, category: 'slots' },
    { id: '2', title: 'Blackjack Pro', image: gameBlackjackColorful, category: 'table' },
    { id: '3', title: 'European Roulette', image: gameRouletteColorful, category: 'table' },
    { id: '4', title: 'Texas Hold\'em Poker', image: gamePokerColorful, category: 'poker' },
    { id: '5', title: 'Baccarat Master', image: gameBaccaratColorful, category: 'table' },
    { id: '6', title: 'Lucky Dice Roll', image: gameDiceColorful, category: 'dice' },
    { id: '7', title: 'Golden Retriever Slots', image: gameGoldenSlots, category: 'slots' },
    { id: '8', title: 'Classic Blackjack', image: gameBlackjackColorful, category: 'table' },
    { id: '9', title: 'Golden Paws Roulette', image: gameGoldenRoulette, category: 'table' },
    { id: '10', title: 'Wild West Slots', image: gameSlotsColorful, category: 'slots' },
    { id: '11', title: 'Golden Retriever Poker', image: gameGoldenPoker, category: 'poker' },
    { id: '12', title: 'American Roulette', image: gameRouletteColorful, category: 'table' },
    { id: '13', title: 'Diamond Slots', image: gameSlotsColorful, category: 'slots' },
    { id: '14', title: 'Punto Banco', image: gameBaccaratColorful, category: 'table' },
    { id: '15', title: 'Thunder Dice', image: gameDiceColorful, category: 'dice' },
  ]);
  
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameType, setGameType] = useState("all");
  const [orderBy, setOrderBy] = useState("featured");
  const [loading, setLoading] = useState(false);
  const gamesPerPage = 9;
  const { toast } = useToast();
  
  // Feature flags - simplified
  const showAdvancedSearch = true;
  const showRecommendedGames = true;
  const newLayout = false;

  useEffect(() => {
    // Initialize displayed games
    setFilteredGames(allGames);
    setDisplayedGames(allGames.slice(0, gamesPerPage));
  }, [allGames]);

  const handleSearch = () => {
    setCurrentPage(1);
    
    let filtered = allGames;
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by type
    if (gameType && gameType !== "all") {
      filtered = filtered.filter(game => game.category === gameType);
    }
    
    // Sort by order
    if (orderBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (orderBy === 'name-desc') {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredGames(filtered);
    setDisplayedGames(filtered.slice(0, gamesPerPage));
  };

  const handleLoadMore = () => {
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const startIndex = currentPage * gamesPerPage;
      const endIndex = startIndex + gamesPerPage;
      const newGames = filteredGames.slice(startIndex, endIndex);
      
      setDisplayedGames(prev => [...prev, ...newGames]);
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 500);
  };

  const hasMoreGames = displayedGames.length < filteredGames.length;

  const handlePlayGame = (gameId: string) => {
    const game = allGames.find(g => g.id === gameId);
    

    
    // For demo purposes, redirect to separate gaming app
    if (gameId === '1') { // Lucky Slots Deluxe
      const gamingUrl = import.meta.env.DEV 
        ? 'http://localhost:5174'
        : `https://${import.meta.env.VITE_GAMING_DOMAIN || 'games.yourdomain.com'}`;
      
      // Add simplified context transfer parameters
      const context = getCurrentUserContext();
      const userId = context?.key;
      
      const transferParams = new URLSearchParams();
      if (userId) transferParams.append('userId', userId);
      transferParams.append('gameId', gameId);
      transferParams.append('source', 'website');
      
      const fullGamingUrl = `${gamingUrl}?${transferParams.toString()}`;
      
      toast({
        title: "Launching Game",
        description: "Opening the gaming app with your user context...",
      });
      
      window.open(fullGamingUrl, '_blank');
      return;
    }
    
    toast({
      title: "Game Loading...",
      description: `Starting ${game?.title || 'game'}. Good luck!`,
    });
  };

  const GameCard = ({ title, image, onPlay }: { title: string; image: string; onPlay: () => void }) => (
    <Card className="group gaming-card overflow-hidden border-0">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button 
            onClick={onPlay}
            size="lg"
            className="gaming-button text-primary-foreground font-bold px-8 py-3 rounded-full shadow-lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Play Now
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground group-hover:text-gaming-gold transition-colors duration-300">
          {title}
        </h3>
        <div className="mt-2 text-sm text-muted-foreground">
          Casino Game
        </div>
      </div>
    </Card>
  );

  const AdvancedSearchBar = () => (
    <section className="py-8 bg-gaming-navy-light border-y border-gaming-navy-lighter">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                What are you looking for?
              </label>
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12 bg-background border-gaming-navy-lighter focus:border-gaming-gold text-foreground"
              />
            </div>

            {/* Game Type Filter */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Type
              </label>
              <Select value={gameType} onValueChange={setGameType}>
                <SelectTrigger className="h-12 bg-background border-gaming-navy-lighter focus:border-gaming-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="slots">Slots</SelectItem>
                  <SelectItem value="table">Table Games</SelectItem>
                  <SelectItem value="poker">Poker</SelectItem>
                  <SelectItem value="dice">Dice Games</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order By */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Order By
              </label>
              <Select value={orderBy} onValueChange={setOrderBy}>
                <SelectTrigger className="h-12 bg-background border-gaming-navy-lighter focus:border-gaming-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button
                onClick={handleSearch}
                className="w-full h-12 gaming-button text-primary-foreground font-semibold uppercase tracking-wide"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const SimpleSearchBar = () => (
    <section className="py-8 bg-gaming-navy-light border-y border-gaming-navy-lighter">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 pr-4 py-3 bg-background border-gaming-navy-lighter focus:border-gaming-gold rounded-xl text-lg shadow-sm focus:shadow-md transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gaming-hero-bg pt-32 pb-24">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8 fade-in-up">
              <div className="space-y-6">
                <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase">
                  Our Games
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Premium Casino Games
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Choose from our extensive collection of premium casino games, designed to provide the ultimate gaming experience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        {showAdvancedSearch ? <AdvancedSearchBar /> : <SimpleSearchBar />}

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* All Games Section */}
          <section className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                All Games
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose from our extensive collection of premium casino games
              </p>
            </div>
            
            <div className={`grid gap-8 ${
              newLayout 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {displayedGames.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  image={game.image}
                  onPlay={() => handlePlayGame(game.id)}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMoreGames && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="gaming-button text-primary-foreground font-semibold px-8 py-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    'Load More Games'
                  )}
                </Button>
              </div>
            )}
            
            {filteredGames.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No games found</h3>
                <p className="text-lg text-muted-foreground">Try adjusting your search terms</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
