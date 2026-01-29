// app/courses/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  ArrowLeft,
  PlayCircle,
  Clock,
  Users,
  Star,
} from "lucide-react";
import Image from "next/image";
import AnimatedGradientBackground from "@/components/layout/Animatedgradientbackground";

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

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // для Next.js 15+
}) {
  const { slug } = await params;

  let course: Course | null = null;

  try {
    const apiUrl = `http://localhost:3001/courses/${slug}`; // ← предполагаем, что эндпоинт именно такой
    // Если в твоём API это /courses/{courseID}, то замени slug на ID и используй поиск по ID

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyYjA5MWZhLWI2YTUtNDc2MS05MjVjLWYxZTdkZDBlZDQ4NCIsImVtYWlsIjoiQ3VydF9SaWNlQGhvdG1haWwuY29tIiwicm9sZSI6IiIsInRva2VuX2lkIjoiMzIzMDMyMzYyZDMwMzEyZDMyMzQyMDMxMzQzYTMyMzkzYTMxMzgyZTM5MzQzMzMyMzYzOTMyMzkzMzIwMmIzMDMwMzAzMDIwNTU1NDQzMjA2ZDNkMmIzMTMwMmUzMjM2MzEzMjM1MzczMjM2MzQzNTMyNjIzMDM5MzE2NjYxMmQ2MjM2NjEzNTJkMzQzNzM2MzEyZDM5MzIzNTYzMmQ2NjMxNjUzNzY0NjQzMDY1NjQzNDM4MzQiLCJpc3MiOiJoYW5kYm9va3MtYXBpIiwic3ViIjoiNTJiMDkxZmEtYjZhNS00NzYxLTkyNWMtZjFlN2RkMGVkNDg0IiwiZXhwIjoxNzY5MzUxMzU4LCJpYXQiOjE3NjkyNjQ5NTh9.5B6YnHkQl9Fus-oe6AvpOo1xmJib5f343KNEL2xvJYs`,
      },
      next: { revalidate: 60 }, // кэш на 1 минуту — курс может обновляться
      // cache: 'no-store' // для отладки
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound(); // покажет 404 страницу Next.js
      }
      const errorText = await res.text();
      console.error("Ошибка загрузки курса:", res.status, errorText);
      throw new Error("Не удалось загрузить курс");
    }

    const json = await res.json();

    // Предполагаем структуру ответа как в списке курсов
    course = json?.data.course ?? null; // или json?.data?.course если обёртка другая
  } catch (error) {
    console.error("Fetch course error:", error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Ошибка</h1>
        <p className="text-xl text-gray-700">
          Не удалось загрузить курс. Проверьте соединение или попробуйте позже.
        </p>
        <Link
          href="/courses"
          className="mt-8 inline-block text-blue-600 hover:underline"
        >
          ← Вернуться к списку курсов
        </Link>
      </div>
    );
  }

  if (!course) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <AnimatedGradientBackground />

      <div className="relative z-10">
        {/* Hero-обложка с градиентным оверлеем */}
        <div className="relative h-[60vh] min-h-[500px] flex items-end">
          {course.CoverURL ? (
            <>
              <img
                src={course.CoverURL}
                alt={course.Title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-800 flex items-center justify-center">
              <BookOpen className="w-32 h-32 text-white/30" />
            </div>
          )}

          <div className="relative container mx-auto px-6 pb-16 md:pb-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/20 mb-6">
                <span>
                  {course.Level === "beginner"
                    ? "Начинающий"
                    : course.Level === "intermediate"
                      ? "Средний"
                      : "Продвинутый"}
                </span>
                <span>•</span>
                <span>
                  {course.Price === 0
                    ? "Бесплатно"
                    : `${Math.round(course.Price)} ${course.Currency}`}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {course.Title}
              </h1>

              {course.Subtitle && (
                <p className="text-xl md:text-2xl text-indigo-200/90 mb-8">
                  {course.Subtitle}
                </p>
              )}

              <div className="flex flex-wrap gap-6 text-indigo-200/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>12 часов</span> {/* placeholder */}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>1,240 студентов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>4.8 (320 отзывов)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Основная колонка */}
            <div className="lg:col-span-2 space-y-12">
              {/* Описание */}
              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-6">О курсе</h2>
                <div
                  className="prose prose-invert prose-indigo max-w-none"
                  dangerouslySetInnerHTML={{
                    __html:
                      course.Description?.replace(/\n/g, "<br>") ||
                      "<p>Подробное описание курса скоро появится...</p>",
                  }}
                />
              </section>

              {/* Содержание (placeholder) */}
              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Что вы узнаете
                </h2>
                <ul className="space-y-4 text-indigo-200">
                  <li className="flex items-start gap-3">
                    <PlayCircle className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Основы и продвинутые техники</span>
                  </li>
                  {/* Добавь реальные уроки позже */}
                </ul>
              </section>
            </div>

            {/* Сайдбар (sticky) */}
            <aside className="lg:sticky lg:top-8 h-fit space-y-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-white mb-2">
                    {course.Price === 0
                      ? "Бесплатно"
                      : `${Math.round(course.Price)} ${course.Currency}`}
                  </div>
                  <p className="text-indigo-300">Пожизненный доступ</p>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 mb-6">
                  Записаться на курс
                </button>

                <div className="text-center text-sm text-indigo-200/70">
                  <p>Гарантия возврата 30 дней</p>
                  <p className="mt-2">Поддержка 24/7</p>
                </div>
              </div>

              <Link
                href="/courses"
                className="flex items-center justify-center gap-2 text-indigo-300 hover:text-indigo-200 transition py-4 border-t border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
                Назад к всем курсам
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `Курс: ${slug.replace(/-/g, " ")} | Handbooks`,
    description: "Погрузитесь в увлекательное обучение...",
  };
}
