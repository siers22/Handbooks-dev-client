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
export default function NavbarSection() {
  return (
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
  );
}
