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
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-50">
      <div
        className="bg-brand-green/85 backdrop-blur-2xl rounded-full px-3 py-3 flex justify-around items-center"
        style={{
          boxShadow: "var(--shadow-nav)",
          border: "1px solid hsl(var(--brand-gold) / 0.25)",
        }}
      >
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all",
                isActive ? "text-brand-gold" : "text-brand-cream/50 hover:text-brand-cream",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[8px] uppercase tracking-[0.15em] font-semibold">{label}</span>
                <span
                  className={cn(
                    "w-1 h-1 rounded-full transition-all",
                    isActive ? "bg-brand-gold" : "bg-transparent",
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