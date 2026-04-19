export default function Hero() {
  return (
    <div className="text-center mb-12 animate-slide-in-up">
      <div className="font-display text-8xl md:text-[10rem] leading-none tracking-widest shimmer-text mb-2">
        SLUGS
      </div>
      <div className="font-display text-xl md:text-2xl tracking-[0.4em] text-foreground/70 uppercase mb-3">
        NFT Collection
      </div>
      <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <span className="w-12 h-px bg-primary/50" />
        <span className="font-display tracking-widest text-accent">SEASON 1</span>
        <span className="w-12 h-px bg-primary/50" />
      </div>
    </div>
  );
}
