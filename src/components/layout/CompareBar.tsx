"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GitCompare, X } from "lucide-react"
import { useCatalog } from "@/components/catalog/CatalogProvider"
import { useHydrated } from "@/hooks/useHydrated"
import { useCompareStore } from "@/stores/compare-store"
import { getProductBySlug } from "@/lib/catalog/core"

export function CompareBar() {
  const catalog = useCatalog()
  const hydrated = useHydrated()
  const slugs = useCompareStore((s) => s.slugs)
  const remove = useCompareStore((s) => s.remove)
  const products = useMemo(
    () =>
      slugs
        .map((slug) => ({
          slug,
          product: getProductBySlug(catalog, slug),
        }))
        .filter(
          (
            item
          ): item is {
            slug: string
            product: NonNullable<ReturnType<typeof getProductBySlug>>
          } => Boolean(item.product)
        ),
    [catalog, slugs]
  )

  if (!hydrated || slugs.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-16 lg:bottom-6 left-4 right-4 z-40 max-w-3xl mx-auto"
      >
        <div className="glass-card border border-agro-yellow/25 shadow-[0_20px_60px_-15px_rgba(255,184,0,0.35)] px-4 py-3 flex items-center gap-3">
          <GitCompare className="w-5 h-5 text-agro-yellow shrink-0" />
          <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-thin">
            {products.map(({ slug, product }) => {
              return (
                <div
                  key={slug}
                  className="flex items-center gap-2 shrink-0 bg-white/5 rounded-xl pr-2 border border-white/10"
                >
                  <div className="relative w-10 h-10 rounded-l-xl overflow-hidden bg-[#141414]">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white max-w-[100px] truncate">
                    {product.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(slug)}
                    className="p-1 text-white/40 hover:text-white"
                    aria-label="Прибрати"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
          <Link
            href="/compare"
            className="shrink-0 btn-primary !py-2.5 !px-5 !text-xs !rounded-xl"
          >
            Порівняти ({slugs.length})
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
