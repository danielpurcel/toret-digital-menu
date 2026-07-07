import heroInterno from "@/assets/hero-interno.jpg";
import { useLocale } from "@/i18n/LocaleContext";

export const Hero = () => {
  const { t } = useLocale();

  return (
    <section className="relative h-[34vh] min-h-[180px] overflow-hidden sm:h-[300px]">
      <img
        src={heroInterno}
        alt="Caffè Torèt — interno"
        className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative h-full flex flex-col justify-end px-6 pb-[140px] text-toret-paper">
        <span className="eyebrow text-[11px] !text-[hsl(var(--toret-gold))] mb-1">
          {"\n"}
        </span>
        <h1 className="font-serif text-[2.6rem] sm:text-[3.25rem] leading-[1.0] font-normal mb-2">
          {t("goodMorningPre")}
          <span className="text-toret-gold">{t("goodMorningGold")}</span>
          {t("goodMorningPost")}
        </h1>
        <p className="text-[15px] text-toret-paper/85 max-w-[26rem] leading-relaxed">
          {t("bistrotTagline")}
        </p>
      </div>
    </section>
  );
};
