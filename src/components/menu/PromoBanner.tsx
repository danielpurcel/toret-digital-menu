import type { Promo } from "@/data/promos";
import { useLocale } from "@/i18n/LocaleContext";

const formatPrice = (price: number) =>
  `€ ${price.toFixed(2).replace(".", ",")}`;

export const PromoBanner = ({ promo }: { promo: Promo }) => {
  const { locale, t } = useLocale();
  const tr = promo.translations[locale];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
      <img
        src={promo.image}
        alt={tr.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(120deg, hsl(var(--brand-dark) / 0.92), hsl(var(--brand-dark) / 0.55))" }}
      />
      <div className="relative p-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-1">
            {t("promoBadge")}
          </p>
          <h3 className="font-serif text-2xl leading-tight">{tr.title}</h3>
          <p className="text-sm text-primary-foreground/80 mt-1">{tr.subtitle}</p>
        </div>
        <div className="text-right">
          <span className="font-serif text-3xl text-brand-gold font-semibold">
            {formatPrice(promo.price)}
          </span>
        </div>
      </div>
    </div>
  );
};