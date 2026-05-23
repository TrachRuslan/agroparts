"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import {
  Boxes,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageSearch,
  ShoppingCart,
  X,
} from "lucide-react"
import { useState } from "react"
import { logoutAdminAction } from "@/app/admin/actions"
import { AdminToastProvider } from "@/components/admin/AdminToastProvider"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Огляд", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товари", icon: PackageSearch },
  { href: "/admin/categories", label: "Категорії", icon: FolderKanban },
  { href: "/admin/orders", label: "Замовлення", icon: ShoppingCart },
]

export function AdminChrome({
  children,
  email,
}: {
  children: React.ReactNode
  email: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const sidebar = (
    <aside className="flex h-full w-full max-w-[300px] flex-col border-r border-white/10 bg-[#090909]/95 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-agro-yellow text-black">
          <Boxes className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-white">
            AGROPARTS
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-agro-yellow/75">
            Admin Console
          </p>
        </div>
      </div>

      <div className="px-4 py-5">
        <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/30">
          Навігація
        </p>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-agro-yellow text-black shadow-[0_20px_60px_-30px_rgba(255,184,0,0.75)]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/10 px-4 py-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
            Signed in
          </p>
          <p className="mt-1 text-sm font-medium text-white">{email}</p>
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await logoutAdminAction()
                router.push("/admin/login")
                router.refresh()
              })
            }
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            Вийти
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <AdminToastProvider>
      <div className="min-h-screen bg-[#050505] text-white">
        <div className="flex min-h-screen">
          <div className="hidden lg:block">{sidebar}</div>
          <div className="flex min-h-screen min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-4 md:px-8">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.26em] text-agro-yellow/80">
                    Industrial CMS
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    Production admin panel for catalog and orders
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 p-3 text-white/70 lg:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </header>

            <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 z-[110] lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/80"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[min(88vw,320px)]">
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-white/70"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              {sidebar}
            </div>
          </div>
        )}
      </div>
    </AdminToastProvider>
  )
}
