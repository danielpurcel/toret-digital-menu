/**
 * useMenuCategories — Hook per fetchare le categorie del menu da Xano.
 *
 * Legge da /api/categories (Cloudflare proxy → Xano menu_categories).
 * Ogni categoria ha: id, name_it/en/fr/es, icon, sort_order, is_active, macro.
 *
 * Fallback su subcategoryConfig se la fetch fallisce.
 */
import { useQuery } from "@tanstack/react-query";
import { subcategoryConfig, type SubcategoryInfo } from "@/data/subcategoryConfig";
import type { MacroCategory } from "@/data/menu";

export interface XanoCategory {
  id: number;
  name_it?: string;
  name_en?: string;
  name_fr?: string;
  name_es?: string;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
  macro?: string;
  parent_id?: number;
}

/**
 * Formatta una categoria Xano nella struttura SubcategoryInfo (interfaccia comune).
 */
const toSubcategoryInfo = (cat: XanoCategory): SubcategoryInfo => ({
  name: {
    it: cat.name_it || "",
    en: cat.name_en || "",
    fr: cat.name_fr || "",
    es: cat.name_es || "",
  },
  icon: cat.icon || "help-circle",
});

/**
 * Mappa una categoria Xano alla macro-categoria corrispondente.
 */
const macroFromCategory = (cat: XanoCategory): MacroCategory => {
  const macro = (cat.macro || "").toLowerCase();
  if (macro === "pranzo") return "pranzo";
  if (macro === "aperitivo") return "aperitivo";
  return "colazione"; // default
};

export interface UseMenuCategoriesResult {
  categories: XanoCategory[];
  categoryMap: Record<number, SubcategoryInfo>;
  macroForCategory: (catId: number) => MacroCategory | undefined;
  isLoading: boolean;
  isError: boolean;
}

/**
 * Hook principale — fetcha le categorie da Xano con fallback statico.
 */
export const useMenuCategories = (): UseMenuCategoriesResult => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menuCategories"],
    queryFn: async (): Promise<XanoCategory[]> => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();

        // Xano restituisce { items: [...] } oppure direttamente array
        const rawItems: XanoCategory[] = json.items || json || [];

        // Filtra solo categorie attive, ordinate per sort_order
        return rawItems
          .filter((cat: XanoCategory) => cat.is_active !== false)
          .sort((a: XanoCategory, b: XanoCategory) =>
            (a.sort_order || 999) - (b.sort_order || 999),
          );
      } catch (err) {
        console.warn("[MenuCategories] Fetch fallito, uso fallback statico:", err);
        throw err; // React Query gestirà il fallback con initialData
      }
    },
    staleTime: 30000, // 30 secondi come per i prodotti
    retry: 2,
    refetchOnWindowFocus: true,
  });

  // Se i dati Xano sono disponibili, costruiamo la mappa da lì
  const categories = data || [];

  // Costruiamo la mappa: category_id → SubcategoryInfo
  const liveMap: Record<number, SubcategoryInfo> = {};
  const liveMacroMap: Record<number, MacroCategory> = {};

  for (const cat of categories) {
    const id = cat.id;
    liveMap[id] = toSubcategoryInfo(cat);
    const macro = macroFromCategory(cat);
    liveMacroMap[id] = macro;
  }

  // Se non ci sono dati live, usiamo subcategoryConfig come fallback
  const finalCategoryMap = Object.keys(liveMap).length > 0 ? liveMap : subcategoryConfig;

  const finalMacroForCategory = (catId: number): MacroCategory | undefined => {
    if (liveMacroMap[catId]) return liveMacroMap[catId];
    // Fallback: import dinamico di macroForCategory dal config statico
    // (non possiamo importare direttamente per evitare dipendenze circolari)
    return undefined;
  };

  return {
    categories,
    categoryMap: finalCategoryMap,
    macroForCategory: finalMacroForCategory,
    isLoading,
    isError,
  };
};

/**
 * Hook helper — restituisce solo le categorie filtrate per macro.
 */
export const useCategoriesByMacro = (
  macro: MacroCategory,
): { categories: XanoCategory[]; isLoading: boolean } => {
  const { categories, isLoading } = useMenuCategories();
  const catNames: Record<string, string> = {
    colazione: "colazione",
    pranzo: "pranzo",
    aperitivo: "aperitivo",
  };

  return {
    categories: categories.filter(
      (cat) => (cat.macro || "").toLowerCase() === catNames[macro],
    ),
    isLoading,
  };
};
