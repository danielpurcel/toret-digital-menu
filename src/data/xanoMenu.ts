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
  sort_order?: number | null;
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
/**
 * Mappatura category_id Xano → macro-categoria + categoria frontend.
 *
 * I NUOVI ID corrispondono alla tabella menu_categories Xano.
 * Vecchi ID (1,2,4) conservati solo per prodotti inattivi/legacy.
 */
const categoryMap: Record<number, { macroCategory: MacroCategory; category: string }> = {
  // --- VECCHI ID (legacy / inattivi) ---
  1:  { macroCategory: "colazione", category: "caffetteria" },  // legacy
  2:  { macroCategory: "pranzo",    category: "piatti-caldi" },  // legacy
  4:  { macroCategory: "pranzo",    category: "piatti-caldi" },  // legacy

  // ☀️ COLAZIONE — menu_categories
  3:  { macroCategory: "colazione", category: "caffetteria" },
  5:  { macroCategory: "colazione", category: "dolci" },
  6:  { macroCategory: "colazione", category: "bevande" },
  7:  { macroCategory: "colazione", category: "colazione-salata" },

  // 🍽️ PRANZO — menu_categories
  8:  { macroCategory: "pranzo",    category: "menu-del-giorno" },
  9:  { macroCategory: "pranzo",    category: "menu-del-giorno" },
  10: { macroCategory: "pranzo",    category: "menu-del-giorno" },
  11: { macroCategory: "pranzo",    category: "menu-del-giorno" },
  12: { macroCategory: "pranzo",    category: "insalate" },
  13: { macroCategory: "pranzo",    category: "panini" },
  14: { macroCategory: "pranzo",    category: "taglieri" },

  // 🍹 APERITIVO — menu_categories
  15: { macroCategory: "aperitivo", category: "cocktail" },
  16: { macroCategory: "aperitivo", category: "vini" },
  17: { macroCategory: "aperitivo", category: "birre" },
  18: { macroCategory: "aperitivo", category: "analcolici" },
  19: { macroCategory: "aperitivo", category: "taglieri" },
  20: { macroCategory: "aperitivo", category: "stuzzichini" },
};

/** ID da SKIPPARE (non vanno nel menu) */
// Nessuna categoria da skippare — i prodotti inattivi sono filtrati da is_active
const CATEGORIES_TO_SKIP = new Set<number>();

/** Prodotti Xano da mostrare come featured (suggeriti) */
const FEATURED_IDS = new Set([26, 28, 44, 54, 70, 75, 87, 102]);

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
  const vino = VINO_FALLBACK[item.id];
  const description = item.description || vino?.description || "Specialità del giorno Caffè Torèt.";
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
    categoryId: item.category_id,
    sortOrder: item.sort_order,
    allergens: parseAllergens(item.allergens),
    translations: {
      it: { name: item.name, description },
      en: { name: nameEN, description: descEN },
      fr: { name: nameFR, description: descFR },
      es: { name: nameES, description: descES },
    },
  };
};

/** Lista dei vini Cascina (Passum, Policalpo, ...): presenti in Xano ma senza voce statica */
const VINO_FALLBACK: Record<number, { name: string; description: string; price: number }> = {
  195: {
    name: "Passum",
    description: "Vino rosso Cascina. Corpo pieno e tannino morbido, da abbinare a piatti di carne.",
    price: 5,
  },
  196: {
    name: "Policalpo",
    description: "Vino rosso Cascina. Fruttato e scorrevole, ideale per l'aperitivo.",
    price: 4,
  },
  197: {
    name: "Litina",
    description: "Vino rosso Cascina. Fresco e fragrante, di facile beva.",
    price: 4,
  },
  198: {
    name: "Uceline",
    description: "Vino rosso Cascina. Elegante e speziato, dal finale lungo.",
    price: 5,
  },
  199: {
    name: "Ataj",
    description: "Vino rosso Cascina. Giovane e vivace, piacevole in ogni momento.",
    price: 4,
  },
  200: {
    name: "Castlèt Rosé",
    description: "Vino rosé Cascina. Fresco e floreale, perfetto per l'aperitivo.",
    price: 4,
  },
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
  try {
    const items: XanoProduct[] = [];
    let page = 1;

    for (let guard = 0; guard < 20; guard += 1) {
      const data = await fetchPage(page);
      items.push(...(data.items ?? []));
      if (!data.nextPage) break;
      page = data.nextPage;
    }

    const xanoMapped = items.map(toProduct).filter((item): item is Product => !!item);

    // Crea mappa: xanoId → prodotto Xano
    const xanoMap: Record<number, Product> = {};
    for (const p of xanoMapped) {
      if (p.xanoId) xanoMap[p.xanoId] = p;
    }

    // Crea mappa: xanoId → prodotto statico (fallback)
    const staticMap: Record<number, Product> = {};
    for (const p of fallbackProducts) {
      if (p.xanoId) staticMap[p.xanoId] = p;
    }

    // MERGE: per ogni prodotto Xano, unisci con i dati statici
    // Xano vince su: price, description, categoryId, sortOrder, available
    // Statici mantengono: image, bottlePrice, largePrice, featured, translations extra
    // Xano ha voci duplicate per lo stesso vino: teniamo solo la più recente per nome+categoria
  const latestVino = new Map<string, number>();
  for (const item of items) {
    if (!VINO_FALLBACK[item.id] || !item.name) continue;
    const key = `${item.category_id}|${item.name}`;
    const prev = latestVino.get(key);
    if (prev === undefined || item.id > prev) latestVino.set(key, item.id);
  }

  const merged: Product[] = [];
    const seenXanoIds = new Set<number>();

    for (const xp of xanoMapped) {
      if (xp.xanoId && VINO_FALLBACK[xp.xanoId]) {
        const keepId = latestVino.get(`${xp.categoryId}|${xp.name}`);
        if (keepId !== undefined && keepId !== xp.xanoId) continue;
      }
      const sp = xp.xanoId ? staticMap[xp.xanoId] : undefined;
      if (xp.xanoId) seenXanoIds.add(xp.xanoId);
      
      // Allergeni: Xano se li ha, altrimenti dal fallback
      if (!xp.allergens && sp?.allergens) {
        xp.allergens = sp.allergens;
      }
      
      // Mantieni image dal prodotto statico
      if (sp?.image && !xp.image) {
        xp.image = sp.image;
      }
      
      // Mantieni bottlePrice e largePrice dal prodotto statico
      if (sp?.bottlePrice) xp.bottlePrice = sp.bottlePrice;
      if (sp?.largePrice) xp.largePrice = sp.largePrice;

      // "available" del fallback: Xano non ha un campo disponibilità separato da is_active
      if (sp) xp.available = sp.available;
      
      // Mantieni featured
      if (sp?.featured) xp.featured = sp.featured;
      
      merged.push(xp);
    }

    // Aggiungi i prodotti statici che NON sono in Xano
    for (const sp of fallbackProducts) {
      if (!sp.xanoId || !seenXanoIds.has(sp.xanoId)) {
        merged.push(sp);
      }
    }

    if (merged.length > 0) {
      const _vini = merged.filter((x) => x.categoryId === 16).map((x) => `${x.name}:${x.available}`);
    console.log(`[Xano] Caricati ${xanoMapped.length} Xano + ${merged.length - xanoMapped.length} statici = ${merged.length} prodotti | VINI ${_vini.join(", ")}`);
      return merged;
    }
  } catch (err) {
    console.warn('[Xano] Proxy fetch fallito:', err instanceof Error ? err.message : String(err));
  }
  
  // Fallback offline se Xano non risponde
  console.log('[Xano] Uso fallback importedProducts');
  return fallbackProducts;
};
