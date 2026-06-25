import heroCafe from "@/assets/hero-cafe.jpg";
import { siteConfig } from "@/data/siteConfig";
import { useLocale } from "@/i18n/LocaleContext";

export const Hero = () => {
  const { locale } = useLocale();

  return (
    <section className="relative h-[420px] overflow-hidden">
      <img
        src={heroCafe}
        alt="Caffè Torèt — interno"
        width={1280}
        height={1600}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative h-full flex flex-col justify-end p-6 text-brand-cream-warm">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-2">
          {siteConfig.city}
        </p>
        <h1 className="font-serif text-4xl leading-tight mb-3">
          {siteConfig.welcome[locale]}
        </h1>
        <p className="text-sm text-brand-cream-warm/85 max-w-[18rem] leading-relaxed">
          {siteConfig.tagline[locale]}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-brand-cream-warm/80">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
          {siteConfig.hours.label[locale]} · {siteConfig.hours.time}
        </div>
      </div>
    </section>
  );
};