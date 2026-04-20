import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";


type Snail = {
  id: number;
  name: string;
  emoji: string;
  color: string;
  speed: number;
  position: number;
  finished: boolean;
  finishTime?: number;
};

const SNAIL_TEMPLATES = [
  { name: "Turbo Slug", emoji: "🐌", color: "#E05C20" },
  { name: "Laser Eyes", emoji: "🔴", color: "#DC2626" },
  { name: "Paper Bag", emoji: "🛍️", color: "#92400E" },
  { name: "Galaxy Shell", emoji: "🌌", color: "#7C3AED" },
  { name: "Gold Rush", emoji: "✨", color: "#D97706" },
  { name: "Mech Mode", emoji: "⚙️", color: "#2563EB" },
];

const PLAYER_IDX = 0;
const TRACK_LENGTH = 100;

function createSnails(): Snail[] {
  return SNAIL_TEMPLATES.map((t, i) => ({
    id: i,
    name: t.name,
    emoji: t.emoji,
    color: t.color,
    speed: 0.5 + Math.random() * 1.5,
    position: 0,
    finished: false,
  }));
}

type RaceStatus = "idle" | "countdown" | "racing" | "finished";

export default function RacePage() {
  const { toast } = useToast();
  const [snails, setSnails] = useState<Snail[]>(createSnails);
  const [status, setStatus] = useState<RaceStatus>("idle");
  const [countdown, setCountdown] = useState(3);
  const [finishOrder, setFinishOrder] = useState<number[]>([]);
  const [playerBoost, setPlayerBoost] = useState(3);
  const [wlWon, setWlWon] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const lastUpdateRef = useRef(0);

  const resetRace = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setSnails(createSnails());
    setStatus("idle");
    setCountdown(3);
    setFinishOrder([]);
    setPlayerBoost(3);
    setWlWon(false);
  }, []);

  useEffect(() => {
    if (status !== "countdown") return;
    if (countdown <= 0) {
      setStatus("racing");
      startTimeRef.current = performance.now();
      lastUpdateRef.current = performance.now();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown]);

  useEffect(() => {
    if (status !== "racing") return;

    const finished: number[] = [...finishOrder];

    const tick = (now: number) => {
      const dt = (now - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = now;

      setSnails((prev) => {
        const next = prev.map((s) => {
          if (s.finished) return s;
          const jitter = (Math.random() - 0.4) * 0.8;
          const newPos = Math.min(TRACK_LENGTH, s.position + (s.speed + jitter) * dt * 12);
          const justFinished = newPos >= TRACK_LENGTH && !s.finished;
          if (justFinished) finished.push(s.id);
          return {
            ...s,
            position: newPos,
            finished: newPos >= TRACK_LENGTH,
            finishTime: justFinished ? now - startTimeRef.current : s.finishTime,
          };
        });

        if (next.every((s) => s.finished)) {
          setStatus("finished");
          setFinishOrder([...finished]);
          const playerRank = finished.indexOf(PLAYER_IDX) + 1;
          if (playerRank <= 2) {
            setWlWon(true);
            toast({
              title: playerRank === 1 ? "YOU WON! WL SECURED!" : "2nd place! WL secured!",
              description: "Congratulations! Your snail is a legend.",
            });
          } else {
            toast({
              title: `You finished #${playerRank}`,
              description: "So close! Race again to try for WL.",
            });
          }
          return next;
        }

        return next;
      });

      if (status === "racing") {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, toast]);

  const boost = () => {
    if (playerBoost <= 0 || status !== "racing") return;
    setPlayerBoost((b) => b - 1);
    setSnails((prev) =>
      prev.map((s) =>
        s.id === PLAYER_IDX && !s.finished
          ? { ...s, position: Math.min(TRACK_LENGTH, s.position + 8) }
          : s
      )
    );
  };

  const playerRank = finishOrder.indexOf(PLAYER_IDX) >= 0
    ? finishOrder.indexOf(PLAYER_IDX) + 1
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="bg"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.15) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,6,3,0.7) 0%, rgba(20,60,120,0.4) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-slide-in-up">
            <div className="font-display text-5xl md:text-7xl tracking-widest text-accent text-glow-gold mb-2">
              SNAIL RACE
            </div>
            <div className="text-muted-foreground text-sm tracking-wider">
              Top 2 finishers win a WL spot — use your boosts wisely
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="panel-glass rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-accent font-display text-sm tracking-wider">PRIZE:</span>
              <span className="text-foreground font-display text-sm">WL SPOT</span>
            </div>
            <div className="panel-glass rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-primary font-display text-sm tracking-wider">BOOSTS:</span>
              <span className="font-display text-sm">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={i < playerBoost ? "text-primary" : "text-muted-foreground/30"}>
                    ⚡
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="panel-glass rounded-2xl p-5 mb-5 animate-slide-in-up">
            <div className="font-display text-xs tracking-widest text-muted-foreground mb-4">
              RACE TRACK
            </div>
            <div className="space-y-3">
              {snails.map((snail, idx) => (
                <div key={snail.id} className="flex items-center gap-3">
                  <div
                    className={`w-6 text-center font-display text-sm flex-shrink-0 ${
                      snail.id === PLAYER_IDX ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {finishOrder.indexOf(snail.id) >= 0
                      ? `#${finishOrder.indexOf(snail.id) + 1}`
                      : idx + 1}
                  </div>

                  <div
                    className={`w-24 text-xs font-display tracking-wide flex-shrink-0 ${
                      snail.id === PLAYER_IDX ? "text-primary" : "text-foreground/70"
                    }`}
                  >
                    {snail.name}
                    {snail.id === PLAYER_IDX && (
                      <span className="ml-1 text-accent">(YOU)</span>
                    )}
                  </div>

                  <div
                    className="flex-1 relative h-8 rounded-lg overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="absolute right-0 top-0 bottom-0 w-px opacity-50"
                      style={{
                        background:
                          "repeating-linear-gradient(180deg, white 0px, white 4px, transparent 4px, transparent 8px)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 flex items-center"
                      style={{
                        left: `${Math.min(95, snail.position)}%`,
                        transform: "translateX(-50%) translateY(-50%)",
                      }}
                    >
                      <span
                        className="text-lg"
                        style={{
                          filter: `drop-shadow(0 0 6px ${snail.color})`,
                          animation:
                            status === "racing" && !snail.finished
                              ? "bounce-snail 0.3s ease-in-out infinite"
                              : "none",
                        }}
                      >
                        {snail.emoji}
                      </span>
                    </div>
                    <div
                      className="h-full transition-all duration-150 rounded-l-lg"
                      style={{
                        width: `${snail.position}%`,
                        background: `linear-gradient(90deg, ${snail.color}30, ${snail.color}60)`,
                      }}
                    />
                  </div>

                  {snail.finished && (
                    <div className="flex-shrink-0 w-10 text-center">
                      {finishOrder.indexOf(snail.id) === 0 && <span className="text-xl">🥇</span>}
                      {finishOrder.indexOf(snail.id) === 1 && <span className="text-xl">🥈</span>}
                      {finishOrder.indexOf(snail.id) === 2 && <span className="text-xl">🥉</span>}
                      {finishOrder.indexOf(snail.id) > 2 && (
                        <span className="text-sm text-muted-foreground font-display">DNF</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {status === "countdown" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center animate-slide-in-up">
                <div className="font-display text-[10rem] leading-none text-primary text-glow-orange">
                  {countdown === 0 ? "GO!" : countdown}
                </div>
                <div className="font-display text-2xl tracking-widest text-muted-foreground">
                  GET READY
                </div>
              </div>
            </div>
          )}

          {status === "finished" && (
            <div className="panel-glass rounded-2xl p-8 mb-5 text-center animate-slide-in-up">
              {wlWon ? (
                <>
                  <div className="text-6xl mb-3">🏆</div>
                  <div className="font-display text-4xl text-accent text-glow-gold mb-2">
                    WL SECURED!
                  </div>
                  <div className="font-display text-xl text-primary mb-1">
                    YOU FINISHED #{playerRank}
                  </div>
                  <div className="text-muted-foreground text-sm mb-6">
                    Your snail is unstoppable. Apply with your wallet to claim
                    your WL spot.
                  </div>
                  <div className="flex gap-3 justify-center">
                    <a
                      href="/apply"
                      className="px-6 py-3 rounded-xl font-display tracking-wider text-white transition-all hover:scale-[1.03]"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                      }}
                    >
                      CLAIM WL SPOT
                    </a>
                    <button
                      type="button"
                      onClick={resetRace}
                      className="px-6 py-3 rounded-xl font-display tracking-wider border border-muted-foreground/30 text-muted-foreground hover:text-foreground transition-all"
                    >
                      RACE AGAIN
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-3">😅</div>
                  <div className="font-display text-3xl text-foreground mb-2">
                    YOU FINISHED #{playerRank}
                  </div>
                  <div className="text-muted-foreground text-sm mb-6">
                    Top 2 get WL. So close! Give your snail another shot.
                  </div>
                  <button
                    type="button"
                    onClick={resetRace}
                    className="px-8 py-4 rounded-xl font-display text-lg tracking-wider text-white transition-all hover:scale-[1.03] glow-btn"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                    }}
                  >
                    RACE AGAIN 🐌
                  </button>
                </>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {status === "idle" && (
              <button
                type="button"
                onClick={() => setStatus("countdown")}
                className="px-10 py-5 rounded-2xl font-display text-2xl tracking-widest text-white transition-all hover:scale-[1.05] glow-btn"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              >
                START RACE 🏁
              </button>
            )}

            {status === "racing" && (
              <>
                <button
                  type="button"
                  onClick={boost}
                  disabled={playerBoost <= 0}
                  className="px-8 py-4 rounded-2xl font-display text-xl tracking-widest text-white transition-all hover:scale-[1.05] active:scale-[0.95] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #EF4444, #F59E0B)" }}
                >
                  ⚡ BOOST! ({playerBoost} left)
                </button>
                <div className="text-muted-foreground font-display text-sm tracking-wider animate-pulse">
                  RACE IN PROGRESS...
                </div>
              </>
            )}
          </div>

          {status === "idle" && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center animate-slide-in-up">
              {[
                { icon: "🏁", title: "RACE", desc: "Your snail vs 5 others on the track" },
                { icon: "⚡", title: "BOOST", desc: "Use 3 boosts to surge ahead during the race" },
                { icon: "🏆", title: "WIN WL", desc: "Finish in top 2 to secure a whitelist spot" },
              ].map((tip) => (
                <div key={tip.title} className="panel-glass rounded-xl p-4">
                  <div className="text-3xl mb-2">{tip.icon}</div>
                  <div className="font-display text-sm tracking-wider text-primary mb-1">
                    {tip.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{tip.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
                          }
