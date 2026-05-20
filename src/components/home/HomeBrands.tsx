import { SectionHeader } from "@/components/ui/SectionHeader"
import { BRANDS } from "@/lib/site-content"

export function HomeBrands() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 border-y border-white/[0.04] bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Партнери"
          title={
            <>
              Бренди, з якими <span className="text-agro-yellow">працюємо</span>
            </>
          }
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm font-bold text-white/50 hover:text-white hover:border-agro-yellow/30 transition-all"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
