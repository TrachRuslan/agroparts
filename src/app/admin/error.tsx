"use client"

export default function AdminError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-red-50">
      <h2 className="text-xl font-semibold">Admin error</h2>
      <p className="mt-3 text-sm leading-6 text-red-100/80">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black"
      >
        Спробувати ще раз
      </button>
    </div>
  )
}
