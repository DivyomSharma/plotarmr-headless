"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("bluorng-theme") as "dark" | "light" | null;
    const sysPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Default to dark per prompt specs, unless saved otherwise
    const initialTheme = stored || "dark";
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("bluorng-theme", newTheme);

    // CSS variables are transitioned smoothly in globals.css over 500ms
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // Optional ripple burst effect
    gsap.to(".theme-toggle-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn fixed top-6 right-6 z-50 glass-panel rounded-full p-2 flex items-center gap-2 cursor-none"
      data-cursor-interactive="true"
      data-cursor-label="Switch Theme"
      aria-label="Toggle Dark Mode"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ${
          theme === "dark" ? "translate-x-8 bg-zinc-800" : "translate-x-0 bg-white"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-zinc-900" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        <Sun size={14} className="text-zinc-500 opacity-50" />
        <Moon size={14} className="text-zinc-500 opacity-50" />
      </div>
    </button>
  );
}
