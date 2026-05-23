import type { MetadataRoute } from "next"
import { getCatalogSnapshot } from "@/lib/catalog/data"
import { absoluteUrl } from "@/lib/seo/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalogSnapshot()

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/catalog"), changeFrequency: "daily", priority: 0.95 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contacts"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/delivery"), changeFrequency: "monthly", priority: 0.65 },
  ]

  const vehiclePages = catalog.categories.map((category) => ({
    url: absoluteUrl(`/catalog/${category.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  const systemPages = catalog.categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      url: absoluteUrl(`/catalog/${category.slug}/${subcategory.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  )

  const productPages = catalog.products.map((product) => ({
    url: absoluteUrl(`/product/${product.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...vehiclePages, ...systemPages, ...productPages]
}
