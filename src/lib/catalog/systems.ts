import { images } from "@/lib/images"

export interface SystemCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string
  seoTitle: string
  seoDescription: string
}

export const systems: SystemCategory[] = [
  {
    id: "s-engine",
    slug: "engine",
    name: "Двигун",
    description: "Поршнева група, ГБЦ, турбіни, прокладки, фільтри двигуна.",
    image: images.categories.engines,
    seoTitle: "Запчастини двигуна",
    seoDescription: "Деталі двигуна для тракторів — оригінал та аналоги.",
  },
  {
    id: "s-transmission",
    slug: "transmission",
    name: "КПП",
    description: "Зчеплення, коробки передач, синхронізатори, вали.",
    image: images.categories.default,
    seoTitle: "Запчастини КПП",
    seoDescription: "Комплектуючі коробки передач та зчеплення.",
  },
  {
    id: "s-hydraulics",
    slug: "hydraulics",
    name: "Гідравліка",
    description: "Насоси НШ, розподільники, циліндри, РВД, клапани.",
    image: images.categories.hydraulics,
    seoTitle: "Гідравліка трактора",
    seoDescription: "Гідравлічні насоси та комплектуючі.",
  },
  {
    id: "s-fuel",
    slug: "fuel-system",
    name: "Паливна система",
    description: "Форсунки, ТНВД, паливні фільтри, трубки.",
    image: images.categories.filters,
    seoTitle: "Паливна система",
    seoDescription: "Запчастини паливної системи дизельного двигуна.",
  },
  {
    id: "s-electrical",
    slug: "electrical",
    name: "Електрика",
    description: "Стартери, генератори, реле, проводка, фари.",
    image: images.categories.electrical,
    seoTitle: "Електрика трактора",
    seoDescription: "Електрообладнання та стартери для тракторів.",
  },
  {
    id: "s-chassis",
    slug: "chassis",
    name: "Ходова",
    description: "Колеса, підшипники, осі, деталі ходової частини.",
    image: images.categories.default,
    seoTitle: "Ходова частина",
    seoDescription: "Запчастини ходової для сільгосптехніки.",
  },
  {
    id: "s-cabin",
    slug: "cabin",
    name: "Кабіна",
    description: "Скло, сидіння, двері, аксесуари кабіни.",
    image: images.categories.default,
    seoTitle: "Запчастини кабіни",
    seoDescription: "Комплектуючі кабіни трактора.",
  },
  {
    id: "s-brakes",
    slug: "brakes",
    name: "Гальма",
    description: "Гальмівні колодки, диски, циліндри.",
    image: images.categories.default,
    seoTitle: "Гальмівна система",
    seoDescription: "Запчастини гальм для тракторів.",
  },
  {
    id: "s-front-axle",
    slug: "front-axle",
    name: "Передній міст",
    description: "Деталі переднього провідного моста.",
    image: images.categories.default,
    seoTitle: "Передній міст",
    seoDescription: "Запчастини переднього моста трактора.",
  },
  {
    id: "s-rear-axle",
    slug: "rear-axle",
    name: "Задній міст",
    description: "Редуктор, диференціал, вали заднього моста.",
    image: images.categories.default,
    seoTitle: "Задній міст",
    seoDescription: "Комплектуючі заднього моста.",
  },
  {
    id: "s-steering",
    slug: "steering",
    name: "Рульове",
    description: "Рейка, наконечники, гідропідсилювач керма.",
    image: images.categories.default,
    seoTitle: "Рульове управління",
    seoDescription: "Запчастини рульового управління.",
  },
  {
    id: "s-attachments",
    slug: "attachments",
    name: "Навісне обладнання",
    description: "Плуги, сівалки, культиватори, навісні пристрої.",
    image: images.categories.attachments,
    seoTitle: "Навісне обладнання",
    seoDescription: "Запчастини для навісного обладнання.",
  },
  {
    id: "s-starter",
    slug: "starter",
    name: "Пусковий двигун",
    description: "Стартери, реле, акумулятори, проводка пуску.",
    image: images.categories.electrical,
    seoTitle: "Пускова система",
    seoDescription: "Стартери та пускові комплектуючі.",
  },
  {
    id: "s-cooling",
    slug: "cooling",
    name: "Система охолодження",
    description: "Радіатори, помпи, термостати, патрубки.",
    image: images.categories.engines,
    seoTitle: "Охолодження двигуна",
    seoDescription: "Система охолодження трактора.",
  },
  {
    id: "s-lubrication",
    slug: "lubrication",
    name: "Система змащення",
    description: "Масляні насоси, фільтри, масла, прокладки.",
    image: images.categories.oils,
    seoTitle: "Система змащення",
    seoDescription: "Масла та комплектуючі змащення.",
  },
]

export function getSystem(slug: string) {
  return systems.find((s) => s.slug === slug)
}

export function getSystemsForVehicle(vehicleSystemSlugs: string[]) {
  return systems.filter((s) => vehicleSystemSlugs.includes(s.slug))
}
