"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-around items-center min-h-[10vh] bg-white fixed top-0 w-full z-50">
      <div className="logo">
        <h3 className="text-center text-4xl font-medium">
          <Link
            href="/"
            className="text-[#f84258] no-underline font-['Sacramento']"
          >
            Merlin Fashion
          </Link>
        </h3>
      </div>

      <ul
        className={`nav-links md:flex md:space-x-8 md:static md:flex-row md:bg-transparent md:h-auto md:w-auto md:translate-x-0 absolute right-0 top-[10vh] h-[90vh] bg-[#232323] flex-col items-center w-[60%] transform transition-transform duration-500 ease-in ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/"
            className="text-black md:text-black hover:text-[#f84258] no-underline block py-4 px-6"
          >
            Home
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/products"
            className="text-black md:text-black hover:text-[#f84258] no-underline block py-4 px-6"
          >
            Products
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/categories"
            className="text-black md:text-black hover:text-[#f84258] no-underline block py-4 px-6"
          >
            Categories
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/contact"
            className="text-black md:text-black hover:text-[#f84258] no-underline block py-4 px-6"
          >
            ContactUs
          </Link>
        </li>
        <li className="opacity-0 md:opacity-100">
          <Link
            href="/login"
            className="text-[#f84258] md:text-[#f84258] hover:text-[#f84258] no-underline block py-4 px-6"
            id="login"
          >
            Login
          </Link>
        </li>
      </ul>

      <div className="burger md:hidden cursor-pointer" onClick={toggleMenu}>
        <div
          className={`w-6 h-0.5 bg-[#f84258] mb-1 transition-all duration-300 ${isOpen ? "rotate-[-45deg] translate-y-2" : ""}`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-[#f84258] mb-1 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-[#f84258] transition-all duration-300 ${isOpen ? "rotate-[45deg] -translate-y-2" : ""}`}
        ></div>
      </div>
    </nav>
  );
}
