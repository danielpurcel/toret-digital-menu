import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLocale } from "@/i18n/LocaleContext";
import { macroLabels } from "@/data/menu";
import catColazione from "@/assets/cat-colazione.jpg";
import catPranzo from "@/assets/cat-pranzo.jpg";
import catAperitivo from "@/assets/cat-aperitivo.jpg";

const MenuIndex = () => {
  const { locale, t } = useLocale();

  const cats = [
    { id: "colazione", image: catColazione, to: "/menu/colazione" },
    { id: "pranzo", image: catPranzo, to: "/menu/pranzo" },
    { id: "aperitivo", image: catAperitivo, to: "/menu/aperitivo" },
  ] as const;

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">{t("menu")}</p>
        <h1 className="font-serif text-4xl">{t("discoverMenu")}</h1>
      </div>
      <div className="p-4 space-y-4">
        {cats.map((c) => (
          <Link
            key={c.id}
            to={c.to}
            className="block relative rounded-2xl overflow-hidden h-44 shadow-[var(--shadow-card)] group"
          >
            <img
              src={c.image}
              alt={macroLabels[c.id][locale]}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, hsl(var(--brand-dark) / 0.1) 30%, hsl(var(--brand-dark) / 0.85) 100%)" }}
            />
            <div className="relative h-full flex items-end justify-between px-5 pb-5 text-brand-cream-warm">
              <h2 className="font-serif text-3xl">{macroLabels[c.id][locale]}</h2>
              <ChevronRight className="h-6 w-6 text-brand-gold" />
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
};

export default MenuIndex;