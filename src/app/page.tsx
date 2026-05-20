import type { Metadata } from "next"
import { HomePage } from "@/components/home/HomePage"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, organizationJsonLd } from "@/lib/seo/json-ld"
import { SITE } from "@/lib/seo/site"

export const metadata: Metadata = buildMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
})

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HomePage />
    </>
  )
}
