import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Users,
  Clock,
  Award,
  PlayCircle,
} from "lucide-react";
import { URL } from "node:url";

export default function BlueLinkButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href ?? "/"}
      className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-[1.03] flex items-center justify-center gap-3"
    >
      {children}
      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
