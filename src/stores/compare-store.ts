import { create } from "zustand"
import { persist } from "zustand/middleware"

const MAX = 4

interface CompareState {
  slugs: string[]
  toggle: (slug: string) => void
  remove: (slug: string) => void
  clear: () => void
  has: (slug: string) => boolean
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) =>
        set((state) => {
          if (state.slugs.includes(slug)) {
            return { slugs: state.slugs.filter((s) => s !== slug) }
          }
          if (state.slugs.length >= MAX) return state
          return { slugs: [...state.slugs, slug] }
        }),
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((s) => s !== slug) })),
      clear: () => set({ slugs: [] }),
      has: (slug) => get().slugs.includes(slug),
    }),
    { name: "agroparts-compare" }
  )
)
