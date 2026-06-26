import {
  products as fallbackProducts,
  type MacroCategory,
  type Product,
} from "@/data/menu";

const XANO_ENDPOINT =
  import.meta.env.VITE_XANO_ERP_ENDPOINT ||
  "https://x8ki-letl-twmt.n7.xano.io/api:gubKa7ve/Erp";
const XANO_API_KEY = import.meta.env.VITE_XANO_API_KEY;

interface XanoProduct {
  id: number;
  category_id?: number;
  name?: string;
  description?: string | null;
  price?: number | string | null;
  is_active?: boolean;
  image_url?: string | null;
  allergens?: string[] | string | null;
}

interface XanoListResponse {
  items?: XanoProduct[];
  nextPage?: number | null;
}

const categoryMap: Record<number, { macroCategory: MacroCategory; category: string }> = {
  1: { macroCategory: "colazione", category: "caffetteria" },
  2: { macroCategory: "pranzo", category: "piatti-caldi" },
  3: { macroCategory: "aperitivo", category: "drink" },
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const parseAllergens = (value: XanoProduct["allergens"]) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/[,;|]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return undefined;
};

const toProduct = (item: XanoProduct): Product | null => {
  if (!item.name || item.is_active === false) return null;

  const category = categoryMap[item.category_id ?? 0] ?? {
    macroCategory: "pranzo" as MacroCategory,
    category: "piatti-caldi",
  };
  const price = Number(item.price ?? 0);
  const description = item.description || "Prodotto del giorno Caffè Torèt.";
  const id = `xano-${item.id}-${slugify(item.name)}`;

  return {
    id,
    xanoId: item.id,
    source: "xano",
    macroCategory: category.macroCategory,
    category: category.category,
    name: item.name,
    description,
    price: Number.isFinite(price) ? price : 0,
    image: item.image_url || undefined,
    available: true,
    allergens: parseAllergens(item.allergens),
    translations: {
      it: { name: item.name, description },
      en: { name: item.name, description },
      fr: { name: item.name, description },
    },
  };
};

const fetchPage = async (page: number) => {
  const response = await fetch(XANO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": XANO_API_KEY,
    },
    body: JSON.stringify({ action: "list", table: "menu_products", page }),
  });

  if (!response.ok) throw new Error(`Xano menu request failed: ${response.status}`);
  return (await response.json()) as XanoListResponse;
};

export const fetchXanoMenuProducts = async () => {
  if (!XANO_API_KEY) return fallbackProducts;

  const items: XanoProduct[] = [];
  let page = 1;

  for (let guard = 0; guard < 20; guard += 1) {
    const data = await fetchPage(page);
    items.push(...(data.items ?? []));
    if (!data.nextPage) break;
    page = data.nextPage;
  }

  const mapped = items.map(toProduct).filter((item): item is Product => !!item);
  return mapped.length > 0 ? mapped : fallbackProducts;
};
