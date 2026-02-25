"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please provide Username & Password");
      return;
    }
    // For now, just redirect to home
    window.location.href = "/";
  };

  return (
    <div className="pt-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center max-w-4xl mx-auto pt-10">
        <Image
          src="/work/Merlin-Fashion-master/images/login-images/login.png"
          alt="Login illustration"
          width={440}
          height={400}
          className="w-full max-w-md"
        />

        <div className="border-l-2 border-[#e85a48] h-96 hidden md:block"></div>

        <Image
          src="/work/Merlin-Fashion-master/images/login-images/undraw_empty_cart_co35.png"
          alt="Empty cart"
          width={440}
          height={400}
          className="w-full max-w-md"
        />
      </div>

      <div className="text-center mt-8">
        <h2 className="text-black text-2xl mb-8">LOGIN HERE 🦄</h2>

        <form onSubmit={handleLogin} className="max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Username Or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded text-center"
            id="username"
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded text-center"
            id="password"
          />
          <br />

          <button
            type="submit"
            className="w-32 h-12 text-[#e85a48] bg-white border-none rounded cursor-pointer hover:bg-gray-100 transition-colors mr-4"
          >
            LOG IN
          </button>

          <Link href="/">
            <button
              type="button"
              className="w-32 h-12 text-[#5d5c61] bg-transparent border-none cursor-pointer hover:text-gray-700 transition-colors"
            >
              BACK
            </button>
          </Link>
        </form>
      </div>

      <hr className="border-[#caa529] w-16 mx-auto my-8" />

      <h4 className="text-center text-lg font-bold text-[#5d5c61] mb-4">
        Or login with
      </h4>

      <div className="flex justify-center space-x-4 pb-8">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/work/Merlin-Fashion-master/images/icons/icon-google.png"
            alt="Google login"
            width={33}
            height={30}
          />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/work/Merlin-Fashion-master/images/icons/fb.png"
            alt="Facebook login"
            width={35}
            height={30}
          />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/work/Merlin-Fashion-master/images/icons/favicon.jpg"
            alt="Other login"
            width={35}
            height={32}
          />
        </a>
      </div>
    </div>
  );
}
