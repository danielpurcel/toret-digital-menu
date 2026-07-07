import { Heart, X, Share2, Star, Utensils, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import type { Product } from "@/data/menu";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { getPromoForProduct } from "@/data/promos";
import { getPairings } from "@/data/productPairings";
import { AllergenBadge } from "@/components/menu/AllergenBadge";
import { importedProducts } from "@/data/importedProducts";
import { products as staticProducts } from "@/data/menu";

const noAllergenProductMessages: Record<number, Record<string, string>> = {
  26: { it: "Caffè 100% Arabica Costadoro. Puro, intenso, senza allergeni. ☕", en: "100% Arabica Costadoro coffee. Pure, intense, allergen-free.", fr: "Café 100% Arabica Costadoro. Pur, intense, sans allergènes.", es: "Café 100% Arábica Costadoro. Puro, intenso, sin alérgenos." },
  27: { it: "Tutto l'aroma del nostro espresso, senza caffeina e senza allergeni.", en: "All the aroma of our espresso, caffeine-free and allergen-free.", fr: "Tout l'arôme de notre espresso, sans caféine et sans allergènes.", es: "Todo el aroma de nuestro espresso, sin cafeína y sin alérgenos." },
  42: { it: "Caffè con liquore. Nessun allergene tra i 14 UE. 🥃", en: "Coffee with liquor. No EU-regulated allergens.", fr: "Café avec liqueur. Aucun allergène réglementé par l'UE.", es: "Café con licor. Sin alérgenos de la UE." },
  70: { it: "Caffè Torèt — piccolo o grande. Costadoro nella nostra tazza. ☕", en: "Caffè Torèt — small or large. Costadoro in our cup.", fr: "Café Torèt — petit ou grand. Costadoro dans notre tasse.", es: "Café Torèt — pequeño o grande. Costadoro en nuestra taza." },
  92: { it: "Espresso shakerato con ghiaccio. Fresco, senza allergeni. 🧊", en: "Shaken espresso with ice. Fresh and allergen-free.", fr: "Espresso shakeré avec glace. Frais et sans allergènes.", es: "Espresso batido con hielo. Fresco, sin alérgenos." },
  82: { it: "Espresso, tonica e ghiaccio. Fresco, senza allergeni. 🍸", en: "Espresso, tonic and ice. Fresh, allergen-free.", fr: "Espresso, tonique et glace. Frais, sans allergènes.", es: "Espresso, tónica y hielo. Fresco, sin alérgenos." },
  47: { it: "Tè o infuso caldo. Nessun allergene, solo benessere. 🫖", en: "Hot tea or infusion. No allergens, just wellness.", fr: "Thé ou infusion chaud. Aucun allergène, rien que du bien-être.", es: "Té o infusión caliente. Sin alérgenos, solo bienestar." },
  44: { it: "Spremuta fresca di arance siciliane. Solo vitamina C, zero allergeni. 🍊", en: "Fresh Sicilian orange juice. Just vitamin C, zero allergens.", fr: "Jus d'orange frais de Sicile. Rien que de la vitamine C, zéro allergènes.", es: "Zumo de naranja fresco de Sicilia. Solo vitamina C, cero alérgenos." },
  50: { it: "Frullato cremoso di frutta fresca di stagione. Tutto naturale. 🥤", en: "Creamy smoothie with fresh seasonal fruit. All natural.", fr: "Smoothie crémeux aux fruits frais de saison. Tout naturel.", es: "Batido cremoso de fruta fresca de temporada. Todo natural." },
  53: { it: "Succo di frutta. Fresco e senza allergeni. 🧃", en: "Fruit juice. Fresh and allergen-free.", fr: "Jus de fruits. Frais et sans allergènes.", es: "Zumo de fruta. Fresco y sin alérgenos." },
  91: { it: "Spremuta fresca di melograno. Ricca di antiossidanti, zero allergeni. 💜", en: "Fresh pomegranate juice. Rich in antioxidants, zero allergens.", fr: "Jus de grenade frais. Riche en antioxydants, zéro allergènes.", es: "Zumo de granada fresca. Rico en antioxidantes, cero alérgenos." },
  94: { it: "Acqua, limone fresco e menta. Il nostro fresh, naturale. 🌿", en: "Water, fresh lemon and mint. Our natural fresh.", fr: "Eau, citron frais et menthe. Notre fresh naturel.", es: "Agua, limón fresco y menta. Nuestro fresh natural." },
  68: { it: "Prosciutto crudo e melone. Semplicità e gusto, zero allergeni. 🍈", en: "Raw ham and melon. Simple taste, zero allergens.", fr: "Jambon cru et melon. Simplicité et goût, zéro allergènes.", es: "Jamón y melón. Sencillez y sabor, cero alérgenos." },
  22: { it: "Acqua minerale pura. Semplicemente acqua. 💧", en: "Pure mineral water. Simply water.", fr: "Eau minérale pure. Simplement de l'eau.", es: "Agua mineral pura. Simplemente agua." },
  40: { it: "Acqua minerale pura. Semplicemente acqua. 💧", en: "Pure mineral water. Simply water.", fr: "Eau minérale pure. Simplement de l'eau.", es: "Agua mineral pura. Simplemente agua." },
  57: { it: "Coca-Cola in bottiglia vetro. La pausa che conosci, nessun allergene. 🥤", en: "Coca-Cola in a glass bottle. No allergens.", fr: "Coca-Cola en bouteille verre. Aucun allergène.", es: "Coca-Cola en botella de vidrio. Sin alérgenos." },
  58: { it: "Fanta in bottiglia vetro. Fresca e fruttata, senza allergeni. 🍊", en: "Fanta orange in a glass bottle. No allergens.", fr: "Fanta orange en bouteille verre. Sans allergènes.", es: "Fanta naranja en botella de vidrio. Sin alérgenos." },
  59: { it: "Coca-Cola Zero. Tutto il gusto, zero zuccheri, zero allergeni. 🥤", en: "Coca-Cola Zero. All taste, zero sugar, zero allergens.", fr: "Coca-Cola Zéro. Tout le goût, zéro sucre, zéro allergènes.", es: "Coca-Cola Zero. Todo el sabor, cero azúcar, cero alérgenos." },
  29: { it: "Preparato al momento con ingredienti freschi. Nessun allergene. 🍸", en: "Made fresh with quality ingredients. No allergens.", fr: "Préparé à la minute avec des ingrédients frais. Aucun allergène.", es: "Preparado al momento con ingredientes frescos. Sin alérgenos." },
};

const noAllergenMessage = (xanoId: number, locale: string): string => {
  const msg = noAllergenProductMessages[xanoId];
  if (msg) return msg[locale] || msg.it;
  return {
    it: "Prodotto senza allergeni tra i 14 UE. Gustalo in serenità. 🍀",
    en: "No EU-regulated allergens. Enjoy with peace of mind.",
    fr: "Aucun allergène réglementé par l'UE. Dégustez sereinement.",
    es: "Sin alérgenos de los 14 UE. Disfrútalo con tranquilidad.",
  }[locale] || "";
};

const formatPrice = (price: number) =>
  `€ ${price.toFixed(2).replace(".", ",")}`;

interface Props {
  product: Product | null;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductModal = ({ product, onClose, onSelectProduct }: Props) => {
  const { locale, t } = useLocale();
  const { isFavorite, toggle } = useFavorites();

  const allProducts = [...importedProducts, ...staticProducts];

  const open = !!product;
  const tr = product?.translations[locale];
  const fav = product ? isFavorite(product.id) : false;
  const promo = product ? getPromoForProduct(product.id) : undefined;
  const promoTr = promo?.translations[locale];
  const suggestions = product ? getPairings(product.id, allProducts) : [];

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-toret-paper text-toret-ink border-t-0 h-[100dvh] max-h-[100dvh] mt-0 rounded-none p-0 overflow-hidden">
        {product && tr && (
          <div className="mx-auto w-full max-w-[440px] flex flex-col h-[100dvh]">
            <div className="relative h-[60vh] min-h-[360px] shrink-0 bg-toret-cream">
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
                    {product.bottlePrice ? (
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-1.5 text-[16px]">{formatPrice(product.price)}<svg className="h-4 w-4 text-toret-gold-warm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3c0 5 2 7 3 11h4c1-4 3-6 3-11Z"/><line x1="11" y1="14" x2="11" y2="19"/><line x1="7" y1="19" x2="15" y2="19"/></svg><span className="text-[11px] font-normal text-toret-ink-muted">calice</span></span>
    <span className="flex items-center gap-1.5 text-[16px]">{formatPrice(product.bottlePrice)}<svg className="h-4 w-4 text-toret-gold-warm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v2c0 1 2 1.5 2 4v10.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 18.5V8c0-2.5 2-3 2-4V2Z"/></svg><span className="text-[11px] font-normal text-toret-ink-muted">bottiglia</span></span>
  </div>
) : product.largePrice ? (
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-1.5 text-[16px]">{formatPrice(product.price)} <span className="text-[11px] font-normal text-toret-ink-muted">piccolo</span></span>
    <span className="flex items-center gap-1.5 text-[16px]">{formatPrice(product.largePrice)} <span className="text-[11px] font-normal text-toret-ink-muted">grande</span></span>
  </div>
) : (
  formatPrice(product.price)
)}
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
                    {noAllergenMessage(product.xanoId, locale)}
                  </p>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="mt-6">
                  <p className="eyebrow mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-toret-gold-warm" strokeWidth={1.5} />
                    {t("tryThese")}
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((s) => {
                      const st = s.translations[locale];
                      return (
                        <div
                          key={s.id}
                          className="flex items-center gap-3 bg-toret-cream/60 warm-border rounded-2xl p-3 cursor-pointer active:bg-toret-cream transition-colors"
                          onClick={() => { onClose(); setTimeout(() => onSelectProduct?.(s), 100); }}
                        >
                          {s.image ? (
                            <img
                              src={s.image}
                              alt={st?.name || s.name}
                              className="h-14 w-14 rounded-xl object-cover flex-none"
                            />
                          ) : (
                            <div className="h-14 w-14 rounded-xl bg-toret-cream grid place-items-center flex-none">
                              <Utensils className="h-5 w-5 text-toret-gold-warm" strokeWidth={1.5} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[14px] font-medium text-toret-ink truncate">
                              {st?.name || s.name}
                            </h3>
                            {st?.description && (
                              <p className="text-[11px] text-toret-ink-muted leading-snug mt-0.5 truncate">
                                {st.description}
                              </p>
                            )}
                          </div>
                          <span className="price-tag text-[14px] whitespace-nowrap">
                            {formatPrice(s.price)}
                          </span>
                        </div>
                      );
                    })}
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
