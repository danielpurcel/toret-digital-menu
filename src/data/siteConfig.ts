import logoAsset from "@/assets/logo-toret.jpg.asset.json";
const logo = logoAsset.url;

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
    phone: "+39 3517679689",
    email: "bartoretturin@gmail.com",
    address: "Corso Palestro 2/F, 10122 Torino",
    instagram: "caffe_toret_turin",
  },
  allergensNote: {
    it: "Per informazioni su allergeni e intolleranze chiedi al personale. Le materie prime possono contenere tracce di glutine, frutta a guscio, latte, uova, soia, pesce, crostacei.",
    en: "Please ask our staff for allergen information. Ingredients may contain traces of gluten, nuts, milk, eggs, soy, fish, shellfish.",
    fr: "Veuillez demander au personnel pour les allergènes. Les ingrédients peuvent contenir des traces de gluten, fruits à coque, lait, œufs, soja, poisson, crustacés.",
  },
  logo,
} as const;

export type Locale = "it" | "en" | "fr";