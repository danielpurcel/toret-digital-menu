import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/data/siteConfig";

const STORAGE_KEY = "toret.locale";

const dict = {
  it: {
    home: "Home",
    menu: "Menu",
    search: "Cerca",
    favorites: "Preferiti",
    info: "Info",
    mostLoved: "I nostri suggerimenti",
    dontMiss: "Da non perdere",
    whatYouLookFor: "Cosa cerchi",
    seeMenu: "Vedi il menu",
    noFavorites: "Non hai ancora aggiunto preferiti.",
    discoverMenu: "Scopri il menu",
    addToFavorites: "Aggiungi ai preferiti",
    addToFavoritesCta: "Aggiungi ai preferiti per ordinare",
    addedToFavorites: "Aggiunto ai preferiti",
    details: "Dettagli",
    close: "Chiudi",
    back: "Indietro",
    allergens: "Allergeni",
    contacts: "Contatti",
    address: "Indirizzo",
    openingHours: "Orari di apertura",
    chooseMoment: "Scegli il momento",
    openNow: "Aperto",
    kitchenUntil: "fino alle",
    closed: "Chiuso",
    tryThese: "Abbinalo a…",
    goodMorning: "Buongiorno",
    bistrotTagline: "Caffeteria · colazione, pranzo e aperitivo dal mattino alla sera",
    turin: "Turin",
    open: "Aperto",
    searchPlaceholder: "Cerca un piatto, una bevanda...",
    noResults: "Nessun risultato.",
    price: "Prezzo",
    toTry: "Da provare",
    promoBadge: "Offerta",
    from: "da",
    pairWithPromo: "Abbinalo alla promo",
    updatingMenu: "Aggiorno il menu reale...",
    all: "Tutti",
  },
  en: {
    home: "Home",
    menu: "Menu",
    search: "Search",
    favorites: "Favorites",
    info: "Info",
    mostLoved: "Our suggestions",
    dontMiss: "Don't miss",
    whatYouLookFor: "What you're after",
    seeMenu: "See menu",
    noFavorites: "You haven't added any favorites yet.",
    discoverMenu: "Discover the menu",
    addToFavorites: "Add to favorites",
    addToFavoritesCta: "Add to favorites to order",
    addedToFavorites: "Added to favorites",
    details: "Details",
    close: "Close",
    back: "Back",
    allergens: "Allergens",
    contacts: "Contacts",
    address: "Address",
    openingHours: "Opening hours",
    chooseMoment: "Choose your moment",
    openNow: "Open",
    kitchenUntil: "until",
    closed: "Closed",
    tryThese: "Pair it with…",
    goodMorning: "Good morning",
    bistrotTagline: "Turin bistrot · breakfast, lunch and aperitivo from morning to night",
    turin: "Turin",
    open: "Open",
    searchPlaceholder: "Search a dish, a drink...",
    noResults: "No results.",
    price: "Price",
    toTry: "Must try",
    promoBadge: "Special",
    from: "from",
    pairWithPromo: "Pair it with the deal",
    updatingMenu: "Updating the live menu...",
    all: "All",
  },
  fr: {
    home: "Accueil",
    menu: "Menu",
    search: "Recherche",
    favorites: "Favoris",
    info: "Infos",
    mostLoved: "Nos suggestions",
    dontMiss: "À ne pas manquer",
    whatYouLookFor: "Vous cherchez",
    seeMenu: "Voir le menu",
    noFavorites: "Vous n'avez pas encore de favoris.",
    discoverMenu: "Découvrir le menu",
    addToFavorites: "Ajouter aux favoris",
    addToFavoritesCta: "Ajouter aux favoris pour commander",
    addedToFavorites: "Ajouté aux favoris",
    details: "Détails",
    close: "Fermer",
    back: "Retour",
    allergens: "Allergènes",
    contacts: "Contacts",
    address: "Adresse",
    openingHours: "Horaires d'ouverture",
    chooseMoment: "Choisissez le moment",
    openNow: "Ouvert",
    kitchenUntil: "jusqu'à",
    closed: "Fermé",
    tryThese: "Associez avec…",
    goodMorning: "Bonjour",
    bistrotTagline: "Bistrot turinois · petit-déjeuner, déjeuner et apéritif du matin au soir",
    turin: "Turin",
    open: "Ouvert",
    searchPlaceholder: "Cherchez un plat, une boisson...",
    noResults: "Aucun résultat.",
    price: "Prix",
    toTry: "À essayer",
    promoBadge: "Offre",
    from: "à partir de",
    pairWithPromo: "Associez-le à l'offre",
    updatingMenu: "Mise à jour du menu réel...",
    all: "Tous",
  },
  es: {
    home: "Inicio",
    menu: "Menú",
    search: "Buscar",
    favorites: "Favoritos",
    info: "Info",
    mostLoved: "Nuestras sugerencias",
    dontMiss: "No te lo pierdas",
    whatYouLookFor: "¿Qué buscas?",
    seeMenu: "Ver el menú",
    noFavorites: "Aún no tienes favoritos.",
    discoverMenu: "Descubrir el menú",
    addToFavorites: "Añadir a favoritos",
    addToFavoritesCta: "Añadir a favoritos para pedir",
    addedToFavorites: "Añadido a favoritos",
    details: "Detalles",
    close: "Cerrar",
    back: "Volver",
    allergens: "Alérgenos",
    contacts: "Contactos",
    address: "Dirección",
    openingHours: "Horario de apertura",
    chooseMoment: "Elige el momento",
    openNow: "Abierto",
    kitchenUntil: "hasta las",
    closed: "Cerrado",
    tryThese: "Combínalo con…",
    goodMorning: "Buenos días",
    bistrotTagline: "Cafetería turinesa · desayuno, almuerzo y aperitivo de la mañana a la noche",
    turin: "Turín",
    open: "Abierto",
    searchPlaceholder: "Busca un plato, una bebida...",
    noResults: "Sin resultados.",
    price: "Precio",
    toTry: "Para probar",
    promoBadge: "Oferta",
    from: "desde",
    pairWithPromo: "Combínalo con la oferta",
    updatingMenu: "Actualizando el menú real...",
    all: "Todos",
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
