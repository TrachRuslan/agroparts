"use client"

import React, { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"
import { SearchOverlay } from "@/components/search/SearchOverlay"
import { CompareBar } from "@/components/layout/CompareBar"
import { CatalogProvider } from "@/components/catalog/CatalogProvider"
import type { CatalogSnapshot } from "@/lib/catalog/core"

export function AppChrome({
  children,
  catalog,
}: {
  children: React.ReactNode
  catalog: CatalogSnapshot
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <CatalogProvider value={catalog}>
      <Header onSearchOpen={openSearch} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      <main className="pt-[72px] pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav onSearchOpen={openSearch} />
      <CompareBar />
    </CatalogProvider>
  )
}
