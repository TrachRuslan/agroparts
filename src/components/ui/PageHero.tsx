import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type Breadcrumb = { label: string; href?: string }

interface PageHeroProps {
  title: React.ReactNode
  description?: string
  breadcrumbs?: Breadcrumb[]
  className?: string
  children?: React.ReactNode
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative border-b border-white/[0.06] catalog-mesh overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-agro-yellow/[0.04] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/30 mb-5"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-agro-yellow transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-agro-yellow">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
