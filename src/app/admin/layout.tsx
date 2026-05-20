import { LayoutDashboard, Box, ShoppingCart, Users, BarChart3, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Головна", href: "/admin" },
    { icon: Box, label: "Товари", href: "/admin/products" },
    { icon: ShoppingCart, label: "Замовлення", href: "/admin/orders" },
    { icon: Users, label: "Клієнти", href: "/admin/customers" },
    { icon: BarChart3, label: "Аналітика", href: "/admin/analytics" },
    { icon: SettingsIcon, label: "Налаштування", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-black pt-24">
      {/* Admin Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl hidden md:block">
        <div className="p-10 sticky top-24">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-agro-yellow font-black mb-12">Адмін-панель</h2>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all group font-bold uppercase text-[10px] tracking-widest"
              >
                <item.icon size={20} className="group-hover:text-agro-yellow transition-colors" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
