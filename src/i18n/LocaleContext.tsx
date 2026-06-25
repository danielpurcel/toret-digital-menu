import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/data/siteConfig";

const STORAGE_KEY = "toret.locale";

const dict = {
  it: {
    home: "Home",
    menu: "Menu",
    favorites: "Preferiti",
    info: "Info",
    mostLoved: "I più amati",
    seeMenu: "Vedi il menu",
    noFavorites: "Non hai ancora aggiunto preferiti.",
    discoverMenu: "Scopri il menu",
    addToFavorites: "Aggiungi ai preferiti",
    details: "Dettagli",
    close: "Chiudi",
    allergens: "Allergeni",
    contacts: "Contatti",
    address: "Indirizzo",
    openingHours: "Orari di apertura",
    chooseMoment: "Scegli il tuo momento",
    promoBadge: "Offerta",
    from: "da",
  },
  en: {
    home: "Home",
    menu: "Menu",
    favorites: "Favorites",
    info: "Info",
    mostLoved: "Most loved",
    seeMenu: "See menu",
    noFavorites: "You haven't added any favorites yet.",
    discoverMenu: "Discover the menu",
    addToFavorites: "Add to favorites",
    details: "Details",
    close: "Close",
    allergens: "Allergens",
    contacts: "Contacts",
    address: "Address",
    openingHours: "Opening hours",
    chooseMoment: "Choose your moment",
    promoBadge: "Special",
    from: "from",
  },
  fr: {
    home: "Accueil",
    menu: "Menu",
    favorites: "Favoris",
    info: "Infos",
    mostLoved: "Les plus aimés",
    seeMenu: "Voir le menu",
    noFavorites: "Vous n'avez pas encore de favoris.",
    discoverMenu: "Découvrir le menu",
    addToFavorites: "Ajouter aux favoris",
    details: "Détails",
    close: "Fermer",
    allergens: "Allergènes",
    contacts: "Contacts",
    address: "Adresse",
    openingHours: "Horaires d'ouverture",
    chooseMoment: "Choisissez votre moment",
    promoBadge: "Offre",
    from: "à partir de",
  },
} as const;

type DictKey = keyof typeof dict.it;

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
}

const LocaleContext = createContext<Ctx | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "it";
    return (localStorage.getItem(STORAGE_KEY) as Locale) || "it";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const t = (key: DictKey) => dict[locale][key];

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
};