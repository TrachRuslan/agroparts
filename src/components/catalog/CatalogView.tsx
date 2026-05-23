"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  Package,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { useCatalog } from "@/components/catalog/CatalogProvider"
import { ProductCard } from "@/components/catalog/ProductCard"
import {
  countProducts,
  filterProducts,
  getCategoryBySlug,
  getCategoryLabel,
  sortProducts,
} from "@/lib/catalog/core"
import type { SortOption } from "@/types"
import { cn } from "@/lib/utils"

interface CatalogViewProps {
  vehicleSlug?: string
  systemSlug?: string
  categorySlug?: string
  subcategorySlug?: string
  showCategoryHub?: boolean
  initialSearch?: string
}

export function SystemCatalog({
  vehicleSlug: vehicleProp,
  systemSlug: systemProp,
  categorySlug,
  subcategorySlug,
  showCategoryHub = false,
  initialSearch = "",
}: CatalogViewProps) {
  const catalog = useCatalog()
  const vehicleSlug = vehicleProp ?? categorySlug
  const systemSlug = systemProp ?? subcategorySlug
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    vehicleSlug ?? null
  )

  const currentCategory = vehicleSlug
    ? getCategoryBySlug(catalog, vehicleSlug)
    : null

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(catalog, {
      vehicleSlug: vehicleSlug ?? null,
      systemSlug: systemSlug ?? null,
      search: searchQuery,
    })
    return sortProducts(filtered, sortBy)
  }, [catalog, searchQuery, sortBy, systemSlug, vehicleSlug])

  const title = getCategoryLabel(catalog, vehicleSlug ?? "", systemSlug ?? undefined)

  return (
    <div className="bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-4 pb-10 md:pb-12 px-4 md:px-8 overflow-hidden catalog-mesh border-b border-white/[0.06]"
      >
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-agro-yellow/8 blur-[100px] rounded-full pointer-events-none"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">
            <Link href="/" className="hover:text-agro-yellow transition-colors">
              Головна
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/catalog"
              className={cn(
                "transition-colors",
                !vehicleSlug ? "text-agro-yellow" : "hover:text-white"
              )}
            >
              Каталог
            </Link>
            {vehicleSlug && currentCategory && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link
                  href={`/catalog/${vehicleSlug}`}
                  className={cn(
                    "transition-colors",
                    !systemSlug ? "text-agro-yellow" : "hover:text-white"
                  )}
                >
                  {currentCategory.name}
                </Link>
              </>
            )}
            {systemSlug && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/50">
                  {currentCategory?.subcategories.find((item) => item.slug === systemSlug)?.name}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter leading-tight">
                {vehicleSlug ? (
                  <>
                    {currentCategory?.name}{" "}
                    <span className="premium-gradient-text italic text-2xl sm:text-3xl md:text-4xl block sm:inline">
                      {systemSlug
                        ? currentCategory?.subcategories.find(
                            (item) => item.slug === systemSlug
                          )?.name
                        : "каталог"}
                    </span>
                  </>
                ) : (
                  <>
                    КАТАЛОГ{" "}
                    <span className="premium-gradient-text italic">ЗАПЧАСТИН</span>
                  </>
                )}
              </h1>
              <p className="text-white/45 max-w-xl text-sm md:text-base leading-relaxed">
                {currentCategory?.description ||
                  "Оберіть техніку та систему, щоб швидко знайти потрібну позицію."}
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { label: "Товарів", value: String(filteredProducts.length) },
                { label: "Категорій", value: String(catalog.categories.length) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card px-4 py-2 border-white/[0.08]"
                >
                  <div className="text-base font-black text-agro-yellow tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/35 uppercase font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {showCategoryHub && !vehicleSlug && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-5">
            Категорії каталогу
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {catalog.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className="group block glass-card overflow-hidden hover:border-agro-yellow/30 transition-all h-full"
                >
                  <div className="relative h-28 overflow-hidden bg-[#141414]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-black text-agro-yellow bg-black/50 px-2 py-0.5 rounded-md tabular-nums">
                      {countProducts(catalog, category.slug)} товарів
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-white text-sm group-hover:text-agro-yellow transition-colors uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <p className="text-[10px] text-white/35 mt-1 line-clamp-1">
                      {category.subcategories.length} підкатегорій
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {vehicleSlug && currentCategory && currentCategory.subcategories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 border-b border-white/[0.06]">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <Link
              href={`/catalog/${vehicleSlug}`}
              className={cn(
                "shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all",
                !systemSlug
                  ? "bg-agro-yellow text-black"
                  : "bg-white/5 text-white/50 hover:text-white"
              )}
            >
              Усі ({countProducts(catalog, vehicleSlug)})
            </Link>
            {currentCategory.subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                href={`/catalog/${vehicleSlug}/${subcategory.slug}`}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all",
                  systemSlug === subcategory.slug
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/50 hover:text-white"
                )}
              >
                {subcategory.name} ({countProducts(catalog, vehicleSlug, subcategory.slug)})
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="filter-panel !p-0 overflow-hidden">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    placeholder="Пошук, артикул, SKU..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full bg-transparent py-3 pl-11 pr-4 text-white text-sm focus:outline-none placeholder:text-white/25"
                  />
                </div>
              </div>

              <div className="filter-panel max-h-[50vh] overflow-y-auto hidden lg:block">
                <h3 className="text-white font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
                  <Filter className="w-3.5 h-3.5 text-agro-yellow" />
                  Категорії
                </h3>
                <div className="space-y-0.5">
                  <Link
                    href="/catalog"
                    className={cn(
                      "block px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all",
                      !vehicleSlug
                        ? "bg-agro-yellow text-black"
                        : "text-white/45 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    Всі товари
                  </Link>
                  {catalog.categories.map((category) => {
                    const isOpen = expandedCategory === category.slug
                    const isActive = vehicleSlug === category.slug
                    return (
                      <div key={category.id}>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/catalog/${category.slug}`}
                            className={cn(
                              "flex-1 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all",
                              isActive
                                ? "bg-white text-black"
                                : "text-white/45 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {category.name}
                            <span className="ml-1 opacity-50 tabular-nums">
                              ({countProducts(catalog, category.slug)})
                            </span>
                          </Link>
                          {category.subcategories.length > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedCategory(isOpen ? null : category.slug)
                              }
                              className="p-2 text-white/30 hover:text-white"
                              aria-label="Розгорнути"
                            >
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  isOpen && "rotate-180"
                                )}
                              />
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {isOpen && category.subcategories.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory.id}
                                  href={`/catalog/${category.slug}/${subcategory.slug}`}
                                  className={cn(
                                    "block px-3 py-2 text-[11px] font-medium rounded-lg transition-colors",
                                    vehicleSlug === category.slug &&
                                      systemSlug === subcategory.slug
                                      ? "text-agro-yellow"
                                      : "text-white/35 hover:text-white"
                                  )}
                                >
                                  {subcategory.name} ({countProducts(catalog, category.slug, subcategory.slug)})
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-3 px-3 py-3 rounded-xl border border-agro-green/20 bg-agro-green/5">
                <Package className="w-4 h-4 text-agro-green shrink-0" />
                <p className="text-xs text-white/50">
                  <span className="text-agro-green font-bold">Live</span> каталог з реальними товарами
                </p>
              </div>
            </div>
          </aside>

          <main className="flex-grow min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div>
                <p className="text-white/30 text-sm">
                  <span className="text-white font-bold tabular-nums">
                    {filteredProducts.length}
                  </span>{" "}
                  {title}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/70"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Фільтри
                </button>
                <div className="flex bg-white/[0.04] border border-white/10 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewType("grid")}
                    className={cn(
                      "p-2 rounded-md transition-all",
                      viewType === "grid" ? "bg-white text-black" : "text-white/40"
                    )}
                    aria-label="Сітка"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewType("list")}
                    className={cn(
                      "p-2 rounded-md transition-all",
                      viewType === "list" ? "bg-white text-black" : "text-white/40"
                    )}
                    aria-label="Список"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                  className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm font-bold text-white outline-none focus:border-agro-yellow/40 cursor-pointer"
                >
                  <option value="popular" className="bg-black">
                    Популярні
                  </option>
                  <option value="price-asc" className="bg-black">
                    Дешевші
                  </option>
                  <option value="price-desc" className="bg-black">
                    Дорожчі
                  </option>
                  <option value="rating" className="bg-black">
                    Рейтинг
                  </option>
                  <option value="newest" className="bg-black">
                    Новинки
                  </option>
                </select>
              </div>
            </div>

            <AnimatePresence>
              {mobileFiltersOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/70 lg:hidden"
                    onClick={() => setMobileFiltersOpen(false)}
                  />
                  <motion.aside
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    className="fixed left-0 top-0 bottom-0 z-50 w-[min(100%,320px)] bg-[#0a0a0a] border-r border-white/10 p-5 overflow-y-auto lg:hidden"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-black uppercase tracking-widest text-white">
                        Фільтри
                      </span>
                      <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="text-white/50 text-sm font-bold"
                      >
                        Закрити
                      </button>
                    </div>
                    <div className="space-y-3">
                      {catalog.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/catalog/${category.slug}`}
                          onClick={() => setMobileFiltersOpen(false)}
                          className="block rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/70"
                        >
                          {category.name} ({countProducts(catalog, category.slug)})
                        </Link>
                      ))}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            <motion.div
              layout
              className={cn(
                "grid gap-4 sm:gap-5",
                viewType === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.2) }}
                  >
                    <ProductCard product={product} view={viewType} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center glass-card border-dashed">
                  <Search className="w-12 h-12 text-white/15 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Нічого не знайдено
                  </h3>
                  <Link
                    href="/catalog"
                    className="text-sm font-bold text-agro-yellow uppercase tracking-wider"
                  >
                    Скинути фільтри
                  </Link>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

export const CatalogView = SystemCatalog
