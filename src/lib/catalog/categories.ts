/**
 * Legacy Category[] shape for backward compatibility.
 * Canonical source: vehicles.ts + systems.ts
 */
import { Category } from "@/types"
import { vehicles } from "./vehicles"
import { getSystemsForVehicle } from "./systems"

export const categories: Category[] = vehicles.map((v) => ({
  id: v.id,
  name: v.name,
  slug: v.slug,
  icon: "Tractor",
  image: v.image,
  description: v.description,
  subcategories: getSystemsForVehicle(v.systems).map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    description: s.description,
  })),
}))

export function getCategoryBySlug(slug: string) {
  const resolved = slug === "umz" ? "yumz" : slug
  return categories.find((c) => c.slug === resolved)
}

export function getSubcategory(categorySlug: string, subSlug: string) {
  const cat = getCategoryBySlug(categorySlug)
  return cat?.subcategories?.find((s) => s.slug === subSlug)
}
