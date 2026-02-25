import { ReactNode } from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const MainWebLayout = ({children}: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background"
      <Navbar />
        <main className="pt-[10vh]">{children}</main>
        <Footer />
        <p className="text-center text-[#f84258] font-sacramento text-2xl py-4">
          <Link href="/" className="text-[#f84258] no-underline">
            Shivani
          </Link>
          &copy;2019
        </p>
    </div>
  );
}

export default MainWebLayout;