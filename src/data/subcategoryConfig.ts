/**
 * subcategoryConfig.ts — Configurazione sottocategorie per il Menu QR.
 *
 * OGGETTIVO: Zero hardcode nel frontend.
 * ORA: Mappatura statica da category_id a nome/icona.
 * FUTURO: Quando menu_categories sarà accessibile via API,
 *         basterà sostituire questo file con una fetch a Xano.
 *
 * Vantaggi di questa architettura:
 * - Il frontend NON conosce le categorie
 * - La struttura deriva dai category_id dei prodotti (già su Xano)
 * - Per cambiare nomi/icone: aggiorni questo file (o un giorno Xano)
 * - Per aggiungere sottocategorie: aggiorni Xano + questo file
 */
import type { MacroCategory } from "@/data/menu";

export interface SubcategoryInfo {
  name: { it: string; en: string; fr: string; es: string };
  icon: string;   // Nome icona Lucide (https://lucide.dev/icons)
}

/**
 * category_id → informazioni sottocategoria.
 * La macro-categoria è derivata dal category_id stesso:
 *   1,5,6,13,15 → colazione
 *   2,10,11,12,14 → pranzo
 *   3,7,8,9 → aperitivo
 */
export const subcategoryConfig: Record<number, SubcategoryInfo> = {
  1: {
    name: { it: "Caffetteria", en: "Coffee", fr: "Café", es: "Cafetería" },
    icon: "coffee",
  },
  5: {
    name: { it: "Bevande Calde", en: "Hot Drinks", fr: "Boissons Chaudes", es: "Bebidas Calientes" },
    icon: "thermometer",
  },
  6: {
    name: { it: "Dolci", en: "Desserts", fr: "Desserts", es: "Postres" },
    icon: "cake-slice",
  },
  13: {
    name: { it: "Spremute & Frullati", en: "Juices & Smoothies", fr: "Jus & Smoothies", es: "Zumos & Batidos" },
    icon: "apple",
  },
  2: {
    name: { it: "Piatti Caldi", en: "Hot Dishes", fr: "Plats Chauds", es: "Platos Calientes" },
    icon: "utensils-crossed",
  },
  10: {
    name: { it: "Panini & Snack", en: "Sandwiches & Snacks", fr: "Sandwichs & Snacks", es: "Sándwiches & Snacks" },
    icon: "sandwich",
  },
  12: {
    name: { it: "Dolci", en: "Desserts", fr: "Desserts", es: "Postres" },
    icon: "cake-slice",
  },
  14: {
    name: { it: "Bevande", en: "Drinks", fr: "Boissons", es: "Bebidas" },
    icon: "cup-soda",
  },
  3: {
    name: { it: "Cocktail", en: "Cocktails", fr: "Cocktails", es: "Cócteles" },
    icon: "glass-water",
  },
  7: {
    name: { it: "Vini", en: "Wines", fr: "Vins", es: "Vinos" },
    icon: "wine",
  },
  8: {
    name: { it: "Analcolici", en: "Non-Alcoholic", fr: "Sans Alcool", es: "Sin Alcohol" },
    icon: "cup-soda",
  },
  9: {
    name: { it: "Taglieri", en: "Charcuterie Boards", fr: "Planches", es: "Tablas" },
    icon: "chef-hat",
  },
};

/**
 * Macro-categoria di appartenenza per ogni category_id.
 */
const categoryMacroMap: Record<number, MacroCategory> = {
  1: "colazione", 5: "colazione", 6: "colazione", 13: "colazione", 15: "colazione",
  2: "pranzo", 10: "pranzo", 11: "pranzo", 12: "pranzo", 14: "pranzo",
  3: "aperitivo", 7: "aperitivo", 8: "aperitivo", 9: "aperitivo",
};

/** Restituisce la macro-categoria per un dato category_id */
export const macroForCategory = (catId: number): MacroCategory | undefined =>
  categoryMacroMap[catId];
