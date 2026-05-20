"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Search, ShoppingCart, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"

interface MobileBottomNavProps {
  onSearchOpen?: () => void
}

export function MobileBottomNav({ onSearchOpen }: MobileBottomNavProps) {
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.count())

  const items = [
    { href: "/", label: "Головна", icon: Home },
    { href: "/catalog", label: "Каталог", icon: LayoutGrid },
    { href: "#search", label: "Пошук", icon: Search, action: onSearchOpen },
    { href: "/contacts", label: "Контакти", icon: Phone },
  ]

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      aria-label="Мобільна навігація"
    >
      <div className="grid grid-cols-5 h-14">
        {items.map((item) => {
          const Icon = item.icon
          const active =
            item.href !== "#search" &&
            (item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href))

          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-0.5 text-white/45 hover:text-agro-yellow"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase">{item.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 transition-colors",
                active ? "text-agro-yellow" : "text-white/45"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase">{item.label}</span>
            </Link>
          )
        })}
        <Link
          href="/cart"
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 relative transition-colors",
            pathname === "/cart" ? "text-agro-yellow" : "text-white/45"
          )}
          aria-label="Кошик"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-[calc(50%-14px)] w-4 h-4 bg-agro-yellow text-black text-[8px] font-black rounded-full flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase">Кошик</span>
        </Link>
      </div>
    </nav>
  )
}
