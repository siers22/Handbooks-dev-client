// app/page.tsx
"use client";

import Link from "next/link";

import {
  BookOpen,
  ArrowRight,
  Users,
  Clock,
  Award,
  PlayCircle,
} from "lucide-react";
import Header from "@/components/header";
import BlueLinkButton from "@/components/buttons/blue-link-button";
import GrayLinkButton from "@/components/buttons/gray-link-button";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FooterSection from "@/components/sections/FooterSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <Header />
      <BackgroundBlobs />

      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}
