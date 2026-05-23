"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { AlertTriangle, X } from "lucide-react"

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[131] w-[min(92vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-[#090909] p-6 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-white">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-6 text-white/55">
                  {description}
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
            >
              Скасувати
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
            >
              {confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
