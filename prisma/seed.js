const { PrismaClient } = require("../src/generated/prisma/index.js")

const DATABASE_URL =
  "postgresql://agro:123456789@127.0.0.1:5433/agroparts?schema=public"

process.env.DATABASE_URL = DATABASE_URL

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})

async function main() {
  const productsCount = await prisma.product.count()
  if (productsCount > 0) {
    console.log(`Seed skipped: ${productsCount} products already exist.`)
    return
  }

  const [vehicle, system, brand] = await Promise.all([
    prisma.vehicleCategory.upsert({
      where: { slug: "mtz" },
      update: {},
      create: {
        slug: "mtz",
        name: "MTZ",
        description: "Base vehicle category for the AGROPARTS seed dataset.",
        image:
          "https://images.unsplash.com/photo-1592982537447-7955394c040e?auto=format&fit=crop&w=800&q=80",
        seoTitle: "MTZ parts | AGROPARTS",
        seoDescription: "Base seed catalog for MTZ products.",
      },
    }),
    prisma.systemCategory.upsert({
      where: { slug: "engine" },
      update: {},
      create: {
        slug: "engine",
        name: "Engine",
        description: "Base system category used by the seed dataset.",
        image:
          "https://images.unsplash.com/photo-1565688534245-05e8f5c56b3e?auto=format&fit=crop&w=800&q=80",
        seoTitle: "Engine parts | AGROPARTS",
        seoDescription: "Base engine seed data for AGROPARTS.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "agroparts" },
      update: {},
      create: {
        slug: "agroparts",
        name: "AGROPARTS",
      },
    }),
  ])

  await prisma.product.create({
    data: {
      slug: "testovyi-porshen-mtz-engine",
      sku: "AGP-SEED-0001",
      articleNumber: "SEED-MTZ-ENG-001",
      name: "Test Product MTZ Piston",
      shortDescription: "Minimal seed product used to verify Prisma CRUD.",
      description:
        "This product is created by the seed script so admin/products and the storefront can read real PostgreSQL data.",
      price: 1250,
      oldPrice: 1490,
      inStock: true,
      stockQuantity: 7,
      rating: 4.8,
      reviewsCount: 3,
      isPopular: true,
      manufacturer: "AGROPARTS",
      seoTitle: "Test Product MTZ Piston | AGROPARTS",
      seoDescription: "Seed product for validating the AGROPARTS PostgreSQL setup.",
      vehicleSlug: vehicle.slug,
      systemSlug: system.slug,
      vehicleId: vehicle.id,
      systemId: system.id,
      brandId: brand.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
            sortOrder: 0,
          },
        ],
      },
      specifications: {
        create: [
          { key: "Brand", value: "AGROPARTS" },
          { key: "Article", value: "SEED-MTZ-ENG-001" },
        ],
      },
      compatibilities: {
        create: [{ model: "MTZ-82" }, { model: "MTZ-80" }],
      },
    },
  })

  console.log("Seed completed: 1 category, 1 system, 1 brand, 1 product created.")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
