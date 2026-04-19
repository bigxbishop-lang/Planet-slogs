import Link from "next/link";

const cards = [
  {
    href: "/apply",
    label: "APPLY TO WL",
    sub: "Secure your spot",
    color: "from-orange-600 to-amber-500",
    border: "border-orange-500/60",
    glow: "rgba(230,130,50,0.5)",
    icon: "🐌",
  },
  {
    href: "/customize",
    label: "DRESS UP",
    sub: "Customize your snail",
    color: "from-purple-700 to-violet-600",
    border: "border-purple-500/60",
    glow: "rgba(150,80,200,0.5)",
    icon: "👕",
  },
  {
    href: "/race",
    label: "RACE TO WIN",
    sub: "Earn WL in the track",
    color: "from-blue-700 to-cyan-600",
    border: "border-blue-500/60",
    glow: "rgba(60,130,200,0.5)",
    icon: "🏁",
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
      {cards.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className="group block animate-slide-in-up"
          style={{ animationDelay: `${0.2 + i * 0.1}s` }}
        >
          <div
            className={`relative overflow-hidden rounded-2xl border ${item.border} cursor-pointer transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1`}
            style={{
              background: "rgba(15,8,4,0.7)",
              backdropFilter: "blur(10px)",
              boxShadow: `0 4px 24px ${item.glow}`,
            }}
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${item.color}`} />

            <div className="p-6 pb-5">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{item.icon}</span>
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  →
                </div>
              </div>
              <div className="font-display text-2xl tracking-wider text-foreground mb-1 group-hover:text-primary transition-colors">
                {item.label}
              </div>
              <div className="text-sm text-muted-foreground">{item.sub}</div>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at top left, ${item.glow} 0%, transparent 70%)`,
              }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
