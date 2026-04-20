import Hero from "../components/hero";
import FeatureCards from "../components/feature-cards";

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
          src="/background.jpg"
          alt="background"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.2)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(120,20,20,0.6) 0%, rgba(10,6,3,0.3) 40%, rgba(180,130,20,0.3) 100%)",
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
