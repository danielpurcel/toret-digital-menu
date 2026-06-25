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
    <article className="relative bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border/40 flex">
      <button
        onClick={() => onOpen(product)}
        className="relative flex-shrink-0 w-28 h-28 overflow-hidden"
        aria-label={tr.name}
      >
        <img
          src={product.image}
          alt={tr.name}
          loading="lazy"
          width={224}
          height={224}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </button>

      <div className="flex-1 p-3 pr-12 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-serif text-lg leading-tight text-foreground truncate">{tr.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{tr.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="price-tag">{formatPrice(product.price)}</span>
        </div>
      </div>

      <button
        aria-label="Favorite"
        onClick={() => toggle(product.id)}
        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-card/95 backdrop-blur grid place-items-center shadow-[var(--shadow-soft)] transition-transform active:scale-90"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            fav ? "fill-destructive text-destructive" : "text-foreground/50",
          )}
        />
      </button>

      <button
        aria-label="Details"
        onClick={() => onOpen(product)}
        className="absolute bottom-2 right-2 h-9 w-9 rounded-full grid place-items-center text-primary-foreground transition-transform active:scale-90 shadow-[var(--shadow-gold)]"
        style={{ background: "var(--gradient-gold)" }}
      >
        <Plus className="h-4 w-4 text-brand-dark" />
      </button>
    </article>
  );
};