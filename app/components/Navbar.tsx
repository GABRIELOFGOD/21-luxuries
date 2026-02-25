"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-around items-center min-h-[10vh] bg-background fixed top-0 w-full z-50 border-b border-border">
      <div className="logo">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/brand/21-luxuries logo.jpg"
            alt="21 Luxuries Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h3 className="text-2xl md:text-3xl font-bold text-primary font-sacramento">
            21 Luxuries
          </h3>
        </Link>
      </div>

      <ul
        className={`nav-links md:flex md:space-x-8 md:static md:flex-row md:bg-transparent md:h-auto md:w-auto md:translate-x-0 absolute right-0 top-[10vh] h-[90vh] bg-background flex-col items-center w-[60%] transform transition-transform duration-500 ease-in ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 border-l md:border-l-0 border-border`}
      >
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/"
            className="text-foreground hover:text-primary no-underline block py-4 px-6 transition-colors"
          >
            Home
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/products"
            className="text-foreground hover:text-primary no-underline block py-4 px-6 transition-colors"
          >
            Products
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/categories"
            className="text-foreground hover:text-primary no-underline block py-4 px-6 transition-colors"
          >
            Categories
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/contact"
            className="text-foreground hover:text-primary no-underline block py-4 px-6 transition-colors"
          >
            ContactUs
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/login"
            className="text-primary hover:text-primary no-underline block py-4 px-6 transition-colors"
            id="login"
          >
            Login
          </Link>
        </li>
      </ul>

      <div className="burger md:hidden cursor-pointer" onClick={toggleMenu}>
        <div
          className={`w-6 h-0.5 bg-primary mb-1 transition-all duration-300 ${isOpen ? "-rotate-45 translate-y-2" : ""}`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-primary mb-1 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "rotate-45 -translate-y-2" : ""}`}
        ></div>
      </div>
    </nav>
  );
}
