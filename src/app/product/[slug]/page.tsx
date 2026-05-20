import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailView } from "@/components/product/ProductDetailView"
import { getProductBySlug, getAllProductSlugs } from "@/lib/catalog/repository"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo/json-ld"
import { getVehicle } from "@/lib/catalog/vehicles"
import { getSystem } from "@/lib/catalog/systems"

export const revalidate = 3600

export function generateStaticParams() {
  return getAllProductSlugs().slice(0, 120).map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return buildMetadata({
    title: product.seoTitle ?? `${product.name} | AGROPARTS`,
    description: product.seoDescription ?? product.shortDescription,
    path: `/product/${slug}`,
    image: product.image,
  })
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const vehicle = getVehicle(product.vehicleSlug)
  const system = getSystem(product.systemSlug)

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
          ...(vehicle
            ? [{ name: vehicle.name, path: `/catalog/${vehicle.slug}` }]
            : []),
          ...(vehicle && system
            ? [
                {
                  name: system.name,
                  path: `/catalog/${vehicle.slug}/${system.slug}`,
                },
              ]
            : []),
          { name: product.name, path: `/product/${slug}` },
        ])}
      />
      <ProductDetailView productSlug={slug} />
    </>
  )
}
