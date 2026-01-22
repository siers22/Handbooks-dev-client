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
import NavbarSection from "@/components/sections/NavbarSection";
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
export default function CoursesGrid() {
  return (
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
  );
}
