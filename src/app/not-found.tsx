import Link from "next/link"
import { Home, Search } from "lucide-react"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata = buildMetadata({
  title: "Сторінку не знайдено | AGROPARTS",
  description: "Запитана сторінка не існує. Перейдіть в каталог запчастин для тракторів.",
  path: "/404",
  noIndex: true,
})

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 catalog-mesh">
      <div className="max-w-lg text-center">
        <p className="text-[120px] md:text-[160px] font-black leading-none text-white/[0.04] select-none">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter -mt-16 md:-mt-20 mb-4">
          Сторінку не знайдено
        </h1>
        <p className="text-white/45 mb-10 leading-relaxed">
          Можливо, посилання застаріло або товар переміщено в іншу категорію каталогу.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary inline-flex">
            <Home className="w-4 h-4" />
            На головну
          </Link>
          <Link href="/catalog" className="btn-outline inline-flex">
            <Search className="w-4 h-4" />
            Каталог
          </Link>
        </div>
      </div>
    </div>
  )
}
