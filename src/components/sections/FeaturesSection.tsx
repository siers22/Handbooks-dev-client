import { PlayCircle, Users, Award } from "lucide-react";

const features = [
  {
    icon: PlayCircle,
    title: "Видео высокого качества",
    desc: "Чёткие объяснения, субтитры, возможность ускорения и оффлайн-просмотр",
  },
  {
    icon: Users,
    title: "Активное сообщество",
    desc: "Чат, обсуждения заданий, менторство и поддержка от преподавателей",
  },
  {
    icon: Award,
    title: "Сертификаты и проекты",
    desc: "Реальные проекты в портфолио + именные сертификаты по окончании",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
        Почему выбирают Handbooks
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="group backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-indigo-300" />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-indigo-200/80">{desc}</p>
    </div>
  );
}
