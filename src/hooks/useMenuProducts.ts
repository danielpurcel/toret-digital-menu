import { useQuery } from "@tanstack/react-query";
import { fetchXanoMenuProducts } from "@/data/xanoMenu";
import {
  type MacroCategory,
  type Product,
} from "@/data/menu";
import { importedProducts } from "@/data/importedProducts";

export const useMenuProducts = () =>
  useQuery({
    queryKey: ["menu-products"],
    queryFn: fetchXanoMenuProducts,
    staleTime: 1000 * 30,  // 30 secondi — aggiornamento rapido da Xano
    gcTime: 1000 * 60 * 5,  // 5 minuti cache
    refetchOnWindowFocus: true,
    retry: 2,
    initialData: importedProducts,
  });

export const byMacro = (items: Product[], macro: MacroCategory) =>
  items.filter((p) => p.macroCategory === macro && p.available);

export const featuredProducts = (items: Product[]) =>
  items.filter((p) => p.featured && p.available);

export const byId = (items: Product[], id: string) =>
  items.find((p) => p.id === id);
