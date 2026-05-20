"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/mock-data";

const ReviewsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">What Our Clients Say</h2>
          <p className="text-white/40 max-w-xl mx-auto">Trusted by thousands of farmers and mechanics across the country.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-agro-card p-8 rounded-3xl border border-white/5 relative group hover:border-agro-yellow/30 transition-all"
            >
              <Quote className="absolute top-8 right-8 text-agro-yellow/10 w-16 h-16" />
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className={j < review.rating ? "text-agro-yellow fill-agro-yellow" : "text-white/10"} />
                ))}
              </div>
              <p className="text-lg text-white/80 mb-8 italic">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-agro-yellow/20 flex items-center justify-center font-bold text-agro-yellow">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{review.userName}</h4>
                  <p className="text-xs text-white/40">{review.userRole}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
