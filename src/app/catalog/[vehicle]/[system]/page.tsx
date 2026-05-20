import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SystemCatalog } from "@/components/catalog/CatalogView"
import { getVehicle, resolveVehicleSlug } from "@/lib/catalog/vehicles"
import { getSystem } from "@/lib/catalog/systems"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

type Props = { params: Promise<{ vehicle: string; system: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vehicle: v, system: s } = await params
  const vehicle = getVehicle(resolveVehicleSlug(v))
  const system = getSystem(s)
  if (!vehicle || !system) return {}
  return buildMetadata({
    title: `Запчастини ${system.name} для ${vehicle.name} | AGROPARTS`,
    description: `Купити ${system.name.toLowerCase()} для ${vehicle.name}. Каталог, ціни, наявність.`,
    path: `/catalog/${vehicle.slug}/${system.slug}`,
  })
}

export default async function SystemPage({ params }: Props) {
  const { vehicle: v, system: s } = await params
  const vehicleSlug = resolveVehicleSlug(v)
  const vehicle = getVehicle(vehicleSlug)
  const system = getSystem(s)
  if (!vehicle || !system) notFound()
  if (!vehicle.systems.includes(s)) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: vehicle.name, path: `/catalog/${vehicleSlug}` },
          {
            name: system.name,
            path: `/catalog/${vehicleSlug}/${s}`,
          },
        ])}
      />
      <SystemCatalog vehicleSlug={vehicleSlug} systemSlug={s} />
    </>
  )
}
