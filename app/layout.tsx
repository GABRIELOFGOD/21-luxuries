import type { Metadata } from "next";
import {
  Montserrat,
  Lora,
  Chivo,
  Playfair_Display,
  Beth_Ellen,
  Nova_Cut,
  Sacramento,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "700"],
});

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  weight: ["300", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700"],
  style: ["italic"],
});

const bethEllen = Beth_Ellen({
  subsets: ["latin"],
  variable: "--font-beth-ellen",
  weight: ["400"],
});

const novaCut = Nova_Cut({
  subsets: ["latin"],
  variable: "--font-nova-cut",
  weight: ["400"],
});

const sacramento = Sacramento({
  subsets: ["latin"],
  variable: "--font-sacramento",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Merlin Fashion",
  description: "Men's fashion e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lora.variable} ${chivo.variable} ${playfair.variable} ${bethEllen.variable} ${novaCut.variable} ${sacramento.variable}`}
    >
      <body className="font-montserrat">
        <Navbar />
        <main className="pt-[10vh]">{children}</main>
        <Footer />
        <p className="text-center text-[#f84258] font-sacramento text-2xl py-4">
          <Link href="/" className="text-[#f84258] no-underline">
            Shivani
          </Link>
          &copy;2019
        </p>
      </body>
    </html>
  );
}
