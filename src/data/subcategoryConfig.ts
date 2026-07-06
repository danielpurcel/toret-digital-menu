/**
 * subcategoryConfig.ts — Configurazione sottocategorie per il Menu QR.
 *
 * OGGETTIVO: Zero hardcode nel frontend.
 * ORA: Mappatura statica da category_id a nome/icona.
 * FUTURO: Quando menu_categories sarà accessibile via API,
 *         basterà sostituire questo file con una fetch a Xano.
 *
 * I category_id corrispondono agli ID della tabella Xano menu_categories.
 * Per modificare: aggiorna Xano + questo file (o un giorno solo Xano).
 */
import type { MacroCategory } from "@/data/menu";

export interface SubcategoryInfo {
  name: { it: string; en: string; fr: string; es: string };
  icon: string;   // Nome icona Lucide (https://lucide.dev/icons)
}

/**
 * category_id (da Xano menu_categories) → informazioni sottocategoria.
 */
export const subcategoryConfig: Record<number, SubcategoryInfo> = {
  // ☀️ COLAZIONE
  3: {
    name: { it: "Caffetteria", en: "Coffee", fr: "Café", es: "Cafetería" },
    icon: "coffee",
  },
  4: {
    name: { it: "Bevande Calde", en: "Hot Drinks", fr: "Boissons Chaudes", es: "Bebidas Calientes" },
    icon: "thermometer",
  },
  5: {
    name: { it: "Dolci", en: "Desserts", fr: "Desserts", es: "Postres" },
    icon: "cake-slice",
  },
  6: {
    name: { it: "Croissant", en: "Croissant", fr: "Croissant", es: "Croissant" },
    icon: "croissant",
  },
  21: {
    name: { it: "Iced & Fresh", en: "Iced & Fresh", fr: "Iced & Fresh", es: "Iced & Fresh" },
    icon: "snowflake",
  },
  7: {
    name: { it: "Colazione Salata", en: "Savory Breakfast", fr: "Petit Déjeuner Salé", es: "Desayuno Salado" },
    icon: "egg",
  },

  // 🍽️ PRANZO
  8: {
    name: { it: "Menu del Giorno", en: "Daily Menu", fr: "Menu du Jour", es: "Menú del Día" },
    icon: "clipboard-list",
  },
  9: {
    name: { it: "Menu del Giorno", en: "Daily Menu", fr: "Menu du Jour", es: "Menú del Día" },
    icon: "clipboard-list",
  },
  10: {
    name: { it: "Menu del Giorno", en: "Daily Menu", fr: "Menu du Jour", es: "Menú del Día" },
    icon: "clipboard-list",
  },
  11: {
    name: { it: "Menu del Giorno", en: "Daily Menu", fr: "Menu du Jour", es: "Menú del Día" },
    icon: "clipboard-list",
  },
  12: {
    name: { it: "Insalate", en: "Salads", fr: "Salades", es: "Ensaladas" },
    icon: "salad",
  },
  13: {
    name: { it: "Panini & Piadine", en: "Sandwiches & Wraps", fr: "Sandwichs & Piadines", es: "Sándwiches & Piadinas" },
    icon: "sandwich",
  },
  14: {
    name: { it: "Taglieri", en: "Cheese & Cold Cuts", fr: "Plateaux de Fromages", es: "Tablas de Quesos" },
    icon: "hand-platter",
  },

  // 🍹 APERITIVO
  15: {
    name: { it: "Cocktail", en: "Cocktails", fr: "Cocktails", es: "Cócteles" },
    icon: "martini",
  },
  16: {
    name: { it: "Vini", en: "Wines", fr: "Vins", es: "Vinos" },
    icon: "wine",
  },
  17: {
    name: { it: "Birre", en: "Beers", fr: "Bières", es: "Cervezas" },
    icon: "beer",
  },
  18: {
    name: { it: "Analcolici", en: "Soft Drinks", fr: "Boissons sans Alcool", es: "Bebidas sin Alcohol" },
    icon: "glass-water",
  },
  19: {
    name: { it: "Taglieri", en: "Charcuterie Boards", fr: "Planches", es: "Tablas" },
    icon: "hand-platter",
  },
  20: {
    name: { it: "Stuzzichini", en: "Snacks", fr: "Amuse-Bouches", es: "Aperitivos" },
    icon: "cookie",
  },
};

/**
 * Macro-categoria di appartenenza per ogni category_id Xano.
 * Colazione, Pranzo, Aperitivo.
 */
const categoryMacroMap: Record<number, MacroCategory> = {
  3: "colazione", 4: "colazione", 5: "colazione", 6: "colazione", 7: "colazione", 21: "colazione",
  8: "pranzo", 9: "pranzo", 10: "pranzo", 11: "pranzo", 12: "pranzo",
  13: "pranzo", 14: "pranzo",
  15: "aperitivo", 16: "aperitivo", 17: "aperitivo", 18: "aperitivo", 19: "aperitivo", 20: "aperitivo",
};

/** Restituisce la macro-categoria per un dato category_id */
export const macroForCategory = (catId: number): MacroCategory | undefined =>
  categoryMacroMap[catId];
