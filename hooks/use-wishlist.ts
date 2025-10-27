"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type WishlistItem = {
  productId: string
  name: string
  price: number
  image: string
}

type WishlistStore = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  getCount: () => number
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const exists = items.find((i) => i.productId === item.productId)

        if (!exists) {
          set({ items: [...items, item] })
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((i) => i.productId !== productId),
        })
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId)
      },
      getCount: () => {
        return get().items.length
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
