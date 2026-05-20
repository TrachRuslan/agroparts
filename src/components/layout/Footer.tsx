import Link from "next/link"
import { Tractor, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { FOOTER_NAV, FOOTER_CATEGORIES, CONTACT } from "@/lib/site-content"

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-14 pb-24 lg:pb-10 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-agro-yellow/5 blur-[150px] rounded-full -mb-64 -mr-64 pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-agro-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-agro-yellow/20 group-hover:rotate-6 transition-transform">
              <Tractor className="text-black w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white">
                AGRO<span className="text-agro-yellow">PARTS</span>
              </span>
              <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] leading-none">
                Industrial
              </span>
            </div>
          </Link>
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">
            Надійний постачальник запчастин для сільськогосподарської техніки з 2009 року.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href={CONTACT.viber}
                aria-label={label}
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:border-agro-yellow/50 hover:text-agro-yellow transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6">
            Навігація
          </h4>
          <ul className="space-y-3">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/40 hover:text-agro-yellow transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6">
            Категорії
          </h4>
          <ul className="space-y-3">
            {FOOTER_CATEGORIES.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/40 hover:text-agro-yellow transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6">
            Контакти
          </h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-agro-yellow shrink-0 mt-0.5" />
              <span className="text-white/40 text-sm leading-relaxed">{CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-agro-yellow shrink-0" />
              <a href={CONTACT.phoneHref} className="text-white/70 text-sm font-black hover:text-agro-yellow">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-agro-yellow shrink-0" />
              <a href={CONTACT.emailHref} className="text-white/70 text-sm font-bold hover:text-agro-yellow">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
          © {new Date().getFullYear()} AGROPARTS INDUSTRIAL
        </p>
        <div className="flex gap-8">
          <Link
            href="/delivery"
            className="text-white/20 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            Доставка
          </Link>
          <Link
            href="/contacts"
            className="text-white/20 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            Контакти
          </Link>
        </div>
      </div>
    </footer>
  )
}
