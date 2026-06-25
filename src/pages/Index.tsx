import { Link } from "react-router-dom";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Hero } from "@/components/menu/Hero";
import { PromoBanner } from "@/components/menu/PromoBanner";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { useLocale } from "@/i18n/LocaleContext";
import { getFeatured, macroLabels, type Product } from "@/data/menu";
import { getPromoByMacro } from "@/data/promos";
import catColazione from "@/assets/cat-colazione.jpg";
import catPranzo from "@/assets/cat-pranzo.jpg";
import catAperitivo from "@/assets/cat-aperitivo.jpg";

const Index = () => {
  const { locale, t } = useLocale();
  const [selected, setSelected] = useState<Product | null>(null);
  const featured = getFeatured();
  const promo = getPromoByMacro("colazione");

  const cats = [
    { id: "colazione", image: catColazione, to: "/menu/colazione" },
    { id: "pranzo", image: catPranzo, to: "/menu/pranzo" },
    { id: "aperitivo", image: catAperitivo, to: "/menu/aperitivo" },
  ] as const;

  return (
    <AppShell>
      <Hero />

      {/* Category cards — horizontal scroll */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl italic">{t("chooseMoment")}</h2>
          <span className="h-px flex-1 ml-4 bg-brand-gold/15" />
        </div>
        <div className="grid grid-cols-3 gap-3 pb-2">
          {cats.map((c) => (
            <Link
              key={c.id}
              to={c.to}
              className="w-full group"
            >
              <div className="h-32 rounded-2xl overflow-hidden mb-3 gold-border-strong shadow-[var(--shadow-soft)] transition-transform group-active:scale-95">
                <img
                  src={c.image}
                  alt={macroLabels[c.id][locale]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="text-center font-serif text-base italic text-brand-cream">
                {macroLabels[c.id][locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="px-5 pt-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl italic">{t("mostLoved")}</h2>
          <span className="h-px flex-1 ml-4 bg-brand-gold/15" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setSelected} />
          ))}
        </div>
      </section>

      {promo && (
        <section className="px-5 mt-6">
          <PromoBanner promo={promo} />
        </section>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default Index;
