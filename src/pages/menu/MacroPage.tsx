import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { PromoBanner } from "@/components/menu/PromoBanner";
import { useLocale } from "@/i18n/LocaleContext";
import {
  getProductsByMacro,
  macroLabels,
  type MacroCategory,
  type Product,
} from "@/data/menu";
import { getPromoByMacro } from "@/data/promos";

const validMacros: MacroCategory[] = ["colazione", "pranzo", "aperitivo"];

const MacroPage = () => {
  const { macro } = useParams<{ macro: string }>();
  const { locale } = useLocale();
  const [activeCat, setActiveCat] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  if (!macro || !validMacros.includes(macro as MacroCategory)) {
    return <Navigate to="/menu" replace />;
  }

  const macroKey = macro as MacroCategory;
  const products = useMemo(() => getProductsByMacro(macroKey), [macroKey]);
  const filtered = activeCat === "all" ? products : products.filter((p) => p.category === activeCat);
  const promo = getPromoByMacro(macroKey);

  return (
    <AppShell>
      <div className="px-5 pt-3 pb-3 flex items-center gap-3">
        <Link
          to="/menu"
          aria-label="Back"
          className="h-9 w-9 rounded-full grid place-items-center bg-brand-green/60 gold-border-strong text-brand-gold"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-serif text-3xl italic">{macroLabels[macroKey][locale]}</h1>
      </div>

      <CategoryTabs macro={macroKey} value={activeCat} onChange={setActiveCat} />

      <div className="px-5 py-5 space-y-5">
        {promo && activeCat === "all" && <PromoBanner promo={promo} />}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setSelected} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-brand-cream/50 py-10">—</p>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default MacroPage;