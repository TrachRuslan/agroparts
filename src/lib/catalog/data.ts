import "server-only"

import { cache } from "react"
import { unstable_noStore as noStore } from "next/cache"
import { prisma } from "@/lib/db/prisma"
import { hasDatabaseUrl } from "@/lib/env"
import { getProductImage } from "@/lib/images"
import { products as staticProducts } from "@/lib/catalog/products"
import { vehicles as staticVehicles } from "@/lib/catalog/vehicles"
import {
  getSystemsForVehicle,
  systems as staticSystems,
} from "@/lib/catalog/systems"
import type { Product } from "@/types"
import type {
  CatalogCategory,
  CatalogSnapshot,
  CatalogSystem,
  CatalogSubcategory,
} from "@/lib/catalog/core"

const staticSystemMap = new Map(staticSystems.map((system) => [system.slug, system]))
const staticVehicleMap = new Map(staticVehicles.map((vehicle) => [vehicle.slug, vehicle]))

function buildStaticSnapshot(): CatalogSnapshot {
  const categories: CatalogCategory[] = staticVehicles.map((vehicle) => ({
    id: vehicle.id,
    slug: vehicle.slug,
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.image,
    seoTitle: vehicle.seoTitle,
    seoDescription: vehicle.seoDescription,
    subcategories: getSystemsForVehicle(vehicle.systems).map((system) => ({
      id: system.id,
      slug: system.slug,
      name: system.name,
      description: system.description,
    })),
  }))

  return {
    products: staticProducts,
    categories,
    systems: staticSystems,
  }
}

export const getFallbackCatalogSnapshot = cache(buildStaticSnapshot)

function buildCategorySubcategories(
  vehicleSlug: string,
  products: Product[],
  systems: CatalogSystem[]
) {
  const systemMap = new Map(systems.map((system) => [system.slug, system]))
  const usedSystems = new Set(
    products
      .filter((product) => product.vehicleSlug === vehicleSlug)
      .map((product) => product.systemSlug)
  )

  const subcategories = [...usedSystems]
    .map((slug) => {
      const system = systemMap.get(slug)
      if (!system) return null

      return {
        id: system.id,
        slug: system.slug,
        name: system.name,
        description: system.description,
      } satisfies CatalogSubcategory
    })
    .filter(Boolean) as CatalogSubcategory[]

  const fallbackVehicle = staticVehicleMap.get(vehicleSlug)
  if (!fallbackVehicle) return subcategories

  const ordered = fallbackVehicle.systems
    .map((slug) => subcategories.find((subcategory) => subcategory.slug === slug))
    .filter((value): value is CatalogSubcategory => Boolean(value))

  const leftovers = subcategories.filter(
    (subcategory) => !ordered.some((item) => item.slug === subcategory.slug)
  )

  return [...ordered, ...leftovers]
}

function mapDbProduct(product: Awaited<ReturnType<typeof loadDbProducts>>[number]): Product {
  const brandName = product.brand?.name ?? product.manufacturer ?? "AGROPARTS"
  const gallery = product.images
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((image) => image.url)
  const primaryImage = gallery[0] ?? getProductImage(product.slug)

  return {
    id: product.id,
    slug: product.slug,
    sku: product.sku,
    articleNumber: product.articleNumber,
    brand: brandName,
    manufacturer: product.manufacturer ?? brandName,
    name: product.name,
    description: product.description,
    shortDescription:
      product.shortDescription || product.description.slice(0, 180),
    price: product.price,
    oldPrice: product.oldPrice ?? undefined,
    image: primaryImage,
    gallery: gallery.length ? gallery : [primaryImage],
    vehicleSlug: product.vehicle?.slug ?? product.vehicleSlug,
    systemSlug: product.system?.slug ?? product.systemSlug,
    category: product.vehicle?.slug ?? product.vehicleSlug,
    subcategory: product.system?.slug ?? product.systemSlug,
    tractorModel: product.compatibilities.map((item) => item.model),
    inStock: product.inStock,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    specifications: Object.fromEntries(
      product.specifications.map((item) => [item.key, item.value])
    ),
    compatibility: product.compatibilities.map((item) => item.model),
    isPopular: product.isPopular,
    isBestSeller: product.isBestSeller,
    isNew: product.isNew,
    seoTitle: product.seoTitle ?? undefined,
    seoDescription: product.seoDescription ?? undefined,
  }
}

async function loadDbProducts() {
  return prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      brand: true,
      vehicle: true,
      system: true,
      images: true,
      specifications: true,
      compatibilities: true,
    },
  })
}

async function loadDbSnapshot(): Promise<CatalogSnapshot | null> {
  if (!hasDatabaseUrl()) return null

  try {
    const [dbProducts, dbCategories, dbSystems] = await Promise.all([
      loadDbProducts(),
      prisma.vehicleCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      }),
      prisma.systemCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      }),
    ])

    if (dbProducts.length === 0 && dbCategories.length === 0) {
      return null
    }

    const systems: CatalogSystem[] =
      dbSystems.length > 0
        ? dbSystems.map((system) => ({
            id: system.id,
            slug: system.slug,
            name: system.name,
            description: system.description ?? "",
            image: system.image ?? staticSystemMap.get(system.slug)?.image ?? "",
            seoTitle: system.seoTitle ?? system.name,
            seoDescription: system.seoDescription ?? system.description ?? "",
          }))
        : staticSystems

    const products = dbProducts.map(mapDbProduct)

    const categories: CatalogCategory[] =
      dbCategories.length > 0
        ? dbCategories.map((category) => ({
            id: category.id,
            slug: category.slug,
            name: category.name,
            description: category.description ?? "",
            image: category.image ?? staticVehicleMap.get(category.slug)?.image ?? "",
            seoTitle: category.seoTitle ?? category.name,
            seoDescription:
              category.seoDescription ?? category.description ?? "",
            subcategories: buildCategorySubcategories(
              category.slug,
              products,
              systems
            ),
          }))
        : getFallbackCatalogSnapshot().categories

    return { products, categories, systems }
  } catch (error) {
    console.error("Failed to load catalog from database", error)
    return null
  }
}

export async function getCatalogSnapshot() {
  noStore()
  return (await loadDbSnapshot()) ?? getFallbackCatalogSnapshot()
}
