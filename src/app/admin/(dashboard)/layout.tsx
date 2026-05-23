import { AdminChrome } from "@/components/admin/AdminChrome"
import { requireAdminSession } from "@/lib/admin/auth"

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAdminSession()

  return <AdminChrome email={session.email}>{children}</AdminChrome>
}
