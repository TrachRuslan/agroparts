import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailView } from "@/components/product/ProductDetailView"
import {
  getCategoryBySlug,
  getProductBySlug,
  getSystemBySlug,
} from "@/lib/catalog/core"
import {
  getCatalogSnapshot,
  getFallbackCatalogSnapshot,
} from "@/lib/catalog/data"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

export function generateStaticParams() {
  return getFallbackCatalogSnapshot()
    .products.slice(0, 120)
    .map((product) => ({ slug: product.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const catalog = await getCatalogSnapshot()
  const { slug } = await params
  const product = getProductBySlug(catalog, slug)
  if (!product) return {}

  return buildMetadata({
    title: product.seoTitle ?? `${product.name} | AGROPARTS`,
    description: product.seoDescription ?? product.shortDescription,
    path: `/product/${slug}`,
    image: product.image,
  })
}

export default async function ProductPage({ params }: Props) {
  const catalog = await getCatalogSnapshot()
  const { slug } = await params
  const product = getProductBySlug(catalog, slug)
  if (!product) notFound()

  const vehicle = getCategoryBySlug(catalog, product.vehicleSlug)
  const system = getSystemBySlug(catalog, product.systemSlug)

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
            ? [{ name: system.name, path: `/catalog/${vehicle.slug}/${system.slug}` }]
            : []),
          { name: product.name, path: `/product/${slug}` },
        ])}
      />
      <ProductDetailView productSlug={slug} />
    </>
  )
}
