"use client"

import { useActionState, useEffect, useMemo, useState, useTransition } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { Edit3, FolderKanban, Plus, Trash2, X } from "lucide-react"
import { deleteCategoryAction, saveCategoryAction } from "@/app/admin/actions"
import { AdminEmptyState } from "@/components/admin/AdminEmptyState"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { useAdminToast } from "@/components/admin/AdminToastProvider"
import type { ActionResult } from "@/lib/actions"
import { slugify } from "@/lib/slug"

interface CategoryItem {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  seoTitle: string | null
  seoDescription: string | null
  _count: { products: number }
}

const initialCategoryActionState: ActionResult<{ categoryId: string }> = {
  status: "idle",
}

export function AdminCategoriesManager({
  categories,
}: {
  categories: CategoryItem[]
}) {
  const { pushToast } = useAdminToast()
  const [editing, setEditing] = useState<CategoryItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const activeDelete = useMemo(
    () => categories.find((item) => item.id === deleteId) ?? null,
    [categories, deleteId]
  )

  if (categories.length === 0) {
    return (
      <AdminEmptyState
        icon={FolderKanban}
        title="Поки що немає категорій"
        description="Створіть першу категорію техніки з SEO-описом та зображенням."
        action={
          <button
            type="button"
            onClick={() => setEditing({} as CategoryItem)}
            className="btn-primary inline-flex !py-3 !px-5 !rounded-2xl"
          >
            <Plus className="h-4 w-4" />
            Додати категорію
          </button>
        }
      />
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setEditing({} as CategoryItem)}
          className="btn-primary inline-flex !py-3 !px-5 !rounded-2xl"
        >
          <Plus className="h-4 w-4" />
          Нова категорія
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
          >
            <div className="relative h-44 bg-black/30">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="420px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/25">
                  No image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs uppercase tracking-[0.22em] text-agro-yellow/80">
                  /catalog/{category.slug}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <p className="text-sm leading-6 text-white/50">
                {category.description || "Опис поки що не додано."}
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/65">
                Товарів у категорії:{" "}
                <span className="font-semibold text-white">{category._count.products}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(category)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  <Edit3 className="h-4 w-4" />
                  Редагувати
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(category.id)}
                  className="inline-flex items-center justify-center rounded-2xl border border-red-500/20 px-4 py-3 text-red-200 transition hover:border-red-400/40 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CategoryDialog
        key={editing?.id ?? "new-category"}
        open={editing !== null}
        category={editing && editing.id ? editing : null}
        onOpenChange={(open) => !open && setEditing(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Видалити категорію?"
        description="Категорію можна видалити лише якщо в ній немає товарів."
        confirmLabel={pending ? "Видалення..." : "Видалити"}
        onConfirm={() => {
          if (!activeDelete) return
          startTransition(async () => {
            const response = await deleteCategoryAction(activeDelete.id)
            pushToast(
              response.message || "Готово",
              response.status === "success" ? "success" : "error"
            )
            if (response.status === "success") {
              setDeleteId(null)
            }
          })
        }}
      />
    </div>
  )
}

function CategoryDialog({
  open,
  category,
  onOpenChange,
}: {
  open: boolean
  category: CategoryItem | null
  onOpenChange: (open: boolean) => void
}) {
  const { pushToast } = useAdminToast()
  const [state, formAction, pending] = useActionState(
    saveCategoryAction,
    initialCategoryActionState
  )
  const [slugValue, setSlugValue] = useState(category?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(category?.slug))

  useEffect(() => {
    if (state.status === "success") {
      pushToast(state.message || "Категорію збережено")
      onOpenChange(false)
    }
    if (state.status === "error" && state.message) {
      pushToast(state.message, "error")
    }
  }, [onOpenChange, pushToast, state])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[131] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10 bg-[#090909] p-6 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-white">
                {category ? "Редагувати категорію" : "Нова категорія"}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-white/45">
                Керуйте каталогом техніки, slug та SEO без змін у коді.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <form action={formAction} className="space-y-5">
            {category?.id && <input type="hidden" name="id" value={category.id} />}
            <input type="hidden" name="currentImage" value={category?.image ?? ""} />

            <div className="grid gap-5 md:grid-cols-2">
              <CategoryField label="Назва" error={state.fieldErrors?.name?.[0]}>
                <input
                  name="name"
                  defaultValue={category?.name ?? ""}
                  onChange={(event) => {
                    if (!slugTouched) {
                      setSlugValue(slugify(event.target.value))
                    }
                  }}
                  className={inputClassName}
                />
              </CategoryField>

              <CategoryField label="Slug" error={state.fieldErrors?.slug?.[0]}>
                <input
                  name="slug"
                  value={slugValue}
                  onChange={(event) => {
                    setSlugTouched(true)
                    setSlugValue(event.target.value)
                  }}
                  className={inputClassName}
                />
              </CategoryField>
            </div>

            <CategoryField label="Опис">
              <textarea
                name="description"
                rows={4}
                defaultValue={category?.description ?? ""}
                className={inputClassName}
              />
            </CategoryField>

            <div className="grid gap-5 md:grid-cols-2">
              <CategoryField label="SEO title">
                <input
                  name="seoTitle"
                  defaultValue={category?.seoTitle ?? ""}
                  className={inputClassName}
                />
              </CategoryField>
              <CategoryField label="Зображення">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className={inputClassName}
                />
              </CategoryField>
            </div>

            <CategoryField label="SEO description">
              <textarea
                name="seoDescription"
                rows={4}
                defaultValue={category?.seoDescription ?? ""}
                className={inputClassName}
              />
            </CategoryField>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={pending}
                className="rounded-2xl bg-agro-yellow px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
              >
                {pending ? "Збереження..." : "Зберегти категорію"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function CategoryField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/35">
        {label}
      </span>
      {children}
      {error && <p className="text-sm text-red-300">{error}</p>}
    </label>
  )
}

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-agro-yellow/40"
