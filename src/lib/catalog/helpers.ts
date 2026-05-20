import { getVehicle, resolveVehicleSlug } from "./vehicles"
import { getSystem } from "./systems"

export * from "./repository"
export { categories, getCategoryBySlug, getSubcategory } from "./categories"

export function getCategoryLabel(vehicleSlug: string, systemSlug?: string) {
  const v = getVehicle(resolveVehicleSlug(vehicleSlug))
  if (!v) return vehicleSlug
  if (!systemSlug) return v.name
  const s = getSystem(systemSlug)
  return s ? `${v.name} / ${s.name}` : v.name
}
