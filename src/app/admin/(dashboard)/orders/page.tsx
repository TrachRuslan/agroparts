import { TriangleAlert } from "lucide-react"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { AdminOrdersTable } from "@/components/admin/AdminOrdersTable"
import { getAdminOrders } from "@/lib/admin/queries"

export default async function AdminOrdersPage() {
  const data = await getAdminOrders()

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-agro-yellow/80">
          Orders
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
          Замовлення
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
          Таблиця заявок з клієнтом, телефоном, коментарем, складом кошика та статусом обробки.
        </p>
      </div>

      {data.error ? (
        <AdminEmptyState
          icon={TriangleAlert}
          title="Замовлення недоступні"
          description={data.error}
        />
      ) : (
        <AdminOrdersTable orders={data.orders} />
      )}
    </div>
  )
}
