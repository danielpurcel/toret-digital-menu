import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { PromoBanner } from "@/components/menu/PromoBanner";
import { useLocale } from "@/i18n/LocaleContext";
import {
  categoriesByMacro,
  macroLabels,
  type MacroCategory,
  type Product,
} from "@/data/menu";
import { byMacro, useMenuProducts } from "@/hooks/useMenuProducts";
import { getPromoByMacro } from "@/data/promos";
import catColazione from "@/assets/cat-colazione.jpg";
import catPranzo from "@/assets/cat-pranzo.jpg";
import catAperitivo from "@/assets/cat-aperitivo.jpg";

const validMacros: MacroCategory[] = ["colazione", "pranzo", "aperitivo"];

const macroMeta: Record<MacroCategory, { image: string; time: string; tagline: { it: string; en: string; fr: string } }> = {
  colazione: {
    image: catColazione,
    time: "07:30 – 11:00",
    tagline: {
      it: "Caffè della casa, croissant freschi e spremute di stagione.",
      en: "House coffee, fresh croissants and seasonal juices.",
      fr: "Café maison, croissants frais et jus de saison.",
    },
  },
  pranzo: {
    image: catPranzo,
    time: "12:00 – 15:00",
    tagline: {
      it: "Cucina piemontese del giorno, pasta fresca, secondi della tradizione.",
      en: "Daily Piedmontese cuisine, fresh pasta, traditional mains.",
      fr: "Cuisine piémontaise du jour, pâtes fraîches, plats de tradition.",
    },
  },
  aperitivo: {
    image: catAperitivo,
    time: "18:00 – 22:00",
    tagline: {
      it: "Vermouth torinese, vini del territorio e taglieri della casa.",
      en: "Turin vermouth, local wines and house charcuterie boards.",
      fr: "Vermouth turinois, vins du terroir et planches maison.",
    },
  },
};

const MacroPage = () => {
  const { macro } = useParams<{ macro: string }>();
  const { locale, t } = useLocale();
  const [selected, setSelected] = useState<Product | null>(null);
  const [category, setCategory] = useState("all");
  const { data: allProducts, isFetching } = useMenuProducts();
  const macroKey = validMacros.includes(macro as MacroCategory)
    ? (macro as MacroCategory)
    : "colazione";
  const meta = macroMeta[macroKey];
  const products = useMemo(() => {
    const macroProducts = byMacro(allProducts, macroKey);
    if (category === "all") return macroProducts;
    return macroProducts.filter((p) => p.category === category);
  }, [allProducts, macroKey, category]);
  const promo = getPromoByMacro(macroKey);

  if (!macro || !validMacros.includes(macro as MacroCategory)) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <AppShell noTopPadding transparentHeader>
      {/* Hero */}
      <section className="relative h-[280px] overflow-hidden">
        <img
          src={meta.image}
          alt={macroLabels[macroKey][locale]}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-toret-green-deep/90 via-toret-green-deep/35 to-toret-green-deep/40" />
        <div className="relative h-full flex flex-col justify-end px-6 pb-6 text-toret-paper pt-20">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-toret-gold mb-1">
            {meta.time}
          </span>
          <h1 className="font-serif text-[40px] leading-[1.0] mb-2">
            {macroLabels[macroKey][locale]}
          </h1>
          <p className="text-[13px] text-toret-paper/85 leading-snug max-w-[22rem]">
            {meta.tagline[locale]}
          </p>
        </div>
      </section>

      <div className="px-5 py-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1" aria-label={t("menu")}>
          {categoriesByMacro[macroKey].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold warm-border transition-colors ${
                category === item.id
                  ? "bg-toret-green text-toret-paper"
                  : "bg-toret-paper text-toret-ink-soft"
              }`}
            >
              {item.label[locale]}
            </button>
          ))}
        </div>
        {isFetching && (
          <p className="text-[12px] text-toret-ink-muted px-1">{t("updatingMenu")}</p>
        )}
        {promo && (
          <div className="mb-2">
            <PromoBanner promo={promo} />
          </div>
        )}
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={setSelected} />
        ))}
        {products.length === 0 && (
          <p className="text-center text-toret-ink-muted py-10 text-sm">—</p>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default MacroPage;
