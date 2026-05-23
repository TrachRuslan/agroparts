import { AdminLoginForm } from "@/components/admin/AdminLoginForm"
import { isAdminConfigured } from "@/lib/admin/auth"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden lg:block">
            <p className="text-[12px] font-black uppercase tracking-[0.32em] text-agro-yellow/80">
              Premium Ecommerce CMS
            </p>
            <h1 className="mt-5 max-w-xl text-5xl font-black tracking-tight text-white">
              Керуйте каталогом, категоріями та замовленнями з окремої production admin panel.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/45">
              Next.js App Router, Prisma, server actions та реальний CRUD без декоративних заглушок.
            </p>
          </div>

          <AdminLoginForm configured={isAdminConfigured()} />
        </div>
      </div>
    </div>
  )
}
