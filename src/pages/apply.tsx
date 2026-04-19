"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/toast";

const applySchema = z.object({
  twitterHandle: z
    .string()
    .min(2, "Enter your Twitter/X handle")
    .regex(/^@?[A-Za-z0-9_]+$/, "Invalid Twitter handle"),
  walletAddress: z
    .string()
    .min(26, "Enter a valid wallet address")
    .max(64, "Wallet address too long"),
  discordHandle: z.string().min(2, "Enter your Discord username"),
  whyDeserve: z
    .string()
    .min(30, "Tell us more — minimum 30 characters")
    .max(500),
  referralCode: z.string().optional(),
});

type ApplyFormData = z.infer<typeof applySchema>;

const requirements = [
  { icon: "🐦", text: "Follow @SlugsNFT on X" },
  { icon: "🔁", text: "Retweet the pinned post" },
  { icon: "💬", text: "Join our Discord" },
  { icon: "🐌", text: "Tag 2 friends in comments" },
];

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-muted-foreground/20 focus:border-primary/60 focus:outline-none text-foreground placeholder:text-muted-foreground/50 transition-colors";

export default function ApplyPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [checklist, setChecklist] = useState(requirements.map(() => false));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
  });

  const onSubmit = (data: ApplyFormData) => {
    console.log("WL Application:", data);
    setSubmitted(true);
    toast({
      title: "Application submitted!",
      description: "We'll review and get back to you. Stay slow, stay steady.",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="bg"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,6,3,0.7) 0%, rgba(80,30,10,0.5) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4 flex items-start justify-center">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-10 animate-slide-in-up">
            <div className="font-display text-5xl md:text-7xl tracking-widest text-primary text-glow-orange mb-2">
              APPLY TO WL
            </div>
            <div className="text-muted-foreground text-sm tracking-wider">
              500 whitelist spots. Don&apos;t sleep on it.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 animate-slide-in-left">
              <div className="panel-glass rounded-2xl p-6 mb-5">
                <div className="font-display text-xl tracking-widest text-accent mb-5">
                  REQUIREMENTS
                </div>
                <div className="space-y-4">
                  {requirements.map((req, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setChecklist((prev) =>
                          prev.map((v, idx) => (idx === i ? !v : v))
                        )
                      }
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                        checklist[i]
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-muted-foreground/20 bg-muted/10 text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          checklist[i]
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/50"
                        }`}
                      >
                        {checklist[i] && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <span className="text-lg">{req.icon}</span>
                      <span className="text-sm">{req.text}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-5 text-xs text-muted-foreground">
                  Complete all tasks before submitting for a higher chance.
                </div>
              </div>

              <div className="panel-glass rounded-2xl overflow-hidden">
                <img
                  src="/snail-red.jpg"
                  alt="Laser snail"
                  className="w-full object-cover"
                  style={{ maxHeight: "200px", objectPosition: "top" }}
                />
                <div className="p-4">
                  <div className="font-display text-sm tracking-wider text-primary">
                    SNAIL SAYS:
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    &ldquo;Apply now. My laser eyes will find you if you miss
                    it.&rdquo;
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 animate-slide-in-right">
              {submitted ? (
                <div className="panel-glass rounded-2xl p-10 text-center">
                  <div className="text-6xl mb-4">🐌</div>
                  <div className="font-display text-3xl text-primary text-glow-orange mb-3">
                    SUBMITTED!
                  </div>
                  <div className="text-muted-foreground text-sm mb-6">
                    Your application is in the queue. We&apos;ll announce WL winners
                    on X. Stay slow. Stay steady. Win.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      reset();
                    }}
                    className="px-6 py-3 rounded-xl font-display tracking-wider text-white bg-primary hover:bg-primary/90 transition-all"
                  >
                    APPLY ANOTHER
                  </button>
                </div>
              ) : (
                <div className="panel-glass rounded-2xl p-6 md:p-8">
                  <div className="font-display text-xl tracking-widest text-foreground mb-6">
                    YOUR APPLICATION
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="block font-display text-xs tracking-widest text-muted-foreground mb-1.5">
                        TWITTER / X HANDLE
                      </label>
                      <input
                        {...register("twitterHandle")}
                        placeholder="@yourhandle"
                        className={inputClass}
                      />
                      {errors.twitterHandle && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.twitterHandle.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-display text-xs tracking-widest text-muted-foreground mb-1.5">
                        WALLET ADDRESS (ETH/SOL)
                      </label>
                      <input
                        {...register("walletAddress")}
                        placeholder="0x... or your SOL address"
                        className={`${inputClass} font-mono text-sm`}
                      />
                      {errors.walletAddress && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.walletAddress.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-display text-xs tracking-widest text-muted-foreground mb-1.5">
                        DISCORD USERNAME
                      </label>
                      <input
                        {...register("discordHandle")}
                        placeholder="username#0000"
                        className={inputClass}
                      />
                      {errors.discordHandle && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.discordHandle.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-display text-xs tracking-widest text-muted-foreground mb-1.5">
                        WHY DO YOU DESERVE A SPOT?
                      </label>
                      <textarea
                        {...register("whyDeserve")}
                        placeholder="Tell us why you're a true slug fan..."
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
                      {errors.whyDeserve && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.whyDeserve.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-display text-xs tracking-widest text-muted-foreground mb-1.5">
                        REFERRAL CODE (OPTIONAL)
                      </label>
                      <input
                        {...register("referralCode")}
                        placeholder="SLUG-XXXX"
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-display text-lg tracking-widest text-white transition-all duration-200 glow-btn hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                      }}
                    >
                      SUBMIT APPLICATION 🐌
                    </button>

                    <div className="text-center text-xs text-muted-foreground">
                      Applications close when all spots are filled. No promises,
                      only vibes.
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
