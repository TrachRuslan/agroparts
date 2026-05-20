"use client"

import React from "react"
import { motion } from "framer-motion"
import { products } from "@/lib/mock-data"
import { ProductCard } from "@/components/catalog/ProductCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const BestSellers = () => {
  const bestSellers = products.filter(p => p.isBestSeller || p.isPopular)

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-black relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-agro-yellow/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Популярні <br /><span className="text-agro-yellow">товари</span>
            </h2>
            <p className="text-white/40">
              Найпопулярніші позиції, які обирають наші клієнти найчастіше. Гарантована наявність та найкраща ціна.
            </p>
          </div>
          <Link 
            href="/catalog" 
            className="flex items-center gap-2 text-agro-yellow font-bold hover:gap-4 transition-all"
          >
            Всі товари <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
