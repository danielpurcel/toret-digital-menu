import { Clock } from "lucide-react";
import heroCafe from "@/assets/hero-interior.jpg.asset.json";
import { siteConfig } from "@/data/siteConfig";
import { useLocale } from "@/i18n/LocaleContext";

export const Hero = () => {
  const { locale } = useLocale();

  return (
    <section className="relative h-[340px] overflow-hidden">
      <img
        src={heroCafe.url}
        alt="Caffè Torèt"
        className="absolute inset-0 h-full w-full object-cover opacity-65"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative h-full flex flex-col justify-end px-6 pb-8 text-brand-cream">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">
          {siteConfig.city} · Dal 1928
        </span>
        <h1 className="font-serif text-[2.6rem] leading-[1.05] italic mb-2">
          {siteConfig.welcome[locale]}
        </h1>
        <p className="text-sm text-brand-cream/75 max-w-[20rem] leading-relaxed mb-4">
          {siteConfig.tagline[locale]}
        </p>
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-gold/90">
          <Clock className="h-3 w-3" />
          <span>
            {siteConfig.hours.label[locale]} · {siteConfig.hours.time}
          </span>
        </div>
      </div>
    </section>
  );
};