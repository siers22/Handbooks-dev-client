import BlueLinkButton from "@/components/buttons/blue-link-button";
import GrayLinkButton from "@/components/buttons/gray-link-button";

export default function HeroSection() {
  return (
    <section className="px-6 py-20 md:py-32 text-center max-w-5xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8">
        Освойте новые навыки <br />
        <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
          легко и с удовольствием
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-indigo-200/90 max-w-3xl mx-auto mb-12">
        Качественные курсы от экспертов. Практика, проекты, сертификаты и
        поддержка сообщества.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <BlueLinkButton href="/auth/register">
          Начать учиться бесплатно
        </BlueLinkButton>

        <GrayLinkButton href="/courses">Посмотреть курсы</GrayLinkButton>
      </div>
    </section>
  );
}
