import { Product, CatalogFilters, SortOption } from "@/types"
import { products } from "./products"
import { vehicles, getVehicle, resolveVehicleSlug } from "./vehicles"
import { systems, getSystem, getSystemsForVehicle } from "./systems"

export { products, vehicles, systems, getVehicle, getSystem, getSystemsForVehicle, resolveVehicleSlug }

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug)
}

export function getAllVehicleSlugs(): string[] {
  return vehicles.map((v) => v.slug)
}

export function filterProducts(filters: CatalogFilters): Product[] {
  let result = [...products]
  const vehicle = filters.vehicleSlug
    ? resolveVehicleSlug(filters.vehicleSlug)
    : null

  if (vehicle) {
    result = result.filter((p) => p.vehicleSlug === vehicle)
  }
  if (filters.systemSlug) {
    result = result.filter((p) => p.systemSlug === filters.systemSlug)
  }
  if (filters.brand) {
    result = result.filter(
      (p) => p.brand.toLowerCase() === filters.brand!.toLowerCase()
    )
  }
  if (filters.manufacturer) {
    result = result.filter(
      (p) =>
        (p.manufacturer ?? p.brand).toLowerCase() ===
        filters.manufacturer!.toLowerCase()
    )
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock)
  }
  if (filters.priceMin != null) {
    result = result.filter((p) => p.price >= filters.priceMin!)
  }
  if (filters.priceMax != null) {
    result = result.filter((p) => p.price <= filters.priceMax!)
  }
  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.articleNumber.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }
  return result
}

export function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const result = [...items]
  switch (sortBy) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price)
    case "price-desc":
      return result.sort((a, b) => b.price - a.price)
    case "rating":
      return result.sort((a, b) => b.rating - a.rating)
    case "newest":
      return result.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    default:
      return result.sort(
        (a, b) =>
          Number(b.isBestSeller || b.isPopular) -
          Number(a.isBestSeller || a.isPopular)
      )
  }
}

export function countProducts(vehicleSlug?: string, systemSlug?: string): number {
  return products.filter((p) => {
    if (vehicleSlug && p.vehicleSlug !== resolveVehicleSlug(vehicleSlug))
      return false
    if (systemSlug && p.systemSlug !== systemSlug) return false
    return true
  }).length
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.vehicleSlug === product.vehicleSlug ||
          p.systemSlug === product.systemSlug)
    )
    .slice(0, limit)
}

export function getBrands(): string[] {
  return [...new Set(products.map((p) => p.brand))].sort()
}

export function getTrendingProducts(limit = 6): Product[] {
  return products
    .filter((p) => p.isBestSeller || p.isPopular || p.isNew)
    .slice(0, limit)
}

function matchesQuery(text: string, q: string): boolean {
  const words = q.split(/\s+/).filter(Boolean)
  const hay = text.toLowerCase()
  return words.every((w) => hay.includes(w))
}

export function searchCatalog(query: string, limit = 12) {
  const q = query.toLowerCase().trim()
  if (!q) return { products: [], vehicles: [], systems: [] }

  const matchedProducts = products
    .filter(
      (p) =>
        matchesQuery(p.name, q) ||
        matchesQuery(p.slug, q) ||
        matchesQuery(p.sku, q) ||
        (p.brand && matchesQuery(p.brand, q))
    )
    .slice(0, limit)

  const matchedVehicles = vehicles
    .filter(
      (v) =>
        matchesQuery(v.name, q) || matchesQuery(v.slug, q)
    )
    .slice(0, 5)

  const matchedSystems = systems
    .filter(
      (s) =>
        matchesQuery(s.name, q) || matchesQuery(s.slug, q)
    )
    .slice(0, 5)

  return {
    products: matchedProducts,
    vehicles: matchedVehicles,
    systems: matchedSystems,
  }
}

export function getProductPath(product: Product) {
  return `/product/${product.slug}`
}

export function getNestedProductPath(product: Product) {
  return `/catalog/${product.vehicleSlug}/${product.systemSlug}/${product.slug}`
}
