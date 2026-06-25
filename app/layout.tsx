import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
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
      <body className={`${jakarta.variable} ${newsreader.variable} ${urdu.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}