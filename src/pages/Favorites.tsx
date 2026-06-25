import { useState } from "react";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import { getProductById, type Product } from "@/data/menu";

const Favorites = () => {
  const { t } = useLocale();
  const { favorites } = useFavorites();
  const [selected, setSelected] = useState<Product | null>(null);
  const items = favorites.map(getProductById).filter((p): p is Product => !!p);

  return (
    <AppShell>
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-2">{t("favorites")}</p>
        <h1 className="font-serif text-4xl italic">{t("favorites")}</h1>
      </div>

      <div className="px-5 py-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <div className="h-16 w-16 rounded-full bg-brand-green/60 grid place-items-center gold-border-strong mb-4">
              <Heart className="h-7 w-7 text-brand-gold" />
            </div>
            <p className="text-brand-cream/60 max-w-xs">{t("noFavorites")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => <ProductCard key={p.id} product={p} onOpen={setSelected} />)}
          </div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default Favorites;