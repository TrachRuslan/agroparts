"use client"

import { useActionState } from "react"
import { CheckCircle2, Send } from "lucide-react"
import { createOrderAction } from "@/app/actions/orders"
import { idleActionState } from "@/lib/actions"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    createOrderAction,
    idleActionState
  )

  if (state.status === "success") {
    return (
      <div className="glass-card p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-agro-green mx-auto mb-4" />
        <h3 className="text-xl font-black text-white mb-2">Заявку надіслано</h3>
        <p className="text-white/45 text-sm">
          Менеджер зв&apos;яжеться з вами протягом 30 хвилин у робочий час.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="glass-card p-6 md:p-8 space-y-5">
      <input type="hidden" name="items" value="[]" />
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
            Ім&apos;я
          </span>
          <input
            required
            name="customerName"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-agro-yellow/50 outline-none"
            placeholder="Ваше ім'я"
          />
          {state.fieldErrors?.customerName && (
            <p className="mt-2 text-sm text-red-300">
              {state.fieldErrors.customerName[0]}
            </p>
          )}
        </label>
        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
            Телефон
          </span>
          <input
            required
            type="tel"
            name="phone"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-agro-yellow/50 outline-none"
            placeholder="+38 (0__) ___ __ __"
          />
          {state.fieldErrors?.phone && (
            <p className="mt-2 text-sm text-red-300">{state.fieldErrors.phone[0]}</p>
          )}
        </label>
      </div>
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
          Повідомлення
        </span>
        <textarea
          required
          name="comment"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-agro-yellow/50 outline-none resize-none"
          placeholder="Модель техніки, артикул або опис потрібної запчастини"
        />
      </label>
      {state.message && state.status === "error" && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.message}
        </div>
      )}
      <button type="submit" className="btn-primary-glow w-full sm:w-auto">
        <Send className="w-4 h-4" />
        {pending ? "Надсилаємо..." : "Надіслати заявку"}
      </button>
    </form>
  )
}
