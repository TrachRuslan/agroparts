import type { CatalogFilters, Product, SortOption } from "@/types"

export interface CatalogSubcategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface CatalogCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string
  seoTitle: string
  seoDescription: string
  subcategories: CatalogSubcategory[]
}

export interface CatalogSystem {
  id: string
  slug: string
  name: string
  description: string
  image: string
  seoTitle: string
  seoDescription: string
}

export interface CatalogSnapshot {
  products: Product[]
  categories: CatalogCategory[]
  systems: CatalogSystem[]
}

export function getProductBySlug(snapshot: CatalogSnapshot, slug: string) {
  return snapshot.products.find((product) => product.slug === slug)
}

export function getProductById(snapshot: CatalogSnapshot, id: string) {
  return snapshot.products.find((product) => product.id === id)
}

export function getCategoryBySlug(snapshot: CatalogSnapshot, slug: string) {
  return snapshot.categories.find((category) => category.slug === slug)
}

export function getSystemBySlug(snapshot: CatalogSnapshot, slug: string) {
  return snapshot.systems.find((system) => system.slug === slug)
}

export function getCategoryLabel(
  snapshot: CatalogSnapshot,
  vehicleSlug: string,
  systemSlug?: string
) {
  const category = getCategoryBySlug(snapshot, vehicleSlug)
  if (!category) return "Каталог"
  if (!systemSlug) return category.name
  const system = category.subcategories.find((item) => item.slug === systemSlug)
  return system ? `${category.name} / ${system.name}` : category.name
}

export function getAvailableSystemsForCategory(
  snapshot: CatalogSnapshot,
  vehicleSlug: string
) {
  return getCategoryBySlug(snapshot, vehicleSlug)?.subcategories ?? []
}

export function countProducts(
  snapshot: CatalogSnapshot,
  vehicleSlug?: string,
  systemSlug?: string
) {
  return snapshot.products.filter((product) => {
    if (vehicleSlug && product.vehicleSlug !== vehicleSlug) return false
    if (systemSlug && product.systemSlug !== systemSlug) return false
    return true
  }).length
}

export function filterProducts(snapshot: CatalogSnapshot, filters: CatalogFilters) {
  const query = filters.search?.trim().toLowerCase()

  return snapshot.products.filter((product) => {
    if (filters.vehicleSlug && product.vehicleSlug !== filters.vehicleSlug) {
      return false
    }
    if (filters.systemSlug && product.systemSlug !== filters.systemSlug) {
      return false
    }
    if (
      filters.brand &&
      product.brand.toLowerCase() !== filters.brand.toLowerCase()
    ) {
      return false
    }
    if (
      filters.manufacturer &&
      (product.manufacturer ?? product.brand).toLowerCase() !==
        filters.manufacturer.toLowerCase()
    ) {
      return false
    }
    if (filters.inStockOnly && !product.inStock) return false
    if (filters.priceMin != null && product.price < filters.priceMin) return false
    if (filters.priceMax != null && product.price > filters.priceMax) return false
    if (!query) return true

    return [
      product.name,
      product.slug,
      product.sku,
      product.articleNumber,
      product.brand,
      ...(product.compatibility ?? []),
    ].some((value) => value.toLowerCase().includes(query))
  })
}

export function sortProducts(products: Product[], sortBy: SortOption) {
  const result = [...products]

  switch (sortBy) {
    case "price-asc":
      return result.sort((left, right) => left.price - right.price)
    case "price-desc":
      return result.sort((left, right) => right.price - left.price)
    case "rating":
      return result.sort((left, right) => right.rating - left.rating)
    case "newest":
      return result.sort((left, right) => Number(right.isNew) - Number(left.isNew))
    default:
      return result.sort(
        (left, right) =>
          Number(right.isBestSeller || right.isPopular) -
          Number(left.isBestSeller || left.isPopular)
      )
  }
}

export function getTrendingProducts(snapshot: CatalogSnapshot, limit = 6) {
  return snapshot.products
    .filter((product) => product.isBestSeller || product.isPopular || product.isNew)
    .slice(0, limit)
}

export function getBrands(snapshot: CatalogSnapshot) {
  return [...new Set(snapshot.products.map((product) => product.brand))].sort()
}

export function getSimilarProducts(
  snapshot: CatalogSnapshot,
  product: Product,
  limit = 4
) {
  return snapshot.products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.vehicleSlug === product.vehicleSlug ||
          item.systemSlug === product.systemSlug)
    )
    .slice(0, limit)
}

function matchesQuery(value: string, query: string) {
  const words = query.split(/\s+/).filter(Boolean)
  const normalized = value.toLowerCase()

  return words.every((word) => normalized.includes(word))
}

export function searchCatalog(snapshot: CatalogSnapshot, query: string, limit = 12) {
  const normalized = query.toLowerCase().trim()

  if (!normalized) {
    return { products: [], vehicles: [], systems: [] }
  }

  const products = snapshot.products
    .filter(
      (product) =>
        matchesQuery(product.name, normalized) ||
        matchesQuery(product.slug, normalized) ||
        matchesQuery(product.sku, normalized) ||
        matchesQuery(product.brand, normalized)
    )
    .slice(0, limit)

  const vehicles = snapshot.categories
    .filter(
      (category) =>
        matchesQuery(category.name, normalized) ||
        matchesQuery(category.slug, normalized)
    )
    .slice(0, 5)

  const systems = snapshot.systems
    .filter(
      (system) =>
        matchesQuery(system.name, normalized) ||
        matchesQuery(system.slug, normalized)
    )
    .slice(0, 5)

  return { products, vehicles, systems }
}

export function getProductPath(product: Product) {
  return `/product/${product.slug}`
}

export function getNestedProductPath(product: Product) {
  return `/catalog/${product.vehicleSlug}/${product.systemSlug}/${product.slug}`
}
