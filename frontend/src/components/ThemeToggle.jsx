import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react"; // Optional icons
import { cn } from "@/lib/utils"; // if you're using class merging
import { Button } from "@/components/ui/button"; // or use <button>

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "auto");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#8e2de2] text-white px-3 py-2 flex items-center gap-1 rounded-md"
      >
        <Moon className="w-4 h-4" />
        <svg
          className="w-3 h-3"
          fill="white"
          viewBox="0 0 20 20"
        >
          <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
        </svg>
      </Button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 divide-y divide-gray-100 rounded-md shadow-lg z-50">
          <button
            onClick={() => { setTheme("light"); setOpen(false); }}
            className={cn("w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-200", {
              "bg-purple-600 text-white": theme === "light"
            })}
          >
            <Sun className="w-4 h-4 mr-2" /> Light
          </button>
          <button
            onClick={() => { setTheme("dark"); setOpen(false); }}
            className={cn("w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-200", {
              "bg-purple-600 text-white": theme === "dark"
            })}
          >
            <Moon className="w-4 h-4 mr-2" /> Dark
          </button>
           
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
