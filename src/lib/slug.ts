const translitMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ye",
  ж: "zh", з: "z", и: "y", і: "i", ї: "yi", й: "y", к: "k", л: "l",
  м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
  ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ь: "",
  ю: "yu", я: "ya", "'": "", "’": "",
}

export function slugify(text: string): string {
  const lower = text.toLowerCase().trim()
  let result = ""
  for (const char of lower) {
    result += translitMap[char] ?? char
  }
  return result
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function buildProductSlug(
  name: string,
  vehicleSlug: string,
  systemSlug: string,
  index: number
): string {
  const base = slugify(name).slice(0, 40)
  return `${base}-${vehicleSlug}-${systemSlug}-${index}`
}
