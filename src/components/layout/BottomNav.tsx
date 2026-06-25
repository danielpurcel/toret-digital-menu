import { NavLink } from "react-router-dom";
import { Home, BookOpen, Heart, Info } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const { t } = useLocale();

  const items = [
    { to: "/", label: t("home"), icon: Home, end: true },
    { to: "/menu", label: t("menu"), icon: BookOpen },
    { to: "/preferiti", label: t("favorites"), icon: Heart },
    { to: "/info", label: t("info"), icon: Info },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-primary text-primary-foreground border-t border-secondary/40">
      <ul className="grid grid-cols-4 h-16 px-2">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center h-full gap-1 transition-colors text-[10px] font-medium uppercase tracking-wider",
                  isActive ? "text-accent" : "text-primary-foreground/70 hover:text-primary-foreground",
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};