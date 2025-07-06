import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from './productService'

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem [];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => number;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(item => item.id === product.id);

                    if (existingItemIndex > -1) {
                        const newItems = [...state.items];
                        newItems[existingItemIndex].quantity += quantity;
                        return { items: newItems };
                    } else {
                        return { items: [...state.items, { ...product, quantity }] };
                    }
                })
            },

            removeFromCart: (productId) => {
                set((state) => ({
                items: state.items.filter(item => item.id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                set((state) => {
                if (quantity <= 0) {
                    return { items: state.items.filter(item => item.id !== productId) };
                }
                const newItems = state.items.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                );
                return { items: newItems };
                });
            },

            clearCart: () => {
                set({ items: [] });
                return 0;
            },

            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            getSubtotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
        }),
        {
        name: 'mini-commerce-cart-storage',
        storage: createJSONStorage(() => localStorage),
        }
    )
)