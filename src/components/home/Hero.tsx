"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Play,
  CheckCircle2,
  Truck,
  Shield,
  Star,
} from "lucide-react"
import Link from "next/link"
import { images } from "@/lib/images"
import { products } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"

const stats = [
  { label: "Товарів у каталозі", value: "25k+", accent: true },
  { label: "Задоволених клієнтів", value: "10k+", accent: false },
  { label: "Років на ринку", value: "15+", accent: false },
]

const featuredProduct = products.find((p) => p.isBestSeller) ?? products[0]

export const Hero = () => {
  return (
    <section className="relative min-h-[72vh] md:min-h-[78vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero}
          alt="Сільськогосподарська техніка на полі"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 z-[1]"
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]"
          aria-hidden
        />
        <div className="hero-gradient z-[2]" />
        <motion.div className="hero-grain z-[3]" aria-hidden />

        {/* Animated orbs */}
        <motion.div
          className="hero-orb w-[380px] h-[380px] bg-agro-yellow/20 -top-20 -right-20"
          style={{ animationDelay: "0s" }}
          aria-hidden
        />
        <motion.div
          className="hero-orb w-[280px] h-[280px] bg-agro-green/15 bottom-20 left-1/4"
          style={{ animationDelay: "-4s", animationDuration: "14s" }}
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 z-[2] opacity-30"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,184,0,0.06) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 10s linear infinite",
          }}
          aria-hidden
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 w-full pt-24 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-agro-yellow text-[11px] font-bold mb-6 md:mb-8 tracking-widest uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agro-green opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-agro-green" />
              </span>
              №1 Постачальник запчастин в Україні
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.92] mb-6 md:mb-8 font-montserrat tracking-tighter">
              ПРОФЕСІЙНІ{" "}
              <span className="premium-gradient-text italic">ЗАПЧАСТИНИ</span>
              <br />
              <span className="text-white/90">ДЛЯ ТРАКТОРІВ</span>
            </h1>

            <p className="text-lg md:text-xl text-white/55 mb-8 md:mb-10 max-w-xl leading-relaxed font-medium">
              Надійні комплектуючі для сільськогосподарської техніки з
              доставкою по всій Україні. Гарантуємо якість кожної деталі.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
              <Link href="/catalog" className="btn-primary-glow group w-full sm:w-auto">
                Перейти до каталогу
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contacts"
                className="btn-outline group w-full sm:w-auto backdrop-blur-sm bg-black/20"
              >
                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                Зв&apos;язатися з менеджером
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/10 w-full max-w-lg lg:max-w-none">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="relative"
                >
                  {i > 0 && (
                    <span className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
                  )}
                  <div
                    className={
                      stat.accent
                        ? "text-2xl md:text-3xl font-black text-agro-yellow tabular-nums"
                        : "text-2xl md:text-3xl font-black text-white tabular-nums"
                    }
                  >
                    {stat.value}
                  </div>
                  <motion.div className="text-[11px] md:text-sm text-white/40 leading-tight mt-0.5">
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual column — floating cards */}
          <div className="lg:col-span-5 hidden lg:block relative min-h-[420px]">
            {/* Featured product card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass-card p-5 absolute right-0 top-8 z-20 w-[280px] border-white/15 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)]"
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#1a1a1a] shrink-0">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-agro-yellow fill-agro-yellow" />
                    <span className="text-[11px] text-white/50 font-bold">
                      {featuredProduct.rating} · Хіт продажів
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-1">
                    {featuredProduct.name}
                  </h4>
                  <p className="text-agro-yellow font-black text-lg tabular-nums">
                    {formatPrice(featuredProduct.price)}
                  </p>
                </div>
              </div>
              <Link
                href={`/product/${featuredProduct.id}`}
                className="mt-4 flex items-center justify-center gap-1 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-agro-yellow hover:text-black hover:border-agro-yellow transition-all"
              >
                Переглянути
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Quality guarantee */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card p-5 absolute -left-4 top-32 z-10 max-w-[240px] border-agro-green/20 shadow-[0_20px_60px_-20px_rgba(34,197,94,0.25)]"
            >
              <div className="flex items-center gap-3">
                <motion.div className="w-11 h-11 rounded-xl bg-agro-green/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-agro-green w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="text-white font-bold text-sm">
                    Гарантія якості
                  </h4>
                  <p className="text-white/40 text-xs leading-snug">
                    Сертифіковані деталі до 24 міс
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Delivery */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="glass-card p-4 absolute right-8 bottom-16 z-10 border-white/15"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-agro-yellow/15 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-agro-yellow" />
                </div>
                <div>
                  <motion.div className="text-white font-bold text-sm">
                    Швидка доставка
                  </motion.div>
                  <p className="text-white/40 text-xs">По всій Україні</p>
                </div>
              </div>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-4 left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
            >
              <Shield className="w-4 h-4 text-agro-yellow" />
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                Офіційний дилер
              </span>
            </motion.div>

            {/* Decorative ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/5 animate-pulse-glow pointer-events-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}
