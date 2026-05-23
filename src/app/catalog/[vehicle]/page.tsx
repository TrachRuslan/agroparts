import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VehicleCatalog } from "@/components/catalog/VehicleCatalog"
import { getCategoryBySlug } from "@/lib/catalog/core"
import { getCatalogSnapshot } from "@/lib/catalog/data"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

export async function generateStaticParams() {
  const catalog = await getCatalogSnapshot()
  return catalog.categories.map((category) => ({ vehicle: category.slug }))
}

type Props = { params: Promise<{ vehicle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const catalog = await getCatalogSnapshot()
  const { vehicle } = await params
  const category = getCategoryBySlug(catalog, vehicle)
  if (!category) return {}

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/catalog/${category.slug}`,
    image: category.image,
  })
}

export default async function VehiclePage({ params }: Props) {
  const catalog = await getCatalogSnapshot()
  const { vehicle } = await params
  const category = getCategoryBySlug(catalog, vehicle)

  if (!category) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: category.name, path: `/catalog/${category.slug}` },
        ])}
      />
      <VehicleCatalog vehicleSlug={category.slug} />
    </>
  )
}
