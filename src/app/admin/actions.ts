"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db/prisma"
import { systems as staticSystems } from "@/lib/catalog/systems"
import { slugify } from "@/lib/slug"
import {
  clearAdminSession,
  createAdminSession,
  requireAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin/auth"
import { getProductImage } from "@/lib/images"
import { uploadImage, uploadImages } from "@/lib/uploads"
import type { ActionResult } from "@/lib/actions"
import {
  adminLoginSchema,
  categoryFormSchema,
  orderStatusSchema,
  productFormSchema,
} from "@/lib/validation/admin"

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1"
}

function parseStringArray(values: FormDataEntryValue[]) {
  return values
    .map((value) => String(value).trim())
    .filter(Boolean)
}

function normalizeCompatibility(input: string | undefined) {
  return (input ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function buildSpecificationRows(input: {
  brand: string
  articleNumber: string
  sku: string
  categoryName: string
  systemName: string
}) {
  return [
    { key: "Бренд", value: input.brand },
    { key: "Артикул", value: input.articleNumber },
    { key: "SKU", value: input.sku },
    { key: "Категорія", value: input.categoryName },
    { key: "Система", value: input.systemName },
  ]
}

function revalidateStorefront(productSlug?: string) {
  revalidatePath("/")
  revalidatePath("/catalog")
  revalidatePath("/contacts")
  revalidatePath("/cart")
  if (productSlug) {
    revalidatePath(`/product/${productSlug}`)
  }
}

export async function loginAdminAction(
  _previousState: ActionResult<{ redirectTo: string }>,
  formData: FormData
): Promise<ActionResult<{ redirectTo: string }>> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the login form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const isValid = await verifyAdminCredentials(
    parsed.data.email,
    parsed.data.password
  )

  if (!isValid) {
    return {
      status: "error",
      message: "Invalid admin credentials.",
    }
  }

  await createAdminSession(parsed.data.email)

  return {
    status: "success",
    message: "Welcome back.",
    data: { redirectTo: "/admin" },
  }
}

export async function logoutAdminAction() {
  await clearAdminSession()
}

export async function saveProductAction(
  _previousState: ActionResult<{ productId: string; slug: string }>,
  formData: FormData
): Promise<ActionResult<{ productId: string; slug: string }>> {
  await requireAdminSession()

  const parsed = productFormSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    slug: formData.get("slug"),
    price: formData.get("price"),
    oldPrice: formData.get("oldPrice"),
    sku: formData.get("sku"),
    articleNumber: formData.get("articleNumber"),
    brand: formData.get("brand"),
    description: formData.get("description"),
    compatibility: formData.get("compatibility") || "",
    inStock: parseBoolean(formData.get("inStock")),
    featured: parseBoolean(formData.get("featured")),
    categoryId: formData.get("categoryId"),
    systemSlug: formData.get("systemSlug"),
    seoTitle: formData.get("seoTitle") || "",
    seoDescription: formData.get("seoDescription") || "",
    retainImageIds: parseStringArray(formData.getAll("retainImageIds")),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Product form has validation errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const input = parsed.data
  let [category, system] = await Promise.all([
    prisma.vehicleCategory.findUnique({ where: { id: input.categoryId } }),
    prisma.systemCategory.findUnique({ where: { slug: input.systemSlug } }),
  ])

  if (!system) {
    const fallbackSystem = staticSystems.find((item) => item.slug === input.systemSlug)
    if (fallbackSystem) {
      system = await prisma.systemCategory.upsert({
        where: { slug: fallbackSystem.slug },
        update: {
          name: fallbackSystem.name,
          description: fallbackSystem.description,
          image: fallbackSystem.image,
          seoTitle: fallbackSystem.seoTitle,
          seoDescription: fallbackSystem.seoDescription,
        },
        create: {
          slug: fallbackSystem.slug,
          name: fallbackSystem.name,
          description: fallbackSystem.description,
          image: fallbackSystem.image,
          seoTitle: fallbackSystem.seoTitle,
          seoDescription: fallbackSystem.seoDescription,
        },
      })
    }
  }

  if (!category || !system) {
    return {
      status: "error",
      message: "Choose a valid category and system.",
    }
  }

  const brand = await prisma.brand.upsert({
    where: { slug: slugify(input.brand) || input.brand.toLowerCase() },
    update: { name: input.brand },
    create: {
      slug: slugify(input.brand) || input.brand.toLowerCase(),
      name: input.brand,
    },
  })

  const uploadedGallery = await uploadImages(
    formData
      .getAll("galleryImages")
      .filter((value): value is File => value instanceof File && value.size > 0),
    "products"
  )

  const compatibility = normalizeCompatibility(input.compatibility)
  const specifications = buildSpecificationRows({
    brand: input.brand,
    articleNumber: input.articleNumber,
    sku: input.sku,
    categoryName: category.name,
    systemName: system.name,
  })

  const payload = {
    slug: input.slug,
    sku: input.sku,
    articleNumber: input.articleNumber,
    name: input.name,
    shortDescription: input.description.replace(/\s+/g, " ").trim().slice(0, 180),
    description: input.description,
    price: input.price,
    oldPrice: input.oldPrice ?? null,
    inStock: input.inStock,
    stockQuantity: input.inStock ? 1 : 0,
    isPopular: input.featured,
    manufacturer: input.brand,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    vehicleSlug: category.slug,
    systemSlug: system.slug,
    vehicleId: category.id,
    systemId: system.id,
    brandId: brand.id,
  }

  try {
    if (input.id) {
      const existing = await prisma.product.findUnique({
        where: { id: input.id },
        include: { images: true },
      })

      if (!existing) {
        return {
          status: "error",
          message: "Product was not found.",
        }
      }

      const maxSortOrder =
        existing.images.reduce(
          (highest, image) => Math.max(highest, image.sortOrder),
          0
        ) + 1

      const product = await prisma.product.update({
        where: { id: input.id },
        data: {
          ...payload,
          compatibilities: {
            deleteMany: {},
            create: compatibility.map((model) => ({ model })),
          },
          specifications: {
            deleteMany: {},
            create: specifications,
          },
          images: {
            deleteMany: {
              id: {
                notIn:
                  input.retainImageIds.length > 0 ? input.retainImageIds : ["__none__"],
              },
            },
            create: uploadedGallery.map((url, index) => ({
              url,
              sortOrder: maxSortOrder + index,
            })),
          },
        },
      })

      revalidatePath("/admin/products")
      revalidatePath(`/admin/products/${product.id}`)
      revalidateStorefront(existing.slug)
      revalidateStorefront(product.slug)

      return {
        status: "success",
        message: "Product saved successfully.",
        data: { productId: product.id, slug: product.slug },
      }
    }

    const product = await prisma.product.create({
      data: {
        ...payload,
        rating: 4.8,
        reviewsCount: 0,
        images: {
          create:
            uploadedGallery.length > 0
              ? uploadedGallery.map((url, index) => ({
                  url,
                  sortOrder: index,
                }))
              : [
                  {
                    url: getProductImage(input.slug),
                    sortOrder: 0,
                  },
                ],
        },
        compatibilities: {
          create: compatibility.map((model) => ({ model })),
        },
        specifications: {
          create: specifications,
        },
      },
    })

    revalidatePath("/admin/products")
    revalidateStorefront(product.slug)

    return {
      status: "success",
      message: "Product created successfully.",
      data: { productId: product.id, slug: product.slug },
    }
  } catch (error) {
    console.error("Failed to save product", error)
    return {
      status: "error",
      message: "Unable to save the product right now.",
    }
  }
}

export async function deleteProductAction(productId: string) {
  await requireAdminSession()

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (!product) {
    return {
      status: "error",
      message: "Product not found.",
    } satisfies ActionResult
  }

  await prisma.product.delete({ where: { id: productId } })

  revalidatePath("/admin/products")
  revalidateStorefront(product.slug)

  return {
    status: "success",
    message: "Product deleted.",
  } satisfies ActionResult
}

export async function toggleProductStockAction(productId: string, nextValue: boolean) {
  await requireAdminSession()

  const product = await prisma.product.update({
    where: { id: productId },
    data: { inStock: nextValue, stockQuantity: nextValue ? 1 : 0 },
  })

  revalidatePath("/admin/products")
  revalidateStorefront(product.slug)

  return {
    status: "success",
    message: nextValue ? "Marked as in stock." : "Marked as out of stock.",
  } satisfies ActionResult
}

export async function toggleProductFeaturedAction(
  productId: string,
  nextValue: boolean
) {
  await requireAdminSession()

  const product = await prisma.product.update({
    where: { id: productId },
    data: { isPopular: nextValue },
  })

  revalidatePath("/admin/products")
  revalidateStorefront(product.slug)

  return {
    status: "success",
    message: nextValue ? "Added to featured products." : "Removed from featured products.",
  } satisfies ActionResult
}

export async function saveCategoryAction(
  _previousState: ActionResult<{ categoryId: string }>,
  formData: FormData
): Promise<ActionResult<{ categoryId: string }>> {
  await requireAdminSession()

  const parsed = categoryFormSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") || "",
    seoTitle: formData.get("seoTitle") || "",
    seoDescription: formData.get("seoDescription") || "",
    currentImage: formData.get("currentImage") || "",
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Category form has validation errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const imageFile = formData.get("image")
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadImage(imageFile, "categories")
      : null

  try {
    const category = parsed.data.id
      ? await prisma.vehicleCategory.update({
          where: { id: parsed.data.id },
          data: {
            name: parsed.data.name,
            slug: parsed.data.slug,
            description: parsed.data.description || null,
            seoTitle: parsed.data.seoTitle || null,
            seoDescription: parsed.data.seoDescription || null,
            image: uploadedImage ?? parsed.data.currentImage ?? null,
          },
        })
      : await prisma.vehicleCategory.create({
          data: {
            name: parsed.data.name,
            slug: parsed.data.slug,
            description: parsed.data.description || null,
            seoTitle: parsed.data.seoTitle || null,
            seoDescription: parsed.data.seoDescription || null,
            image: uploadedImage ?? null,
          },
        })

    revalidatePath("/admin/categories")
    revalidateStorefront()

    return {
      status: "success",
      message: parsed.data.id ? "Category updated." : "Category created.",
      data: { categoryId: category.id },
    }
  } catch (error) {
    console.error("Failed to save category", error)
    return {
      status: "error",
      message: "Unable to save the category right now.",
    }
  }
}

export async function deleteCategoryAction(categoryId: string) {
  await requireAdminSession()

  const productsCount = await prisma.product.count({
    where: { vehicleId: categoryId },
  })

  if (productsCount > 0) {
    return {
      status: "error",
      message: "Remove or reassign products before deleting this category.",
    } satisfies ActionResult
  }

  await prisma.vehicleCategory.delete({ where: { id: categoryId } })

  revalidatePath("/admin/categories")
  revalidateStorefront()

  return {
    status: "success",
    message: "Category deleted.",
  } satisfies ActionResult
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  await requireAdminSession()

  const parsed = orderStatusSchema.safeParse(status)
  if (!parsed.success) {
    return {
      status: "error",
      message: "Unknown order status.",
    } satisfies ActionResult
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: parsed.data },
  })

  revalidatePath("/admin/orders")

  return {
    status: "success",
    message: "Order status updated.",
  } satisfies ActionResult
}
