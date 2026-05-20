/** @deprecated Use VehicleCategory from lib/catalog/vehicles */
export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  image?: string
  description?: string
  subcategories?: SubCategory[]
}

export interface SubCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Product {
  id: string
  slug: string
  sku: string
  articleNumber: string
  brand: string
  manufacturer?: string
  name: string
  description: string
  shortDescription: string
  price: number
  oldPrice?: number
  image: string
  gallery: string[]
  /** Vehicle slug (MTZ, yumz, etc.) */
  vehicleSlug: string
  /** System slug (engine, hydraulics, etc.) */
  systemSlug: string
  /** @deprecated use vehicleSlug */
  category: string
  /** @deprecated use systemSlug */
  subcategory: string
  tractorModel: string[]
  inStock: boolean
  rating: number
  reviewsCount: number
  specifications: Record<string, string>
  compatibility: string[]
  isPopular?: boolean
  isBestSeller?: boolean
  isNew?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface Review {
  id: string
  userName: string
  userAvatar?: string
  userRole: string
  content: string
  rating: number
  date: string
  productId?: string
}

export interface Advantage {
  id: string
  title: string
  description: string
  icon: string
}

export interface CatalogFilters {
  search?: string
  vehicleSlug?: string | null
  systemSlug?: string | null
  brand?: string | null
  manufacturer?: string | null
  inStockOnly?: boolean
  priceMin?: number
  priceMax?: number
}

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
