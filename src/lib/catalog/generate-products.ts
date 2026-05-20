import { Product } from "@/types"
import { getProductImage } from "@/lib/images"
import { buildProductSlug } from "@/lib/slug"
import { vehicles } from "./vehicles"
import { getSystem } from "./systems"

const BRANDS = [
  "МТЗ",
  "ЮМЗ",
  "Belarus",
  "Kraft",
  "Bosch",
  "ПАЗ",
  "Агротех",
  "Мотордеталь",
  "CNH",
  "Donaldson",
] as const

const MODELS: Record<string, string[]> = {
  mtz: ["МТЗ-80", "МТЗ-82", "МТЗ-892", "МТЗ-952"],
  yumz: ["ЮМЗ-6", "ЮМЗ-628", "ЮМЗ-1025"],
  "t-25": ["Т-25", "Т-25А"],
  "t-40": ["Т-40", "Т-40АМ"],
  belarus: ["Belarus 82.1", "Belarus 1221", "Belarus 1523"],
  "john-deere": ["John Deere 6130", "John Deere 6930"],
  claas: ["CLAAS Axion", "CLAAS Lexion"],
  case: ["Case IH Puma", "Case Magnum"],
  "new-holland": ["NH T6", "NH T7"],
}

const PART_NAMES: Record<string, string[]> = {
  engine: [
    "Поршень",
    "Кільця поршневі",
    "Прокладка ГБЦ",
    "Турбокомпресор",
    "Насос масляний",
    "Вкладиш корінний",
  ],
  transmission: [
    "Диск зчеплення",
    "Кошик зчеплення",
    "Синхронізатор",
    "Вал вторинний КПП",
    "Підшипник КПП",
  ],
  hydraulics: [
    "Гідронасос НШ-32",
    "Розподільник Р80",
    "Циліндр гідравлічний",
    "Клапан запобіжний",
    "Шланг РВД",
  ],
  "fuel-system": [
    "Форсунка паливна",
    "ТНВД",
    "Фільтр паливний",
    "Трубка високого тиску",
  ],
  electrical: [
    "Стартер 12V 4.2kW",
    "Генератор 14V 55A",
    "Реле стартерне",
    "Фара робоча LED",
  ],
  chassis: [
    "Підшипник ступиці",
    "Колесо 9.0-20",
    "Вісь задня",
    "Ступиця",
  ],
  cabin: ["Скло лобове", "Сидіння оператора", "Ручка дверей"],
  brakes: ["Колодка гальмівна", "Диск гальмівний"],
  "front-axle": ["Піввісь передня", "Підшипник ступиці ПМ"],
  "rear-axle": ["Редуктор заднього моста", "Вал провідний"],
  steering: ["Наконечник рульовий", "Рейка кермова"],
  attachments: ["Лемех плуга", "Сошник сівалки"],
  starter: ["Стартер редукторний", "Втягуюче реле"],
  cooling: ["Радіатор охолодження", "Помпа водяна"],
  lubrication: ["Масло моторне 15W-40", "Фільтр масляний"],
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h += s.charCodeAt(i)
  return h
}

function createProduct(
  index: number,
  vehicleSlug: string,
  vehicleName: string,
  systemSlug: string,
  systemName: string
): Product {
  const id = `p${index}`
  const pool = PART_NAMES[systemSlug] ?? PART_NAMES.engine
  const partBase = pool[index % pool.length]
  const brand = BRANDS[index % BRANDS.length]
  const models = MODELS[vehicleSlug] ?? ["Універсальна"]
  const slug = buildProductSlug(partBase, vehicleSlug, systemSlug, index)
  const sku = `AGP-${String(index).padStart(5, "0")}`
  const articleNumber = `${vehicleSlug.toUpperCase().slice(0, 3)}-${systemSlug.slice(0, 3).toUpperCase()}-${index}`
  const seed = `${vehicleSlug}-${systemSlug}-${index}`
  const image = getProductImage(seed)
  const price = Math.round((450 + (index % 50) * 190 + hash(seed) % 800) / 10) * 10
  const name = `${partBase} ${brand} (${models[0]})`

  return {
    id,
    slug,
    sku,
    articleNumber,
    brand,
    manufacturer: brand,
    name,
    shortDescription: `${partBase} для ${vehicleName}, вузол «${systemName}». Сумісність: ${models.slice(0, 2).join(", ")}.`,
    description: `${partBase} для сільськогосподарської техніки ${vehicleName} (${systemName}). Виробник: ${brand}. Підходить для ${models.join(", ")}. Сертифікована якість, гарантія 12–24 міс. Склад AGROPARTS — відправка в день замовлення.`,
    price,
    oldPrice: index % 4 === 0 ? Math.round(price * 1.12) : undefined,
    image,
    gallery: [image, getProductImage(seed, 1), getProductImage(seed, 2)],
    vehicleSlug,
    systemSlug,
    category: vehicleSlug,
    subcategory: systemSlug,
    tractorModel: models,
    inStock: index % 8 !== 0,
    rating: Math.min(5, Math.round((4.2 + (index % 8) * 0.1) * 10) / 10),
    reviewsCount: 2 + (index % 80),
    specifications: {
      Бренд: brand,
      Артикул: articleNumber,
      "Техніка": vehicleName,
      Вузол: systemName,
      Гарантія: "12–24 міс",
    },
    compatibility: models,
    isPopular: index % 7 === 0,
    isBestSeller: index % 11 === 0,
    isNew: index % 13 === 0,
    seoTitle: `${name} — купити для ${vehicleName} | AGROPARTS`,
    seoDescription: `Купити ${partBase} для ${vehicleName} (${systemName}). Ціна ${price} грн. Доставка по Україні.`,
  }
}

export function generateProducts(): Product[] {
  const products: Product[] = []
  let index = 1

  for (const vehicle of vehicles) {
    for (const systemSlug of vehicle.systems) {
      const system = getSystem(systemSlug)
      if (!system) continue
      const count = 4 + (hash(vehicle.slug + systemSlug) % 3)
      for (let i = 0; i < count; i++) {
        products.push(
          createProduct(
            index++,
            vehicle.slug,
            vehicle.name,
            systemSlug,
            system.name
          )
        )
      }
    }
  }

  return products
}
