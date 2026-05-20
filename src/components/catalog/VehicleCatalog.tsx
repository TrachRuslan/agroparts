"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import {
  getVehicle,
  countProducts,
  getSystemsForVehicle,
} from "@/lib/catalog/repository"
import { resolveVehicleSlug } from "@/lib/catalog/vehicles"

export function VehicleCatalog({ vehicleSlug }: { vehicleSlug: string }) {
  const slug = resolveVehicleSlug(vehicleSlug)
  const vehicle = getVehicle(slug)
  if (!vehicle) return null

  const systemList = getSystemsForVehicle(vehicle.systems)

  return (
    <div className="bg-black">
      <section className="relative pt-6 pb-10 px-4 md:px-8 catalog-mesh border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">
            <Link href="/" className="hover:text-agro-yellow">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/catalog" className="hover:text-agro-yellow">Каталог</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-agro-yellow">{vehicle.name}</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Запчастини <span className="text-agro-yellow">{vehicle.name}</span>
              </h1>
              <p className="text-white/50 leading-relaxed">{vehicle.description}</p>
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden glass-card">
              <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="500px" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6">
          Оберіть систему / вузол
        </h2>
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          {systemList.map((s) => (
            <Link
              key={s.slug}
              href={`/catalog/${slug}/${s.slug}`}
              className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase bg-white/5 text-white/50 hover:bg-agro-yellow hover:text-black transition-all"
            >
              {s.name}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {systemList.map((sys, i) => {
            const total = countProducts(slug, sys.slug)
            return (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/catalog/${slug}/${sys.slug}`}
                  className="group block glass-card overflow-hidden hover:border-agro-yellow/35 hover:shadow-[0_0_40px_-10px_rgba(255,184,0,0.25)] transition-all"
                >
                  <div className="relative h-36 bg-[#141414]">
                    <Image
                      src={sys.image}
                      alt={sys.name}
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      sizes="320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-black text-agro-yellow">
                      {total} товарів
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg group-hover:text-agro-yellow transition-colors">
                      {sys.name}
                    </h3>
                    <p className="text-xs text-white/40 mt-1 line-clamp-2">{sys.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
