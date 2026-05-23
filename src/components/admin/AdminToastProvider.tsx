"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastTone = "success" | "error"

interface ToastItem {
  id: string
  title: string
  tone: ToastTone
}

interface ToastContextValue {
  pushToast: (title: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const pushToast = useCallback((title: string, tone: ToastTone = "success") => {
    const id = crypto.randomUUID()
    setItems((current) => [...current, { id, title, tone }])
    window.setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  const value = useMemo(() => ({ pushToast }), [pushToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[120] space-y-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 28, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              className={cn(
                "w-[min(92vw,380px)] rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl",
                item.tone === "success"
                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-50"
                  : "border-red-500/25 bg-red-500/10 text-red-50"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl",
                    item.tone === "success" ? "bg-emerald-500/15" : "bg-red-500/15"
                  )}
                >
                  {item.tone === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setItems((current) => current.filter((value) => value.id !== item.id))
                  }
                  className="text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useAdminToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useAdminToast must be used inside AdminToastProvider")
  }

  return context
}
