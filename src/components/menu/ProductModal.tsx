import { Heart, X, Share2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import type { Product } from "@/data/menu";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
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
      <DrawerContent className="bg-toret-paper text-toret-ink border-t-0 h-[100dvh] max-h-[100dvh] mt-0 rounded-none p-0 overflow-hidden">
        {product && tr && (
          <div className="mx-auto w-full max-w-[440px] flex flex-col h-[100dvh]">
            <div className="relative h-[44vh] min-h-[300px] shrink-0">
              <img
                src={product.image}
                alt={tr.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-toret-paper via-transparent to-transparent" />
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute top-4 left-4 h-10 w-10 rounded-full bg-toret-paper/95 backdrop-blur grid place-items-center shadow-[var(--shadow-2)] text-toret-ink"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  aria-label="Share"
                  className="h-10 w-10 rounded-full bg-toret-paper/95 backdrop-blur grid place-items-center shadow-[var(--shadow-2)] text-toret-ink"
                >
                  <Share2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => toggle(product.id)}
                  aria-label={t("addToFavorites")}
                  className="h-10 w-10 rounded-full bg-toret-paper/95 backdrop-blur grid place-items-center shadow-[var(--shadow-2)]"
                >
                  <Heart
                    strokeWidth={1.5}
                    className={cn(
                      "h-[18px] w-[18px]",
                      fav ? "fill-toret-gold text-toret-gold-warm" : "text-toret-ink",
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-2 pb-8">
              {product.featured && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-toret-paper bg-toret-green">
                  {t("toTry")}
                </span>
              )}
              <DrawerTitle asChild>
                <h2 className="font-serif text-[32px] leading-[1.05] text-toret-ink">
                  {tr.name}
                </h2>
              </DrawerTitle>
              <DrawerDescription asChild>
                <p className="font-serif italic text-toret-ink-muted mt-2 text-[15px] leading-snug">
                  {tr.description}
                </p>
              </DrawerDescription>

              <div className="mt-6 pt-5 border-t warm-border">
                <p className="eyebrow mb-1">{t("price")}</p>
                <div className="flex items-end justify-between">
                  <span
                    className="font-sans text-[28px] font-semibold text-toret-ink"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-toret-ink-muted">
                    <Star className="h-3.5 w-3.5 fill-toret-gold text-toret-gold-warm" strokeWidth={1.5} />
                    <span className="font-semibold text-toret-ink">91%</span>
                    {t("favorites").toLowerCase()}
                  </span>
                </div>
              </div>


              {product.allergens && product.allergens.length > 0 && (
                <div className="mt-6">
                  <p className="eyebrow mb-2">{t("allergens")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.allergens.map((a) => (
                      <span
                        key={a}
                        className="text-[12px] bg-toret-cream text-toret-ink-soft px-2.5 py-1 rounded-full warm-border capitalize"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {promo && promoTr && (
                <div className="mt-6">
                  <p className="eyebrow mb-2">{t("pairWithPromo")}</p>
                  <div className="flex items-center gap-3 bg-toret-cream warm-border rounded-2xl p-3">
                    <img
                      src={promo.image}
                      alt={promoTr.title}
                      className="h-16 w-16 rounded-xl object-cover flex-none"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[16px] leading-tight text-toret-ink truncate">
                        {promoTr.title}
                      </h3>
                      <p className="text-[12px] text-toret-ink-muted leading-snug mt-0.5">
                        {promoTr.subtitle}
                      </p>
                    </div>
                    <span className="price-tag text-[15px] whitespace-nowrap">
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