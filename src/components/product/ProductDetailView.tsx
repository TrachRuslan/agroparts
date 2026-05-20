"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
  Phone,
  ChevronRight,
  Minus,
  Plus,
  GitCompare,
} from "lucide-react"
import {
  getProductBySlug,
  getSimilarProducts,
  getNestedProductPath,
} from "@/lib/catalog/repository"
import { getVehicle } from "@/lib/catalog/vehicles"
import { getSystem } from "@/lib/catalog/systems"
import { useCartStore } from "@/stores/cart-store"
import { useRecentStore } from "@/stores/recent-store"
import { useCompareStore } from "@/stores/compare-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { Heart } from "lucide-react"
import { ProductCard } from "@/components/catalog/ProductCard"
import { formatPrice, cn } from "@/lib/utils"
import { notFound } from "next/navigation"

const tabs = ["Опис", "Характеристики", "Сумісність", "Відгуки"] as const

export function ProductDetailView({ productSlug }: { productSlug: string }) {
  const product = getProductBySlug(productSlug)
  const addRecent = useRecentStore((s) => s.add)
  const addToCart = useCartStore((s) => s.addItem)
  const toggleCompare = useCompareStore((s) => s.toggle)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const isWishlisted = useWishlistStore((s) => s.has(productSlug))

  React.useEffect(() => {
    if (product) addRecent(product.slug)
  }, [product, addRecent])

  if (!product) notFound()

  const [activeImg, setActiveImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Опис")
  const [zoomed, setZoomed] = useState(false)

  const similar = getSimilarProducts(product, 4)
  const vehicle = getVehicle(product.vehicleSlug)
  const system = getSystem(product.systemSlug)
  const gallery = product.gallery.length ? product.gallery : [product.image]

  return (
    <div className="bg-black pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <nav className="flex flex-wrap gap-2 text-[10px] text-white/25 mb-6 uppercase tracking-[0.15em] font-bold">
          <Link href="/" className="hover:text-agro-yellow">
            Головна
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/catalog" className="hover:text-agro-yellow">
            Каталог
          </Link>
          {vehicle && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={`/catalog/${vehicle.slug}`}
                className="hover:text-agro-yellow"
              >
                {vehicle.name}
              </Link>
            </>
          )}
          {vehicle && system && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={`/catalog/${vehicle.slug}/${system.slug}`}
                className="hover:text-agro-yellow"
              >
                {system.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/50 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div
              className={cn(
                "relative aspect-square glass-card overflow-hidden bg-[#141414] cursor-zoom-in",
                zoomed && "ring-2 ring-agro-yellow/50"
              )}
              onClick={() => setZoomed(!zoomed)}
            >
              <Image
                src={gallery[activeImg]}
                alt={product.name}
                fill
                className={cn(
                  "object-contain p-6 md:p-10 transition-transform duration-500",
                  zoomed && "scale-125"
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 bg-[#141414] transition-all",
                    activeImg === i
                      ? "border-agro-yellow"
                      : "border-white/5 opacity-50 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info + sticky buy */}
          <motion.div className="lg:col-span-6 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isNew && (
                <span className="text-[10px] font-black uppercase bg-agro-green text-white px-2 py-0.5 rounded-full">
                  Новинка
                </span>
              )}
              {product.isBestSeller && (
                <span className="text-[10px] font-black uppercase bg-agro-yellow text-black px-2 py-0.5 rounded-full">
                  Хіт
                </span>
              )}
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "text-agro-yellow fill-agro-yellow"
                        : "text-white/10"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-white/40">
                {product.rating} · {product.reviewsCount} відгуків
              </span>
            </div>

            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            <div className="lg:sticky lg:top-24 glass-card p-6 mb-8 border-white/10">
              <motion.div className="flex items-end gap-3 mb-4">
                <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-white/25 line-through mb-1">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </motion.div>

              <div
                className={cn(
                  "inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-5",
                  product.inStock
                    ? "bg-agro-green/10 text-agro-green border border-agro-green/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    product.inStock ? "bg-agro-green animate-pulse" : "bg-red-500"
                  )}
                />
                {product.inStock ? "В наявності" : "Під замовлення 3–7 днів"}
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-black/40 border border-white/10 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 text-white/40 hover:text-white"
                  >
                    <Minus className="w-4 h-4 mx-auto" />
                  </button>
                  <span className="w-10 text-center font-black text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 text-white/40 hover:text-white"
                  >
                    <Plus className="w-4 h-4 mx-auto" />
                  </button>
                </div>
                <button
                  type="button"
                  className="btn-primary flex-1 min-w-[160px]"
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  У кошик
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.slug)}
                  className={cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center transition-colors",
                    isWishlisted
                      ? "border-red-400/40 text-red-400"
                      : "border-white/10 text-white/50 hover:text-red-400"
                  )}
                  aria-label="Обране"
                >
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                </button>
                <button
                  type="button"
                  onClick={() => toggleCompare(product.slug)}
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-agro-yellow hover:border-agro-yellow/30 transition-colors"
                  aria-label="Порівняти"
                >
                  <GitCompare className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-white/5">
                {[
                  { icon: Truck, t: "Доставка 1–2 дні" },
                  { icon: ShieldCheck, t: "Гарантія 12 міс" },
                  { icon: RotateCcw, t: "Повернення 14 дн" },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="text-center p-2 rounded-lg bg-white/[0.02]"
                  >
                    <item.icon className="w-4 h-4 text-agro-yellow mx-auto mb-1" />
                    <span className="text-[9px] text-white/40 font-bold uppercase leading-tight block">
                      {item.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 flex gap-1 overflow-x-auto mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-3 text-xs font-black uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors",
                    activeTab === tab
                      ? "border-agro-yellow text-agro-yellow"
                      : "border-transparent text-white/40 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[120px] text-sm text-white/55 leading-relaxed">
              {activeTab === "Опис" && <p>{product.description}</p>}
              {activeTab === "Характеристики" && (
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-2 border-b border-white/5"
                    >
                      <dt className="text-white/35 text-xs uppercase font-bold">
                        {k}
                      </dt>
                      <dd className="text-white font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {activeTab === "Сумісність" && (
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1 rounded-lg bg-white/5 text-xs font-bold text-white/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
              {activeTab === "Відгуки" && (
                <p className="text-white/40">
                  Середній рейтинг {product.rating} на основі{" "}
                  {product.reviewsCount} відгуків. Залиште відгук після покупки.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                type="button"
                className="flex-1 min-w-[200px] btn-outline py-3 text-xs"
              >
                <MessageSquare className="w-4 h-4" /> Viber
              </button>
              <button
                type="button"
                className="flex-1 min-w-[200px] btn-outline py-3 text-xs"
              >
                <Phone className="w-4 h-4" /> Консультація
              </button>
            </div>
          </motion.div>
        </div>

        {similar.length > 0 && (
          <section className="mt-14 pt-10 border-t border-white/10">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight">
              Схожі <span className="text-agro-yellow">товари</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
