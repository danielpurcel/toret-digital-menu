import { NavLink } from "react-router-dom";
import { Home, BookOpen, Search, Heart, Info } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const { t } = useLocale();

  const items = [
    { to: "/", label: t("home"), icon: Home, end: true },
    { to: "/menu", label: t("menu"), icon: BookOpen },
    { to: "/cerca", label: t("search"), icon: Search },
    { to: "/preferiti", label: t("favorites"), icon: Heart },
    { to: "/info", label: t("info"), icon: Info },
  ];

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[420px] z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="rounded-[28px] px-2 py-2 flex justify-around items-stretch"
        style={{
          background: "hsl(var(--toret-green-deep))",
          boxShadow: "var(--shadow-nav)",
          border: "1px solid hsl(var(--toret-gold) / 0.18)",
        }}
      >
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-2xl transition-colors",
                isActive ? "text-toret-gold" : "text-toret-paper/60 hover:text-toret-paper",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
                <span
                  className={cn(
                    "w-1 h-1 rounded-full transition-all -mt-0.5",
                    isActive ? "bg-toret-gold" : "bg-transparent",
                  )}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};