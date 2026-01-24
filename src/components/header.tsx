import Link from "next/link";

import {
  BookOpen,
  ArrowRight,
  Users,
  Clock,
  Award,
  PlayCircle,
} from "lucide-react";
export default function Header() {
  return (
    <div className="relative z-10">
      <header className="px-6 py-8 md:px-12 lg:px-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">
            Handbooks
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-8">
            <a
              href="#features"
              className="text-white/80 hover:text-white transition-colors"
            >
              Возможности
            </a>
            <a
              href="#courses"
              className="text-white/80 hover:text-white transition-colors"
            >
              Курсы
            </a>
            <a
              href="#about"
              className="text-white/80 hover:text-white transition-colors"
            >
              О нас
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
            >
              Войти
            </Link>
            <Link
              href="/auth/register"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              Начать бесплатно
            </Link>
          </div>
        </div>

        {/* Мобильная кнопка */}
        <button className="md:hidden text-white">
          <svg
            className="w-8 h-8"
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
      </header>
    </div>
  );
}
