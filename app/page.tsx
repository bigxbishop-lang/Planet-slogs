import Hero from "@/components/hero";
import FeatureCards from "@/components/feature-cards";

const stats = [
  { label: "SUPPLY", value: "3,333" },
  { label: "WL SPOTS", value: "500" },
  { label: "MINT PRICE", value: "TBA" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="Slugs background"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.2)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(120,20,20,0.6) 0%, rgba(10,6,3,0.3) 40%, rgba(180,130,20,0.3) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(120,30,10,0.5) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-24 pb-16 px-4">
        <Hero />

        <div
          className="flex items-center gap-6 md:gap-12 mb-14 panel-glass rounded-2xl px-8 py-4 animate-slide-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl text-primary text-glow-orange">
                {stat.value}
              </div>
              <div className="font-display text-xs tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <FeatureCards />

        <div className="mt-14 flex items-end gap-8 justify-center">
          <div
            className="animate-float w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl opacity-80"
            style={{ animationDelay: "0s" }}
          >
            <img
              src="/snail-red.jpg"
              alt="Red laser snail"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="animate-float w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-secondary/30 shadow-xl opacity-70"
            style={{ animationDelay: "0.8s" }}
          >
            <img
              src="/snail-bag.jpg"
              alt="Paper bag snail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className="mt-10 text-center text-muted-foreground text-xs font-display tracking-widest animate-slide-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          SLOW AND STEADY WINS THE WHITELIST
        </div>
      </div>
    </div>
  );
}
