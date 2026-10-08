import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Lutfiah! 🎂✨",
  description: "Special birthday surprise for Lutfiah with pastel pink and blue vibes!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full font-sans selection:bg-pink-200 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
