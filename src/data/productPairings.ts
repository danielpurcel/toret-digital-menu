import type { Product } from "@/data/menu";

/**
 * Motore di abbinamenti intelligenti v2.
 *
 * REGOLE:
 * 1. Colazione: caffetteria ↔ dolci
 * 2. Pranzo (panini): → bibite + birra
 * 3. Pranzo (menu del giorno): → abbinamento intelligente per tipo di piatto
 *    - Pesce/frutti di mare → vino bianco, rosé, prosecco
 *    - Carne → vino rosso, birra
 *    - Verdure/pasta → vino bianco, rosé, prosecco
 *    - Generico → bibite, birra, prosecco
 * 4. Aperitivo: cocktail/vino/birra ↔ taglieri
 * 5. Sempre bevanda ↔ cibo, mai stesso tipo
 */

const DRINK_CATS = ["caffetteria", "bevande", "cocktail", "vini", "birre"];
const FOOD_CATS = ["dolci", "panini", "menu-del-giorno", "taglieri", "croissant"];

interface PairingTarget {
  macroCategory: string[];
  category: string[];
  max: number;
}

interface PairingRule {
  sourceMacro: string;
  sourceCategory: string[];
  target: PairingTarget;
}

const rules: PairingRule[] = [
  // ===== COLAZIONE =====
  { sourceMacro: "colazione", sourceCategory: DRINK_CATS, target: { macroCategory: ["colazione"], category: FOOD_CATS, max: 3 } },
  { sourceMacro: "colazione", sourceCategory: FOOD_CATS, target: { macroCategory: ["colazione"], category: DRINK_CATS, max: 3 } },

  // ===== PRANZO (tutto il cibo: panini, menu del giorno, taglieri) → bevande aperitivo =====
  { sourceMacro: "pranzo", sourceCategory: FOOD_CATS, target: { macroCategory: ["aperitivo"], category: DRINK_CATS, max: 3 } },

  // ===== APERITIVO (tutte le bevande: bibite, cocktail, vino, birra) → cibo pranzo =====
  { sourceMacro: "aperitivo", sourceCategory: DRINK_CATS, target: { macroCategory: ["pranzo"], category: FOOD_CATS, max: 3 } },
];

/**
 * Indovina il tipo di piatto dal nome del prodotto.
 * Usato per abbinamenti intelligenti (pesce→vino bianco, carne→vino rosso).
 */
function guessDishType(name: string): "fish" | "meat" | "veggie" | "pasta" | "generic" {
  const n = name.toLowerCase();

  // Pesce / frutti di mare
  if (/\b(pesce|tonno|salmone|gamberi|calamari|mare|branzino|orata|baccalà|merluzzo)\b/.test(n)) return "fish";

  // Carne (vitello, pollo, manzo, speck, bresaola, ecc.)
  if (/\b(vitello|pollo|manzo|speck|bresaola|carne|salame|prosciutto|würstel|salsiccia|hamburger)\b/.test(n)) return "meat";

  // Pasta / riso
  if (/\b(pasta|spaghetti|riso|tortellini|gnocchi|lasagne|tagliatelle)\b/.test(n)) return "pasta";

  // Verdure
  if (/\b(verdure|zucchine|melanzane|insalata|rucola|funghi|pomodori)\b/.test(n)) return "veggie";

  return "generic";
}

/**
 * Abbina il vino giusto al tipo di piatto.
 */
function isWineMatch(wineName: string, dishType: string): boolean {
  if (dishType === "fish") {
    // Per pesce: vino bianco, rosato/frizzante, prosecco
    return /\b(prosecco|bianco|rosato|rosé|frizzante|cortese|vermentino|pinot grigio|chardonnay|sauvignon)\b/i.test(wineName);
  }
  if (dishType === "meat") {
    // Per carne: vino rosso, barbera, birra
    return /\b(rosso|barbera|neb-biolo|dolcetto|barolo|barbaresco)\b/i.test(wineName);
  }
  if (dishType === "veggie" || dishType === "pasta") {
    // Per verdure/pasta: tutto va bene
    return true;
  }
  // Generico: tutto
  return true;
}

/**
 * Trova abbinamenti intelligenti.
 * Se il prodotto è cibo del pranzo (menu-del-giorno), usa il pairing intelligente
 * che abbina il vino/birra giusto al tipo di piatto.
 */
/**
 * Restituisce il momento della giornata in base all'ora corrente.
 * Serve per dare priorità agli abbinamenti del periodo giusto.
 */
function getCurrentPeriod(): "morning" | "lunch" | "aperitivo" | "other" {
  const h = new Date().getHours();
  if (h >= 7 && h < 11) return "morning";
  if (h >= 12 && h < 15) return "lunch";
  if (h >= 18 && h < 20) return "aperitivo";
  return "other";
}

/**
 * Punteggio di rilevanza temporale per un prodotto.
 * Più alto = più probabile che venga suggerito in questo momento.
 */
function timeScore(p: Product): number {
  const period = getCurrentPeriod();
  const m = p.macroCategory;

  if (period === "morning" && m === "colazione") return 2;
  if (period === "lunch" && (m === "pranzo" || m === "aperitivo")) return 2;
  if (period === "aperitivo" && m === "aperitivo") return 2;
  return 0;
}

/**
 * Punteggio basato sul prezzo: più caro = più punti.
 * Chi cerca abbinamenti vuole alzare lo scontrino medio.
 * Il punteggio scala linearmente tra 0 e 3 in base al range prezzi
 * (da 0 a 10€, oltre 10€ massimo punteggio).
 */
function priceScore(p: Product): number {
  // Prendi il prezzo base, o il più alto se ci sono formati multipli
  const prices = [p.price, p.bottlePrice, p.largePrice].filter((v): v is number => v != null);
  const maxPrice = Math.max(...prices);
  // Scala lineare: 0€ → 0 punti, 10€+ → 3 punti
  return Math.min(3, maxPrice / 3.33);
}

/**
 * Classifica un prodotto come alcolico o analcolico in base alla categoria.
 */
function isAlcoholic(p: Product): boolean {
  return ["cocktail", "vini", "birre"].includes(p.category);
}
function isNonAlcoholic(p: Product): boolean {
  return ["caffetteria", "bevande"].includes(p.category);
}

/**
 * Liste di ingredienti che non devono ripetersi tra abbinamenti.
 * Se il prodotto sorgente ha "panna", non suggerire altri prodotti con panna.
 */
const ingredientKeywords: Record<string, RegExp> = {
  panna: /\bpanna\b/i,
  cioccolata: /\bcioccolat[oa]\b/i,
  caffe: /\bcaff[eè]\b/i,
  crema: /\bcrema\b/i,
  zabaione: /\bzabaione\b/i,
  bicerin: /\bbicerin\b/i,
};

/**
 * Estrae gli ingredienti chiave di un prodotto dal nome (e descrizione it).
 */
function getKeyIngredients(p: Product): string[] {
  const text = p.name + " " + (p.translations?.it?.description || "");
  return Object.entries(ingredientKeywords)
    .filter(([, re]) => re.test(text))
    .map(([key]) => key);
}

/**
 * True se due prodotti condividono almeno un ingrediente chiave (es. panna).
 * Se a e b hanno entrambi "panna", non si abbinano tra loro.
 */
function shareIngredient(a: Product, b: Product): boolean {
  const ai = getKeyIngredients(a);
  const bi = getKeyIngredients(b);
  return ai.some((ing) => bi.includes(ing));
}

export function getPairings(product: Product, allProducts: Product[]): Product[] {
  if (!product) return [];

  const matchedRules = rules.filter((rule) => {
    if (rule.sourceMacro !== product.macroCategory) return false;
    return rule.sourceCategory.includes(product.category);
  });

  if (matchedRules.length === 0) return [];

  const seen = new Set<string>();
  const suggestions: Product[] = [];

  // Se è un piatto del giorno, indovina il tipo
  const dishType = product.category === "menu-del-giorno" ? guessDishType(product.name) : null;

  for (const rule of matchedRules) {
    const candidates = allProducts
      .filter((p) => {
        if (!p.available) return false;
        if (p.id === product.id) return false;
        if (seen.has(p.id)) return false;
        // Stesso ingrediente chiave (es. panna con panna) — vietato
        if (shareIngredient(product, p)) return false;
        return (
          rule.target.macroCategory.includes(p.macroCategory) &&
          rule.target.category.includes(p.category)
        );
      })
      .filter((p) => {
        // Filtra per tipo di vino se è un piatto del giorno
        if (!dishType) return true;
        if (p.category === "vini") {
          return isWineMatch(p.name, dishType);
        }
        return true;
      })
      // Ordine: prima prodotti in evidenza, poi birra/prosecco prima di altri vini
      .sort((a, b) => {
        const aScore = (a.featured ? 2 : 0) + timeScore(a) + priceScore(a);
        const bScore = (b.featured ? 2 : 0) + timeScore(b) + priceScore(b);
        return bScore - aScore;
      });

    // Varietà: se il target include bevande → 1 alcolico + 1 analcolico + 1 wildcard
    // Se il target è cibo → prendi i primi 3 migliori
    const hasDrinks = rule.target.category.some((c) => DRINK_CATS.includes(c));

    if (hasDrinks) {
      // Seleziona 1 alcolico + 1 analcolico, poi riempi fino a 3 col miglior rimanente
      const alcoholic: Product[] = [];
      const nonAlcoholic: Product[] = [];

      for (const c of candidates) {
        if (seen.has(c.id)) continue;
        seen.add(c.id);
        if (isAlcoholic(c) && alcoholic.length < 1) alcoholic.push(c);
        else if (isNonAlcoholic(c) && nonAlcoholic.length < 1) nonAlcoholic.push(c);
        if (alcoholic.length >= 1 && nonAlcoholic.length >= 1) break;
      }

      const result = [alcoholic, nonAlcoholic].flat();

      // Riempi fino a 3 col miglior candidato rimasto (qualsiasi tipo)
      for (const c of candidates) {
        if (result.length >= 3) break;
        if (result.includes(c)) continue;
        result.push(c);
      }

      for (const item of result.slice(0, 3)) {
        suggestions.push(item);
      }
    } else {
      for (const c of candidates) {
        if (suggestions.length >= 3) break;
        if (seen.has(c.id)) continue;
        suggestions.push(c);
        seen.add(c.id);
      }
    }
    if (suggestions.length >= 3) break;
  }

  return suggestions;
}
