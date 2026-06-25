import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import type { Product } from "@/data/menu";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const formatPrice = (price: number) =>
  `€ ${price.toFixed(2).replace(".", ",")}`;

interface Props {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: Props) => {
  const { locale, t } = useLocale();
  const { isFavorite, toggle } = useFavorites();

  const open = !!product;
  const tr = product?.translations[locale];
  const fav = product ? isFavorite(product.id) : false;

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-card border-0 max-h-[92vh]">
        {product && tr && (
          <div className="mx-auto w-full max-w-[480px]">
            <div className="relative h-64 -mt-1">
              <img
                src={product.image}
                alt={tr.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-card/95 grid place-items-center shadow-[var(--shadow-soft)]"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggle(product.id)}
                aria-label={t("addToFavorites")}
                className="absolute top-3 left-3 h-9 w-9 rounded-full bg-card/95 grid place-items-center shadow-[var(--shadow-soft)]"
              >
                <Heart className={cn("h-4 w-4", fav ? "fill-destructive text-destructive" : "text-foreground/60")} />
              </button>
            </div>

            <div className="p-6 pb-10">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="font-serif text-3xl leading-tight">{tr.name}</h2>
                <span className="price-tag text-2xl whitespace-nowrap">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{tr.description}</p>

              {product.allergens && product.allergens.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium mb-2">
                    {t("allergens")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.allergens.map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-muted text-foreground/80 px-2.5 py-1 rounded-full border border-border/60 capitalize"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};