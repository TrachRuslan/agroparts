import { create } from "zustand"
import { persist } from "zustand/middleware"

const MAX = 8

interface SearchHistoryState {
  queries: string[]
  add: (query: string) => void
  remove: (query: string) => void
  clear: () => void
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      queries: [],
      add: (query) => {
        const q = query.trim()
        if (q.length < 2) return
        set((state) => ({
          queries: [q, ...state.queries.filter((x) => x !== q)].slice(0, MAX),
        }))
      },
      remove: (query) =>
        set((state) => ({
          queries: state.queries.filter((x) => x !== query),
        })),
      clear: () => set({ queries: [] }),
    }),
    { name: "agroparts-search-history" }
  )
)
