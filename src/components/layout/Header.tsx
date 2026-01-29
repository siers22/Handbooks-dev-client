// components/layout/Header.tsx
"use client";

import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

interface User {
  ID: string;
  Email: string;
  FullName: string;
  AvatarURL: string;
  Role: string;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    // Импортируй getUserData здесь или передавай через props
    // getUserData().then((res) => setUserData(res.data.user));
  }, []);

  return (
    <header className="dashboard-header bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-white p-2"
        onClick={onMenuClick}
        aria-label="Открыть меню"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Search + User Actions */}
      <div className="flex w-full items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Поиск курсов..."
            className="pl-11 w-full pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
          />
        </div>

        {/* Notifications + Avatar */}
        <div className="flex items-center gap-4">
          <button className="relative text-white/80 hover:text-white transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
              3
            </span>
          </button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            {userData?.FullName?.[0] || "G"}
          </div>
        </div>
      </div>
    </header>
  );
}
