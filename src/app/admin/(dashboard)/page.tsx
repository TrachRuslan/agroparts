import Link from "next/link"
import { FolderKanban, PackageSearch, ShoppingCart, TriangleAlert } from "lucide-react"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { getAdminDashboardData } from "@/lib/admin/queries"

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData()

  if (data.error || !data.stats) {
    return (
      <AdminEmptyState
        icon={TriangleAlert}
        title="Адмінка чекає на базу даних"
        description={data.error || "Перевірте підключення Prisma до PostgreSQL."}
      />
    )
  }

  const stats = [
    {
      label: "Товарів",
      value: data.stats.productsCount,
      accent: "text-agro-yellow",
      href: "/admin/products",
      icon: PackageSearch,
    },
    {
      label: "Категорій",
      value: data.stats.categoriesCount,
      accent: "text-sky-300",
      href: "/admin/categories",
      icon: FolderKanban,
    },
    {
      label: "Замовлень",
      value: data.stats.ordersCount,
      accent: "text-emerald-300",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Немає в наявності",
      value: data.stats.lowStockCount,
      accent: "text-red-300",
      href: "/admin/products",
      icon: TriangleAlert,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-agro-yellow/80">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
          Керування магазином
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
          В одному місці видно каталог, заявки й операційний стан магазину. Всі цифри нижче читаються з Prisma, а не з моків.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                  {stat.label}
                </p>
                <p className={`mt-4 text-4xl font-black ${stat.accent}`}>{stat.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white/70">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-agro-yellow/75">
              Recent Orders
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Останні замовлення
            </h2>
          </div>
          <Link
            href="/admin/orders"
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Усі замовлення
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {data.recentOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-white/35">
              Ще немає жодного замовлення.
            </div>
          ) : (
            data.recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="text-sm text-white/45">{order.phone}</p>
                  </div>
                  <div className="text-sm text-white/50">
                    {order.items.length > 0
                      ? `${order.items.length} позицій`
                      : "Заявка без товарів"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
