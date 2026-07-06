import type { Product } from "@/data/menu";

/**
 * Pairings intelligenti: quando un cliente visualizza un prodotto,
 * gli suggeriamo automaticamente questi prodotti complementari.
 *
 * Key = product id
 * Value = array di product id da suggerire
 */
export const productPairings: Record<string, string[]> = {
  // ===== COLAZIONE =====
  // Caffè, cappuccino → dolci / piccola pasticceria
  "xano-26-caffe": ["xano-72-panna-piccola", "xano-88-semidolce", "xano-44-spremuta"],
  "xano-27-caffe-decaffeinato": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-28-cappuccino": ["xano-88-semidolce", "xano-72-panna-piccola", "xano-44-spremuta"],
  "xano-29-cocktail": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-32-latte-macchiato": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-42-caffe-corretto": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-45-orzo-ginseng": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-47-te-infuso": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-62-latte-bianco": ["xano-26-caffe", "xano-72-panna-piccola"],
  "xano-63-marocchino": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-70-caffe-toret": ["xano-88-semidolce", "xano-44-spremuta"],
  "xano-75-bicerin": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-76-cioccolata-calda": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-77-cioccolata-calda-con-panna": ["xano-88-semidolce"],
  "xano-79-cappuccino-soia-vena": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-80-caramel-iced-coffee": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-81-caffe-leccese": ["xano-72-panna-piccola"],
  "xano-82-espresso-tonic": ["xano-72-panna-piccola"],
  "xano-83-vaniglia-iced-coffee": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-84-crema-caffe": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-86-iced-matcha-latte": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-87-iced-chai-latte": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-92-caffe-shakerato": ["xano-88-semidolce"],

  // Dolci → Caffè / Spremuta
  "xano-72-panna-piccola": ["xano-28-cappuccino", "xano-26-caffe", "xano-44-spremuta"],
  "xano-74-zabaione": ["xano-26-caffe", "xano-70-caffe-toret"],
  "xano-88-semidolce": ["xano-28-cappuccino", "xano-26-caffe", "xano-44-spremuta"],

  // Bevande colazione → Dolci
  "xano-44-spremuta": ["xano-88-semidolce", "xano-72-panna-piccola"],
  "xano-50-frullato-di-frutta-fresca": ["xano-72-panna-piccola", "xano-88-semidolce"],
  "xano-94-acqua-toret-fresh": [],

  // ===== PRANZO =====
  // Primi → Secondi
  "xano-95-spaghetti-zucchine-speck": ["xano-96-pollo-funghi-contorno"],
  "xano-96-pollo-funghi-contorno": ["xano-95-spaghetti-zucchine-speck"],
  "xano-31-frittata": [],
  "xano-39-frittata-piu-contorni": [],
  "xano-37-riso-basmati-quinoa": [],

  // Panini → Bevande
  "xano-33-mignon": ["xano-40-acqua-0-5l", "xano-44-spremuta"],
  "xano-34-panino-carne": ["xano-41-birra-menabrea", "xano-40-acqua-0-5l"],
  "xano-35-tramezzino": ["xano-40-acqua-0-5l", "xano-44-spremuta"],
  "xano-55-toast": ["xano-40-acqua-0-5l", "xano-41-birra-menabrea"],
  "xano-89-piadina": ["xano-40-acqua-0-5l", "xano-44-spremuta"],
  "xano-93-croissant-salato": ["xano-40-acqua-0-5l", "xano-44-spremuta"],

  // ===== APERITIVO =====
  // Cocktail → Taglieri & Stuzzichini
  // (static IDs from menu.ts)
  "drink-casa": ["xano-54-tagliere", "stuzzichini"],
  "drink-classico": ["xano-54-tagliere", "stuzzichini"],

  // Vino → Taglieri
  "calice-vino": ["xano-54-tagliere", "stuzzichini"],
  "xano-36-prosecco-doc-extra-dry": ["xano-54-tagliere", "stuzzichini"],
  "xano-56-goj-barbera-doc-frizzante": ["xano-54-tagliere"],
  "xano-60-prosecco-docg-extra-dry-2025": ["xano-54-tagliere"],
  "xano-61-prosecco-doc-brut": ["xano-54-tagliere"],
  "cascina-passum": ["xano-54-tagliere"],
  "cascina-policalpo": ["xano-54-tagliere"],
  "cascina-litina": ["xano-54-tagliere"],
  "cascina-uceline": ["xano-54-tagliere"],
  "cascina-ataj": ["xano-54-tagliere"],
  "cascina-castlet-rose": ["xano-54-tagliere"],

  // Birra
  "xano-41-birra-menabrea": ["xano-54-tagliere", "stuzzichini"],

  // Taglieri / Stuzzichini → Drink
  "xano-54-tagliere": ["calice-vino", "xano-41-birra-menabrea", "xano-44-spremuta"],
  "tagliere-toret": ["calice-vino", "xano-41-birra-menabrea"],
  "stuzzichini": ["calice-vino", "xano-41-birra-menabrea"],
};

/**
 * Get suggested products for a given product (max 3)
 */
export function getPairings(productId: string, allProducts: Product[]): Product[] {
  const suggestedIds = productPairings[productId];
  if (!suggestedIds || suggestedIds.length === 0) return [];
  return suggestedIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => !!p)
    .slice(0, 3);
}
