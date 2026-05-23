const CANONICAL_DATABASE_URL =
  "postgresql://agro:123456789@127.0.0.1:5433/agroparts?schema=public"

export function getCanonicalDatabaseUrl() {
  const raw = process.env.DATABASE_URL?.trim()

  if (!raw) {
    process.env.DATABASE_URL = CANONICAL_DATABASE_URL
    return CANONICAL_DATABASE_URL
  }

  try {
    const url = new URL(raw)
    if (url.protocol.startsWith("postgres")) {
      url.username = "agro"
      url.password = "123456789"
      url.hostname = "127.0.0.1"
      url.port = "5433"
      url.pathname = "/agroparts"
      url.search = ""
      url.searchParams.set("schema", "public")

      const normalized = url.toString()
      process.env.DATABASE_URL = normalized
      return normalized
    }
  } catch {
    process.env.DATABASE_URL = CANONICAL_DATABASE_URL
    return CANONICAL_DATABASE_URL
  }

  process.env.DATABASE_URL = CANONICAL_DATABASE_URL
  return CANONICAL_DATABASE_URL
}

export function hasDatabaseUrl() {
  return Boolean(getCanonicalDatabaseUrl())
}
