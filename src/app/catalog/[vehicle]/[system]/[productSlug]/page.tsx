import { notFound, redirect } from "next/navigation"
import { getProductBySlug } from "@/lib/catalog/core"
import { getCatalogSnapshot } from "@/lib/catalog/data"

type Props = {
  params: Promise<{ vehicle: string; system: string; productSlug: string }>
}

export default async function NestedProductPage({ params }: Props) {
  const catalog = await getCatalogSnapshot()
  const { vehicle, system, productSlug } = await params
  const product = getProductBySlug(catalog, productSlug)

  if (!product) notFound()
  if (product.vehicleSlug !== vehicle || product.systemSlug !== system) notFound()

  redirect(`/product/${product.slug}`)
}
