"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import { Edit3, Plus, Search, Trash2 } from "lucide-react"
import {
  deleteProductAction,
  toggleProductFeaturedAction,
  toggleProductStockAction,
} from "@/app/admin/actions"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { AdminSwitch } from "@/components/admin/AdminSwitch"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { useAdminToast } from "@/components/admin/AdminToastProvider"
import { formatPrice } from "@/lib/utils"

interface ProductRow {
  id: string
  name: string
  slug: string
  price: number
  sku: string
  inStock: boolean
  isPopular: boolean
  vehicle?: { name: string } | null
  images: Array<{ url: string }>
}

export function AdminProductsTable({ products }: { products: ProductRow[] }) {
  const { pushToast } = useAdminToast()
  const [query, setQuery] = useState("")
  const [pending, startTransition] = useTransition()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return products
    return products.filter((product) =>
      [product.name, product.slug, product.sku, product.vehicle?.name ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
  }, [products, query])

  const deleteProduct = () => {
    if (!deleteId) return
    startTransition(async () => {
      const response = await deleteProductAction(deleteId)
      pushToast(response.message || "Готово", response.status === "success" ? "success" : "error")
      if (response.status === "success") {
        setDeleteId(null)
      }
    })
  }

  if (products.length === 0) {
    return (
      <AdminEmptyState
        icon={Plus}
        title="Поки що немає товарів"
        description="Створіть перший товар з реальною ціною, SEO-даними, сумісністю та галереєю зображень."
        action={
          <Link href="/admin/products/new" className="btn-primary inline-flex !py-3 !px-5 !rounded-2xl">
            Додати товар
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Пошук по назві, slug, SKU..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-agro-yellow/40"
          />
        </div>
        <Link href="/admin/products/new" className="btn-primary inline-flex !py-3 !px-5 !rounded-2xl">
          <Plus className="h-4 w-4" />
          Новий товар
        </Link>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b border-white/10 bg-black/20 text-[11px] uppercase tracking-[0.2em] text-white/35">
              <tr>
                <th className="px-5 py-4">Товар</th>
                <th className="px-5 py-4">Категорія</th>
                <th className="px-5 py-4">Ціна</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4">Featured</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-white/[0.06] last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-black/40">
                        {product.images[0]?.url ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/25">
                            No image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="mt-1 text-xs text-white/35">
                          {product.sku} · /product/{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/65">
                    {product.vehicle?.name ?? "Без категорії"}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-white">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <AdminSwitch
                      checked={product.inStock}
                      disabled={pending}
                      onChange={(nextValue) =>
                        startTransition(async () => {
                          const response = await toggleProductStockAction(product.id, nextValue)
                          pushToast(
                            response.message || "Оновлено",
                            response.status === "success" ? "success" : "error"
                          )
                        })
                      }
                    />
                  </td>
                  <td className="px-5 py-4">
                    <AdminSwitch
                      checked={product.isPopular}
                      disabled={pending}
                      onChange={(nextValue) =>
                        startTransition(async () => {
                          const response = await toggleProductFeaturedAction(product.id, nextValue)
                          pushToast(
                            response.message || "Оновлено",
                            response.status === "success" ? "success" : "error"
                          )
                        })
                      }
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
                      >
                        <Edit3 className="h-4 w-4" />
                        Редагувати
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteId(product.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-3 py-2 text-sm text-red-200 transition hover:border-red-400/40 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Видалити товар?"
        description="Товар буде видалений разом із галереєю, сумісністю та характеристиками. Цю дію не можна скасувати."
        confirmLabel={pending ? "Видалення..." : "Видалити"}
        onConfirm={deleteProduct}
      />
    </div>
  )
}
