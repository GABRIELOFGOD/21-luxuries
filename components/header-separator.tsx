"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

const HeaderSeparator = ({children}: { children: ReactNode }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // console.log("Current pathname:", pathname);
  
  if (isDashboard) {
    return <main className="pt-[10vh]">{children}</main>;
  }

  return (
    <div>
      <Navbar />
        <main className="pt-[10vh]">{children}</main>
        <Footer />
        <p className="text-center text-primary font-sacramento text-2xl py-4">
          <Link href="/" className="text-primary no-underline">
            21 Luxuries
          </Link>
          &copy;2026
        </p>
    </div>
  )
};

export default HeaderSeparator;