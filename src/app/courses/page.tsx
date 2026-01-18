// app/courses/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Users, Star, Search, Filter } from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  slug: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  students: number;
  rating: number;
  coverUrl: string;
  isFree: boolean;
};

export default function AllCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/courses");
        if (!response.ok) throw new Error("Не удалось загрузить курсы");

        const data = await response.json();

        // Гарантируем, что courses — это массив
        const coursesData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.courses)
              ? data.courses
              : [];

        setCourses(coursesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Что-то пошло не так...");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Фоновые blob'ы */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16">
        {/* Заголовок + поиск */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Все курсы
            </h1>
            <p className="mt-3 text-xl text-indigo-200/80">
              Выберите то, что хотите изучить прямо сейчас
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по названию или описанию..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
            />
          </div>
        </div>

        {/* Состояния загрузки / ошибки */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400 border-solid mx-auto mb-6" />
            <p className="text-white/80 text-xl">Загружаем курсы...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-8 py-6 rounded-2xl text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Список курсов */}
        {!loading && !error && (
          <>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20 text-white/70">
                <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-50" />
                <p className="text-2xl">Курсы не найдены</p>
                <p className="mt-3">Попробуйте изменить запрос поиска</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/15"
                  >
                    {/* Обложка */}
                    <div className="relative aspect-video">
                      <img
                        src={course.coverUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      {/* Бейдж уровня + бесплатность */}
                      <div className="absolute top-4 left-4 flex gap-3">
                        <span
                          className={`
                          px-4 py-1.5 rounded-full text-xs font-bold
                          ${
                            course.level === "beginner"
                              ? "bg-green-500/80"
                              : course.level === "intermediate"
                                ? "bg-yellow-500/80"
                                : "bg-red-500/80"
                          }
                          backdrop-blur-sm text-white
                        `}
                        >
                          {course.level === "beginner"
                            ? "Начинающий"
                            : course.level === "intermediate"
                              ? "Средний"
                              : "Продвинутый"}
                        </span>

                        {course.isFree && (
                          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/80 backdrop-blur-sm text-white">
                            Бесплатно
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Информация */}
                    <div className="p-7">
                      <h3 className="text-2xl font-semibold text-white group-hover:text-indigo-300 transition-colors mb-3 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-indigo-200/80 text-sm mb-6 line-clamp-3">
                        {course.description}
                      </p>

                      {/* Метрики */}
                      <div className="flex flex-wrap gap-6 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{course.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
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
