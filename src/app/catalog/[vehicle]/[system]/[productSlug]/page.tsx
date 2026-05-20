import { redirect, notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/catalog/repository"
import { resolveVehicleSlug } from "@/lib/catalog/vehicles"

type Props = {
  params: Promise<{ vehicle: string; system: string; productSlug: string }>
}

/** Nested SEO URL → canonical product page */
export default async function NestedProductPage({ params }: Props) {
  const { vehicle, system, productSlug } = await params
  const product = getProductBySlug(productSlug)
  if (!product) notFound()
  if (
    product.vehicleSlug !== resolveVehicleSlug(vehicle) ||
    product.systemSlug !== system
  ) {
    notFound()
  }
  redirect(`/product/${product.slug}`)
}
