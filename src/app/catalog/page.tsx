import { Metadata } from "next"
import { CatalogHub } from "@/components/catalog/CatalogHub"
import { CatalogSearchResults } from "@/components/catalog/CatalogSearchResults"
import { CatalogSeoSection } from "@/components/catalog/CatalogSeoSection"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo/json-ld"
import { CATALOG_FAQ } from "@/lib/seo/catalog-content"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Каталог запчастин для тракторів — AGROPARTS",
  description:
    "Каталог запчастин МТЗ, ЮМЗ, Т-40, Belarus та іншої агротехніки. Модель → вузол → товар. Доставка по Україні.",
  path: "/catalog",
})

type PageProps = { searchParams: Promise<{ q?: string }> }

export default async function CatalogPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = q?.trim()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
        ])}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={faqJsonLd([...CATALOG_FAQ])} />
      {query ? (
        <CatalogSearchResults query={query} />
      ) : (
        <>
          <CatalogHub />
          <CatalogSeoSection />
        </>
      )}
    </>
  )
}
