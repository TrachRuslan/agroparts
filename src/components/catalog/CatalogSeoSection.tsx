import { CATALOG_FAQ, CATALOG_SEO_HTML } from "@/lib/seo/catalog-content"

export function CatalogSeoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 border-t border-white/[0.06]">
      <article className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
          Запчастини для тракторів в Україні — AGROPARTS
        </h2>
        <div className="text-white/50 leading-relaxed space-y-4 text-sm md:text-base whitespace-pre-line">
          {CATALOG_SEO_HTML}
        </div>
      </article>
      <div className="mt-12">
        <h2 className="text-xl font-black text-white mb-6 uppercase">FAQ</h2>
        <div className="space-y-4">
          {CATALOG_FAQ.map((f) => (
            <details
              key={f.question}
              className="glass-card p-5 group open:border-agro-yellow/30"
            >
              <summary className="font-bold text-white cursor-pointer list-none flex justify-between items-center">
                {f.question}
                <span className="text-agro-yellow text-lg group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-white/50 mt-3 text-sm leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
