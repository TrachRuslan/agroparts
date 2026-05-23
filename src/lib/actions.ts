export interface ActionResult<TData = undefined> {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
  data?: TData
}

export const idleActionState: ActionResult = {
  status: "idle",
}
