import { create } from 'zustand';

interface UIState {
  mobileMenuOpen: boolean;
  cartOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  cartOpen: false,
  
  setMobileMenuOpen: (open: boolean) => set({ mobileMenuOpen: open }),
  setCartOpen: (open: boolean) => set({ cartOpen: open }),
  
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
}));