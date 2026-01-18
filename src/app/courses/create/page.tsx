// app/admin/courses/new/page.tsx  (или app/courses/create/page.tsx)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("beginner");
  const [currency, setCurrency] = useState("USD");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, {}] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          slug,
          price,
          currency,
          level,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при регистрации");
      }

      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так...");
    } finally {
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Фоновые blob'ы */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-2xl mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Создать новый курс
          </h1>
          <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto">
            Заполните основную информацию — курс будет готов к публикации за
            несколько минут
          </p>
        </div>

        {/* Основная форма */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            {/* Обложка курса */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white/90">
                Обложка курса
              </label>

              <div
                className={`
                relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed
                ${coverPreview ? "border-indigo-400/50" : "border-white/20 hover:border-white/40"}
                transition-all duration-300 group cursor-pointer bg-white/5 backdrop-blur-sm
              `}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />

                {coverPreview ? (
                  <>
                    <Image
                      src={coverPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-medium">Изменить обложку</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 group-hover:text-white/90 transition-colors">
                    <Upload className="w-16 h-16 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <p className="text-lg font-medium mb-2">
                      Перетащите изображение или кликните
                    </p>
                    <p className="text-sm">Рекомендуемый размер: 1280×720</p>
                  </div>
                )}
              </div>
            </div>

            {/* Название */}
            <div className="space-y-3">
              <label
                htmlFor="title"
                className="block text-lg font-semibold text-white/90"
              >
                Название курса
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: React & TypeScript — от новичка до профи"
                required
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all text-lg"
              />
            </div>

            {/* Slug */}
            <div className="space-y-3">
              <label
                htmlFor="slug"
                className="block text-lg font-semibold text-white/90"
              >
                Slug (URL-адрес курса)
              </label>
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400/50 transition-all">
                <span className="px-5 py-4 text-white/60">
                  handbooks.com/courses/
                </span>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) =>
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                  }
                  placeholder="react-typescript-pro"
                  required
                  className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Описание */}
            <div className="space-y-3">
              <label
                htmlFor="description"
                className="block text-lg font-semibold text-white/90"
              >
                Краткое описание
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Расскажите, что получит студент после прохождения курса..."
                rows={5}
                required
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="level"
                className="block text-lg font-semibold text-white/90"
              >
                Уровень сложности
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all appearance-none"
              >
                <option value="beginner">Начинающий</option>
                <option value="intermediate">Средний</option>
                <option value="advanced">Продвинутый</option>
              </select>
            </div>

            {/* Уровень и цена (в одной строке) */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label
                  htmlFor="level"
                  className="block text-lg font-semibold text-white/90"
                >
                  Курс денег
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all appearance-none"
                >
                  <option value="usd">USD</option>
                  <option value="rub">RUB</option>
                </select>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="price"
                  className="block text-lg font-semibold text-white/90"
                >
                  Цена (в €)
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0 — бесплатно"
                  min="0"
                  step="0.01"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all"
                />
              </div>
            </div>

            {/* Ошибка */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-6 py-4 rounded-xl text-center">
                {error}
              </div>
            )}

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-5 px-8 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Создание...
                  </>
                ) : (
                  <>
                    Создать курс
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>

              <a
                href="/dashboard"
                className="flex-1 py-5 px-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
              >
                <X className="w-6 h-6" />
                Отмена
              </a>
            </div>
          </form>
        </div>

        {/* Подсказка */}
        <p className="text-center text-white/50 text-sm mt-10">
          После создания курса вы сможете добавить уроки, тесты и материалы
        </p>
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
