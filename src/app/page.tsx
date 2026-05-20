"use client";

import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { Advantages } from "@/components/home/Advantages";
import { categories, reviews } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { Tractor, Star, Quote } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      {/* Categories Grid */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/catalog/${category.slug}`}
                className="glass-card p-8 group hover:border-agro-yellow/50 transition-all text-center"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-agro-yellow transition-colors">
                  <Tractor className="w-8 h-8 text-agro-yellow group-hover:text-black" />
                </div>
                <h3 className="text-white font-bold group-hover:text-agro-yellow transition-colors uppercase tracking-wider text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BestSellers />
      <Advantages />

      {/* Reviews Section */}
      <section id="reviews" className="py-12 md:py-16 px-4 md:px-8 bg-agro-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              Що кажуть <span className="text-agro-yellow">клієнти</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="glass p-8 rounded-3xl relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-agro-yellow/10" />
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-agro-yellow fill-agro-yellow" />
                  ))}
                </div>
                <p className="text-white/70 italic mb-8 leading-relaxed">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-agro-yellow/20 flex items-center justify-center text-agro-yellow font-black">
                    {review.userName[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{review.userName}</h4>
                    <p className="text-white/40 text-xs">{review.userRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-agro-yellow to-transparent" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
            Потрібна допомога у виборі?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Наші фахівці безкоштовно проконсультують вас та допоможуть підібрати необхідні запчастини під вашу модель техніки.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="tel:+380671234567" className="btn-primary">
              Зателефонувати нам
            </Link>
            <Link href="/contacts" className="btn-outline">
              Написати у Viber
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
