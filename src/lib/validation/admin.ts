import { z } from "zod"

export const adminLoginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
})

export const productFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Product name is too short."),
  slug: z.string().min(2, "Slug is required."),
  price: z.coerce.number().int().nonnegative("Price must be positive."),
  oldPrice: z
    .union([z.literal(""), z.coerce.number().int().nonnegative()])
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  sku: z.string().min(2, "SKU is required."),
  articleNumber: z.string().min(2, "Article is required."),
  brand: z.string().min(2, "Brand is required."),
  description: z.string().min(10, "Description is too short."),
  compatibility: z.string().optional(),
  inStock: z.boolean().default(false),
  featured: z.boolean().default(false),
  categoryId: z.string().min(1, "Choose a category."),
  systemSlug: z.string().min(1, "Choose a system."),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  retainImageIds: z.array(z.string()).default([]),
})

export const categoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Category name is too short."),
  slug: z.string().min(2, "Slug is required."),
  description: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  currentImage: z.string().optional(),
})

export const orderStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "PROCESSING",
  "COMPLETED",
  "CANCELED",
])

export const publicOrderSchema = z.object({
  customerName: z.string().min(2, "Name is required."),
  phone: z.string().min(6, "Phone is required."),
  comment: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        name: z.string(),
        price: z.number().int().nonnegative(),
        image: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .default([]),
})

export type AdminLoginInput = z.infer<typeof adminLoginSchema>
export type ProductFormInput = z.infer<typeof productFormSchema>
export type CategoryFormInput = z.infer<typeof categoryFormSchema>
export type PublicOrderInput = z.infer<typeof publicOrderSchema>
