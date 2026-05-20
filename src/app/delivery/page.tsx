import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/ui/PageHero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"
import { DELIVERY_BLOCKS, PAYMENT_METHODS } from "@/lib/site-content"

export const metadata: Metadata = buildMetadata({
  title: "Доставка та оплата | AGROPARTS",
  description:
    "Умови доставки запчастин для тракторів по Україні: Нова Пошта, Укрпошта, самовивіз. Способи оплати для юридичних та фізичних осіб.",
  path: "/delivery",
})

export default function DeliveryPage() {
  return (
    <div className="bg-black">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Доставка", path: "/delivery" },
        ])}
      />
      <PageHero
        title={
          <>
            Доставка та <span className="text-agro-yellow">оплата</span>
          </>
        }
        description="Прозорі умови для фермерів, СТО та оптових клієнтів. Мінімізуємо простій техніки в сезон."
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Доставка" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-16">
        <div>
          <SectionHeader eyebrow="Логістика" title="Способи доставки" />
          <div className="grid md:grid-cols-3 gap-5">
            {DELIVERY_BLOCKS.map((block) => (
              <div key={block.title} className="glass-card p-6">
                <h3 className="font-bold text-white text-lg mb-2">{block.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{block.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="Розрахунки" title="Оплата" />
          <ul className="grid sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <li
                key={method}
                className="flex items-center gap-3 glass-card px-5 py-4 text-sm text-white/70"
              >
                <span className="w-2 h-2 rounded-full bg-agro-yellow shrink-0" />
                {method}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-8 md:p-10 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-black text-white mb-3">Потрібна термінова відправка?</h3>
          <p className="text-white/45 mb-6 text-sm">
            Зателефонуйте — підтвердимо наявність на складі та відправимо в день замовлення.
          </p>
          <Link href="/contacts" className="btn-primary inline-flex">
            Зв&apos;язатися з менеджером
          </Link>
        </div>
      </section>
    </div>
  )
}
