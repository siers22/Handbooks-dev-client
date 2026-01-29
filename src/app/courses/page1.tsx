// app/courses/page.tsx

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import AnimatedGradientBackground from "@/components/layout/Animatedgradientbackground"; // твой компонент
import NavbarSection from "@/components/sections/NavbarSection";

type Course = {
  ID: string;
  Slug: string;
  Title: string;
  Subtitle: string | null;
  Description: string | null;
  CoverURL: string | null;
  Status: string;
  Price: number;
  Currency: string;
  Level: "beginner" | "intermediate" | "advanced";
  CreatedAt: string;
  UpdatedAt: string;
  CreatedID: string;
};

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    const res = await fetch("http://localhost:3001/courses", {
      headers: {
        Accept: "application/json",
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiN2U2NWU3LTJlNzEtNDM0ZC05NTE2LWZkNGNiODg3ZDEwMiIsImVtYWlsIjoiTklHR0BHR0EuTU9PVkUiLCJyb2xlIjoiIiwidG9rZW5faWQiOiIzMjMwMzIzNjJkMzAzMTJkMzIzNzIwMzEzMDNhMzAzODNhMzEzNzJlMzczNjMzMzkzMjM2MzEzMTIwMmIzMDMwMzAzMDIwNTU1NDQzMjA2ZDNkMmIzMzMxMzEzNzJlMzEzODMxMzMzMjM4MzkzMDM0NjM2MjM3NjUzNjM1NjUzNzJkMzI2NTM3MzEyZDM0MzMzNDY0MmQzOTM1MzEzNjJkNjY2NDM0NjM2MjM4MzgzNzY0MzEzMDMyIiwiaXNzIjoiaGFuZGJvb2tzLXNlcnZlciIsInN1YiI6ImNiN2U2NWU3LTJlNzEtNDM0ZC05NTE2LWZkNGNiODg3ZDEwMiIsImV4cCI6MTc2OTU5NDg5NywiaWF0IjoxNzY5NTA4NDk3fQ.DTnhi09DVGBBSFJBUwISi6kiWU_vNuFXi8Jt9Z6s7xI`,
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error("Failed to fetch courses");

    const json = await res.json();
    courses = json?.data?.courses ?? [];
  } catch (error) {
    console.error(error);
    // fallback UI
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Анимированный фон */}
      <AnimatedGradientBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Хедер — как в dashboard */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/home" className="text-white text-xl font-bold">
              Handbooks
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Поиск курсов, тем или инструкторов..."
                className="w-full pl-11 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/80 hover:text-white transition">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                2
              </span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
              A
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Заголовок */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Все курсы
              </h1>
              <p className="text-indigo-200/80 text-lg">
                Откройте для себя новые знания • {courses.length} доступно
              </p>

              <Link href="/courses/create">
                <button className="w-full mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 mb-6">
                  Записаться на курс
                </button>
              </Link>
            </div>

            {/* Сетка курсов — glassmorphism + hover */}
            {courses.length === 0 ? (
              <div className="text-center py-20 text-indigo-200/70 text-xl">
                Пока курсов нет. Скоро появятся!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {courses.map((course) => (
                  <Link
                    key={course.ID}
                    href={`/courses/${course.Slug}`}
                    className="group block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 hover:border-indigo-500/30"
                  >
                    {/* Обложка */}
                    <div className="relative aspect-video overflow-hidden">
                      {course.CoverURL ? (
                        <img
                          src={course.CoverURL}
                          alt={course.Title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-800/50 to-purple-800/50 flex items-center justify-center">
                          <span className="text-white/40 text-xl">
                            Нет обложки
                          </span>
                        </div>
                      )}
                      {/* Бейдж уровня */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
                        {course.Level === "beginner"
                          ? "Начинающий"
                          : course.Level === "intermediate"
                            ? "Средний"
                            : "Продвинутый"}
                      </div>
                    </div>

                    {/* Контент карточки */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                        {course.Title}
                      </h3>

                      {course.Subtitle && (
                        <p className="text-indigo-200/70 text-sm mb-4 line-clamp-2">
                          {course.Subtitle}
                        </p>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-white">
                          {course.Price === 0
                            ? "Бесплатно"
                            : `${Math.round(course.Price)} ${course.Currency}`}
                        </span>
                        <span className="text-sm px-3 py-1 bg-indigo-600/30 rounded-full text-indigo-300">
                          Подробнее →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
