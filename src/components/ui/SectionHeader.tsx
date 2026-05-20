import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-agro-yellow mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-white/45 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
