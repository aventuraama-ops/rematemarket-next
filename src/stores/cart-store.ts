import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Cart } from "@/domain/entities/CartItem";
import { buildCart } from "@/domain/entities/CartItem";

export type AddToCartPayload = Omit<CartItem, "subtotal">;

export interface CartState {
  items: CartItem[];
  cart: Cart;
  addItem: (payload: AddToCartPayload) => void;
  updateQuantity: (productoId: string, unidad: CartItem["unidad"], cantidad: number) => void;
  removeItem: (productoId: string, unidad: CartItem["unidad"]) => void;
  clearCart: () => void;
  isEmpty: boolean;
  totalItems: number;
}

export const createCartStore = () => {
  return createStore<CartState>()(
    persist(
      (set, get) => ({
        items: [],
        cart: buildCart([]),
        isEmpty: true,
        totalItems: 0,
        addItem: (payload) => {
          set((state) => {
            const idx = state.items.findIndex(
              (i) => i.productoId === payload.productoId && i.unidad === payload.unidad
            );
            let next: CartItem[];
            if (idx >= 0) {
              next = state.items.map((i, index) => {
                if (index !== idx) return i;
                const nuevaCantidad = i.cantidad + payload.cantidad;
                return { ...i, cantidad: nuevaCantidad, subtotal: nuevaCantidad * payload.precioUnitario };
              });
            } else {
              const newItem: CartItem = {
                ...payload,
                subtotal: payload.cantidad * payload.precioUnitario,
              };
              next = [...state.items, newItem];
            }
            const cart = buildCart(next);
            return { items: next, cart, isEmpty: next.length === 0, totalItems: cart.totalItems };
          });
        },
        updateQuantity: (productoId, unidad, cantidad) => {
          set((state) => {
            const next =
              cantidad <= 0
                ? state.items.filter((i) => !(i.productoId === productoId && i.unidad === unidad))
                : state.items.map((i) => {
                    if (i.productoId !== productoId || i.unidad !== unidad) return i;
                    return { ...i, cantidad, subtotal: cantidad * i.precioUnitario };
                  });
            const cart = buildCart(next);
            return { items: next, cart, isEmpty: next.length === 0, totalItems: cart.totalItems };
          });
        },
        removeItem: (productoId, unidad) => {
          set((state) => {
            const next = state.items.filter(
              (i) => !(i.productoId === productoId && i.unidad === unidad)
            );
            const cart = buildCart(next);
            return { items: next, cart, isEmpty: next.length === 0, totalItems: cart.totalItems };
          });
        },
        clearCart: () => {
          set({ items: [], cart: buildCart([]), isEmpty: true, totalItems: 0 });
        },
      }),
      {
        name: "remate_cart_v1", // Same key as in Vite to reuse localStorage
      }
    )
  );
};

export type CartStore = ReturnType<typeof createCartStore>;
