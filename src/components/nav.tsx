import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/apply", label: "APPLY WL" },
  { href: "/customize", label: "DRESS UP" },
  { href: "/race", label: "RACE" },
];

export default function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3" style={{ background: "rgba(10,6,3,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,120,40,0.2)" }}>
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/60">
          <img src="/snail-red.jpg" alt="Slogs NFT" className="w-full h-full object-cover" />
        </div>
        <span className="font-display text-2xl text-primary text-glow-orange tracking-widest">SLOGS</span>
      </Link>
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href} className={`px-5 py-2 font-display text-sm tracking-widest rounded-lg transition-all duration-200 ${pathname === item.href ? "text-white bg-primary shadow-lg" : "text-foreground/70 hover:text-primary hover:bg-primary/10"}`}>{item.label}</Link>
        ))}
      </div>
      <button className="px-4 py-2 rounded-lg font-display text-sm tracking-wider transition-all hover:bg-primary/20" style={{ border: "1px solid rgba(200,120,40,0.4)", color: "hsl(var(--primary))" }}>CONNECT</button>
    </nav>
  );
}
