export const CONTACT = {
  phone: "+38 (067) 123 45 67",
  phoneHref: "tel:+380671234567",
  email: "info@agroparts.ua",
  emailHref: "mailto:info@agroparts.ua",
  address: "вул. Центральна, 100, м. Київ, 01001, Україна",
  hours: "Пн–Пт 9:00–18:00, Сб 10:00–15:00",
  viber: "https://viber.com",
} as const

export const MAIN_NAV = [
  { label: "Головна", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Доставка", href: "/delivery" },
  { label: "Про нас", href: "/about" },
  { label: "Контакти", href: "/contacts" },
] as const

export const FOOTER_NAV = [
  { label: "Головна", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Про нас", href: "/about" },
  { label: "Доставка та оплата", href: "/delivery" },
  { label: "Відгуки", href: "/#reviews" },
  { label: "Контакти", href: "/contacts" },
  { label: "Обране", href: "/wishlist" },
  { label: "Порівняння", href: "/compare" },
] as const

export const FOOTER_CATEGORIES = [
  { label: "МТЗ", href: "/catalog/mtz" },
  { label: "ЮМЗ", href: "/catalog/yumz" },
  { label: "Т-40", href: "/catalog/t-40" },
  { label: "Білорус", href: "/catalog/belarus" },
  { label: "John Deere", href: "/catalog/john-deere" },
  { label: "Гідравліка", href: "/catalog/mtz/hydraulics" },
] as const

export const BRANDS = [
  "МТЗ",
  "Belarus",
  "John Deere",
  "CLAAS",
  "Case IH",
  "New Holland",
  "Mann-Filter",
  "Bosch",
  "SKF",
  "Mahle",
] as const

export const DELIVERY_BLOCKS = [
  {
    title: "Нова Пошта",
    description: "Відправка 1–2 робочі дні. Оплата при отриманні або передплата.",
  },
  {
    title: "Укрпошта",
    description: "Економ-доставка по всій Україні, термін 3–7 днів.",
  },
  {
    title: "Самовивіз",
    description: "Зі складу в Києві після підтвердження наявності менеджером.",
  },
] as const

export const PAYMENT_METHODS = [
  "Безготівковий розрахунок (юр. особи)",
  "Оплата карткою онлайн",
  "Накладений платіж",
  "Готівка при самовивозі",
] as const
