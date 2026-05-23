import "server-only"

import { mkdir, writeFile } from "node:fs/promises"
import { extname, join } from "node:path"
import { randomUUID } from "node:crypto"

const MAX_IMAGE_SIZE = 8 * 1024 * 1024

function sanitizeFileExtension(file: File) {
  const fromName = extname(file.name).toLowerCase()
  if (fromName) return fromName

  if (file.type === "image/png") return ".png"
  if (file.type === "image/webp") return ".webp"
  return ".jpg"
}

async function persistFile(file: File, directory: string) {
  if (!file.size) return null
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.")
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be smaller than 8 MB.")
  }

  const uploadDirectory = join(process.cwd(), "public", "uploads", directory)
  await mkdir(uploadDirectory, { recursive: true })

  const extension = sanitizeFileExtension(file)
  const filename = `${Date.now()}-${randomUUID()}${extension}`
  const destination = join(uploadDirectory, filename)
  const buffer = Buffer.from(await file.arrayBuffer())

  await writeFile(destination, buffer)

  return `/uploads/${directory}/${filename}`
}

export async function uploadImage(file: File, directory: string) {
  return persistFile(file, directory)
}

export async function uploadImages(files: File[], directory: string) {
  const uploaded = await Promise.all(files.map((file) => persistFile(file, directory)))
  return uploaded.filter((value): value is string => Boolean(value))
}
