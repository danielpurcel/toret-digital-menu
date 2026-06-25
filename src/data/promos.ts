import promoColazione from "@/assets/promo-colazione.jpg";
import promoAperitivo from "@/assets/cat-aperitivo.jpg";

export interface Promo {
  id: string;
  macroCategory: "colazione" | "pranzo" | "aperitivo";
  price: number;
  image: string;
  translations: {
    it: { title: string; subtitle: string };
    en: { title: string; subtitle: string };
    fr: { title: string; subtitle: string };
  };
}

export const promos: Promo[] = [
  {
    id: "promo-colazione",
    macroCategory: "colazione",
    price: 5.0,
    image: promoColazione,
    translations: {
      it: { title: "Promo Colazione", subtitle: "Caffè + Croissant + Spremuta" },
      en: { title: "Breakfast Special", subtitle: "Coffee + Croissant + Fresh Juice" },
      fr: { title: "Offre Petit-déjeuner", subtitle: "Café + Croissant + Jus pressé" },
    },
  },
  {
    id: "promo-aperitivo",
    macroCategory: "aperitivo",
    price: 15.0,
    image: promoAperitivo,
    translations: {
      it: { title: "Promo Aperitivo", subtitle: "Drink + Tagliere Torèt" },
      en: { title: "Aperitivo Special", subtitle: "Drink + Torèt Board" },
      fr: { title: "Offre Apéritif", subtitle: "Cocktail + Planche Torèt" },
    },
  },
];

export const getPromoByMacro = (macro: Promo["macroCategory"]) =>
  promos.find((p) => p.macroCategory === macro);