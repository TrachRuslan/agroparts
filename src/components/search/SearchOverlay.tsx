"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Package, Tractor, Wrench } from "lucide-react"
import { searchCatalog, products } from "@/lib/catalog/repository"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils"

type ResultItem =
  | { type: "product"; id: string; href: string; title: string; meta: string; image?: string }
  | { type: "vehicle"; id: string; href: string; title: string; meta: string }
  | { type: "system"; id: string; href: string; title: string; meta: string }

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
  initialQuery?: string
}

export function SearchOverlay({ open, onClose, initialQuery = "" }: SearchOverlayProps) {
  const [query, setQuery] = useState(initialQuery)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery(initialQuery)
      setActiveIndex(0)
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open, initialQuery])

  const results = useMemo(() => {
    const { products, vehicles, systems } = searchCatalog(query, 8)
    const items: ResultItem[] = [
      ...vehicles.map((v) => ({
        type: "vehicle" as const,
        id: `v-${v.slug}`,
        href: `/catalog/${v.slug}`,
        title: v.name,
        meta: "Модель техніки",
      })),
      ...systems.map((s) => {
        const sample = products.find((p) => p.systemSlug === s.slug)
        return {
          type: "system" as const,
          id: `s-${s.slug}`,
          href: sample
            ? `/catalog/${sample.vehicleSlug}/${s.slug}`
            : "/catalog",
          title: s.name,
          meta: "Система / вузол",
        }
      }),
      ...products.map((p) => ({
        type: "product" as const,
        id: `p-${p.slug}`,
        href: `/product/${p.slug}`,
        title: p.name,
        meta: `${p.sku} · ${formatPrice(p.price)}`,
        image: p.image,
      })),
    ]
    return items
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault()
        window.location.href = results[activeIndex].href
        onClose()
      }
    },
    [activeIndex, onClose, results]
  )

  const iconFor = (type: ResultItem["type"]) => {
    if (type === "vehicle") return Tractor
    if (type === "system") return Wrench
    return Package
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Пошук по каталогу"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="fixed left-1/2 top-[88px] z-[101] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2"
          >
            <motion.div
              className="glass-card border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
              onKeyDown={handleKeyDown}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search className="w-5 h-5 text-agro-yellow shrink-0" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActiveIndex(0)
                  }}
                  placeholder="Артикул, назва, модель техніки..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                  autoComplete="off"
                />
                <kbd className="hidden sm:inline text-[10px] text-white/25 border border-white/10 px-1.5 py-0.5 rounded">
                  Esc
                </kbd>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-white/40 hover:text-white"
                  aria-label="Закрити"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
                {query.trim().length < 2 ? (
                  <p className="text-center text-sm text-white/35 py-8">
                    Введіть мінімум 2 символи для пошуку
                  </p>
                ) : results.length === 0 ? (
                  <p className="text-center text-sm text-white/35 py-8">
                    Нічого не знайдено за запитом «{query}»
                  </p>
                ) : (
                  <ul className="space-y-0.5">
                    {results.map((item, i) => {
                      const Icon = iconFor(item.type)
                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                              i === activeIndex
                                ? "bg-agro-yellow/15 border border-agro-yellow/30"
                                : "hover:bg-white/5 border border-transparent"
                            )}
                            onMouseEnter={() => setActiveIndex(i)}
                          >
                            {item.type === "product" && item.image ? (
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#141414] shrink-0">
                                <Image
                                  src={item.image}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-agro-yellow" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-white/40 uppercase tracking-wide">
                                {item.meta}
                              </p>
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {query.trim().length >= 2 && (
                <div className="px-4 py-2 border-t border-white/10 text-[10px] text-white/30 flex justify-between">
                  <span>↑↓ навігація · Enter відкрити</span>
                  <Link
                    href={`/catalog?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-agro-yellow font-bold uppercase tracking-wider hover:underline"
                  >
                    Усі результати
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
