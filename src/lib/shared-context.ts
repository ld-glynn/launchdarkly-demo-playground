// Simple VIP context management
// Just creates a basic user context with VIP status

// Create VIP user context
export function createVIPUserContext(): void {
  const userContext = {
    key: 'demo-vip-user',
    kind: 'user',
    custom: {
      vipStatus: 'vip'
    }
  };
  
  localStorage.setItem('omni-user-context', JSON.stringify(userContext));
  console.log('VIP context created:', userContext);
}

// Create regular user context
export function createRegularUserContext(): void {
  const userContext = {
    key: 'demo-regular-user',
    kind: 'user',
    custom: {
      vipStatus: 'none'
    }
  };
  
  localStorage.setItem('omni-user-context', JSON.stringify(userContext));
  console.log('Regular context created:', userContext);
}

// Get current user context
export function getCurrentUserContext(): any {
  try {
    const stored = localStorage.getItem('omni-user-context');
    if (!stored) {
      // Create default regular user
      createRegularUserContext();
      return getCurrentUserContext();
    }
    return JSON.parse(stored);
  } catch {
    createRegularUserContext();
    return getCurrentUserContext();
  }
}

// Get VIP status
export function getVIPStatus(): 'none' | 'vip' {
  const context = getCurrentUserContext();
  return context?.custom?.vipStatus || 'none';
}


