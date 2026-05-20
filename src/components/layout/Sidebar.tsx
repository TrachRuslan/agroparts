"use client";

import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-8">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-6 px-4">
            Categories
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => {
              const IconComponent = (Icons as any)[category.icon] || Icons.Settings;
              const isActive = pathname === `/catalog/${category.slug}`;

              return (
                <Link
                  key={category.id}
                  href={`/catalog/${category.slug}`}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-agro-yellow text-agro-dark font-bold shadow-lg shadow-agro-yellow/20" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <IconComponent 
                    size={20} 
                    className={cn(
                      "transition-transform group-hover:scale-110",
                      isActive ? "text-agro-dark" : "text-agro-yellow/70"
                    )} 
                  />
                  <span className="text-sm">{category.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Support Card */}
        <div className="mx-4 p-6 rounded-2xl bg-gradient-to-br from-agro-green/20 to-agro-dark border border-agro-green/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs text-agro-green font-bold uppercase tracking-wider mb-2">Need Help?</p>
            <h4 className="text-sm font-bold mb-4">Professional Selection Support</h4>
            <button className="text-xs bg-agro-green text-white px-4 py-2 rounded-lg font-bold hover:bg-agro-green/80 transition-all">
              Call Specialist
            </button>
          </div>
          <Icons.Phone className="absolute -bottom-4 -right-4 text-agro-green/10 w-24 h-24 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
