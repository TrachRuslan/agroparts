"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { loginAdminAction } from "@/app/admin/actions"
import type { ActionResult } from "@/lib/actions"

const initialLoginState: ActionResult<{ redirectTo: string }> = {
  status: "idle",
}

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    loginAdminAction,
    initialLoginState
  )

  useEffect(() => {
    if (state.status === "success" && state.data?.redirectTo) {
      router.push(state.data.redirectTo)
      router.refresh()
    }
  }, [router, state])

  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-agro-yellow text-black">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-agro-yellow/80">
            Protected Access
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            AGROPARTS Admin
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/45">
            Увійдіть під admin-акаунтом, щоб керувати каталогом, категоріями й замовленнями.
          </p>
        </div>
      </div>

      {!configured && (
        <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Додайте `ADMIN_EMAIL`, `ADMIN_PASSWORD` і `ADMIN_SESSION_SECRET` у `.env`, інакше вхід буде недоступний.
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.22em] text-white/35">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-agro-yellow/40"
            placeholder="admin@agroparts.ua"
          />
          {state.fieldErrors?.email && (
            <p className="text-sm text-red-300">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.22em] text-white/35">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-agro-yellow/40"
            placeholder="••••••••"
          />
          {state.fieldErrors?.password && (
            <p className="text-sm text-red-300">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {state.message && state.status === "error" && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={!configured || pending}
          className="w-full rounded-2xl bg-agro-yellow px-4 py-3 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Вхід..." : "Увійти в адмінку"}
        </button>
      </form>
    </div>
  )
}
