"use client"

import { useActionState, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImagePlus, Sparkles, Trash2 } from "lucide-react"
import { saveProductAction } from "@/app/admin/actions"
import { useAdminToast } from "@/components/admin/AdminToastProvider"
import type { ActionResult } from "@/lib/actions"
import { slugify } from "@/lib/slug"
import { cn } from "@/lib/utils"

interface ExistingImage {
  id: string
  url: string
}

const initialProductActionState: ActionResult<{ productId: string; slug: string }> = {
  status: "idle",
}

interface ProductEditorFormProps {
  categories: Array<{ id: string; name: string }>
  systems: Array<{ slug: string; name: string }>
  product?: {
    id: string
    name: string
    slug: string
    price: number
    oldPrice: number | null
    sku: string
    articleNumber: string
    manufacturer: string | null
    description: string
    seoTitle: string | null
    seoDescription: string | null
    inStock: boolean
    isPopular: boolean
    vehicleId: string | null
    systemSlug: string
    compatibilities: Array<{ model: string }>
    images: ExistingImage[]
  } | null
}

export function ProductEditorForm({
  categories,
  systems,
  product,
}: ProductEditorFormProps) {
  const router = useRouter()
  const { pushToast } = useAdminToast()
  const [state, formAction, pending] = useActionState(
    saveProductAction,
    initialProductActionState
  )
  const [slugValue, setSlugValue] = useState(product?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(product?.slug))
  const [keptImages, setKeptImages] = useState<ExistingImage[]>(product?.images ?? [])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  useEffect(() => {
    if (state.status === "success") {
      pushToast(state.message || "Збережено")
      if (state.data?.productId) {
        router.push(`/admin/products/${state.data.productId}`)
        router.refresh()
      }
    }
    if (state.status === "error" && state.message) {
      pushToast(state.message, "error")
    }
  }, [pushToast, router, state])

  const compatibilityValue = useMemo(
    () => product?.compatibilities.map((item) => item.model).join("\n") ?? "",
    [product?.compatibilities]
  )

  return (
    <form action={formAction} className="space-y-8">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-8">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-agro-yellow/75">
                Main Fields
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Основна інформація
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Назва товару" error={state.fieldErrors?.name?.[0]}>
                <input
                  name="name"
                  defaultValue={product?.name ?? ""}
                  required
                  onChange={(event) => {
                    if (!slugTouched) {
                      setSlugValue(slugify(event.target.value))
                    }
                  }}
                  className={inputClassName}
                />
              </Field>

              <Field label="Slug" error={state.fieldErrors?.slug?.[0]}>
                <div className="flex gap-2">
                  <input
                    name="slug"
                    value={slugValue}
                    required
                    onChange={(event) => {
                      setSlugTouched(true)
                      setSlugValue(event.target.value)
                    }}
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={() => setSlugValue(slugify(slugValue))}
                    className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-white/10 px-3 text-white/60 transition hover:border-white/20 hover:text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </Field>

              <Field label="Ціна" error={state.fieldErrors?.price?.[0]}>
                <input
                  type="number"
                  min="0"
                  name="price"
                  defaultValue={product?.price ?? 0}
                  required
                  className={inputClassName}
                />
              </Field>

              <Field label="Стара ціна" error={state.fieldErrors?.oldPrice?.[0]}>
                <input
                  type="number"
                  min="0"
                  name="oldPrice"
                  defaultValue={product?.oldPrice ?? ""}
                  className={inputClassName}
                />
              </Field>

              <Field label="SKU" error={state.fieldErrors?.sku?.[0]}>
                <input
                  name="sku"
                  defaultValue={product?.sku ?? ""}
                  required
                  className={inputClassName}
                />
              </Field>

              <Field
                label="Артикул"
                error={state.fieldErrors?.articleNumber?.[0]}
              >
                <input
                  name="articleNumber"
                  defaultValue={product?.articleNumber ?? ""}
                  required
                  className={inputClassName}
                />
              </Field>

              <Field label="Бренд" error={state.fieldErrors?.brand?.[0]}>
                <input
                  name="brand"
                  defaultValue={product?.manufacturer ?? ""}
                  required
                  className={inputClassName}
                />
              </Field>

              <Field label="Категорія" error={state.fieldErrors?.categoryId?.[0]}>
                <select
                  name="categoryId"
                  defaultValue={product?.vehicleId ?? ""}
                  required
                  className={inputClassName}
                >
                  <option value="">Оберіть категорію</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Система" error={state.fieldErrors?.systemSlug?.[0]}>
                <select
                  name="systemSlug"
                  defaultValue={product?.systemSlug ?? systems[0]?.slug ?? ""}
                  required
                  className={inputClassName}
                >
                  <option value="">Оберіть систему</option>
                  {systems.map((system) => (
                    <option key={system.slug} value={system.slug}>
                      {system.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5 grid gap-5">
              <Field
                label="Опис"
                error={state.fieldErrors?.description?.[0]}
              >
                <textarea
                  name="description"
                  rows={7}
                  defaultValue={product?.description ?? ""}
                  className={cn(inputClassName, "min-h-[180px] resize-y")}
                />
              </Field>

              <Field
                label="Сумісність"
                hint="Кожна модель з нового рядка або через кому."
                error={state.fieldErrors?.compatibility?.[0]}
              >
                <textarea
                  name="compatibility"
                  rows={5}
                  defaultValue={compatibilityValue}
                  className={cn(inputClassName, "min-h-[132px] resize-y")}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-agro-yellow/75">
                SEO
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                SEO та метадані
              </h2>
            </div>
            <div className="grid gap-5">
              <Field label="SEO title">
                <input
                  name="seoTitle"
                  defaultValue={product?.seoTitle ?? ""}
                  className={inputClassName}
                />
              </Field>
              <Field label="SEO description">
                <textarea
                  name="seoDescription"
                  rows={4}
                  defaultValue={product?.seoDescription ?? ""}
                  className={cn(inputClassName, "min-h-[120px] resize-y")}
                />
              </Field>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-agro-yellow/75">
                Status
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Стан товару</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">В наявності</p>
                  <p className="text-xs text-white/40">Показувати доступним для покупки</p>
                </div>
                <input
                  type="checkbox"
                  name="inStock"
                  defaultChecked={product?.inStock ?? true}
                  className="h-5 w-5 accent-agro-yellow"
                />
              </label>

              <label className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">Featured</p>
                  <p className="text-xs text-white/40">Показувати серед популярних товарів</p>
                </div>
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={product?.isPopular ?? false}
                  className="h-5 w-5 accent-agro-yellow"
                />
              </label>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-agro-yellow/75">
                Gallery
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Зображення товару
              </h2>
            </div>

            {keptImages.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-3">
                {keptImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                  >
                    <input type="hidden" name="retainImageIds" value={image.id} />
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setKeptImages((current) =>
                          current.filter((item) => item.id !== image.id)
                        )
                      }
                      className="absolute right-2 top-2 rounded-xl bg-black/70 p-2 text-white/70 transition hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {previewImages.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-3">
                {previewImages.map((image) => (
                  <div
                    key={image}
                    className="relative aspect-square overflow-hidden rounded-2xl border border-agro-yellow/25"
                  >
                    <Image src={image} alt="" fill className="object-cover" sizes="160px" />
                  </div>
                ))}
              </div>
            )}

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-black/20 px-5 py-10 text-center transition hover:border-agro-yellow/35">
              <ImagePlus className="h-6 w-6 text-agro-yellow" />
              <p className="mt-3 text-sm font-medium text-white">
                Додати нові фото в галерею
              </p>
              <p className="mt-1 text-xs text-white/40">
                JPG, PNG або WebP до 8 MB
              </p>
              <input
                type="file"
                name="galleryImages"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? [])
                  setPreviewImages(files.map((file) => URL.createObjectURL(file)))
                }}
              />
            </label>
          </section>

          <div className="flex flex-col gap-3">
            {state.message && state.status === "error" && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {state.message}
              </div>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-2xl bg-agro-yellow px-4 py-3 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Збереження..." : product ? "Зберегти зміни" : "Створити товар"}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/35">
          {label}
        </span>
        {hint && <span className="text-xs text-white/30">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-sm text-red-300">{error}</p>}
    </label>
  )
}

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-agro-yellow/40"
