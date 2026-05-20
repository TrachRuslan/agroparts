import type { Metadata } from "next"
import { PageHero } from "@/components/ui/PageHero"
import { CompareView } from "@/components/compare/CompareView"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Порівняння товарів | AGROPARTS",
  description: "Порівняйте до 4 запчастин за ціною, SKU, брендом та наявністю.",
  path: "/compare",
  noIndex: true,
})

export default function ComparePage() {
  return (
    <div className="bg-black">
      <PageHero
        title={
          <>
            Порівняння <span className="text-agro-yellow">товарів</span>
          </>
        }
        description="До 4 позицій одночасно — оберіть найкращу деталь для вашої техніки."
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Порівняння" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <CompareView />
      </section>
    </div>
  )
}
