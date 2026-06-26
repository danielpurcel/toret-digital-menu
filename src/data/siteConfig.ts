import logo from "@/assets/logo-toret.jpg";

export const siteConfig = {
  name: "Caffè Torèt",
  city: "Torino",
  tagline: {
    it: "Dalla colazione all'aperitivo, il gusto di ogni momento.",
    en: "From breakfast to aperitivo, the taste of every moment.",
    fr: "Du petit-déjeuner à l'apéritif, le goût de chaque instant.",
  },
  welcome: {
    it: "Benvenuto da Caffè Torèt",
    en: "Welcome to Caffè Torèt",
    fr: "Bienvenue au Caffè Torèt",
  },
  hours: {
    label: { it: "Lun – Sab", en: "Mon – Sat", fr: "Lun – Sam" },
    time: "7:00 – 20:00",
    closed: { it: "Domenica chiuso", en: "Closed on Sunday", fr: "Fermé le dimanche" },
  },
  contact: {
    phone: "+39\u00a0 351 767 9689",
    email: "bartoretturin@gmail.com",
    address: "Corso Palestro 2/F, 10122 Torino",
    instagram: "caffe_toret_turin",
  },
  allergensNote: {
    it: "Le informazioni sugli allergeni devono essere riferibili a ciascun alimento. In caso di allergie o intolleranze, avvisa il personale prima dell'ordine.",
    en: "Allergen information must be linked to each food item. In case of allergies or intolerances, please inform our staff before ordering.",
    fr: "Les informations sur les allergènes doivent être liées à chaque aliment. En cas d'allergies ou d'intolérances, veuillez prévenir le personnel avant de commander.",
  },
  logo,
} as const;

export type Locale = "it" | "en" | "fr";
