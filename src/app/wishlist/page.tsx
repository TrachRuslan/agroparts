import type { Metadata } from "next"
import { PageHero } from "@/components/ui/PageHero"
import { WishlistView } from "@/components/wishlist/WishlistView"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Обране | AGROPARTS",
  description: "Збережені запчастини для тракторів у вашому списку обраного.",
  path: "/wishlist",
  noIndex: true,
})

export default function WishlistPage() {
  return (
    <div className="bg-black">
      <PageHero
        title={
          <>
            Список <span className="text-agro-yellow">обраного</span>
          </>
        }
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Обране" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <WishlistView />
      </section>
    </div>
  )
}
