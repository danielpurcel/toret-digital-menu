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
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border/60">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {cats.map((c) => {
            const active = c.id === value;
            return (
              <button
                key={c.id}
                onClick={() => onChange(c.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "bg-card text-foreground/70 hover:bg-muted border border-border/60",
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