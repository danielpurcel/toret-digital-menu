import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { useLocale } from "@/i18n/LocaleContext";
import { products, type Product } from "@/data/menu";

const SearchPage = () => {
  const { locale, t } = useLocale();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => {
      const tr = p.translations[locale];
      return (
        tr.name.toLowerCase().includes(query) ||
        tr.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    });
  }, [q, locale]);

  return (
    <AppShell>
      <div className="px-5 pt-6 pb-3">
        <p className="eyebrow mb-1">{t("search")}</p>
        <h1 className="font-serif text-[34px] leading-tight text-toret-ink mb-4">
          {t("whatYouLookFor")}
        </h1>
        <label className="flex items-center gap-2.5 h-12 px-4 rounded-full bg-toret-paper warm-border shadow-[var(--shadow-1)]">
          <Search className="h-[18px] w-[18px] text-toret-ink-muted" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 bg-transparent outline-none text-[14px] text-toret-ink placeholder:text-toret-ink-muted"
          />
        </label>
      </div>
      <div className="px-5 py-3 flex flex-col gap-3">
        {results.length === 0 ? (
          <p className="text-center text-toret-ink-muted py-10 text-sm">{t("noResults")}</p>
        ) : (
          results.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setSelected} />
          ))
        )}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default SearchPage;
