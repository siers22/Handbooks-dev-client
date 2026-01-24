// app/courses/create/page.tsx
"use client";

import { useState, useRef, ErrorInfo } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save, BookOpen } from "lucide-react";
import AnimatedGradientBackground from "@/components/layout/Animatedgradientbackground";
import { useRouter } from "next/navigation";
import { ErrorProps } from "next/error";

export default function CreateCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    level: "beginner",
    price: 0,
    currency: "EUR",
    description: "",
    coverPreview: "" as string | null,
    coverFile: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Название курса обязательно";
    if (!formData.slug.trim()) return "Slug обязателен";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug))
      return "Slug может содержать только строчные буквы, цифры и дефисы";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validationError = validateForm();
    if (validationError) {
      setServerError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        subtitle: formData.subtitle.trim() || undefined,
        description: formData.description.trim() || undefined,
        level: formData.level,
        price: Number(formData.price),
        currency: formData.currency,
        coverUrl:
          "https://i.pinimg.com/736x/da/d3/61/dad36114a80695d42f6aa2c064ecf8c1.jpg",
      };

      const res = await fetch("http://localhost:3001/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2MGZhMTc5LTViODktNGJiNi05NzFiLWMxZTBkZGM5MGVjNyIsImVtYWlsIjoiVXJzdWxhX1N0cm9zaW4yNUB5YWhvby5jb20iLCJyb2xlIjoiIiwidG9rZW5faWQiOiIzMjMwMzIzNjJkMzAzMTJkMzIzNDIwMzEzNjNhMzUzMzNhMzUzNzJlMzczMzMwMzIzOTM2MzUzNjM3MjAyYjMwMzUzMDMwMjAyYjMwMzUyMDZkM2QyYjM0MzcyZTMwMzczOTM0MzYzMDM5MzgzNzM4MzYzMDY2NjEzMTM3MzkyZDM1NjIzODM5MmQzNDYyNjIzNjJkMzkzNzMxNjIyZDYzMzE2NTMwNjQ2NDYzMzkzMDY1NjMzNyIsImlzcyI6ImhhbmRib29rcy1hcGkiLCJzdWIiOiI4NjBmYTE3OS01Yjg5LTRiYjYtOTcxYi1jMWUwZGRjOTBlYzciLCJleHAiOjE3NjkzNDIwMzcsImlhdCI6MTc2OTI1NTYzN30.yjE8fuY7OLGmQxFoiZma5UjWlNzkV0mPPZgsc_nHOeM`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            errorData.error ||
            `Ошибка ${res.status}: Не удалось создать курс`,
        );
      }

      const response = await res.json();
      const createdCourse = response?.data; // или response?.data?.course
      if (createdCourse?.Slug || createdCourse?.ID) {
        router.push(`/courses/${createdCourse.Slug || createdCourse.ID}`);
      }
    } catch (error) {
      // setServerError(error.message || "Произошла ошибка при создании курса");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <AnimatedGradientBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Хедер */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/courses"
              className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Назад к курсам</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-indigo-300 text-sm hidden sm:block">
              Шаг {step} из 2
            </span>
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/15 transition"
            >
              Назад
            </button>
            {step === 2 ? (
              <button
                type="submit"
                form="course-form"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Создать курс
              </button>
            ) : (
              <button
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.slug}
                className="px-6 py-2.5 bg-indigo-600 rounded-xl text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Продолжить
              </button>
            )}
          </div>
        </header>

        {/* Основной контент */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Создание нового курса
                </h1>
              </div>
              <p className="text-indigo-200/80 text-lg">
                Заполните информацию, чтобы ваш курс появился в каталоге
              </p>
            </div>

            <form
              id="course-form"
              onSubmit={handleSubmit}
              className="space-y-12"
            >
              {/* Шаг 1: Основная информация */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Название курса *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition"
                        placeholder="Например: Полный курс по React и Next.js 2026"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Подзаголовок
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle || ""}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition"
                        placeholder="Короткое описание, которое зацепит студента"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Уровень сложности
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition"
                      >
                        <option value="beginner">Начинающий</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Slug (URL-адрес) *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                        className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition"
                        placeholder="react-nextjs-2026"
                      />
                      <p className="mt-1.5 text-xs text-indigo-300/70">
                        Только строчные буквы, цифры и дефисы
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 font-medium mb-2">
                          Цена
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-white/90 font-medium mb-2">
                          Валюта
                        </label>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition"
                        >
                          <option value="EUR">EUR</option>
                          <option value="USD">USD</option>
                          <option value="RUB">RUB</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Шаг 2: Обложка + описание */}
              {step === 2 && (
                <div className="space-y-12">
                  {/* Загрузка обложки */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Обложка курса
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      <div
                        className="w-full md:w-80 aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-white/20 flex items-center justify-center relative group cursor-pointer hover:border-indigo-500/50 transition"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {formData.coverPreview ? (
                          <img
                            src={formData.coverPreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-8">
                            <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                            <p className="text-white/70">
                              Нажмите или перетащите изображение
                            </p>
                            <p className="text-sm text-white/50 mt-2">
                              Рекомендуемый размер: 1920×1080
                            </p>
                          </div>
                        )}

                        {formData.coverPreview && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData((prev) => ({
                                ...prev,
                                coverPreview: null,
                              }));
                            }}
                            className="absolute top-3 right-3 bg-red-600/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoverChange}
                          className="hidden"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-indigo-200 mb-4">
                          Красивая обложка значительно повышает кликабельность
                          курса.
                        </p>
                        <ul className="space-y-2 text-sm text-indigo-200/80">
                          <li>• Формат: JPG, PNG, WebP</li>
                          <li>• Размер до 5 МБ</li>
                          <li>• Соотношение 16:9</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Краткое описание (можно расширить до full editor позже) */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Краткое описание
                    </h2>
                    <textarea
                      name="description"
                      // value={formData.description || ""}
                      // onChange={handleChange}
                      rows={6}
                      className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition resize-none"
                      placeholder="Расскажите, что получит студент после прохождения курса..."
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
