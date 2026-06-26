import {
  allergenDescriptions,
  allergenIconPaths,
  allergenLabels,
  type Allergen,
} from "@/data/allergens";
import type { Locale } from "@/data/siteConfig";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  allergen: string;
  locale: Locale;
  compact?: boolean;
}

export const AllergenBadge = ({ allergen, locale, compact = false }: Props) => {
  const key = allergen as Allergen;
  const label = allergenLabels[key]?.[locale] ?? allergen;
  const description = allergenDescriptions[key]?.[locale];
  const iconPath = allergenIconPaths[key];
  const sizeClass = compact ? "h-9 w-9" : "h-10 w-10";
  const iconClass =
    "h-full w-full rounded-full object-contain p-0.5 [filter:none]";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            sizeClass,
            "inline-flex shrink-0 items-center justify-center rounded-full border border-toret-gold/30 bg-toret-paper transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toret-gold-warm focus-visible:ring-offset-2",
          )}
          title={label}
          aria-label={description ? `${label}: ${description}` : label}
        >
          {iconPath ? (
            <img
              src={iconPath}
              alt=""
              className={iconClass}
              loading="lazy"
              aria-hidden="true"
            />
          ) : (
            <span className="grid h-full w-full place-items-center rounded-full bg-toret-cream text-[11px] font-semibold text-toret-green warm-border">
              ?
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 rounded-xl p-3" side="top">
        <div className="flex items-start gap-3">
          {iconPath && (
            <img
              src={iconPath}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full border border-toret-gold/30 bg-toret-paper object-contain p-0.5 [filter:none]"
              aria-hidden="true"
            />
          )}
          <div>
            <p className="font-semibold text-toret-ink">{label}</p>
            {description && (
              <p className="mt-1 text-[13px] leading-snug text-toret-ink-muted">
                {description}
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
