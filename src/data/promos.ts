import promoColazione from "@/assets/promo-colazione.jpg";
import promoAperitivo from "@/assets/cat-aperitivo.jpg";

export interface Promo {
  id: string;
  macroCategory: "colazione" | "pranzo" | "aperitivo";
  price: number;
  image: string;
  productIds: string[];
  translations: {
    it: { title: string; subtitle: string };
    en: { title: string; subtitle: string };
    fr: { title: string; subtitle: string };
    es: { title: string; subtitle: string };
  };
}

export const promos: Promo[] = [
  {
    id: "promo-colazione",
    macroCategory: "colazione",
    price: 5.0,
    image: promoColazione,
    productIds: [
      "espresso-toret",
      "cappuccino",
      "croissant-classico",
      "croissant-crema",
      "croissant-pistacchio",
      "spremuta",
    ],
    translations: {
      it: { title: "Promo Colazione", subtitle: "Caffè + Croissant + Spremuta" },
      en: { title: "Breakfast Special", subtitle: "Coffee + Croissant + Fresh Juice" },
      fr: { title: "Offre Petit-déjeuner", subtitle: "Café + Croissant + Jus pressé" },
      es: { title: "Promo Desayuno", subtitle: "Café + Croissant + Zumo" },
    },
  },
  {
    id: "promo-aperitivo",
    macroCategory: "aperitivo",
    price: 15.0,
    image: promoAperitivo,
    productIds: [
      "xano-102-aperol-spritz",
      "xano-101-campari-spritz",
      "xano-60-prosecco-docg-extra-dry-2025",
      "xano-61-prosecco-doc-brut",
      "xano-36-prosecco-doc-extra-dry",
      "xano-56-goj-barbera-doc-frizzante-bicchiere",
      "xano-217-tagliere-aperitivo",
    ],
    translations: {
      it: { title: "Promo Aperitivo", subtitle: "2 Drink + Tagliere Torèt" },
      en: { title: "Aperitivo Special", subtitle: "2 Drinks + Torèt Board" },
      fr: { title: "Offre Apéritif", subtitle: "2 Cocktails + Planche Torèt" },
      es: { title: "Promo Aperitivo", subtitle: "2 Copas + Tabla Torèt" },
    },
  },
];

export const getPromoByMacro = (macro: Promo["macroCategory"]) =>
  promos.find((p) => p.macroCategory === macro);

export const getPromoForProduct = (productId: string) =>
  promos.find((p) => p.productIds.includes(productId));