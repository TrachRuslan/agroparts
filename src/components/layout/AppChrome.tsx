"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"
import { SearchOverlay } from "@/components/search/SearchOverlay"

export function AppChrome({ children }: { children: React.ReactNode }) {
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

  return (
    <>
      <Header onSearchOpen={openSearch} searchOpen={searchOpen} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      <main className="pt-[72px] pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav onSearchOpen={openSearch} />
    </>
  )
}
