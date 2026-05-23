"use client"

import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { createOrderAction } from "@/app/actions/orders"
import { useCatalog } from "@/components/catalog/CatalogProvider"
import { useHydrated } from "@/hooks/useHydrated"
import { idleActionState } from "@/lib/actions"
import { getProductBySlug } from "@/lib/catalog/core"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"

export function CartView() {
  const catalog = useCatalog()
  const hydrated = useHydrated()
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)
  const total = useCartStore((state) => state.total())
  const [orderState, orderAction, orderPending] = useActionState(
    createOrderAction,
    idleActionState
  )

  const productsBySlug = useMemo(
    () =>
      new Map(
        items.map((item) => [item.slug, getProductBySlug(catalog, item.slug)])
      ),
    [catalog, items]
  )

  useEffect(() => {
    if (orderState.status === "success") {
      clear()
    }
  }, [clear, orderState.status])

  if (!hydrated) {
    return <div className="grid lg:grid-cols-3 gap-8" />
  }

  if (orderState.status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <ShoppingBag className="w-16 h-16 text-agro-green mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-3">Замовлення оформлено</h2>
        <p className="text-white/45 mb-8">
          Заявка створена, а кошик очищено. Менеджер скоро зв&apos;яжеться з вами.
        </p>
        <Link href="/catalog" className="btn-primary inline-flex">
          Повернутись у каталог
        </Link>
      </div>
    )
  }

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
        {items.map((item, index) => {
          const product = productsBySlug.get(item.slug)
          return (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="glass-card p-4 flex gap-4"
            >
              <Link
                href={`/product/${item.slug}`}
                className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#141414] shrink-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
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
                      onClick={() =>
                        setQuantity(item.productId, Math.max(1, item.quantity - 1))
                      }
                      className="p-2 text-white/50 hover:text-white"
                      aria-label="Менше"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold tabular-nums">
                      {item.quantity}
                    </span>
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
            Це швидка заявка: менеджер підтвердить сумісність і доставку після отримання замовлення.
          </p>

          <form action={orderAction} className="space-y-3">
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            <input
              required
              name="customerName"
              placeholder="Ваше ім'я"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-agro-yellow/40"
            />
            <input
              required
              name="phone"
              placeholder="Телефон"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-agro-yellow/40"
            />
            <textarea
              name="comment"
              rows={4}
              placeholder="Коментар до замовлення"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-agro-yellow/40"
            />
            {orderState.message && orderState.status === "error" && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {orderState.message}
              </div>
            )}
            <button type="submit" className="btn-primary-glow w-full flex">
              {orderPending ? "Оформлюємо..." : "Оформити заявку"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <Link href="/catalog" className="btn-outline w-full text-sm !py-3">
            Продовжити покупки
          </Link>
        </div>
      </aside>
    </div>
  )
}
