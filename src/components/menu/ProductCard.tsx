import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { useFavorites } from "@/hooks/useFavorites";
import type { Product } from "@/data/menu";

interface Props {
  product: Product;
  onOpen: (p: Product) => void;
}

const formatPrice = (price: number) =>
  `€ ${price.toFixed(2).replace(".", ",")}`;

export const ProductCard = ({ product, onOpen }: Props) => {
  const { locale } = useLocale();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(product.id);
  const tr = product.translations[locale];

  return (
    <article
      className="relative bg-brand-green/60 rounded-2xl p-3 flex flex-col gold-border shadow-[var(--shadow-soft)] transition-transform active:scale-[0.98]"
    >
      <button
        onClick={() => onOpen(product)}
        className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-brand-dark"
        aria-label={tr.name}
      >
        <img
          src={product.image}
          alt={tr.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <button
          aria-label="Favorite"
          onClick={(e) => {
            e.stopPropagation();
            toggle(product.id);
          }}
          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-brand-dark/70 backdrop-blur grid place-items-center transition-transform active:scale-90 border border-brand-gold/20"
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              fav ? "fill-brand-gold text-brand-gold" : "text-brand-cream/70",
            )}
          />
        </button>
      </button>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-cream leading-tight mb-1">
          {tr.name}
        </h3>
        <p className="text-[10px] text-brand-cream/50 leading-snug mb-3 line-clamp-2 flex-1">
          {tr.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-serif text-brand-gold font-bold text-base">
            {formatPrice(product.price)}
          </span>
          <button
            aria-label="Details"
            onClick={() => onOpen(product)}
            className="w-7 h-7 rounded-full grid place-items-center text-brand-gold border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};