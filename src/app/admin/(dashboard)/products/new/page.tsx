import Link from "next/link"
import { ChevronLeft, TriangleAlert } from "lucide-react"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { ProductEditorForm } from "@/components/admin/ProductEditorForm"
import { getAdminProductFormData } from "@/lib/admin/queries"

export default async function AdminNewProductPage() {
  const data = await getAdminProductFormData()

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          До списку товарів
        </Link>
      </div>

      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-agro-yellow/80">
          New Product
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
          Створення товару
        </h1>
      </div>

      {data.error ? (
        <AdminEmptyState
          icon={TriangleAlert}
          title="Форма недоступна"
          description={data.error}
        />
      ) : (
        <ProductEditorForm
          categories={data.categories.map((category) => ({
            id: category.id,
            name: category.name,
          }))}
          systems={data.systems.map((system) => ({
            slug: system.slug,
            name: system.name,
          }))}
          product={null}
        />
      )}
    </div>
  )
}
