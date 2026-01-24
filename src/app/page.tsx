// app/page.tsx
"use client";

import Header from "@/components/header";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";

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
