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

// Пример данных (в реальности — из API)
const userCourses = [
  {
    id: 1,
    title: "React & TypeScript Deep Dive",
    progress: 68,
    lastLesson: "Хуки + Context API",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    slug: "react-ts-deep",
  },
  {
    id: 2,
    title: "Next.js 15 — Полный стек 2026",
    progress: 23,
    lastLesson: "Server Actions & Route Handlers",
    image:
      "https://images.unsplash.com/photo-1555066931-bf19c9d7c6f4?w=800&auto=format&fit=crop&q=80",
    slug: "nextjs-15-full",
  },
  {
    id: 3,
    title: "Go — от новичка до продакшена",
    progress: 92,
    lastLesson: "gRPC + микросервисы",
    image:
      "https://images.unsplash.com/photo-1555066931-bf19c9d7c6f4?w=800&auto=format&fit=crop&q=80",
    slug: "go-production",
  },
];

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

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

            <nav className="flex-1 px-3 py-8 space-y-2 overflow-y-auto">
              {[
                {
                  icon: LayoutDashboard,
                  label: "Дашборд",
                  href: "/home",
                  active: true,
                },
                {
                  icon: BookOpen,
                  label: "Мои курсы",
                  href: "/courses",
                  active: false,
                },
                {
                  icon: ListChecks,
                  label: "Прогресс и задания",
                  href: "/dashboard/progress",
                },
                {
                  icon: Trophy,
                  label: "Достижения",
                  href: "/dashboard/achievements",
                },
                {
                  icon: Settings,
                  label: "Настройки",
                  href: "/dashboard/settings",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/90
                    transition-all duration-200
                    ${
                      item.active
                        ? "bg-white/15 backdrop-blur-sm border border-white/20 shadow-sm"
                        : "hover:bg-white/10"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && (
                    <ChevronRight className="ml-auto w-4 h-4 opacity-70" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Выход */}
            <div className="p-4 border-t border-white/10">
              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Выйти</span>
              </button>
            </div>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                      {/* Прогресс-бар */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2.5 mb-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-white text-sm font-medium">
                          {course.progress}% • {course.lastLesson}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
                        {course.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2">
                        Последний урок: {course.lastLesson}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
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
