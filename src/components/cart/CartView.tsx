"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { formatPrice } from "@/lib/utils"
import { getProductBySlug } from "@/lib/catalog/repository"

export function CartView() {
  const items = useCartStore((s) => s.items)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.total())

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <ShoppingBag className="w-16 h-16 text-white/15 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-3">Кошик порожній</h2>
        <p className="text-white/45 mb-8">
          Додайте запчастини з каталогу — ми допоможемо підібрати сумісні деталі.
        </p>
        <Link href="/catalog" className="btn-primary inline-flex">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item, i) => {
          const product = getProductBySlug(item.slug)
          return (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-4 flex gap-4"
            >
              <Link
                href={`/product/${item.slug}`}
                className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#141414] shrink-0"
              >
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-bold text-white hover:text-agro-yellow line-clamp-2"
                >
                  {item.name}
                </Link>
                {product && (
                  <p className="text-[10px] text-white/35 mt-1 uppercase tracking-wide">
                    SKU {product.sku}
                  </p>
                )}
                <p className="text-agro-yellow font-black mt-2 tabular-nums">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="p-2 text-white/50 hover:text-white"
                      aria-label="Менше"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="p-2 text-white/50 hover:text-white"
                      aria-label="Більше"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-white/30 hover:text-red-400"
                    aria-label="Видалити"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <aside className="lg:sticky lg:top-24 h-fit">
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-white/40">
            Підсумок
          </h3>
          <div className="flex justify-between text-white">
            <span className="text-white/50">Разом</span>
            <span className="font-black text-xl tabular-nums">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-white/35">
            Доставка розраховується менеджером після оформлення заявки.
          </p>
          <Link href="/contacts" className="btn-primary-glow w-full flex">
            Оформити заявку
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/catalog" className="btn-outline w-full text-sm !py-3">
            Продовжити покупки
          </Link>
        </div>
      </aside>
    </div>
  )
}
