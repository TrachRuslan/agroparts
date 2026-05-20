/** Curated Unsplash imagery — agricultural & industrial */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const productImagePool = [
  u("photo-1581091226825-a6a2a5aee158"),
  u("photo-1581092160562-40aa08ad7880"),
  u("photo-1504328345606-18bbc8c9d7d1"),
  u("photo-1581092918056-0c4c3a0dfa51"),
  u("photo-1565688534245-05e8f5c56b3e"),
  u("photo-1537466785204-25f7b0e5bcfe"),
  u("photo-1558618666-fcd25c85cd64"),
  u("photo-1597485277543-f863732dafe6"),
  u("photo-1574943324992-31d42d228531"),
  u("photo-1625246333195-78d9c38ad449"),
  u("photo-1592982537447-7955394c040e"),
  u("photo-1581092162381-898a43b472c6"),
  u("photo-1586528116311-ad8dd3c8310d"),
  u("photo-1581091870595-5e8d0e5e5b0e"),
  u("photo-1565043666747-69f6646db940"),
  u("photo-1578321272176-b7bbc0670043"),
  u("photo-1500382017468-9049fed747ef"),
  u("photo-1625246333195-78d9c38ad449", 600),
  u("photo-1416879595882-3373a0480b5b"),
  u("photo-1464226184884-fa280b87c399"),
  u("photo-1597843696606-24dac5ca7a50"),
  u("photo-1625246333195-78d9c38ad449", 900),
  u("photo-1574263867127-a8ad2a0ebcf4"),
  u("photo-1559827260-dc66d52bef19"),
] as const

function hashString(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function getProductImage(seed: string, variant = 0): string {
  const idx = (hashString(seed) + variant) % productImagePool.length
  return productImagePool[idx]
}

export const images = {
  hero: u("photo-1625246333195-78d9c38ad449", 1920),
  heroAlt: u("photo-1592982537447-7955394c040e", 1920),
  categories: {
    mtz: u("photo-1592982537447-7955394c040e", 600),
    umz: u("photo-1625246333195-78d9c38ad449", 600),
    belarus: u("photo-1597485277543-f863732dafe6", 600),
    hydraulics: u("photo-1581091226825-a6a2a5aee158", 600),
    engines: u("photo-1565688534245-05e8f5c56b3e", 600),
    filters: u("photo-1581092160562-40aa08ad7880", 600),
    electrical: u("photo-1581092918056-0c4c3a0dfa51", 600),
    attachments: u("photo-1574943324992-31d42d228531", 600),
    combines: u("photo-1500382017468-9049fed747ef", 600),
    oils: u("photo-1558618666-fcd25c85cd64", 600),
    default: u("photo-1581092162381-898a43b472c6", 600),
  },
} as const
