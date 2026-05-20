"use client"

import { SystemCatalog } from "@/components/catalog/CatalogView"
import { PageHero } from "@/components/ui/PageHero"

export function CatalogSearchResults({ query }: { query: string }) {
  return (
    <>
      <PageHero
        title={
          <>
            Результати: <span className="text-agro-yellow">{query}</span>
          </>
        }
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Каталог", href: "/catalog" },
          { label: "Пошук" },
        ]}
      />
      <SystemCatalog initialSearch={query} />
    </>
  )
}
