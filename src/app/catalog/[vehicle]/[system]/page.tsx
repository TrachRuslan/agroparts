import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SystemCatalog } from "@/components/catalog/CatalogView"
import { getCategoryBySlug, getSystemBySlug } from "@/lib/catalog/core"
import { getCatalogSnapshot } from "@/lib/catalog/data"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

type Props = {
  params: Promise<{ vehicle: string; system: string }>
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const catalog = await getCatalogSnapshot()
  const { vehicle: vehicleSlug, system: systemSlug } = await params
  const vehicle = getCategoryBySlug(catalog, vehicleSlug)
  const system = getSystemBySlug(catalog, systemSlug)

  if (!vehicle || !system) return {}

  return buildMetadata({
    title: `Запчастини ${system.name} для ${vehicle.name} | AGROPARTS`,
    description: `Купити ${system.name.toLowerCase()} для ${vehicle.name}. Каталог, ціни та наявність.`,
    path: `/catalog/${vehicle.slug}/${system.slug}`,
  })
}

export default async function SystemPage({ params, searchParams }: Props) {
  const catalog = await getCatalogSnapshot()
  const { vehicle: vehicleSlug, system: systemSlug } = await params
  const { q } = await searchParams

  const vehicle = getCategoryBySlug(catalog, vehicleSlug)
  const system = getSystemBySlug(catalog, systemSlug)

  if (!vehicle || !system) notFound()
  if (!vehicle.subcategories.some((item) => item.slug === systemSlug)) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: vehicle.name, path: `/catalog/${vehicle.slug}` },
          { name: system.name, path: `/catalog/${vehicle.slug}/${system.slug}` },
        ])}
      />
      <SystemCatalog
        vehicleSlug={vehicle.slug}
        systemSlug={system.slug}
        initialSearch={q?.trim()}
      />
    </>
  )
}
