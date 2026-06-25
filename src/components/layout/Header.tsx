import { Menu as MenuIcon, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig, type Locale } from "@/data/siteConfig";
import { useLocale } from "@/i18n/LocaleContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

export const Header = () => {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("home") },
    { to: "/menu", label: t("menu") },
    { to: "/preferiti", label: t("favorites") },
    { to: "/info", label: t("info") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md text-foreground">
      <div className="flex items-center justify-between px-5 h-20">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="w-9 h-9 flex flex-col justify-center items-start gap-1.5 group"
          >
            <span className="block w-6 h-px bg-brand-gold transition-all group-hover:w-7" />
            <span className="block w-4 h-px bg-brand-gold transition-all group-hover:w-7" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-background text-foreground border-r border-brand-gold/20 w-72">
            <SheetHeader>
              <SheetTitle className="font-serif text-3xl italic text-brand-gold">Caffè Torèt</SheetTitle>
            </SheetHeader>
            <nav className="mt-10 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl italic py-3 border-b border-brand-gold/10 hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          to="/"
          aria-label="Caffè Torèt home"
          className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border border-brand-gold/40 shadow-[var(--shadow-soft)] -my-2"
        >
          <img
            src={siteConfig.logo}
            alt="Caffè Torèt logo"
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Select language"
            className="flex items-center gap-1.5 border border-brand-gold/40 rounded-full px-2.5 py-1.5 hover:border-brand-gold/70 transition-colors"
          >
            <Globe className="h-3 w-3 text-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{locale}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card text-card-foreground border-brand-gold/20">
            {locales.map((l) => (
              <DropdownMenuItem
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={locale === l.code ? "font-semibold text-brand-gold" : ""}
              >
                {l.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};