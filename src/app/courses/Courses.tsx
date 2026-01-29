"use client";
import AnimatedGradientBackground from "@/components/layout/Animatedgradientbackground";

export default function Courses() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <AnimatedGradientBackground />
      <div className="relative z-10 flex min-h-screen">
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white/5 backdrop-blur-xl border-r border-white/10
          transform transition-transform duration-300 lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        />
      </div>
    </div>
  );
}
