import { useQuery } from "@tanstack/react-query";
import { fetchXanoMenuProducts } from "@/data/xanoMenu";
import {
  products as fallbackProducts,
  type MacroCategory,
  type Product,
} from "@/data/menu";

export const useMenuProducts = () =>
  useQuery({
    queryKey: ["menu-products"],
    queryFn: fetchXanoMenuProducts,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    initialData: fallbackProducts,
  });

export const byMacro = (items: Product[], macro: MacroCategory) =>
  items.filter((p) => p.macroCategory === macro && p.available);

export const featuredProducts = (items: Product[]) =>
  items.filter((p) => p.featured && p.available);

export const byId = (items: Product[], id: string) =>
  items.find((p) => p.id === id);
