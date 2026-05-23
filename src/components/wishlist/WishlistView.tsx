"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Heart } from "lucide-react"
import { useCatalog } from "@/components/catalog/CatalogProvider"
import { useHydrated } from "@/hooks/useHydrated"
import { useWishlistStore } from "@/stores/wishlist-store"
import { getProductBySlug } from "@/lib/catalog/core"
import { ProductCard } from "@/components/catalog/ProductCard"

export function WishlistView() {
  const catalog = useCatalog()
  const hydrated = useHydrated()
  const slugs = useWishlistStore((s) => s.slugs)
  const products = useMemo(
    () =>
      slugs
        .map((slug) => getProductBySlug(catalog, slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [catalog, slugs]
  )

  if (!hydrated) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" />
  }

  if (products.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <Heart className="w-16 h-16 text-white/15 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-3">Список обраного порожній</h2>
        <p className="text-white/45 mb-8">
          Натисніть іконку серця на картці товару, щоб зберегти запчастину.
        </p>
        <Link href="/catalog" className="btn-primary inline-flex">
          До каталогу
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
