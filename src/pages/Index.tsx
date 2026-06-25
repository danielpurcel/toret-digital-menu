import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
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

      <section className="px-4 mt-6">
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-serif text-2xl">{t("chooseMoment")}</h2>
        </div>
        <div className="space-y-3">
          {cats.map((c) => (
            <Link
              key={c.id}
              to={c.to}
              className="block relative rounded-2xl overflow-hidden h-28 shadow-[var(--shadow-card)] group"
            >
              <img
                src={c.image}
                alt={macroLabels[c.id][locale]}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, hsl(var(--brand-dark) / 0.85) 0%, hsl(var(--brand-dark) / 0.2) 100%)" }}
              />
              <div className="relative h-full flex items-center justify-between px-5 text-brand-cream-warm">
                <h3 className="font-serif text-2xl">{macroLabels[c.id][locale]}</h3>
                <ChevronRight className="h-5 w-5 text-brand-gold" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 mt-8">
        <h2 className="font-serif text-2xl mb-3">{t("mostLoved")}</h2>
        <div className="space-y-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setSelected} />
          ))}
        </div>
      </section>

      {promo && (
        <section className="px-4 mt-8 mb-6">
          <PromoBanner promo={promo} />
        </section>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default Index;
