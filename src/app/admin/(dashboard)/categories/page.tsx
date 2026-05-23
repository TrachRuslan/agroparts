import { TriangleAlert } from "lucide-react"
import { AdminCategoriesManager } from "@/components/admin/AdminCategoriesManager"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { getAdminCategories } from "@/lib/admin/queries"

export default async function AdminCategoriesPage() {
  const data = await getAdminCategories()

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-agro-yellow/80">
          Categories
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
          Керування категоріями
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
          Створюйте, редагуйте та видаляйте категорії з реальними slug, SEO-даними та зображеннями.
        </p>
      </div>

      {data.error ? (
        <AdminEmptyState
          icon={TriangleAlert}
          title="Категорії недоступні"
          description={data.error}
        />
      ) : (
        <AdminCategoriesManager categories={data.categories} />
      )}
    </div>
  )
}
