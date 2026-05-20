"use client"

import React from "react"
import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { advantages } from "@/lib/mock-data"

export const Advantages = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            Наші <span className="text-agro-yellow">переваги</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Ми забезпечуємо високий рівень сервісу та якості продукції для кожного нашого клієнта.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, i) => {
            const IconComponent = (LucideIcons as any)[advantage.icon]
            return (
              <motion.div
                key={advantage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 group hover:bg-agro-yellow/5 transition-all"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-agro-yellow group-hover:rotate-6 transition-all duration-500">
                  {IconComponent && <IconComponent className="w-8 h-8 text-agro-yellow group-hover:text-black transition-colors" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{advantage.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
