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

export default function GrayLinkButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href ?? "/"}
      className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 transition-all"
    >
      {children}
    </Link>
  );
}
