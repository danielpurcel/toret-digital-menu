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
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-brand-gold/10">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 px-5 py-4 min-w-max">
          {cats.map((c) => {
            const active = c.id === value;
            return (
              <button
                key={c.id}
                onClick={() => onChange(c.id)}
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap pb-1 border-b transition-all",
                  active
                    ? "text-brand-gold border-brand-gold"
                    : "text-brand-cream/50 border-transparent hover:text-brand-cream",
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