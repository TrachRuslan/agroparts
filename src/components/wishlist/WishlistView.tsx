"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlistStore } from "@/stores/wishlist-store"
import { getProductBySlug } from "@/lib/catalog/repository"
import { ProductCard } from "@/components/catalog/ProductCard"

export function WishlistView() {
  const slugs = useWishlistStore((s) => s.slugs)
  const products = slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

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
