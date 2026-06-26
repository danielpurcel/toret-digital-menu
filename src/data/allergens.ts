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

export const allergenIconPaths: Record<Allergen, string> = {
  glutine: "/allergens/glutine.png",
  crostacei: "/allergens/crostacei.png",
  uova: "/allergens/uova.png",
  pesce: "/allergens/pesce.png",
  arachidi: "/allergens/arachidi.png",
  soia: "/allergens/soia.png",
  latte: "/allergens/latte.png",
  "frutta a guscio": "/allergens/frutta-a-guscio.png",
  sedano: "/allergens/sedano.png",
  senape: "/allergens/senape.png",
  sesamo: "/allergens/sesamo.png",
  solfiti: "/allergens/solfiti.png",
  lupini: "/allergens/lupini.png",
  molluschi: "/allergens/molluschi.png",
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

export const allergenDescriptions: Record<Allergen, { it: string; en: string; fr: string }> = {
  glutine: {
    it: "Cereali contenenti glutine e prodotti derivati.",
    en: "Cereals containing gluten and derived products.",
    fr: "Cereales contenant du gluten et produits derives.",
  },
  crostacei: {
    it: "Crostacei e prodotti a base di crostacei.",
    en: "Crustaceans and products based on crustaceans.",
    fr: "Crustaces et produits a base de crustaces.",
  },
  uova: {
    it: "Uova e prodotti a base di uova.",
    en: "Eggs and products based on eggs.",
    fr: "Oeufs et produits a base d'oeufs.",
  },
  pesce: {
    it: "Pesce e prodotti a base di pesce.",
    en: "Fish and products based on fish.",
    fr: "Poisson et produits a base de poisson.",
  },
  arachidi: {
    it: "Arachidi e prodotti a base di arachidi.",
    en: "Peanuts and products based on peanuts.",
    fr: "Arachides et produits a base d'arachides.",
  },
  soia: {
    it: "Soia e prodotti a base di soia.",
    en: "Soybeans and products based on soybeans.",
    fr: "Soja et produits a base de soja.",
  },
  latte: {
    it: "Latte e prodotti a base di latte, incluso lattosio.",
    en: "Milk and products based on milk, including lactose.",
    fr: "Lait et produits a base de lait, y compris le lactose.",
  },
  "frutta a guscio": {
    it: "Frutta a guscio e prodotti derivati.",
    en: "Nuts and derived products.",
    fr: "Fruits a coque et produits derives.",
  },
  sedano: {
    it: "Sedano e prodotti a base di sedano.",
    en: "Celery and products based on celery.",
    fr: "Celeri et produits a base de celeri.",
  },
  senape: {
    it: "Senape e prodotti a base di senape.",
    en: "Mustard and products based on mustard.",
    fr: "Moutarde et produits a base de moutarde.",
  },
  sesamo: {
    it: "Semi di sesamo e prodotti a base di semi di sesamo.",
    en: "Sesame seeds and products based on sesame seeds.",
    fr: "Graines de sesame et produits a base de graines de sesame.",
  },
  solfiti: {
    it: "Anidride solforosa e solfiti oltre 10 mg/kg o 10 mg/l espressi come SO2.",
    en: "Sulphur dioxide and sulphites above 10 mg/kg or 10 mg/l expressed as SO2.",
    fr: "Anhydride sulfureux et sulfites au-dela de 10 mg/kg ou 10 mg/l exprimes en SO2.",
  },
  lupini: {
    it: "Lupini e prodotti a base di lupini.",
    en: "Lupin and products based on lupin.",
    fr: "Lupin et produits a base de lupin.",
  },
  molluschi: {
    it: "Molluschi e prodotti a base di molluschi.",
    en: "Molluscs and products based on molluscs.",
    fr: "Mollusques et produits a base de mollusques.",
  },
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
