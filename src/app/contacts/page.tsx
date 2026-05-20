import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { PageHero } from "@/components/ui/PageHero"
import { ContactForm } from "@/components/contact/ContactForm"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"
import { CONTACT } from "@/lib/site-content"

export const metadata: Metadata = buildMetadata({
  title: "Контакти AGROPARTS — консультація та підбір запчастин",
  description:
    "Зв'яжіться з AGROPARTS: телефон, email, адреса складу в Києві. Підбір запчастин для тракторів МТЗ, ЮМЗ та ін.",
  path: "/contacts",
})

export default function ContactsPage() {
  return (
    <div className="bg-black">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Контакти", path: "/contacts" },
        ])}
      />
      <PageHero
        title={
          <>
            Зв&apos;яжіться з <span className="text-agro-yellow">нами</span>
          </>
        }
        description="Менеджери з агротехніки допоможуть підібрати запчастину за VIN, моделлю або артикулом."
        breadcrumbs={[
          { label: "Головна", href: "/" },
          { label: "Контакти" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[
              { icon: Phone, label: "Телефон", value: CONTACT.phone, href: CONTACT.phoneHref },
              { icon: Mail, label: "Email", value: CONTACT.email, href: CONTACT.emailHref },
              { icon: MapPin, label: "Адреса", value: CONTACT.address },
              { icon: Clock, label: "Графік", value: CONTACT.hours },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass-card p-5 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-agro-yellow/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-agro-yellow" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-white font-bold hover:text-agro-yellow transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
