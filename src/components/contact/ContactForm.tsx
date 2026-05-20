"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
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
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
            Ім&apos;я
          </span>
          <input
            required
            name="name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-agro-yellow/50 outline-none"
            placeholder="Ваше ім'я"
          />
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
        </label>
      </div>
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
          Email
        </span>
        <input
          type="email"
          name="email"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-agro-yellow/50 outline-none"
          placeholder="email@company.ua"
        />
      </label>
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
          Повідомлення
        </span>
        <textarea
          required
          name="message"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-agro-yellow/50 outline-none resize-none"
          placeholder="Модель техніки, артикул або опис потрібної запчастини"
        />
      </label>
      <button type="submit" className="btn-primary-glow w-full sm:w-auto">
        <Send className="w-4 h-4" />
        Надіслати заявку
      </button>
    </form>
  )
}
