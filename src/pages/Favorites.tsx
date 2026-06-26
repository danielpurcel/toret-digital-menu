import { useState } from "react";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "@/i18n/LocaleContext";
import { type Product } from "@/data/menu";
import { byId, useMenuProducts } from "@/hooks/useMenuProducts";

const Favorites = () => {
  const { t } = useLocale();
  const { favorites } = useFavorites();
  const [selected, setSelected] = useState<Product | null>(null);
  const { data: products } = useMenuProducts();
  const items = favorites.map((id) => byId(products, id)).filter((p): p is Product => !!p);

  return (
    <AppShell>
      <div className="px-5 pt-6 pb-2">
        <p className="eyebrow mb-1">{t("favorites")}</p>
        <h1 className="font-serif text-[34px] leading-tight text-toret-ink">{t("favorites")}</h1>
      </div>

      <div className="px-5 py-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <div className="h-16 w-16 rounded-full bg-toret-cream grid place-items-center warm-border mb-4">
              <Heart className="h-7 w-7 text-toret-gold-warm" strokeWidth={1.5} />
            </div>
            <p className="text-toret-ink-muted max-w-xs">{t("noFavorites")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((p) => <ProductCard key={p.id} product={p} onOpen={setSelected} />)}
          </div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default Favorites;
