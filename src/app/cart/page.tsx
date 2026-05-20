import type { Metadata } from "next"
import { PageHero } from "@/components/ui/PageHero"
import { CartView } from "@/components/cart/CartView"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  title: "Кошик | AGROPARTS",
  description: "Ваш кошик запчастин для тракторів. Оформлення заявки та консультація менеджера.",
  path: "/cart",
  noIndex: true,
})

export default function CartPage() {
  return (
    <div className="bg-black">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Кошик", path: "/cart" },
        ])}
      />
      <PageHero
        title="Кошик"
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Кошик" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <CartView />
      </section>
    </div>
  )
}
