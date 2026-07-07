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
    { id: "colazione", image: catColazione, to: "/menu/colazione", time: "07:30 – 11:00" },
    { id: "pranzo", image: catPranzo, to: "/menu/pranzo", time: "12:00 – 15:00" },
    { id: "aperitivo", image: catAperitivo, to: "/menu/aperitivo", time: "18:00 – 20:00" },
  ] as const;

  return (
    <AppShell>
      <div className="px-5 pt-6 pb-3">
        <p className="eyebrow mb-1">{t("menu")}</p>
        <h1 className="font-serif text-[34px] leading-tight text-toret-ink">
          {t("discoverMenu")}
        </h1>
      </div>
      <div className="px-5 py-4 space-y-3">
        {cats.map((c) => (
          <Link
            key={c.id}
            to={c.to}
            className="block relative rounded-2xl overflow-hidden h-44 warm-border shadow-[var(--shadow-2)] group"
          >
            <img
              src={c.image}
              alt={macroLabels[c.id][locale]}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-toret-green-deep/85 via-toret-green-deep/15 to-transparent" />
            <div className="relative h-full flex items-end justify-between px-5 pb-5 text-toret-paper">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-toret-gold">
                  {c.time}
                </span>
                <h2 className="font-serif text-[28px] leading-tight">
                  {macroLabels[c.id][locale]}
                </h2>
              </div>
              <ChevronRight className="h-6 w-6 text-toret-gold" strokeWidth={1.5} />
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
};

export default MenuIndex;