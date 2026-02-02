// navbar
// import { useState } from "react";
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
export default function NavbarSection() {
  return (
    <div>
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
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
}
