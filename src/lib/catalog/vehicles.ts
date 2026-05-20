import { images } from "@/lib/images"

export interface VehicleCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string
  seoTitle: string
  seoDescription: string
  /** System slugs available for this vehicle */
  systems: string[]
}

export const vehicles: VehicleCategory[] = [
  {
    id: "v-mtz",
    slug: "mtz",
    name: "МТЗ",
    description:
      "Оригінальні та якісні аналоги запчастин для тракторів МТЗ-80, 82, 892, 952. Двигун, КПП, гідравліка, електрика.",
    image: images.categories.mtz,
    seoTitle: "Запчастини МТЗ — каталог | AGROPARTS",
    seoDescription:
      "Купити запчастини для тракторів МТЗ в Україні. Двигун, трансмісія, гідравліка, фільтри. Доставка 1–2 дні.",
    systems: [
      "engine",
      "transmission",
      "hydraulics",
      "fuel-system",
      "electrical",
      "chassis",
      "cabin",
      "brakes",
      "attachments",
      "cooling",
      "lubrication",
    ],
  },
  {
    id: "v-yumz",
    slug: "yumz",
    name: "ЮМЗ",
    description:
      "Запчастини для ЮМЗ-6, 628, 1025. Професійний підбір, гарантія, наявність на складі.",
    image: images.categories.umz,
    seoTitle: "Запчастини ЮМЗ — каталог | AGROPARTS",
    seoDescription:
      "Запчастини ЮМЗ: двигун, КПП, ходова, електрика. Офіційні аналоги та оригінал.",
    systems: [
      "engine",
      "transmission",
      "hydraulics",
      "fuel-system",
      "electrical",
      "chassis",
      "brakes",
      "starter",
    ],
  },
  {
    id: "v-t25",
    slug: "t-25",
    name: "Т-25",
    description: "Комплектуючі для тракторів Т-25 та Т-25А.",
    image: images.categories.default,
    seoTitle: "Запчастини Т-25 | AGROPARTS",
    seoDescription: "Каталог запчастин Т-25: двигун, КПП, гідравліка, електрика.",
    systems: ["engine", "transmission", "hydraulics", "electrical", "chassis"],
  },
  {
    id: "v-t40",
    slug: "t-40",
    name: "Т-40",
    description: "Запчастини для Т-40, Т-40АМ — двигун, паливна система, ходова.",
    image: images.categories.default,
    seoTitle: "Запчастини Т-40 | AGROPARTS",
    seoDescription: "Запчастини Т-40 з доставкою по Україні.",
    systems: [
      "engine",
      "transmission",
      "hydraulics",
      "fuel-system",
      "electrical",
      "chassis",
    ],
  },
  {
    id: "v-belarus",
    slug: "belarus",
    name: "Білорус",
    description: "Деталі для Belarus 82.1, 1221, 1523 та інших моделей.",
    image: images.categories.belarus,
    seoTitle: "Запчастини Belarus | AGROPARTS",
    seoDescription: "Запчастини Belarus — двигун, КПП, гідравліка, фільтри.",
    systems: [
      "engine",
      "transmission",
      "hydraulics",
      "electrical",
      "chassis",
      "cabin",
      "attachments",
    ],
  },
  {
    id: "v-jd",
    slug: "john-deere",
    name: "John Deere",
    description: "Запчастини для техніки John Deere.",
    image: images.categories.combines,
    seoTitle: "Запчастини John Deere | AGROPARTS",
    seoDescription: "Каталог запчастин John Deere в Україні.",
    systems: ["engine", "transmission", "hydraulics", "electrical", "chassis"],
  },
  {
    id: "v-claas",
    slug: "claas",
    name: "CLAAS",
    description: "Комплектуючі CLAAS для комбайнів та техніки.",
    image: images.categories.combines,
    seoTitle: "Запчастини CLAAS | AGROPARTS",
    seoDescription: "Запчастини CLAAS — наявність, доставка, гарантія.",
    systems: ["engine", "hydraulics", "electrical", "chassis", "attachments"],
  },
  {
    id: "v-case",
    slug: "case",
    name: "Case",
    description: "Запчастини Case IH та Case.",
    image: images.categories.default,
    seoTitle: "Запчастини Case | AGROPARTS",
    seoDescription: "Каталог запчастин Case для сільгосптехніки.",
    systems: ["engine", "transmission", "hydraulics", "electrical"],
  },
  {
    id: "v-nh",
    slug: "new-holland",
    name: "New Holland",
    description: "Деталі New Holland для тракторів та комбайнів.",
    image: images.categories.default,
    seoTitle: "Запчастини New Holland | AGROPARTS",
    seoDescription: "Запчастини New Holland з доставкою по Україні.",
    systems: ["engine", "transmission", "hydraulics", "electrical", "chassis"],
  },
]

export function getVehicle(slug: string) {
  return vehicles.find((v) => v.slug === slug)
}

/** Legacy alias: umz → yumz */
export function resolveVehicleSlug(slug: string) {
  if (slug === "umz") return "yumz"
  return slug
}
