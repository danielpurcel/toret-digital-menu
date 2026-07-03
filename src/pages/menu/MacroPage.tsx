import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Coffee, Thermometer, CakeSlice, Apple, UtensilsCrossed, Sandwich, CupSoda, GlassWater, Wine, ChefHat, Egg, ClipboardList, Beef, Carrot, Salad, HandPlatter, Martini, Beer, Cookie, Citrus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { PromoBanner } from "@/components/menu/PromoBanner";
import { useLocale } from "@/i18n/LocaleContext";
import {
  macroLabels,
  type MacroCategory,
  type Product,
} from "@/data/menu";
import { useMenuCategories } from "@/hooks/useMenuCategories";
import { byMacro, useMenuProducts } from "@/hooks/useMenuProducts";
import { getPromoByMacro } from "@/data/promos";
import catColazione from "@/assets/cat-colazione.jpg";
import catPranzo from "@/assets/cat-pranzo.jpg";
import catAperitivo from "@/assets/cat-aperitivo.jpg";

const validMacros: MacroCategory[] = ["colazione", "pranzo", "aperitivo"];

/** Mappa nome icona Lucide → componente */
const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  coffee: Coffee,
  thermometer: Thermometer,
  "cake-slice": CakeSlice,
  apple: Apple,
  "utensils-crossed": UtensilsCrossed,
  sandwich: Sandwich,
  "cup-soda": CupSoda,
  "glass-water": GlassWater,
  wine: Wine,
  "chef-hat": ChefHat,
  egg: Egg,
  "clipboard-list": ClipboardList,
  beef: Beef,
  carrot: Carrot,
  salad: Salad,
  "hand-platter": HandPlatter,
  martini: Martini,
  beer: Beer,
  cookie: Cookie,
};

const macroMeta: Record<
  MacroCategory,
  { image: string; time: string; tagline: { it: string; en: string; fr: string; es: string } }
> = {
  colazione: {
    image: catColazione,
    time: "07:30 – 11:00",
    tagline: {
      it: "Caffè della casa, croissant freschi e spremute di stagione.",
      en: "House coffee, fresh croissants and seasonal juices.",
      fr: "Café maison, croissants frais et jus de saison.",
      es: "Café de la casa, cruasanes frescos y zumos de temporada.",
    },
  },
  pranzo: {
    image: catPranzo,
    time: "12:00 – 15:00",
    tagline: {
      it: "Cucina piemontese del giorno, pasta fresca, secondi della tradizione.",
      en: "Daily Piedmontese cuisine, fresh pasta, traditional mains.",
      fr: "Cuisine piémontaise du jour, pâtes fraîches, plats de tradition.",
      es: "Cocina piamontesa del día, pasta fresca, platos tradicionales.",
    },
  },
  aperitivo: {
    image: catAperitivo,
    time: "18:00 – 22:00",
    tagline: {
      it: "Vermouth torinese, vini del territorio e taglieri della casa.",
      en: "Turin vermouth, local wines and house charcuterie boards.",
      fr: "Vermouth turinois, vins du terroir et planches maison.",
      es: "Vermú turinés, vinos del territorio y tablas de la casa.",
    },
  },
};

const isMacro = (m: unknown): m is MacroCategory => validMacros.includes(m as MacroCategory);

const MacroPage = () => {
  const { macro } = useParams<{ macro: string }>();
  const { locale, t } = useLocale();
  const [selected, setSelected] = useState<Product | null>(null);
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const { data: allProducts, isFetching } = useMenuProducts();
  const { categories: xanoCats, categoryMap, macroForCategory } = useMenuCategories();
  const macroKey = isMacro(macro) ? macro : "colazione";
  const meta = macroMeta[macroKey];

  // Sottocategorie dinamiche da Xano (menu_categories) filtrate per macro
  // Nel pranzo: nascondiamo Primi (9), Secondi (10), Contorni (11) — unificati in Menu del Giorno
  const HIDDEN_PRANZO_CATS = new Set([9, 10, 11]);
  const subcategories = useMemo(() => {
    const cats: { id: number; icon: string }[] = [];
    for (const cat of xanoCats) {
      if ((cat.macro || "").toLowerCase() === macroKey) {
        if (macroKey === "pranzo" && HIDDEN_PRANZO_CATS.has(cat.id)) continue;
        cats.push({ id: cat.id, icon: cat.icon || "help-circle" });
      }
    }
    cats.sort((a, b) => a.id - b.id);
    return cats;
  }, [xanoCats, macroKey]);

  // Prodotti filtrati per macro + sottocategoria, ordinati per sortOrder
  const products = useMemo(() => {
    let filtered = byMacro(allProducts, macroKey);
    if (categoryId !== "all") {
      filtered = filtered.filter((p) => p.categoryId === categoryId);
    }
    // Ordina per sortOrder (chi ha sortOrder undefined va in fondo)
    return filtered.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
  }, [allProducts, macroKey, categoryId]);

  const promo = getPromoByMacro(macroKey);

  if (!macro || !isMacro(macro)) {
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
          {/* Pulsante "Tutti" */}
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold warm-border transition-colors flex items-center gap-1.5 ${
              categoryId === "all"
                ? "bg-toret-green text-toret-paper"
                : "bg-toret-paper text-toret-ink-soft"
            }`}
          >
            {t("all")}
          </button>

          {subcategories.map(({ id, icon }) => {
            const info = categoryMap[id];
            const Icon = iconMap[icon];
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategoryId(id)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold warm-border transition-colors flex items-center gap-1.5 ${
                  categoryId === id
                    ? "bg-toret-green text-toret-paper"
                    : "bg-toret-paper text-toret-ink-soft"
                }`}
              >
                {Icon && <Icon size={16} className="shrink-0" />}
                {info.name[locale]}
              </button>
            );
          })}
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
