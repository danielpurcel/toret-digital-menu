import espresso from "@/assets/p-espresso.jpg";
import cappuccino from "@/assets/p-cappuccino.jpg";
import croissant from "@/assets/p-croissant.jpg";
import croissantPistacchio from "@/assets/p-croissant-pistacchio.jpg";
import croissantCrema from "@/assets/p-croissant-crema.jpg";
import spremuta from "@/assets/p-spremuta.jpg";
import bowl from "@/assets/p-bowl.jpg";
import scaloppine from "@/assets/p-scaloppine.jpg";
import frittata from "@/assets/p-frittata.jpg";
import drinkCasa from "@/assets/p-drink-casa.jpg";
import drinkClassico from "@/assets/p-drink-classico.jpg";
import calice from "@/assets/p-calice.jpg";
import tagliere from "@/assets/p-tagliere.jpg";
import stuzzichini from "@/assets/p-stuzzichini.jpg";

export type MacroCategory = "colazione" | "pranzo" | "aperitivo";

export interface Translations {
  it: { name: string; description: string };
  en: { name: string; description: string };
  fr: { name: string; description: string };
}

export interface Product {
  id: string;
  xanoId?: number;
  source?: "static" | "xano" | "xano-import";
  macroCategory: MacroCategory;
  category: string; // e.g. "caffetteria", "dolci"
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: string[];
  allergens?: string[];
  available: boolean;
  featured?: boolean;
  translations: Translations;
}

export const categoriesByMacro: Record<MacroCategory, { id: string; label: { it: string; en: string; fr: string } }[]> = {
  colazione: [
    { id: "all", label: { it: "Tutti", en: "All", fr: "Tous" } },
    { id: "caffetteria", label: { it: "Caffetteria", en: "Coffee", fr: "Café" } },
    { id: "dolci", label: { it: "Dolci", en: "Sweet", fr: "Sucré" } },
    { id: "salato", label: { it: "Salato", en: "Savoury", fr: "Salé" } },
    { id: "bevande", label: { it: "Bevande", en: "Drinks", fr: "Boissons" } },
  ],
  pranzo: [
    { id: "all", label: { it: "Tutti", en: "All", fr: "Tous" } },
    { id: "piatti-caldi", label: { it: "MENU DEL GIORNO", en: "Daily Menu", fr: "Menu du Jour" } },
    { id: "panini", label: { it: "Panini & Snack", en: "Sandwiches & Snacks", fr: "Sandwichs" } },
    { id: "insalate", label: { it: "Insalate", en: "Salads", fr: "Salades" } },
    { id: "dolci", label: { it: "Dolci", en: "Sweet", fr: "Sucré" } },
    { id: "bevande", label: { it: "Bevande", en: "Drinks", fr: "Boissons" } },
  ],
  aperitivo: [
    { id: "all", label: { it: "Tutti", en: "All", fr: "Tous" } },
    { id: "drink", label: { it: "Drink", en: "Drinks", fr: "Cocktails" } },
    { id: "vini", label: { it: "Vini", en: "Wines", fr: "Vins" } },
    { id: "analcolici", label: { it: "Analcolici", en: "Non-alcoholic", fr: "Sans alcool" } },
    { id: "taglieri", label: { it: "Taglieri", en: "Boards", fr: "Planches" } },
  ],
};

export const macroLabels: Record<MacroCategory, { it: string; en: string; fr: string }> = {
  colazione: { it: "Colazione", en: "Breakfast", fr: "Petit-déjeuner" },
  pranzo: { it: "Pranzo", en: "Lunch", fr: "Déjeuner" },
  aperitivo: { it: "Aperitivo", en: "Aperitivo", fr: "Apéritif" },
};

export const products: Product[] = [
  // ===== COLAZIONE =====
  {
    id: "espresso-toret",
    macroCategory: "colazione",
    category: "caffetteria",
    name: "Espresso Torèt",
    description: "La nostra miscela 100% Arabica, tostata artigianalmente a Torino.",
    price: 1.3,
    image: espresso,
    available: true,
    featured: true,
    translations: {
      it: { name: "Espresso Torèt", description: "La nostra miscela 100% Arabica, tostata artigianalmente a Torino." },
      en: { name: "Espresso Torèt", description: "Our 100% Arabica blend, artisanally roasted in Turin." },
      fr: { name: "Espresso Torèt", description: "Notre mélange 100% Arabica, torréfié artisanalement à Turin." },
    },
  },
  {
    id: "cappuccino",
    macroCategory: "colazione",
    category: "caffetteria",
    name: "Cappuccino",
    description: "Espresso e latte montato a vapore, schiuma cremosa.",
    price: 1.8,
    image: cappuccino,
    available: true,
    featured: true,
    allergens: ["latte"],
    translations: {
      it: { name: "Cappuccino", description: "Espresso e latte montato a vapore, schiuma cremosa." },
      en: { name: "Cappuccino", description: "Espresso and steamed milk with creamy foam." },
      fr: { name: "Cappuccino", description: "Espresso et lait vapeur, mousse onctueuse." },
    },
  },
  {
    id: "croissant-classico",
    macroCategory: "colazione",
    category: "dolci",
    name: "Croissant Classico",
    description: "Sfoglia dorata al burro francese, cotta in giornata.",
    price: 1.5,
    image: croissant,
    available: true,
    featured: true,
    allergens: ["glutine", "latte", "uova"],
    translations: {
      it: { name: "Croissant Classico", description: "Sfoglia dorata al burro francese, cotta in giornata." },
      en: { name: "Classic Croissant", description: "Golden French butter pastry, freshly baked." },
      fr: { name: "Croissant Classique", description: "Feuilleté doré au beurre français, cuit du jour." },
    },
  },
  {
    id: "croissant-pistacchio",
    macroCategory: "colazione",
    category: "dolci",
    name: "Croissant Pistacchio",
    description: "Farcito con crema di pistacchio di Bronte, granella croccante.",
    price: 2.5,
    image: croissantPistacchio,
    available: true,
    allergens: ["glutine", "latte", "uova", "frutta a guscio"],
    translations: {
      it: { name: "Croissant Pistacchio", description: "Farcito con crema di pistacchio di Bronte, granella croccante." },
      en: { name: "Pistachio Croissant", description: "Filled with Bronte pistachio cream and crunchy grains." },
      fr: { name: "Croissant Pistache", description: "Garni de crème de pistache de Bronte et éclats croquants." },
    },
  },
  {
    id: "croissant-crema",
    macroCategory: "colazione",
    category: "dolci",
    name: "Croissant Crema",
    description: "Crema pasticcera alla vaniglia bourbon, zucchero a velo.",
    price: 2.0,
    image: croissantCrema,
    available: true,
    allergens: ["glutine", "latte", "uova"],
    translations: {
      it: { name: "Croissant Crema", description: "Crema pasticcera alla vaniglia bourbon, zucchero a velo." },
      en: { name: "Cream Croissant", description: "Bourbon vanilla pastry cream, dusted with icing sugar." },
      fr: { name: "Croissant Crème", description: "Crème pâtissière à la vanille bourbon, sucre glace." },
    },
  },
  {
    id: "spremuta",
    macroCategory: "colazione",
    category: "bevande",
    name: "Spremuta d'Arancia",
    description: "Arance fresche di stagione, spremute al momento.",
    price: 3.5,
    image: spremuta,
    available: true,
    featured: true,
    translations: {
      it: { name: "Spremuta d'Arancia", description: "Arance fresche di stagione, spremute al momento." },
      en: { name: "Fresh Orange Juice", description: "Seasonal oranges, freshly squeezed." },
      fr: { name: "Jus d'Orange Pressé", description: "Oranges de saison, pressées à la minute." },
    },
  },

  // ===== PRANZO =====
  {
    id: "bowl-cereali",
    macroCategory: "pranzo",
    category: "piatti-caldi",
    name: "Bowl Riso, Quinoa e Bulgur",
    description: "Piatto freddo con cereali, verdure di stagione e condimento alle erbe.",
    price: 8.0,
    image: bowl,
    available: true,
    featured: true,
    translations: {
      it: { name: "Bowl Riso, Quinoa e Bulgur", description: "Piatto freddo con cereali, verdure di stagione e condimento alle erbe." },
      en: { name: "Rice, Quinoa & Bulgur Bowl", description: "Cold dish with grains, seasonal vegetables and herb dressing." },
      fr: { name: "Bowl Riz, Quinoa & Boulgour", description: "Plat froid aux céréales, légumes de saison et vinaigrette aux herbes." },
    },
  },
  {
    id: "scaloppine",
    macroCategory: "pranzo",
    category: "piatti-caldi",
    name: "Scaloppine al Limone",
    description: "Fettine di vitello in salsa al limone e prezzemolo, contorno del giorno.",
    price: 9.0,
    image: scaloppine,
    available: true,
    translations: {
      it: { name: "Scaloppine al Limone", description: "Fettine di vitello in salsa al limone e prezzemolo, contorno del giorno." },
      en: { name: "Veal Scaloppine with Lemon", description: "Veal in lemon and parsley sauce, side of the day." },
      fr: { name: "Escalopes au Citron", description: "Veau en sauce citron-persil, garniture du jour." },
    },
  },
  {
    id: "frittata-contorni",
    macroCategory: "pranzo",
    category: "piatti-caldi",
    name: "Frittata con Contorni",
    description: "Frittata di stagione con due contorni a scelta.",
    price: 6.0,
    image: frittata,
    available: true,
    allergens: ["uova"],
    translations: {
      it: { name: "Frittata con Contorni", description: "Frittata di stagione con due contorni a scelta." },
      en: { name: "Frittata with Sides", description: "Seasonal frittata with two side dishes of your choice." },
      fr: { name: "Frittata avec Garnitures", description: "Frittata de saison avec deux garnitures au choix." },
    },
  },
  {
    id: "frittata",
    macroCategory: "pranzo",
    category: "piatti-caldi",
    name: "Frittata della Casa",
    description: "Uova fresche, erbe aromatiche, formaggio stagionato.",
    price: 6.0,
    image: frittata,
    available: true,
    allergens: ["uova", "latte"],
    translations: {
      it: { name: "Frittata della Casa", description: "Uova fresche, erbe aromatiche, formaggio stagionato." },
      en: { name: "House Frittata", description: "Fresh eggs, herbs and aged cheese." },
      fr: { name: "Frittata Maison", description: "Œufs frais, herbes aromatiques, fromage affiné." },
    },
  },

  // ===== APERITIVO =====
  {
    id: "drink-casa",
    macroCategory: "aperitivo",
    category: "drink",
    name: "Drink della Casa",
    description: "La nostra signature: vermouth torinese, agrumi, bitter artigianale.",
    price: 6.5,
    image: drinkCasa,
    available: true,
    featured: true,
    translations: {
      it: { name: "Drink della Casa", description: "La nostra signature: vermouth torinese, agrumi, bitter artigianale." },
      en: { name: "House Signature Drink", description: "Our signature: Torinese vermouth, citrus, artisanal bitter." },
      fr: { name: "Cocktail Maison", description: "Notre signature : vermouth turinois, agrumes, bitter artisanal." },
    },
  },
  {
    id: "drink-classico",
    macroCategory: "aperitivo",
    category: "drink",
    name: "Drink Classico",
    description: "Negroni, Americano, Spritz: a tua scelta.",
    price: 7.5,
    image: drinkClassico,
    available: true,
    translations: {
      it: { name: "Drink Classico", description: "Negroni, Americano, Spritz: a tua scelta." },
      en: { name: "Classic Drink", description: "Negroni, Americano, Spritz: your choice." },
      fr: { name: "Cocktail Classique", description: "Negroni, Americano, Spritz : au choix." },
    },
  },
  {
    id: "calice-vino",
    macroCategory: "aperitivo",
    category: "vini",
    name: "Calice di Vino",
    description: "Selezione di rossi e bianchi piemontesi a rotazione.",
    price: 4.5,
    image: calice,
    available: true,
    translations: {
      it: { name: "Calice di Vino", description: "Selezione di rossi e bianchi piemontesi a rotazione." },
      en: { name: "Glass of Wine", description: "Rotating selection of Piedmontese reds and whites." },
      fr: { name: "Verre de Vin", description: "Sélection tournante de rouges et blancs du Piémont." },
    },
  },
  {
    id: "tagliere-toret",
    macroCategory: "aperitivo",
    category: "taglieri",
    name: "Tagliere Torèt",
    description: "Selezione di salumi piemontesi, formaggi stagionati, miele e mostarde.",
    price: 12.0,
    image: tagliere,
    available: true,
    featured: true,
    allergens: ["latte", "solfiti"],
    translations: {
      it: { name: "Tagliere Torèt", description: "Selezione di salumi piemontesi, formaggi stagionati, miele e mostarde." },
      en: { name: "Torèt Charcuterie Board", description: "Piedmontese cured meats, aged cheeses, honey and mostarda." },
      fr: { name: "Planche Torèt", description: "Charcuterie piémontaise, fromages affinés, miel et moutarde." },
    },
  },
  {
    id: "stuzzichini",
    macroCategory: "aperitivo",
    category: "taglieri",
    name: "Stuzzichini",
    description: "Olive taggiasche, focaccia croccante, frutta secca tostata.",
    price: 3.5,
    image: stuzzichini,
    available: true,
    translations: {
      it: { name: "Stuzzichini", description: "Olive taggiasche, focaccia croccante, frutta secca tostata." },
      en: { name: "Bar Snacks", description: "Taggiasca olives, crunchy focaccia, toasted nuts." },
      fr: { name: "Amuse-bouches", description: "Olives taggiasca, focaccia croquante, fruits secs grillés." },
    },
  },
];

export const getProductsByMacro = (macro: MacroCategory) =>
  products.filter((p) => p.macroCategory === macro && p.available);

export const getFeatured = () => products.filter((p) => p.featured && p.available);

export const getProductById = (id: string) => products.find((p) => p.id === id);
