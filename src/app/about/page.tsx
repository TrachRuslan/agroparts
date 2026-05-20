import type { Metadata } from "next"
import { Shield, Truck, Users, Award } from "lucide-react"
import { PageHero } from "@/components/ui/PageHero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  title: "Про компанію AGROPARTS — постачальник агрозапчастин",
  description:
    "AGROPARTS — B2B та B2C постачальник запчастин для тракторів з 2009 року. Склад, логістика, гарантія, підбір по каталогу.",
  path: "/about",
})

const VALUES = [
  {
    icon: Shield,
    title: "Гарантія сумісності",
    text: "Перевіряємо артикули за каталогами виробників та досвідом сервісних центрів.",
  },
  {
    icon: Truck,
    title: "Логістика по Україні",
    text: "Відправка щодня зі складу в Києві. Нова Пошта, Укрпошта, самовивіз.",
  },
  {
    icon: Users,
    title: "Команда інженерів",
    text: "Менеджери з досвідом у сільгоспмашинобудуванні та ремонті агротехніки.",
  },
  {
    icon: Award,
    title: "Оригінал та OEM",
    text: "Працюємо з перевіреними брендами: Mann, Bosch, SKF, Mahle та ін.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-black">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Про нас", path: "/about" },
        ])}
      />
      <PageHero
        title={
          <>
            Про <span className="text-agro-yellow">AGROPARTS</span>
          </>
        }
        description="Промисловий маркетплейс запчастин для тракторів та комбайнів — від підбору до доставки на поле."
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Про нас" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <SectionHeader
              eyebrow="З 2009 року"
              title="Надійність для агробізнесу"
              description="Ми будуємо довгострокові відносини з фермерськими господарствами, сервісами та дилерами — прозорі ціни, швидка відповідь, актуальний склад."
            />
          </div>
          <div className="glass-card p-8 space-y-4 text-white/60 leading-relaxed">
            <p>
              AGROPARTS — це спеціалізований ecommerce-каталог із вкладеною структурою:
              модель техніки → система (двигун, КПП, гідравліка) → конкретна деталь.
            </p>
            <p>
              Кожна сторінка оптимізована для пошуку в Google, щоб ви знаходили потрібну
              запчастину за артикулом, назвою або моделлю трактора.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass-card p-6 hover:border-agro-yellow/25 transition-colors">
              <Icon className="w-8 h-8 text-agro-yellow mb-4" />
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
