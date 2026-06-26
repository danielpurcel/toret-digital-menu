import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
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
        "fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[440px] h-[96px]",
        transparent
          ? "bg-transparent"
          : "bg-[hsl(var(--toret-ivory)/0.82)] backdrop-blur-xl backdrop-saturate-150 border-b warm-border",
      )}
    >
      <div className="relative flex items-center justify-between px-4 h-full">
        {/* Left spacer */}
        <div className="w-9 shrink-0" />

        {/* Center: logo + name */}
        <Link
          to="/"
          aria-label="Caffè Torèt"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5"
        >
          <span className="relative h-[84px] w-[84px] rounded-full overflow-hidden gold-border shrink-0 bg-[hsl(var(--toret-green-deep))]">
            <img
              src={siteConfig.logo}
              alt=""
              className="h-full w-full object-cover"
              width={84}
              height={84}
            />
          </span>
          <span className="flex flex-col leading-tight min-w-0">
            <span
              className={cn(
                "font-serif text-[17px] font-semibold truncate",
                transparent ? "text-toret-paper" : "text-toret-ink",
              )}
            >
              {"\u00a0"}
            </span>
            <span className="eyebrow text-[10px]">
              {"\n"}
            </span>
          </span>
        </Link>

        {/* Right: locale */}
        <div className="flex items-center gap-2 shrink-0">
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