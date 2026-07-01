import { Heart, X, Share2, Star, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import type { Product } from "@/data/menu";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { getPromoForProduct } from "@/data/promos";
import { AllergenBadge } from "@/components/menu/AllergenBadge";

const noAllergenMessages: Record<string, Record<string, string>> = {
  caffetteria: {
    it: "Puro caffè 100% Arabica Costadoro. Solo aroma, nient'altro. ☕",
    en: "Pure 100% Arabica Costadoro coffee. Nothing but aroma.",
    fr: "Pur café 100% Arabica Costadoro. Rien que de l'arôme.",
    es: "Café puro 100% Arábica Costadoro. Solo aroma.",
  },
  dolci: {
    it: "Dolcezza senza allergeni. Solo gusto. 🍰",
    en: "Sweetness without allergens. Pure taste.",
    fr: "Douceur sans allergènes. Rien que du goût.",
    es: "Dulzura sin alérgenos. Solo sabor.",
  },
  bevande: {
    it: "Frutta fresca e ingredienti naturali. Zero allergeni. 🍊",
    en: "Fresh fruit and natural ingredients. Zero allergens.",
    fr: "Fruits frais et ingrédients naturels. Zéro allergènes.",
    es: "Fruta fresca e ingredientes naturales. Cero alérgenos.",
  },
  "menu-del-giorno": {
    it: "Prodotti semplici e genuini. Nessun allergene. 🥗",
    en: "Simple, genuine ingredients. No allergens.",
    fr: "Produits simples et authentiques. Aucun allergène.",
    es: "Productos sencillos y genuinos. Sin alérgenos.",
  },
  primi: {
    it: "Pasta e riso, semplici e genuini. Senza allergeni. 🍝",
    en: "Pasta and rice, simple and genuine. No allergens.",
    fr: "Pâtes et riz, simples et authentiques. Sans allergènes.",
    es: "Pasta y arroz, sencillos y genuinos. Sin alérgenos.",
  },
  secondi: {
    it: "Piatto unico senza allergeni. Buon appetito! 🥩",
    en: "No allergens in this dish. Enjoy!",
    fr: "Aucun allergène dans ce plat. Bon appétit!",
    es: "Sin alérgenos en este plato. ¡Buen provecho!",
  },
  analcolici: {
    it: "Bevanda fresca e dissetante. Senza allergeni. 🥤",
    en: "Fresh and refreshing drink. No allergens.",
    fr: "Boisson fraîche et désaltérante. Sans allergènes.",
    es: "Bebida fresca y refrescante. Sin alérgenos.",
  },
  panini: {
    it: "Semplicemente buono. Nessun allergene. 🥪",
    en: "Simply good. No allergens.",
    fr: "Simplement bon. Aucun allergène.",
    es: "Simplemente bueno. Sin alérgenos.",
  },
};

const noAllergenMessage = (category: string, locale: string): string => {
  const msg = noAllergenMessages[category];
  if (msg) return msg[locale] || msg.it;
  return {
    it: "Prodotto senza allergeni tra i 14 UE. Gustalo in serenità. 🍀",
    en: "No EU-regulated allergens. Enjoy with peace of mind.",
    fr: "Aucun allergène réglementé par l'UE. Dégustez sereinement.",
    es: "Sin alérgenos de los 14 UE. Disfrútalo con tranquilidad.",
  }[locale] || "Prodotto senza allergeni tra i 14 UE. Gustalo in serenità. 🍀";
};

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
            <div className="relative h-[34vh] min-h-[220px] shrink-0 bg-toret-cream">
              {product.image ? (
                <img
                  src={product.image}
                  alt={tr.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-toret-gold-warm">
                  <Utensils className="h-12 w-12" strokeWidth={1.5} aria-hidden="true" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-toret-paper to-transparent" />
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

              {product.allergens && product.allergens.length > 0 ? (
                <div className="mt-6">
                  <p className="eyebrow mb-2">{t("allergens")}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.allergens.map((a) => (
                      <AllergenBadge key={a} allergen={a} locale={locale} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="eyebrow mb-2">{t("allergens")}</p>
                  <p className="text-[13px] text-toret-ink-muted leading-snug italic">
                    {noAllergenMessage(product.category, locale)}
                  </p>
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
