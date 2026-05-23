import Link from "next/link"
import { ChevronLeft, TriangleAlert } from "lucide-react"
import { notFound } from "next/navigation"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { ProductEditorForm } from "@/components/admin/ProductEditorForm"
import { getAdminProductFormData } from "@/lib/admin/queries"

type Props = {
  params: Promise<{ id: string }>
}

export default async function AdminProductEditPage({ params }: Props) {
  const { id } = await params
  const data = await getAdminProductFormData(id)

  if (!data.error && !data.product) {
    notFound()
  }

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
          Product Editor
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
          Редагування товару
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
          product={
            data.product
              ? {
                  id: data.product.id,
                  name: data.product.name,
                  slug: data.product.slug,
                  price: data.product.price,
                  oldPrice: data.product.oldPrice,
                  sku: data.product.sku,
                  articleNumber: data.product.articleNumber,
                  manufacturer: data.product.manufacturer,
                  description: data.product.description,
                  seoTitle: data.product.seoTitle,
                  seoDescription: data.product.seoDescription,
                  inStock: data.product.inStock,
                  isPopular: data.product.isPopular,
                  vehicleId: data.product.vehicleId,
                  systemSlug: data.product.systemSlug,
                  compatibilities: data.product.compatibilities,
                  images: data.product.images,
                }
              : null
          }
        />
      )}
    </div>
  )
}
