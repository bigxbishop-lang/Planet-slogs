import type { Metadata } from "next";
import { Boogaloo, Nunito } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/components/nav";
import { ToastProvider } from "@/components/toast";

const boogaloo = Boogaloo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Slugs NFT",
  description: "Slow and steady wins the whitelist. 3,333 unique snail NFTs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${boogaloo.variable} ${nunito.variable}`}>
      <body>
        <Nav />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
