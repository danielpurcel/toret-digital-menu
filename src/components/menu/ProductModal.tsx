import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import type { Product } from "@/data/menu";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { getPromoForProduct } from "@/data/promos";

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
  const promo = product ? getPromoForProduct(product.id) : undefined;
  const promoTr = promo?.translations[locale];

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-brand-green text-brand-cream border-t border-brand-gold/30 max-h-[92vh]">
        {product && tr && (
          <div className="mx-auto w-full max-w-[480px]">
            <div className="relative h-64 -mt-1">
              <img
                src={product.image}
                alt={tr.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-transparent to-transparent" />
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-brand-dark/80 backdrop-blur grid place-items-center gold-border text-brand-cream"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggle(product.id)}
                aria-label={t("addToFavorites")}
                className="absolute top-3 left-3 h-9 w-9 rounded-full bg-brand-dark/80 backdrop-blur grid place-items-center gold-border"
              >
                <Heart className={cn("h-4 w-4", fav ? "fill-brand-gold text-brand-gold" : "text-brand-cream/70")} />
              </button>
            </div>

            <div className="p-6 pb-10">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="font-serif text-3xl italic leading-tight">{tr.name}</h2>
                <span className="price-tag text-2xl whitespace-nowrap">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="text-sm text-brand-cream/70 leading-relaxed">{tr.description}</p>

              {product.allergens && product.allergens.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium mb-2">
                    {t("allergens")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.allergens.map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-brand-dark/60 text-brand-cream/80 px-2.5 py-1 rounded-full gold-border capitalize"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {promo && promoTr && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium mb-2">
                    {t("pairWithPromo")}
                  </p>
                  <div className="flex items-center gap-3 bg-brand-dark/60 gold-border rounded-2xl p-3">
                    <img
                      src={promo.image}
                      alt={promoTr.title}
                      className="h-20 w-20 rounded-xl object-cover flex-none"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif italic text-lg leading-tight text-brand-cream truncate">
                        {promoTr.title}
                      </h3>
                      <p className="text-xs text-brand-cream/70 leading-snug mt-0.5">
                        {promoTr.subtitle}
                      </p>
                    </div>
                    <span className="price-tag text-base whitespace-nowrap">
                      {formatPrice(promo.price)}
                    </span>
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