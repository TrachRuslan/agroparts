"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Layers, Package, Tractor } from "lucide-react"
import { useCatalog } from "@/components/catalog/CatalogProvider"
import { ProductCard } from "@/components/catalog/ProductCard"
import { countProducts, getTrendingProducts } from "@/lib/catalog/core"

export function CatalogHub() {
  const catalog = useCatalog()
  const popular = getTrendingProducts(catalog, 8)

  return (
    <motion.div className="bg-black">
      <section className="relative pt-6 pb-10 px-4 md:px-8 catalog-mesh border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">
            <Link href="/" className="hover:text-agro-yellow">
              Головна
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-agro-yellow">Каталог</span>
          </nav>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
            Каталог{" "}
            <span className="premium-gradient-text italic">запчастин</span>
          </h1>
          <p className="text-white/50 max-w-2xl text-base md:text-lg mb-8">
            Модель техніки → вузол → товар. Понад {catalog.products.length} позицій для тракторів та агротехніки.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Package, label: "Товарів", value: catalog.products.length },
              { icon: Tractor, label: "Моделей техніки", value: catalog.categories.length },
              { icon: Layers, label: "Систем / вузлів", value: catalog.systems.length },
            ].map((stat) => (
              <div key={stat.label} className="glass-card px-4 py-3 flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-agro-yellow" />
                <div>
                  <div className="text-lg font-black text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">
          Моделі техніки
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalog.categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <Link
                href={`/catalog/${category.slug}`}
                className="group block glass-card overflow-hidden hover:border-agro-yellow/40 hover:shadow-[0_20px_60px_-20px_rgba(255,184,0,0.2)] transition-all duration-500"
              >
                <div className="relative h-40 bg-[#121212]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    sizes="400px"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase bg-agro-yellow text-black px-2 py-0.5 rounded">
                    {countProducts(catalog, category.slug)} товарів
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-white group-hover:text-agro-yellow transition-colors uppercase">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/40 mt-2 line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-[11px] text-white/30 mt-3 font-bold uppercase tracking-wider">
                    {category.subcategories.length} систем →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {popular.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t border-white/[0.06]">
          <h2 className="text-2xl font-black text-white mb-6 uppercase">
            Популярні <span className="text-agro-yellow">товари</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popular.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  )
}
