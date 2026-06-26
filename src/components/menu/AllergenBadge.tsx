import { allergenIcons, allergenLabels, type Allergen } from "@/data/allergens";
import type { Locale } from "@/data/siteConfig";

interface Props {
  allergen: string;
  locale: Locale;
  compact?: boolean;
}

export const AllergenBadge = ({ allergen, locale, compact = false }: Props) => {
  const key = allergen as Allergen;
  const label = allergenLabels[key]?.[locale] ?? allergen;
  const icon = allergenIcons[key] ?? "?";

  return (
    <span
      className={`inline-flex items-center gap-1.5 bg-toret-cream text-toret-ink-soft rounded-full warm-border ${
        compact ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-[12px]"
      }`}
      title={label}
      aria-label={label}
    >
      <span
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-toret-paper text-[11px] font-semibold text-toret-green warm-border"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>{label}</span>
    </span>
  );
};
