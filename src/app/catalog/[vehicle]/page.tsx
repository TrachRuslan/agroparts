import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { VehicleCatalog } from "@/components/catalog/VehicleCatalog"
import { getVehicle, resolveVehicleSlug } from "@/lib/catalog/vehicles"
import { vehicles } from "@/lib/catalog/repository"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

export function generateStaticParams() {
  return vehicles.map((v) => ({ vehicle: v.slug }))
}

type Props = { params: Promise<{ vehicle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vehicle: raw } = await params
  const vehicle = getVehicle(resolveVehicleSlug(raw))
  if (!vehicle) return {}
  return buildMetadata({
    title: vehicle.seoTitle,
    description: vehicle.seoDescription,
    path: `/catalog/${vehicle.slug}`,
    image: vehicle.image,
  })
}

export default async function VehiclePage({ params }: Props) {
  const { vehicle: raw } = await params
  const slug = resolveVehicleSlug(raw)
  const vehicle = getVehicle(slug)
  if (!vehicle) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: vehicle.name, path: `/catalog/${slug}` },
        ])}
      />
      <VehicleCatalog vehicleSlug={slug} />
    </>
  )
}
