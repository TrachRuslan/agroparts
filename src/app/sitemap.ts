import type { MetadataRoute } from "next"
import { vehicles, products } from "@/lib/catalog/repository"
import { getSystemsForVehicle } from "@/lib/catalog/systems"
import { absoluteUrl } from "@/lib/seo/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/catalog"), changeFrequency: "daily", priority: 0.95 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contacts"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/delivery"), changeFrequency: "monthly", priority: 0.65 },
  ]

  const vehiclePages = vehicles.map((v) => ({
    url: absoluteUrl(`/catalog/${v.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  const systemPages = vehicles.flatMap((v) =>
    getSystemsForVehicle(v.systems).map((s) => ({
      url: absoluteUrl(`/catalog/${v.slug}/${s.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  )

  const productPages = products.map((p) => ({
    url: absoluteUrl(`/product/${p.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...vehiclePages, ...systemPages, ...productPages]
}
