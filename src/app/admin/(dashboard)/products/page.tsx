import { TriangleAlert } from "lucide-react"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { AdminProductsTable } from "@/components/admin/AdminProductsTable"
import { getAdminProducts } from "@/lib/admin/queries"

export default async function AdminProductsPage() {
  const data = await getAdminProducts()

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-agro-yellow/80">
          Products
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
          Керування товарами
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
          Реальний CRUD для товарів, цін, наявності, featured-статусу, slug, SEO та галереї зображень.
        </p>
      </div>

      {data.error ? (
        <AdminEmptyState
          icon={TriangleAlert}
          title="Товари недоступні"
          description={data.error}
        />
      ) : (
        <AdminProductsTable products={data.products} />
      )}
    </div>
  )
}
