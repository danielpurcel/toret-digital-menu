import { ChevronRight } from "lucide-react";
import type { Promo } from "@/data/promos";
import { useLocale } from "@/i18n/LocaleContext";

const formatPrice = (price: number) =>
  `€ ${price.toFixed(2).replace(".", ",")}`;

export const PromoBanner = ({ promo }: { promo: Promo }) => {
  const { locale, t } = useLocale();
  const tr = promo.translations[locale];

  return (
    <div
      className="relative rounded-2xl p-4 flex justify-between items-center text-brand-dark shadow-[var(--shadow-gold)]"
      style={{ background: "var(--gradient-gold)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-1 opacity-80">
          {t("promoBadge")}
        </p>
        <h3 className="font-serif font-bold text-lg italic leading-tight">
          {tr.title}
        </h3>
        <p className="text-[11px] opacity-75 mt-0.5 truncate">{tr.subtitle}</p>
      </div>
      <div className="flex flex-col items-end gap-2 ml-3">
        <span className="font-serif text-xl font-bold leading-none">
          {formatPrice(promo.price)}
        </span>
        <div className="bg-brand-dark text-brand-cream p-1.5 rounded-full">
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
};