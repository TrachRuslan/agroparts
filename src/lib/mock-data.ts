import { Advantage, Review } from "@/types"

export {
  categories,
  products,
  getProductById,
  filterProducts,
  sortProducts,
  countProducts,
  getSimilarProducts,
  getCategoryLabel,
  getCategoryBySlug,
  getSubcategory,
} from "@/lib/catalog/helpers"

export const reviews: Review[] = [
  {
    id: "r1",
    userName: "Олександр Петренко",
    userRole: "Власник фермерського господарства",
    content:
      "Відмінна якість запчастин. Доставили дуже швидко, менеджер допоміг підібрати правильний насос для мого МТЗ-82. Рекомендую!",
    rating: 5,
    date: "10.05.2024",
    productId: "p1",
  },
  {
    id: "r2",
    userName: "Дмитро Іванов",
    userRole: "Головний механік агрохолдингу",
    content:
      "Найкраще місце для пошуку оригінальних запчастин до Білоруса. Ціни конкурентні, а каталог дуже детальний.",
    rating: 5,
    date: "12.05.2024",
    productId: "p12",
  },
  {
    id: "r3",
    userName: "Сергій Ковальчук",
    userRole: "Приватний підприємець",
    content:
      "Замовляв комплект зчеплення. Все підійшло ідеально. Якість металу на висоті.",
    rating: 4,
    date: "15.05.2024",
    productId: "p24",
  },
  {
    id: "r4",
    userName: "Іван Мельник",
    userRole: "Механік СТО",
    content: "Працюємо з AGROPARTS щомісяця. Завжди в наявності фільтри та масла.",
    rating: 5,
    date: "20.06.2024",
  },
  {
    id: "r5",
    userName: "Андрій Шевченко",
    userRole: "Фермер",
    content: "Швидка доставка Новою Поштою. Ціни адекватні, консультація на рівні.",
    rating: 5,
    date: "02.08.2024",
  },
]

export const advantages: Advantage[] = [
  {
    id: "a1",
    title: "Швидка доставка",
    description:
      "Відправка в день замовлення по всій території України зручним перевізником.",
    icon: "Truck",
  },
  {
    id: "a2",
    title: "Оригінальні деталі",
    description:
      "Працюємо з перевіреними виробниками та гарантуємо оригінальність.",
    icon: "ShieldCheck",
  },
  {
    id: "a3",
    title: "Гарантія якості",
    description: "Офіційна гарантія від виробника терміном до 24 місяців.",
    icon: "BadgeCheck",
  },
  {
    id: "a4",
    title: "Підтримка 24/7",
    description: "Фахівці допоможуть підібрати запчастини під вашу модель техніки.",
    icon: "Headset",
  },
]
