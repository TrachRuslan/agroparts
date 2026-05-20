import React from "react"
import Link from "next/link"
import { Tractor, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-14 pb-10 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-agro-yellow/5 blur-[150px] rounded-full -mb-64 -mr-64" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
        {/* Brand */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-agro-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-agro-yellow/20 group-hover:rotate-6 transition-transform">
              <Tractor className="text-black w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white">AGRO<span className="text-agro-yellow">PARTS</span></span>
              <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] leading-none">Industrial</span>
            </div>
          </Link>
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">
            Надійний постачальник запчастин для сільськогосподарської техніки з 2009 року. Гарантуємо якість кожної деталі.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:border-agro-yellow/50 hover:text-agro-yellow hover:bg-white/10 transition-all">
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Навігація</h4>
          <ul className="space-y-4">
            {["Головна", "Каталог", "Про нас", "Доставка та оплата", "Відгуки", "Контакти"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-white/40 hover:text-agro-yellow transition-colors text-sm font-bold uppercase tracking-wider">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Категорії</h4>
          <ul className="space-y-4">
            {["МТЗ", "ЮМЗ", "Гідравліка", "Двигуни", "Трансмісія", "Фільтри"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-white/40 hover:text-agro-yellow transition-colors text-sm font-bold uppercase tracking-wider">
                  Запчастини до {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Контакти</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-agro-yellow shrink-0 mt-1" />
              <span className="text-white/40 text-sm font-medium leading-relaxed">вул. Центральна, 100,<br />м. Київ, 01001, Україна</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-agro-yellow shrink-0" />
              <span className="text-white/40 text-sm font-black">+38 (067) 123 45 67</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-agro-yellow shrink-0" />
              <span className="text-white/40 text-sm font-bold">info@agroparts.ua</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
          © 2026 AGROPARTS INDUSTRIAL. ВСІ ПРАВА ЗАХИЩЕНІ.
        </p>
        <div className="flex gap-10">
          <Link href="#" className="text-white/20 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Політика конфіденційності</Link>
          <Link href="#" className="text-white/20 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Публічна оферта</Link>
        </div>
      </div>
    </footer>
  )
}
