import { useNavigate } from "react-router-dom";

const stats = [
  { label: "SUPPLY", value: "3,333" },
  { label: "WL SPOTS", value: "500" },
  { label: "MINT PRICE", value: "TBA" },
];

const cards = [
  {
    emoji: "🐌",
    title: "APPLY TO WL",
    desc: "Secure your spot",
    route: "/apply",
    border: "border-orange-500",
    arrow: "bg-orange-500",
  },
  {
    emoji: "👕",
    title: "DRESS UP",
    desc: "Customize your snail",
    route: "/customize",
    border: "border-purple-500",
    arrow: "bg-purple-500",
  },
  {
    emoji: "🏁",
    title: "RACE TO WIN",
    desc: "Earn WL in the track",
    route: "/race",
    border: "border-blue-500",
    arrow: "bg-blue-500",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="background"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.2)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(120,20,20,0.6) 0%, rgba(10,6,3,0.2) 40%, rgba(180,130,20,0.25) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-24 pb-16 px-4">

        {/* Hero text */}
        <div className="text-center mb-12 animate-slide-in-up">
          <div className="font-display text-8xl md:text-[10rem] leading-none tracking-widest shimmer-text mb-2">
            SLOGS
          </div>
          <div className="font-display text-xl md:text-2xl tracking-[0.4em] text-white/70 uppercase mb-3">
            NFT Collection
          </div>
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="w-12 h-px bg-orange-400/50" />
            <span className="font-display tracking-widest text-yellow-400">SEASON 1</span>
            <span className="w-12 h-px bg-orange-400/50" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 md:gap-12 mb-14 panel-glass rounded-2xl px-8 py-4 animate-slide-in-up">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-2xl md:text-3xl text-glow-orange"
                style={{ color: i === 1 ? "#a78bfa" : "#f97316" }}
              >
                {stat.value}
              </div>
              <div className="font-display text-xs tracking-widest text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl animate-slide-in-up">
          {cards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.route)}
              className={`relative panel-glass rounded-2xl p-6 text-left border-t-2 ${card.border} hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-3xl">{card.emoji}</span>
                <span className={`w-8 h-8 rounded-full ${card.arrow} flex items-center justify-center text-white text-sm`}>
                  →
                </span>
              </div>
              <div className="font-display text-xl tracking-wider text-white mb-1">
                {card.title}
              </div>
              <div className="text-sm text-white/50">{card.desc}</div>
            </button>
          ))}
        </div>

        {/* Bottom snail images */}
        <div className="mt-14 flex items-end gap-8 justify-center">
          <div className="animate-float w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-xl opacity-80">
            <img src="/Slog-1.jpg" alt="Red snail" className="w-full h-full object-cover" />
          </div>
          <div className="animate-float w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-xl opacity-70"
            style={{ animationDelay: "0.8s" }}>
            <img src="/Slog-2.jpg" alt="Bag snail" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mt-10 text-center text-white/40 text-xs font-display tracking-widest animate-slide-in-up">
          SLOW AND STEADY WINS THE WHITELIST
        </div>
      </div>
    </div>
  );
}
