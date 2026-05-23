import "server-only"

import { prisma } from "@/lib/db/prisma"
import { hasDatabaseUrl } from "@/lib/env"
import { systems as staticSystems } from "@/lib/catalog/systems"

function ensureDatabaseUrl() {
  return hasDatabaseUrl()
}

export async function getAdminDashboardData() {
  if (!ensureDatabaseUrl()) {
    return {
      error: "Панель ще не підключена до бази даних. Додайте DATABASE_URL і виконайте prisma db push.",
      stats: null,
      recentOrders: [],
    }
  }

  try {
    const [productsCount, categoriesCount, ordersCount, lowStockCount, recentOrders] =
      await Promise.all([
        prisma.product.count(),
        prisma.vehicleCategory.count(),
        prisma.order.count(),
        prisma.product.count({ where: { inStock: false } }),
        prisma.order.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { items: true },
        }),
      ])

    return {
      error: null,
      stats: {
        productsCount,
        categoriesCount,
        ordersCount,
        lowStockCount,
      },
      recentOrders,
    }
  } catch (error) {
    console.error("Failed to load admin dashboard data", error)
    return {
      error: "Панель ще не підключена до бази даних. Перевірте DATABASE_URL і prisma db push.",
      stats: null,
      recentOrders: [],
    }
  }
}

export async function getAdminProducts() {
  if (!ensureDatabaseUrl()) {
    return {
      error: "Не знайдено DATABASE_URL. Адмінка готова, але чекає на підключення PostgreSQL.",
      products: [],
    }
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        vehicle: true,
        images: {
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
      },
    })

    return { error: null, products }
  } catch (error) {
    console.error("Failed to load admin products", error)
    return {
      error: "Не вдалося завантажити товари. Перевірте підключення до бази.",
      products: [],
    }
  }
}

export async function getAdminProductFormData(productId?: string) {
  if (!ensureDatabaseUrl()) {
    return {
      error: "Не знайдено DATABASE_URL. Підключіть PostgreSQL, щоб створювати й редагувати товари.",
      categories: [],
      systems: staticSystems.map((system) => ({
        id: system.id,
        slug: system.slug,
        name: system.name,
        description: system.description,
        image: system.image,
        seoTitle: system.seoTitle,
        seoDescription: system.seoDescription,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      product: null,
    }
  }

  try {
    const [categories, systems, product] = await Promise.all([
      prisma.vehicleCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      }),
      prisma.systemCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      }),
      productId
        ? prisma.product.findUnique({
            where: { id: productId },
            include: {
              vehicle: true,
              images: { orderBy: { sortOrder: "asc" } },
              compatibilities: true,
            },
          })
        : Promise.resolve(null),
    ])

    return {
      error: null,
      categories,
      systems:
        systems.length > 0
          ? systems
          : staticSystems.map((system) => ({
              id: system.id,
              slug: system.slug,
              name: system.name,
              description: system.description,
              image: system.image,
              seoTitle: system.seoTitle,
              seoDescription: system.seoDescription,
              sortOrder: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            })),
      product,
    }
  } catch (error) {
    console.error("Failed to load product form data", error)
    return {
      error: "Не вдалося завантажити форму товару. Перевірте Prisma та БД.",
      categories: [],
      systems: [],
      product: null,
    }
  }
}

export async function getAdminCategories() {
  if (!ensureDatabaseUrl()) {
    return {
      error: "Не знайдено DATABASE_URL. Підключіть PostgreSQL, щоб керувати категоріями.",
      categories: [],
    }
  }

  try {
    const categories = await prisma.vehicleCategory.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    return { error: null, categories }
  } catch (error) {
    console.error("Failed to load admin categories", error)
    return {
      error: "Не вдалося завантажити категорії.",
      categories: [],
    }
  }
}

export async function getAdminOrders() {
  if (!ensureDatabaseUrl()) {
    return {
      error: "Не знайдено DATABASE_URL. Після підключення PostgreSQL тут з’являться замовлення.",
      orders: [],
    }
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    })

    return { error: null, orders }
  } catch (error) {
    console.error("Failed to load admin orders", error)
    return {
      error: "Не вдалося завантажити замовлення.",
      orders: [],
    }
  }
}
