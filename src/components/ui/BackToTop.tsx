import { useEffect, useState, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 350;
const BOTTOM_OFFSET = 104; /* 84px BottomNav + 20px margin */

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setVisible(scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    /* Use requestAnimationFrame throttling: check every frame */
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    /* Run once on mount in case user is already scrolled */
    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Torna in cima"
      title="Torna in cima"
      onClick={scrollToTop}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          scrollToTop();
        }
      }}
      className={cn(
        "fixed right-5 z-40 flex items-center justify-center",
        "h-[54px] w-[54px] rounded-full",
        "bg-[hsl(var(--toret-green-deep))] text-toret-gold",
        "shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)]",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toret-gold focus-visible:ring-offset-2",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
      style={{
        bottom: `calc(${BOTTOM_OFFSET}px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      <ChevronUp className="h-[22px] w-[22px]" strokeWidth={2} />
    </button>
  );
};
