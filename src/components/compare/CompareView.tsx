"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { GitCompare, X, ShoppingCart } from "lucide-react"
import { useCatalog } from "@/components/catalog/CatalogProvider"
import { useHydrated } from "@/hooks/useHydrated"
import { useCompareStore } from "@/stores/compare-store"
import { getProductBySlug } from "@/lib/catalog/core"
import { formatPrice, cn } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"

const ROW_LABELS = ["Ціна", "SKU", "Бренд", "Рейтинг", "Наявність"] as const

export function CompareView() {
  const catalog = useCatalog()
  const hydrated = useHydrated()
  const slugs = useCompareStore((s) => s.slugs)
  const remove = useCompareStore((s) => s.remove)
  const clear = useCompareStore((s) => s.clear)
  const addToCart = useCartStore((s) => s.addItem)
  const products = useMemo(
    () =>
      slugs
        .map((slug) => getProductBySlug(catalog, slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [catalog, slugs]
  )

  if (!hydrated) {
    return <div className="space-y-6" />
  }

  if (products.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <GitCompare className="w-16 h-16 text-white/15 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-3">Немає товарів для порівняння</h2>
        <p className="text-white/45 mb-8">Додайте до 4 позицій з каталогу.</p>
        <Link href="/catalog" className="btn-primary inline-flex">
          Відкрити каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clear}
          className="text-xs font-bold uppercase tracking-wider text-white/40 hover:text-agro-yellow"
        >
          Очистити все
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-white/30 w-36" />
              {products.map((p) => (
                <th key={p.slug} className="p-3 align-top">
                  <div className="glass-card p-4 relative">
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      className="absolute top-2 right-2 p-1 text-white/30 hover:text-white"
                      aria-label="Прибрати"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Link href={`/product/${p.slug}`} className="block">
                      <div className="relative h-32 rounded-xl overflow-hidden bg-[#141414] mb-3">
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="200px" />
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-2 hover:text-agro-yellow">
                        {p.name}
                      </h3>
                    </Link>
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      disabled={!p.inStock}
                      className={cn(
                        "mt-3 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all",
                        p.inStock
                          ? "bg-agro-yellow text-black hover:bg-white"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      )}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      У кошик
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROW_LABELS.map((label) => (
              <tr key={label} className="border-t border-white/[0.06]">
                <td className="p-3 text-xs font-bold uppercase tracking-wide text-white/40">
                  {label}
                </td>
                {products.map((p) => (
                  <td key={p.slug + label} className="p-3 text-sm text-white/80">
                    {label === "Ціна" && (
                      <span className="font-black text-agro-yellow tabular-nums">
                        {formatPrice(p.price)}
                      </span>
                    )}
                    {label === "SKU" && p.sku}
                    {label === "Бренд" && p.brand}
                    {label === "Рейтинг" && `${p.rating} / 5`}
                    {label === "Наявність" && (
                      <span className={p.inStock ? "text-agro-green" : "text-red-400"}>
                        {p.inStock ? "В наявності" : "Під замовлення"}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
