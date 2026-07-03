import { Link } from "react-router-dom";
import { useState } from "react";
import { Clock } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Hero } from "@/components/menu/Hero";
import { PromoBanner } from "@/components/menu/PromoBanner";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { useLocale } from "@/i18n/LocaleContext";
import { useIsOpen } from "@/hooks/useIsOpen";
import { macroLabels, type Product } from "@/data/menu";
import { featuredProducts, useMenuProducts } from "@/hooks/useMenuProducts";
import { getPromoByMacro } from "@/data/promos";
import catColazione from "@/assets/cat-colazione.jpg";
import catPranzo from "@/assets/cat-pranzo.jpg";
import catAperitivo from "@/assets/cat-aperitivo.jpg";

const Index = () => {
  const { locale, t } = useLocale();
  const { isOpen, closesAt, reopensAt } = useIsOpen();
  const [selected, setSelected] = useState<Product | null>(null);
  const { data: products } = useMenuProducts();
  const featured = featuredProducts(products);
  const promo = getPromoByMacro("colazione");

  const cats = [
    { id: "colazione", image: catColazione, to: "/menu/colazione", time: "07:30 – 11:00" },
    { id: "pranzo", image: catPranzo, to: "/menu/pranzo", time: "12:00 – 15:00" },
    { id: "aperitivo", image: catAperitivo, to: "/menu/aperitivo", time: "18:00 – 22:00" },
  ] as const;

  return (
    <AppShell noTopPadding transparentHeader>
      <Hero />

      {/* Status pill */}
      <section className="px-5 -mt-8 relative z-10">
        <div className="rounded-2xl bg-toret-paper warm-border px-4 py-3 flex items-center gap-2 shadow-[var(--shadow-3)]">
          <span className="h-7 w-7 rounded-full bg-toret-cream grid place-items-center">
            <Clock className="h-3.5 w-3.5 text-toret-green" strokeWidth={1.5} />
          </span>
          <p className="text-[13px] text-toret-ink-soft">
            <span className={`font-semibold ${isOpen ? "text-toret-green" : "text-red-500"}`}>
              {isOpen ? "🟢" : "🔴"} {isOpen ? t("openNow") : t("closed")}
            </span>
            {isOpen ? (
              <span className="text-toret-ink-muted"> · {t("kitchenUntil")} {closesAt}</span>
            ) : (
              <span className="text-toret-ink-muted"> · riapriamo {reopensAt}</span>
            )}
          </p>
        </div>
      </section>

      {/* Moments */}
      <section className="px-5 pt-7">
        <p className="eyebrow mb-1">{t("whatYouLookFor")}</p>
        <h2 className="font-serif text-[28px] leading-tight text-toret-ink mb-4">
          {t("chooseMoment")}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {cats.map((c, i) => (
            <Link
              key={c.id}
              to={c.to}
              className={`group relative h-36 rounded-2xl overflow-hidden warm-border shadow-[var(--shadow-2)] ${
                i === cats.length - 1 ? "col-span-2 h-32" : ""
              }`}
            >
              <img
                src={c.image}
                alt={macroLabels[c.id][locale]}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-toret-green-deep/85 via-toret-green-deep/15 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-3 text-toret-paper">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-toret-gold">
                  {c.time}
                </span>
                <h3 className="font-serif text-[22px] leading-tight">
                  {macroLabels[c.id][locale]}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Suggestions */}
      <section className="px-5 pt-8">
        <p className="eyebrow mb-1">{t("dontMiss")}</p>
        <h2 className="font-serif text-[26px] leading-tight text-toret-ink mb-4">
          {t("mostLoved")}
        </h2>
        <div className="flex flex-col gap-3">
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

      <ProductModal product={selected} onClose={() => setSelected(null)} onSelectProduct={setSelected} />
    </AppShell>
  );
};

export default Index;
