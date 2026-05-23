"use client"

import { useTransition } from "react"
import { ClipboardList } from "lucide-react"
import { updateOrderStatusAction } from "@/app/admin/actions"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { useAdminToast } from "@/components/admin/AdminToastProvider"
import { formatPrice } from "@/lib/utils"

const statusOptions = [
  { value: "NEW", label: "Нове" },
  { value: "CONTACTED", label: "Передзвонили" },
  { value: "PROCESSING", label: "В роботі" },
  { value: "COMPLETED", label: "Завершено" },
  { value: "CANCELED", label: "Скасовано" },
] as const

type OrderStatus = (typeof statusOptions)[number]["value"]

interface OrderRow {
  id: string
  customerName: string
  phone: string
  comment: string | null
  status: OrderStatus
  total: number
  createdAt: Date
  items: Array<{
    id: string
    productName: string
    quantity: number
    price: number
  }>
}

export function AdminOrdersTable({ orders }: { orders: OrderRow[] }) {
  const { pushToast } = useAdminToast()
  const [pending, startTransition] = useTransition()

  if (orders.length === 0) {
    return (
      <AdminEmptyState
        icon={ClipboardList}
        title="Замовлень поки немає"
        description="Коли клієнти залишать заявки або оформлять кошик, вони з'являться тут зі статусом, телефоном і складом замовлення."
      />
    )
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-white/10 bg-black/20 text-[11px] uppercase tracking-[0.2em] text-white/35">
            <tr>
              <th className="px-5 py-4">Клієнт</th>
              <th className="px-5 py-4">Коментар</th>
              <th className="px-5 py-4">Позиції</th>
              <th className="px-5 py-4">Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/[0.06] last:border-0">
                <td className="px-5 py-5 align-top">
                  <p className="font-medium text-white">{order.customerName}</p>
                  <p className="mt-1 text-sm text-white/45">{order.phone}</p>
                  <p className="mt-2 text-xs text-white/30">
                    {new Intl.DateTimeFormat("uk-UA", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(order.createdAt))}
                  </p>
                </td>
                <td className="px-5 py-5 align-top text-sm leading-6 text-white/55">
                  {order.comment || "Без коментаря"}
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="space-y-2">
                    {order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/65"
                        >
                          <p className="font-medium text-white">{item.productName}</p>
                          <p className="mt-1 text-xs text-white/35">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 px-4 py-4 text-sm text-white/35">
                        Заявка без товарів
                      </div>
                    )}
                    <p className="text-sm font-semibold text-agro-yellow">
                      Разом: {formatPrice(order.total)}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 align-top">
                  <select
                    value={order.status}
                    disabled={pending}
                    onChange={(event) =>
                      startTransition(async () => {
                        const response = await updateOrderStatusAction(
                          order.id,
                          event.target.value
                        )
                        pushToast(
                          response.message || "Оновлено",
                          response.status === "success" ? "success" : "error"
                        )
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-agro-yellow/40"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value} className="bg-black">
                        {status.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
