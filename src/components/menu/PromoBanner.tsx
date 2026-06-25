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
      className="relative rounded-2xl p-4 flex justify-between items-center text-toret-paper shadow-[var(--shadow-3)] overflow-hidden"
      style={{ background: "var(--gradient-green)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="eyebrow !text-[hsl(var(--toret-gold))] mb-1.5">
          {t("promoBadge")}
        </p>
        <h3 className="font-serif text-[20px] leading-tight text-toret-paper">
          {tr.title}
        </h3>
        <p className="text-[12px] text-toret-paper/75 mt-0.5 truncate">{tr.subtitle}</p>
      </div>
      <div className="flex flex-col items-end gap-2 ml-3 shrink-0">
        <span
          className="font-serif text-2xl leading-none"
          style={{ color: "hsl(var(--toret-gold))", fontVariantNumeric: "tabular-nums" }}
        >
          {formatPrice(promo.price)}
        </span>
        <div className="h-7 w-7 rounded-full grid place-items-center bg-toret-gold text-toret-green-deep">
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};