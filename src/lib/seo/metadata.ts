import type { Metadata } from "next"
import { absoluteUrl, SITE } from "./site"

type MetaInput = {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: MetaInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage =
    image ??
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=630&fit=crop"

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}
