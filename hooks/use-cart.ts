// "use client"

// import { create } from "zustand"
// import { persist } from "zustand/middleware"

// type CartItem = {
//   productId: string
//   name: string
//   price: number
//   image: string
//   quantity: number
// }

// type CartStore = {
//   items: CartItem[]
//   addItem: (item: Omit<CartItem, "quantity">) => void
//   removeItem: (productId: string) => void
//   updateQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
//   getTotal: () => number
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (item) => {
//         const items = get().items
//         const existingItem = items.find((i) => i.productId === item.productId)

//         if (existingItem) {
//           set({
//             items: items.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i)),
//           })
//         } else {
//           set({ items: [...items, { ...item, quantity: 1 }] })
//         }
//       },
//       removeItem: (productId) => {
//         set({ items: get().items.filter((i) => i.productId !== productId) })
//       },
//       updateQuantity: (productId, quantity) => {
//         if (quantity <= 0) {
//           get().removeItem(productId)
//         } else {
//           set({
//             items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
//           })
//         }
//       },
//       clearCart: () => set({ items: [] }),
//       getTotal: () => {
//         return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
//       },
//     }),
//     {
//       name: "cart-storage",
//     },
//   ),
// )
"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  productId: string
  variantId?: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.productId === item.productId && i.variantId === item.variantId)

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.productId === item.productId && i.variantId === item.variantId ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter((i) => !(i.productId === productId && i.variantId === variantId)),
        })
      },
      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
        } else {
          set({
            items: get().items.map((i) =>
              i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i,
            ),
          })
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
