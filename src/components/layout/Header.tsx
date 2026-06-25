import { Search, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { siteConfig, type Locale } from "@/data/siteConfig";
import { useLocale } from "@/i18n/LocaleContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const locales: { code: Locale; label: string }[] = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export const Header = ({ transparent }: { transparent?: boolean }) => {
  const { locale, setLocale, t } = useLocale();
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[440px]",
        transparent
          ? "bg-transparent"
          : "bg-[hsl(var(--toret-ivory)/0.82)] backdrop-blur-xl backdrop-saturate-150 border-b warm-border",
      )}
    >
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left: mini logo + name */}
        <Link to="/" aria-label="Caffè Torèt" className="flex items-center gap-2.5 min-w-0">
          <span className="relative h-10 w-10 rounded-full overflow-hidden gold-border shrink-0 bg-[hsl(var(--toret-green-deep))]">
            <img
              src={siteConfig.logo}
              alt=""
              className="h-full w-full object-cover"
              width={40}
              height={40}
            />
          </span>
          <span className="flex flex-col leading-tight min-w-0">
            <span
              className={cn(
                "font-serif text-[17px] font-semibold truncate",
                transparent ? "text-toret-paper" : "text-toret-ink",
              )}
            >
              {siteConfig.name}
            </span>
            <span className="eyebrow text-[10px]">
              {t("turin")} · {t("open")}
            </span>
          </span>
        </Link>

        {/* Right: search + locale */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label={t("search")}
            onClick={() => navigate("/cerca")}
            className={cn(
              "h-9 w-9 rounded-full grid place-items-center warm-border bg-toret-paper hover:bg-toret-cream transition-colors",
              transparent && "bg-toret-paper/90",
            )}
          >
            <Search className="h-[18px] w-[18px] text-toret-ink-soft" strokeWidth={1.5} />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Select language"
              className={cn(
                "h-9 rounded-full px-3 inline-flex items-center gap-1.5 warm-border bg-toret-paper hover:bg-toret-cream transition-colors",
                transparent && "bg-toret-paper/90",
              )}
            >
              <Globe className="h-[14px] w-[14px] text-toret-ink-soft" strokeWidth={1.5} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-toret-ink">
                {locale}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-toret-paper text-toret-ink warm-border">
              {locales.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={cn(
                    "cursor-pointer",
                    locale === l.code && "font-semibold text-toret-green",
                  )}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};