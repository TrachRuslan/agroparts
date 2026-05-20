"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, Eye, GitCompare } from "lucide-react"
import { Product } from "@/types"
import { formatPrice, cn } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { useCompareStore } from "@/stores/compare-store"

interface ProductCardProps {
  product: Product
  view?: "grid" | "list"
}

export const ProductCard = ({ product, view = "grid" }: ProductCardProps) => {
  const isList = view === "list"
  const addToCart = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const toggleCompare = useCompareStore((s) => s.toggle)
  const isWishlisted = useWishlistStore((s) => s.has(product.slug))
  const productHref = `/product/${product.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "glass-card group overflow-hidden relative flex h-full",
        "hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.9)] hover:border-agro-yellow/25",
        isList ? "flex-row gap-0" : "flex-col"
      )}
    >
      {/* Badges */}
      <motion.div
        className={cn(
          "absolute z-20 flex flex-col gap-1.5",
          isList ? "top-4 left-4" : "top-4 left-4"
        )}
      >
        {product.isNew && (
          <span className="bg-agro-green text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-agro-green/25">
            Новинка
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-agro-yellow text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-agro-yellow/25">
            Хіт
          </span>
        )}
      </motion.div>

      {/* Wishlist */}
      <motion.div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <button
          type="button"
          aria-label="Додати в обране"
          onClick={() => toggleWishlist(product.slug)}
          className={cn(
            "w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border flex items-center justify-center transition-colors",
            isWishlisted
              ? "border-red-400/50 text-red-400"
              : "border-white/10 text-white/50 hover:text-red-400"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>
        <button
          type="button"
          aria-label="Порівняти"
          onClick={() => toggleCompare(product.slug)}
          className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-agro-yellow hover:border-agro-yellow/30"
        >
          <GitCompare className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Image */}
      <motion.div
        className={cn(
          "relative overflow-hidden shrink-0 bg-gradient-to-b from-[#1c1c1c] to-[#111111]",
          isList
            ? "w-full sm:w-52 md:w-56 h-48 sm:h-auto sm:min-h-[200px] rounded-l-3xl"
            : "aspect-[4/3] w-full"
        )}
      >
        <motion.div
          className="product-image-glow"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-[1] pointer-events-none" />

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={isList ? "(max-width: 640px) 100vw, 224px" : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"}
          className="object-contain p-4 sm:p-5 transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover actions */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center gap-3",
            "bg-black/50 opacity-0 backdrop-blur-[3px]",
            "group-hover:opacity-100 transition-all duration-400"
          )}
        >
          <Link
            href={productHref}
            className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center hover:bg-agro-yellow transition-all duration-300 hover:scale-105 shadow-xl"
            aria-label="Переглянути"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            type="button"
            className="w-12 h-12 rounded-xl bg-agro-yellow text-black flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-105 shadow-xl shadow-agro-yellow/30"
            aria-label="У кошик"
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={cn(
          "flex flex-col flex-grow min-w-0",
          "bg-gradient-to-b from-transparent to-white/[0.02]",
          isList ? "p-5 sm:p-6 justify-center" : "p-5 sm:p-6"
        )}
      >
        <div className="flex items-center gap-0.5 mb-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3",
                i < Math.floor(product.rating)
                  ? "text-agro-yellow fill-agro-yellow"
                  : "text-white/10"
              )}
            />
          ))}
          <span className="text-[11px] text-white/35 ml-1.5 font-medium tabular-nums">
            {product.rating} · {product.reviewsCount}
          </span>
        </div>

        <p className="text-[10px] text-white/25 font-mono mb-1.5 tracking-wide">
          {product.sku}
        </p>
        <Link
          href={productHref}
          className="group/title block mb-2"
        >
          <h3
            className={cn(
              "font-bold text-white tracking-tight leading-snug group-hover/title:text-agro-yellow transition-colors",
              isList ? "text-base line-clamp-2" : "text-[15px] sm:text-base line-clamp-2"
            )}
          >
            {product.name}
          </h3>
        </Link>

        <p
          className={cn(
            "text-white/40 text-sm leading-relaxed mb-4",
            isList ? "line-clamp-2" : "line-clamp-2 min-h-[2.5rem]"
          )}
        >
          {product.shortDescription}
        </p>

        <motion.div className="flex flex-wrap gap-1.5 mb-4">
          {product.tractorModel.slice(0, isList ? 3 : 2).map((model) => (
            <span
              key={model}
              className="text-[10px] font-bold bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-md text-white/45 uppercase tracking-wide"
            >
              {model}
            </span>
          ))}
        </motion.div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1 border-t border-white/[0.06]">
          <div className="flex flex-col min-w-0">
            {product.oldPrice && (
              <span className="text-white/25 line-through text-xs mb-0.5 tabular-nums">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          <motion.div className="flex items-center gap-1.5 shrink-0">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                product.inStock ? "bg-agro-green animate-pulse" : "bg-red-500"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                product.inStock ? "text-agro-green" : "text-red-400"
              )}
            >
              {product.inStock ? "В наявності" : "Немає"}
            </span>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="mt-4 w-full py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-agro-yellow hover:text-black hover:border-agro-yellow transition-all md:hidden disabled:opacity-40"
        >
          У кошик
        </button>
      </motion.div>
    </motion.div>
  )
}
