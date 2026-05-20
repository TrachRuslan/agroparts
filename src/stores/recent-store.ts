import { create } from "zustand"
import { persist } from "zustand/middleware"

interface RecentState {
  slugs: string[]
  add: (slug: string) => void
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      slugs: [],
      add: (slug) =>
        set((state) => ({
          slugs: [slug, ...state.slugs.filter((s) => s !== slug)].slice(0, 12),
        })),
    }),
    { name: "agroparts-recent" }
  )
)
