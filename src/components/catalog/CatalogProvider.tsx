"use client"

import { createContext, useContext } from "react"
import type { CatalogSnapshot } from "@/lib/catalog/core"

const CatalogContext = createContext<CatalogSnapshot | null>(null)

export function CatalogProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: CatalogSnapshot
}) {
  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  )
}

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error("useCatalog must be used inside CatalogProvider")
  }

  return context
}
