import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import type { MacroCategory } from "@/data/menu";
import { categoriesByMacro } from "@/data/menu";

interface Props {
  macro: MacroCategory;
  value: string;
  onChange: (id: string) => void;
}

export const CategoryTabs = ({ macro, value, onChange }: Props) => {
  const { locale } = useLocale();
  const cats = categoriesByMacro[macro];

  return (
    <div className="bg-toret-ivory">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-5 py-3 min-w-max">
          {cats.map((c) => {
            const active = c.id === value;
            return (
              <button
                key={c.id}
                onClick={() => onChange(c.id)}
                className={cn(
                  "px-4 h-9 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-all",
                  active
                    ? "bg-toret-green text-toret-paper shadow-[var(--shadow-1)]"
                    : "bg-toret-paper text-toret-ink warm-border hover:bg-toret-cream",
                )}
              >
                {c.label[locale]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};