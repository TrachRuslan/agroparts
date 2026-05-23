import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const SESSION_COOKIE = "agroparts-admin-session"
const SESSION_TTL_SECONDS = 60 * 60 * 12

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "agroparts-admin"
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex")
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) return false
  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD)
}

function createSessionToken(email: string) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000
  const payload = `${email}:${expiresAt}`
  const signature = signPayload(payload)
  return `${payload}:${signature}`
}

function parseSessionToken(token: string | undefined | null) {
  if (!token) return null

  const parts = token.split(":")
  if (parts.length < 3) return null

  const signature = parts.pop()
  const expiresAt = parts.pop()
  const email = parts.join(":")

  if (!signature || !expiresAt || !email) return null
  const payload = `${email}:${expiresAt}`

  if (!safeEqual(signPayload(payload), signature)) return null
  if (Number(expiresAt) < Date.now()) return null

  return { email, expiresAt: Number(expiresAt) }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return parseSessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

export async function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL ?? ""
  const configuredPassword = process.env.ADMIN_PASSWORD ?? ""

  if (!configuredEmail || !configuredPassword) return false

  return safeEqual(email, configuredEmail) && safeEqual(password, configuredPassword)
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function requireAdminSession() {
  const session = await getAdminSession()
  if (!session) {
    redirect("/admin/login")
  }

  return session
}
