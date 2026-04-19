"use client";

import { useState } from "react";
import { useToast } from "@/components/toast";

type TraitOption = {
  id: string;
  label: string;
  emoji: string;
  rarity: string;
};

type TraitCategory = {
  name: string;
  options: TraitOption[];
};

const TRAIT_CATEGORIES: TraitCategory[] = [
  {
    name: "SHELL",
    options: [
      { id: "shell-classic", label: "Classic", emoji: "🐚", rarity: "Common" },
      { id: "shell-mech", label: "Mech", emoji: "⚙️", rarity: "Rare" },
      { id: "shell-crystal", label: "Crystal", emoji: "💎", rarity: "Epic" },
      { id: "shell-gold", label: "Gold", emoji: "✨", rarity: "Legendary" },
      { id: "shell-rocket", label: "Rocket", emoji: "🚀", rarity: "Rare" },
    ],
  },
  {
    name: "HEAD",
    options: [
      { id: "head-none", label: "None", emoji: "😶", rarity: "Common" },
      { id: "head-crown", label: "Crown", emoji: "👑", rarity: "Epic" },
      { id: "head-bag", label: "Paper Bag", emoji: "🛍️", rarity: "Rare" },
      { id: "head-cap", label: "Cap", emoji: "🧢", rarity: "Common" },
      { id: "head-halo", label: "Halo", emoji: "😇", rarity: "Legendary" },
    ],
  },
  {
    name: "EYES",
    options: [
      { id: "eyes-normal", label: "Normal", emoji: "👀", rarity: "Common" },
      { id: "eyes-laser", label: "Laser", emoji: "🔴", rarity: "Epic" },
      { id: "eyes-3d", label: "3D Glasses", emoji: "🕶️", rarity: "Rare" },
      { id: "eyes-star", label: "Star", emoji: "⭐", rarity: "Rare" },
      { id: "eyes-money", label: "Money", emoji: "💰", rarity: "Legendary" },
    ],
  },
  {
    name: "ACCESSORY",
    options: [
      { id: "acc-none", label: "None", emoji: "—", rarity: "Common" },
      { id: "acc-chain", label: "Chain", emoji: "⛓️", rarity: "Rare" },
      { id: "acc-bandana", label: "Bandana", emoji: "🎀", rarity: "Common" },
      { id: "acc-earring", label: "Earring", emoji: "💍", rarity: "Epic" },
      { id: "acc-buddy", label: "Mini Buddy", emoji: "🦎", rarity: "Legendary" },
    ],
  },
  {
    name: "BACKGROUND",
    options: [
      { id: "bg-red", label: "Crimson", emoji: "🔴", rarity: "Common" },
      { id: "bg-gold", label: "Gold", emoji: "🟡", rarity: "Rare" },
      { id: "bg-pink", label: "Pink", emoji: "🩷", rarity: "Common" },
      { id: "bg-dark", label: "Dark", emoji: "⬛", rarity: "Common" },
      { id: "bg-galaxy", label: "Galaxy", emoji: "🌌", rarity: "Legendary" },
    ],
  },
];

const rarityColors: Record<string, string> = {
  Common: "#9CA3AF",
  Rare: "#3B82F6",
  Epic: "#8B5CF6",
  Legendary: "#F59E0B",
};

const bgStyles: Record<string, string> = {
  "bg-galaxy": "radial-gradient(ellipse at center, #2d1b69 0%, #0f0c29 100%)",
  "bg-red": "#991B1B",
  "bg-gold": "#D97706",
  "bg-pink": "#DB2777",
  "bg-dark": "#1F2937",
};

function getRarityScore(selected: Record<string, string>) {
  let score = 0;
  TRAIT_CATEGORIES.forEach((cat) => {
    const opt = cat.options.find((o) => o.id === selected[cat.name]);
    if (!opt) return;
    if (opt.rarity === "Common") score += 1;
    if (opt.rarity === "Rare") score += 3;
    if (opt.rarity === "Epic") score += 6;
    if (opt.rarity === "Legendary") score += 12;
  });
  return score;
}

function getRarityLabel(score: number) {
  if (score >= 40) return { label: "LEGENDARY BUILD", color: "#F59E0B" };
  if (score >= 25) return { label: "EPIC BUILD", color: "#8B5CF6" };
  if (score >= 12) return { label: "RARE BUILD", color: "#3B82F6" };
  return { label: "COMMON BUILD", color: "#9CA3AF" };
}

export default function CustomizePage() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({
    SHELL: "shell-classic",
    HEAD: "head-none",
    EYES: "eyes-normal",
    ACCESSORY: "acc-none",
    BACKGROUND: "bg-dark",
  });

  const selectTrait = (cat: string, id: string) =>
    setSelected((prev) => ({ ...prev, [cat]: id }));

  const getSelectedTrait = (cat: TraitCategory) =>
    cat.options.find((o) => o.id === selected[cat.name]);

  const score = getRarityScore(selected);
  const rl = getRarityLabel(score);

  const headTrait = getSelectedTrait(TRAIT_CATEGORIES[1]);
  const eyesTrait = getSelectedTrait(TRAIT_CATEGORIES[2]);
  const accTrait = getSelectedTrait(TRAIT_CATEGORIES[3]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="bg"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.15) saturate(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
      </div>

      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-slide-in-up">
            <div className="font-display text-5xl md:text-7xl tracking-widest text-secondary text-glow-purple mb-2">
              DRESS UP
            </div>
            <div className="text-muted-foreground text-sm tracking-wider">
              Customize your snail&apos;s look and traits
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 animate-slide-in-left">
              <div className="panel-glass rounded-2xl p-5 mb-4 text-center">
                <div className="font-display text-xs tracking-widest text-muted-foreground mb-4">
                  PREVIEW
                </div>

                <div
                  className="relative mx-auto rounded-xl overflow-hidden mb-4 flex items-center justify-center"
                  style={{
                    width: "220px",
                    height: "220px",
                    background: bgStyles[selected["BACKGROUND"]] ?? "#1F2937",
                  }}
                >
                  <div className="relative">
                    <img
                      src="/snail-bag.jpg"
                      alt="Snail preview"
                      className="w-36 h-36 object-contain animate-float"
                    />
                    {headTrait && headTrait.id !== "head-none" && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">
                        {headTrait.emoji}
                      </div>
                    )}
                    {eyesTrait && eyesTrait.id !== "eyes-normal" && (
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xl">
                        {eyesTrait.emoji}
                      </div>
                    )}
                    {accTrait && accTrait.id !== "acc-none" && (
                      <div className="absolute bottom-2 right-2 text-xl">
                        {accTrait.emoji}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="inline-block px-4 py-1.5 rounded-full font-display text-xs tracking-widest mb-4"
                  style={{
                    background: `${rl.color}22`,
                    border: `1px solid ${rl.color}55`,
                    color: rl.color,
                  }}
                >
                  {rl.label}
                </div>

                <div className="text-left space-y-1.5">
                  {TRAIT_CATEGORIES.map((cat) => {
                    const t = getSelectedTrait(cat);
                    return (
                      <div
                        key={cat.name}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-muted-foreground font-display tracking-wider">
                          {cat.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>{t?.emoji}</span>
                          <span className="text-foreground/70">{t?.label}</span>
                          <span
                            className="font-display"
                            style={{
                              color: rarityColors[t?.rarity ?? "Common"],
                              fontSize: "10px",
                            }}
                          >
                            {t?.rarity}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    toast({ title: "Snail saved!", description: "Your custom snail NFT look has been saved." })
                  }
                  className="py-3 rounded-xl font-display tracking-wider text-sm transition-all hover:scale-[1.03] text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  SAVE LOOK
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast({ title: "Shared!", description: "Your snail build link has been copied." })
                  }
                  className="py-3 rounded-xl font-display tracking-wider text-sm border border-secondary/50 text-secondary hover:bg-secondary/10 transition-all"
                >
                  SHARE
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 animate-slide-in-right">
              <div className="panel-glass rounded-2xl p-5">
                <div className="flex flex-wrap gap-2 mb-6">
                  {TRAIT_CATEGORIES.map((cat, i) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setActiveCategory(i)}
                      className={`px-4 py-2 rounded-xl font-display text-sm tracking-wider transition-all ${
                        activeCategory === i
                          ? "text-white bg-secondary shadow-lg"
                          : "text-muted-foreground border border-muted-foreground/20 hover:border-secondary/40 hover:text-secondary"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="font-display text-xs tracking-widest text-muted-foreground mb-4">
                  SELECT {TRAIT_CATEGORIES[activeCategory].name}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TRAIT_CATEGORIES[activeCategory].options.map((opt) => {
                    const isSelected =
                      selected[TRAIT_CATEGORIES[activeCategory].name] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          selectTrait(TRAIT_CATEGORIES[activeCategory].name, opt.id)
                        }
                        className={`relative p-4 rounded-xl border text-center transition-all duration-200 ${
                          isSelected
                            ? "border-secondary/70 bg-secondary/15 scale-[1.03]"
                            : "border-muted-foreground/20 bg-muted/10 hover:border-secondary/30 hover:bg-secondary/5"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        <div className="text-3xl mb-2">{opt.emoji}</div>
                        <div className="text-sm text-foreground/80 mb-1">
                          {opt.label}
                        </div>
                        <div
                          className="font-display text-xs tracking-wider"
                          style={{ color: rarityColors[opt.rarity] }}
                        >
                          {opt.rarity}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const newSelected: Record<string, string> = {};
                    TRAIT_CATEGORIES.forEach((cat) => {
                      const rand =
                        cat.options[Math.floor(Math.random() * cat.options.length)];
                      newSelected[cat.name] = rand.id;
                    });
                    setSelected(newSelected);
                    toast({ title: "Randomized!", description: "Your snail got a random makeover." });
                  }}
                  className="mt-5 w-full py-3 rounded-xl font-display tracking-wider text-sm border border-accent/40 text-accent hover:bg-accent/10 transition-all"
                >
                  RANDOMIZE ALL 🎲
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                                   }
      
