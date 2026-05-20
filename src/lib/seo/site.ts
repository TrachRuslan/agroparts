export const SITE = {
  name: "AGROPARTS",
  title: "AGROPARTS — запчастини для тракторів та агротехніки",
  description:
    "Інтернет-магазин запчастин для тракторів МТЗ, ЮМЗ, Т-40, Belarus, John Deere. Оригінал та аналоги. Доставка по Україні.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agroparts.ua",
  locale: "uk_UA",
  language: "uk",
} as const

export function absoluteUrl(path: string) {
  const base = SITE.url.replace(/\/$/, "")
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}
