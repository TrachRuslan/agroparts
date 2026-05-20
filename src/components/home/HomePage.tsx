"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tractor, Star, Quote, Search, ArrowRight } from "lucide-react"
import { Hero } from "@/components/home/Hero"
import { BestSellers } from "@/components/home/BestSellers"
import { Advantages } from "@/components/home/Advantages"
import { HomeBrands } from "@/components/home/HomeBrands"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { categories, reviews } from "@/lib/mock-data"
import { countProducts, products } from "@/lib/catalog/repository"
import { CONTACT } from "@/lib/site-content"

export function HomePage() {
  const totalProducts = products.length

  return (
    <div className="flex flex-col w-full">
      <Hero />

      <section className="py-10 px-4 md:px-8 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/catalog"
            className="glass-card flex items-center gap-4 p-4 md:p-5 group hover:border-agro-yellow/35 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-agro-yellow/10 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-agro-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white group-hover:text-agro-yellow transition-colors">
                Швидкий пошук по каталогу
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                {totalProducts}+ позицій · артикул, SKU, модель техніки · Ctrl+K
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-agro-yellow shrink-0" />
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Каталог"
            title={
              <>
                Запчастини за <span className="text-agro-yellow">моделлю</span>
              </>
            }
            description="Оберіть виробника техніки — далі систему (двигун, КПП, гідравліка) та конкретну деталь."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className="group block glass-card overflow-hidden h-full hover:border-agro-yellow/30"
                >
                  <div className="relative h-28 bg-[#141414]">
                    {category.image && (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                        sizes="200px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-black text-agro-yellow tabular-nums">
                      {countProducts(category.slug)} товарів
                    </span>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <Tractor className="w-5 h-5 text-agro-yellow shrink-0" />
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-agro-yellow transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BestSellers />
      <Advantages />
      <HomeBrands />

      <section id="reviews" className="py-12 md:py-16 px-4 md:px-8 bg-agro-card">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={
              <>
                Що кажуть <span className="text-agro-yellow">клієнти</span>
              </>
            }
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="glass-card p-8 relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-agro-yellow/10" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-agro-yellow fill-agro-yellow" />
                  ))}
                </div>
                <p className="text-white/70 italic mb-6 leading-relaxed text-sm">
                  &ldquo;{review.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-agro-yellow/20 flex items-center justify-center text-agro-yellow font-black">
                    {review.userName[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{review.userName}</h4>
                    <p className="text-white/40 text-xs">{review.userRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-agro-yellow to-transparent" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter uppercase">
            Потрібна допомога у виборі?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Інженери AGROPARTS підберуть запчастину під вашу модель техніки та підтвердять сумісність.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CONTACT.phoneHref} className="btn-primary">
              {CONTACT.phone}
            </a>
            <Link href="/contacts" className="btn-outline">
              Написати менеджеру
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
