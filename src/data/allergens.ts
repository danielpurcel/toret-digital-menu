export const euAllergens = [
  "glutine",
  "crostacei",
  "uova",
  "pesce",
  "arachidi",
  "soia",
  "latte",
  "frutta a guscio",
  "sedano",
  "senape",
  "sesamo",
  "solfiti",
  "lupini",
  "molluschi",
] as const;

export type Allergen = (typeof euAllergens)[number];

export const allergenIcons: Record<Allergen, string> = {
  glutine: "GL",
  crostacei: "CR",
  uova: "UV",
  pesce: "PE",
  arachidi: "AR",
  soia: "SO",
  latte: "LA",
  "frutta a guscio": "FG",
  sedano: "SE",
  senape: "SN",
  sesamo: "SM",
  solfiti: "SF",
  lupini: "LU",
  molluschi: "MO",
};

export const allergenLabels: Record<Allergen, { it: string; en: string; fr: string }> = {
  glutine: {
    it: "Cereali contenenti glutine",
    en: "Cereals containing gluten",
    fr: "Céréales contenant du gluten",
  },
  crostacei: { it: "Crostacei", en: "Crustaceans", fr: "Crustacés" },
  uova: { it: "Uova", en: "Eggs", fr: "Œufs" },
  pesce: { it: "Pesce", en: "Fish", fr: "Poisson" },
  arachidi: { it: "Arachidi", en: "Peanuts", fr: "Arachides" },
  soia: { it: "Soia", en: "Soy", fr: "Soja" },
  latte: { it: "Latte", en: "Milk", fr: "Lait" },
  "frutta a guscio": { it: "Frutta a guscio", en: "Nuts", fr: "Fruits à coque" },
  sedano: { it: "Sedano", en: "Celery", fr: "Céleri" },
  senape: { it: "Senape", en: "Mustard", fr: "Moutarde" },
  sesamo: { it: "Semi di sesamo", en: "Sesame seeds", fr: "Graines de sésame" },
  solfiti: {
    it: "Anidride solforosa e solfiti",
    en: "Sulphur dioxide and sulphites",
    fr: "Anhydride sulfureux et sulfites",
  },
  lupini: { it: "Lupini", en: "Lupin", fr: "Lupin" },
  molluschi: { it: "Molluschi", en: "Molluscs", fr: "Mollusques" },
};

export const allergenFallback = {
  it: "Allergeni da confermare con il personale. La documentazione allergeni e ingredienti e disponibile al banco.",
  en: "Please confirm allergens with our staff. Allergen and ingredient documentation is available at the counter.",
  fr: "Veuillez confirmer les allergènes avec le personnel. La documentation allergènes et ingrédients est disponible au comptoir.",
} as const;

export const allergenComplianceNote = {
  it: "Informativa allergeni basata sulle 14 categorie previste dal Reg. UE 1169/2011. Per ingredienti, contaminazioni e aggiornamenti dei fornitori chiedere sempre conferma al personale.",
  en: "Allergen information is based on the 14 categories listed by EU Regulation 1169/2011. Please confirm ingredients, traces and supplier updates with our staff.",
  fr: "Information allergènes basée sur les 14 catégories prévues par le règlement UE 1169/2011. Veuillez confirmer les ingrédients, traces et mises à jour fournisseurs avec le personnel.",
} as const;
