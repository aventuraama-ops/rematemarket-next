import { create } from 'zustand';
import type { Producto } from '@/domain/entities/Producto';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  addItem: (producto: Producto, cantidad: number) => void;
  removeItem: (productoId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (producto, cantidad) => {
    set((state) => {
      const existingItem = state.items.find(item => item.producto.id === producto.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.producto.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          ),
        };
      }
      return { items: [...state.items, { producto, cantidad }] };
    });
  },
  removeItem: (productoId) => {
    set((state) => ({
      items: state.items.filter(item => item.producto.id !== productoId),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.cantidad, 0);
  }
}));
