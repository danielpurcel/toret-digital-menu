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
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
      <div className="flex items-center justify-between px-4 h-16">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="p-2 rounded-full hover:bg-secondary/40 transition-colors"
          >
            <MenuIcon className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary text-primary-foreground border-0 w-72">
            <SheetHeader>
              <SheetTitle className="font-serif text-2xl text-brand-gold">Caffè Torèt</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-xl py-3 px-3 rounded-md hover:bg-secondary/30 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" aria-label="Caffè Torèt home" className="flex items-center">
          <img
            src={siteConfig.logo}
            alt="Caffè Torèt logo"
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Select language"
            className="p-2 rounded-full hover:bg-secondary/40 transition-colors flex items-center gap-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">{locale}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card">
            {locales.map((l) => (
              <DropdownMenuItem
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={locale === l.code ? "font-semibold text-accent" : ""}
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