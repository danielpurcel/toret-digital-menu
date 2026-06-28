/**
 * xanoMenu.ts — Caricamento menu da Xano tramite proxy sicuro Cloudflare.
 *
 * MODIFICHE RISPETTO ALLA VERSIONE PRECEDENTE:
 * 1. Chiama /api/menu (Cloudflare Pages Functions) invece di Xano direttamente
 *    → La VITE_XANO_API_KEY NON viene più passata al frontend (sicurezza!)
 * 2. Category mapping più specifico: i category_id Xano vengono mappati
 *    alle macro-categorie e categorie del frontend
 * 3. I prodotti con category_id = 4 (Generali) vengono scartati
 */
import {
  type MacroCategory,
  type Product,
} from "@/data/menu";
import { importedProducts as fallbackProducts } from "@/data/importedProducts";

// Endpoint del proxy Cloudflare Pages Functions (server-side)
const MENU_PROXY_ENDPOINT = "/api/menu";

interface XanoProduct {
  id: number;
  category_id?: number;
  name?: string;
  description?: string | null;
  price?: number | string | null;
  is_active?: boolean;
  image_url?: string | null;
  allergens?: string[] | string | null;
  name_en?: string | null;
  name_fr?: string | null;
  name_es?: string | null;
  description_en?: string | null;
  description_fr?: string | null;
  description_es?: string | null;
}

interface XanoListResponse {
  items?: XanoProduct[];
  nextPage?: number | null;
}

/**
 * Mappatura category_id → macro-categoria + categoria frontend.
 *
 * I category_id fanno riferimento alla tabella `categorie_menu` (ID 842100).
 * NOTA: Questa mappatura potrebbe necessitare di aggiornamenti se Xano
 * restituisce category_id non elencati qui. In produzione, loggare
 * category_id sconosciuti e segnalarli.
 */
const categoryMap: Record<number, { macroCategory: MacroCategory; category: string }> = {
  // Colazione / Caffetteria
  1:  { macroCategory: "colazione", category: "caffetteria" },
  // Pranzo / Piatti caldi
  2:  { macroCategory: "pranzo",    category: "piatti-caldi" },
  // Aperitivo / Drink
  3:  { macroCategory: "aperitivo", category: "drink" },
  // Generali → skip (non vanno nel menu pubblico)
  4:  { macroCategory: "pranzo",    category: "piatti-caldi" }, // placeholder, filtrato dopo

  // --- NUOVI MAPPING ---
  // Bevande calde / colazione (caffè lungo, ecc.)
  5:  { macroCategory: "colazione", category: "caffetteria" },
  // Dolci colazione (cornetti, brioche)
  6:  { macroCategory: "colazione", category: "dolci" },
  // Vini / Aperitivo
  7:  { macroCategory: "aperitivo", category: "vini" },
  // Analcolici (aperitivo)
  8:  { macroCategory: "aperitivo", category: "analcolici" },
  // Taglieri (aperitivo)
  9:  { macroCategory: "aperitivo", category: "taglieri" },
  // Panini (pranzo)
  10: { macroCategory: "pranzo",    category: "panini" },
  // Insalate (pranzo)
  11: { macroCategory: "pranzo",    category: "insalate" },
  // Dolci (pranzo)
  12: { macroCategory: "pranzo",    category: "dolci" },
  // Bevande (colazione — spremute, frullati)
  13: { macroCategory: "colazione", category: "bevande" },
  // Bevande (pranzo — acqua, bibite)
  14: { macroCategory: "pranzo",    category: "bevande" },
  // Salato (colazione — toast, tramezzini colazione)
  15: { macroCategory: "colazione", category: "salato" },
};

/** ID da SKIPPARE (non vanno nel menu) */
const CATEGORIES_TO_SKIP = new Set([4]); // Generali

/** Prodotti Xano da mostrare come featured (suggeriti) */
const FEATURED_IDS = new Set([26, 28, 29, 44, 54, 70, 71, 75]);

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

  const category = categoryMap[item.category_id ?? 0];
  if (!category || CATEGORIES_TO_SKIP.has(item.category_id ?? 0)) return null;

  const price = Number(item.price ?? 0);
  const description = item.description || "Prodotto del giorno Caffè Torèt.";
  const id = `xano-${item.id}-${slugify(item.name)}`;

  const nameEN = item.name_en?.trim() || item.name;
  const nameFR = item.name_fr?.trim() || item.name;
  const nameES = item.name_es?.trim() || item.name;
  const descEN = item.description_en?.trim() || description;
  const descFR = item.description_fr?.trim() || description;
  const descES = item.description_es?.trim() || description;

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
    featured: FEATURED_IDS.has(item.id),
    allergens: parseAllergens(item.allergens),
    translations: {
      it: { name: item.name, description },
      en: { name: nameEN, description: descEN },
      fr: { name: nameFR, description: descFR },
      es: { name: nameES, description: descES },
    },
  };
};

const fetchPage = async (page: number) => {
  const baseUrl = MENU_PROXY_ENDPOINT;
  const params = new URLSearchParams({
    limit: "100",
    offset: String((page - 1) * 100),
  });

  const response = await fetch(`${baseUrl}?${params}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Menu proxy request failed: ${response.status}`);
  }
  return (await response.json()) as XanoListResponse;
};

export const fetchXanoMenuProducts = async () => {
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
