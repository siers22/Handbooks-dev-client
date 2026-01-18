// app/page.tsx
"use client";

import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Users,
  Clock,
  Award,
  PlayCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

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

        {/* Hero секция */}
        <section className="px-6 py-20 md:py-32 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8">
            Освойте новые навыки <br />
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              легко и с удовольствием
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-indigo-200/90 max-w-3xl mx-auto mb-12">
            Качественные курсы от экспертов. Практика, проекты, сертификаты и
            поддержка сообщества.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/auth/register"
              className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-[1.03] flex items-center justify-center gap-3"
            >
              Начать учиться бесплатно
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/courses"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 transition-all"
            >
              Посмотреть курсы
            </Link>
          </div>
        </section>

        {/* Преимущества */}
        <section id="features" className="px-6 py-24 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Почему выбирают Handbooks
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PlayCircle,
                title: "Видео высокого качества",
                desc: "Чёткие объяснения, субтитры, возможность ускорения и оффлайн-просмотр",
              },
              {
                icon: Users,
                title: "Активное сообщество",
                desc: "Чат, обсуждения заданий, менторство и поддержка от преподавателей",
              },
              {
                icon: Award,
                title: "Сертификаты и проекты",
                desc: "Реальные проекты в портфолио + именные сертификаты по окончании",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-indigo-200/80">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Футер */}
        <footer className="px-6 py-16 border-t border-white/10 text-center text-white/60">
          <p>© {new Date().getFullYear()} Handbooks. Все права защищены.</p>
        </footer>
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
          animation: blob 15s infinite;
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
