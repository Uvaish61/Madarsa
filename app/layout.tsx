import type { Metadata } from "next";
import { Cinzel, DM_Mono, Lora, Noto_Nastaliq_Urdu, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  adjustFontFallback: false,
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["600"],
  adjustFontFallback: false,
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  adjustFontFallback: false,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
  adjustFontFallback: false,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  adjustFontFallback: false,
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-urdu",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Madarsa Tech Academy",
  description: "Tech Mastery. Deeni Excellence. — bilingual, career-focused tech courses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${dmMono.variable} ${newsreader.variable} ${urdu.variable} ${cinzel.variable} ${lora.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}