import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LaunchDarklyProvider } from '@/contexts/LaunchDarklyContext';
import Games from './Games';

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock the assets
jest.mock('@/assets/game-slots-colorful.jpg', () => 'mocked-slots-image');
jest.mock('@/assets/game-blackjack-colorful.jpg', () => 'mocked-blackjack-image');
jest.mock('@/assets/game-roulette-colorful.jpg', () => 'mocked-roulette-image');
jest.mock('@/assets/game-poker-colorful.jpg', () => 'mocked-poker-image');
jest.mock('@/assets/game-baccarat-colorful.jpg', () => 'mocked-baccarat-image');
jest.mock('@/assets/game-dice-colorful.jpg', () => 'mocked-dice-image');
jest.mock('@/assets/game-golden-poker.jpg', () => 'mocked-golden-poker-image');
jest.mock('@/assets/game-golden-slots.jpg', () => 'mocked-golden-slots-image');
jest.mock('@/assets/game-golden-roulette.jpg', () => 'mocked-golden-roulette-image');

const renderGames = () => {
  return render(
    <BrowserRouter>
      <LaunchDarklyProvider>
        <Games />
      </LaunchDarklyProvider>
    </BrowserRouter>
  );
};

describe('Games Page', () => {
  it('renders the games page with correct title', () => {
    renderGames();
    expect(screen.getByText('Premium Casino Games')).toBeInTheDocument();
  });

  it('renders the search functionality', () => {
    renderGames();
    expect(screen.getByPlaceholderText('Search games...')).toBeInTheDocument();
  });

  it('renders game cards', () => {
    renderGames();
    expect(screen.getByText('Lucky Slots Deluxe')).toBeInTheDocument();
    expect(screen.getByText('Blackjack Pro')).toBeInTheDocument();
  });

  it('renders load more button when there are more games', () => {
    renderGames();
    expect(screen.getByText('Load More Games')).toBeInTheDocument();
  });
});
