// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  LayoutDashboard,
  ListChecks,
  Trophy,
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Bell,
  User,
} from "lucide-react";
import AnimatedGradientBackground from "@/components/layout/Animatedgradientbackground";
import NavbarSection from "@/components/sections/NavbarSection";
import CoursesGrid from "@/components/content/CoursesGrid";

// Пример данных (в реальности — из API)

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <AnimatedGradientBackground />

      <div className="relative z-10 flex min-h-screen">
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white/5 backdrop-blur-xl border-r border-white/10
          transform transition-transform duration-300 lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Handbooks</span>
              </Link>
            </div>

            <NavbarSection />
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 lg:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col">
          <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
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

            <div className="flex w-full items-center gap-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Поиск курсов..."
                  className="pl-11 w-full pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50  transition-all"
                />
              </div>

              <div className="flex items-center gap-4">
                <button className="relative text-white/80 hover:text-white transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                    3
                  </span>
                </button>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Основной контент */}
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {/* Приветствие */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Добро пожаловать, Artem!
                </h1>
                <p className="text-indigo-200/80 text-lg">
                  Продолжайте обучение или откройте что-то новое
                </p>
              </div>

              {/* Сетка курсов */}
              <CoursesGrid />
            </div>
          </main>
        </div>
      </div>

      {/* Анимации */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(80px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-60px, 80px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 18s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
