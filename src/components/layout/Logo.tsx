// components/layout/Logo.tsx
import NextLink from "next/link"; // <- переименуй импорт
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <NextLink href="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold text-white">Handbooks</span>
    </NextLink>
  );
}
