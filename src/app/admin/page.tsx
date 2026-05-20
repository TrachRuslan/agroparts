import { ArrowUpRight, ShoppingBag, DollarSign, Users, Package } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Загальний дохід", value: "124,500 ₴", icon: DollarSign, trend: "+12.5%", color: "text-agro-green" },
    { label: "Активні замовлення", value: "45", icon: ShoppingBag, trend: "+5.2%", color: "text-agro-yellow" },
    { label: "Нові клієнти", value: "1,240", icon: Users, trend: "+18.1%", color: "text-blue-400" },
    { label: "Немає в наявності", value: "12", icon: Package, trend: "-2.5%", color: "text-red-400" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">Панель <span className="text-agro-yellow">управління</span></h1>
        <p className="text-white/40 font-medium italic">Вітаємо, Адміністратор</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-agro-green text-xs font-black flex items-center bg-agro-green/10 px-3 py-1 rounded-full">
                {stat.trend}
                <ArrowUpRight size={14} />
              </span>
            </div>
            <div className="text-3xl font-black mb-1 tracking-tighter">{stat.value}</div>
            <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 h-96 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <DollarSign size={120} />
          </div>
          <h3 className="font-black mb-8 text-xs uppercase tracking-[0.2em] text-white/50">Аналітика продажів</h3>
          <div className="h-64 w-full flex items-center justify-center text-white/5 italic uppercase font-black tracking-widest text-lg">
            Графік завантажується...
          </div>
        </div>
        <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5">
          <h3 className="font-black mb-8 text-xs uppercase tracking-[0.2em] text-white/50">Останні замовлення</h3>
           <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-[10px] text-white/30 group-hover:bg-agro-yellow group-hover:text-black transition-all">№{1000 + i}</div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">Клієнт #{i}</p>
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">2 хв. тому</p>
                    </div>
                  </div>
                  <span className="text-agro-yellow font-black text-lg tracking-tighter">450.00 ₴</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
