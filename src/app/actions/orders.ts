"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db/prisma"
import type { ActionResult } from "@/lib/actions"
import { publicOrderSchema } from "@/lib/validation/admin"

export async function createOrderAction(
  _previousState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  let parsedItems: unknown[] = []

  try {
    parsedItems = JSON.parse(String(formData.get("items") || "[]"))
  } catch {
    parsedItems = []
  }

  const parsed = publicOrderSchema.safeParse({
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    comment: formData.get("comment") || "",
    items: parsedItems,
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the order form.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const total = parsed.data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  try {
    await prisma.order.create({
      data: {
        customerName: parsed.data.customerName,
        phone: parsed.data.phone,
        comment: parsed.data.comment || null,
        total,
        items: {
          create: parsed.data.items.map((item) => ({
            productId: item.productId,
            productName: item.name,
            productSlug: item.slug,
            sku: null,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    })

    revalidatePath("/admin/orders")
    revalidatePath("/contacts")
    revalidatePath("/cart")

    return {
      status: "success",
      message: "Order submitted successfully.",
    }
  } catch (error) {
    console.error("Failed to create order", error)
    return {
      status: "error",
      message: "Unable to submit the order right now.",
    }
  }
}
