import { Heart, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { useFavorites } from "@/hooks/useFavorites";
import type { Product } from "@/data/menu";

interface Props {
  product: Product;
  onOpen: (p: Product) => void;
  badge?: string;
}

const formatPrice = (price: number) =>
  `€ ${price.toFixed(2).replace(".", ",")}`;

export const ProductCard = ({ product, onOpen, badge }: Props) => {
  const { locale, t } = useLocale();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(product.id);
  const tr = product.translations[locale];
  const showBadge = badge ?? (product.featured ? t("toTry") : undefined);

  return (
    <article
      onClick={() => onOpen(product)}
      className="group relative bg-toret-paper rounded-2xl p-3 flex gap-3 warm-border cursor-pointer transition-all active:scale-[0.99] hover:shadow-[var(--shadow-3)]"
      style={{ boxShadow: "var(--shadow-1)" }}
    >
      <div className="relative h-[88px] w-[88px] shrink-0 rounded-xl overflow-hidden bg-toret-cream">
        {product.image ? (
          <img
            src={product.image}
            alt={tr.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-toret-gold-warm">
            <Utensils className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        {showBadge && (
          <span className="inline-flex self-start items-center px-2 py-0.5 rounded-md mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-toret-paper bg-toret-green">
            {showBadge}
          </span>
        )}
        <h3 className="font-serif text-[17px] leading-tight text-toret-ink truncate">
          {tr.name}
        </h3>
        <p className="text-[12px] text-toret-ink-muted leading-snug mt-0.5 line-clamp-2 flex-1">
          {tr.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="price-tag text-[15px]">
  {product.bottlePrice ? (
    <>{formatPrice(product.price)} <span className="text-[11px] text-toret-ink-muted font-normal">bicch.</span> · {formatPrice(product.bottlePrice)} <span className="text-[11px] text-toret-ink-muted font-normal">bott.</span></>
  ) : (
    formatPrice(product.price)
  )}
</span>
          <button
            aria-label="Favorite"
            onClick={(e) => {
              e.stopPropagation();
              toggle(product.id);
            }}
            className="h-8 w-8 rounded-full grid place-items-center text-toret-ink-muted hover:text-toret-gold-warm transition-colors"
          >
            <Heart
              strokeWidth={1.5}
              className={cn(
                "h-[18px] w-[18px] transition-all",
                fav && "fill-toret-gold text-toret-gold-warm heart-pulse",
              )}
            />
          </button>
        </div>
      </div>
    </article>
  );
};
