"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Tractor,
  ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { categories, countProducts } from "@/lib/mock-data"
import { useCartStore } from "@/stores/cart-store"

const navLinks = [
  { name: "Головна", href: "/" },
  { name: "Доставка", href: "/delivery" },
  { name: "Відгуки", href: "/#reviews" },
  { name: "Контакти", href: "/contacts" },
]

interface HeaderProps {
  onSearchOpen?: () => void
  searchOpen?: boolean
}

export const Header = ({ onSearchOpen }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const cartCount = useCartStore((s) => s.count())

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/75 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-black/30 backdrop-blur-md"
      )}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-agro-yellow rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-agro-yellow/20">
              <Tractor className="text-black w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white">
                AGRO<span className="text-agro-yellow">PARTS</span>
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] leading-none">
                Industrial
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-white/70 hover:text-agro-yellow transition-colors"
            >
              Головна
            </Link>
            <motion.div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
            >
              <Link
                href="/catalog"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  megaOpen ? "text-agro-yellow" : "text-white/70 hover:text-agro-yellow"
                )}
              >
                Каталог
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    megaOpen && "rotate-180"
                  )}
                />
              </Link>
            </motion.div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-agro-yellow transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSearchOpen}
              className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:border-agro-yellow/40 transition-all text-left min-w-[140px] lg:min-w-[180px]"
            >
              <Search className="w-4 h-4 text-white/25 shrink-0" />
              <span className="text-xs text-white/30 flex-1">
                Пошук… <kbd className="ml-1 text-[9px] opacity-50">Ctrl+K</kbd>
              </span>
            </button>
            <button
              type="button"
              onClick={onSearchOpen}
              className="md:hidden p-2.5 text-white/50 hover:text-agro-yellow"
              aria-label="Пошук"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2.5 text-white/50 hover:text-agro-yellow relative"
              aria-label="Кошик"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-agro-yellow text-black text-[8px] font-black rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="p-2.5 text-white/50 hover:text-agro-yellow hidden sm:block"
              aria-label="Профіль"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="lg:hidden p-2.5 text-white/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Меню"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block border-t border-white/5 bg-black/95 backdrop-blur-xl"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-4 gap-3 max-h-[360px] overflow-y-auto">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog/${cat.slug}`}
                  className="group p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                  onClick={() => setMegaOpen(false)}
                >
                  <div className="font-bold text-white text-sm group-hover:text-agro-yellow transition-colors">
                    {cat.name}
                  </div>
                  <p className="text-[10px] text-white/35 mt-1">
                    {countProducts(cat.slug)} товарів
                  </p>
                  {cat.subcategories && (
                    <div className="mt-2 space-y-1">
                      {cat.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub.id}
                          className="block text-[10px] text-white/30 hover:text-white/60"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="p-4 space-y-1">
              <Link
                href="/"
                className="block py-3 text-white/70 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Головна
              </Link>
              <Link
                href="/catalog"
                className="block py-3 text-agro-yellow font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Весь каталог
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog/${cat.slug}`}
                  className="block py-2 pl-3 text-sm text-white/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cat.name} ({countProducts(cat.slug)})
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
