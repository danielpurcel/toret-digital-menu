## Upsell promo nel ProductModal

Quando si apre un prodotto che fa parte di una promo, mostrare in fondo al modal una card promo "Aggiungilo alla promo" con immagine, titolo, sottotitolo e prezzo bundle.

### Data layer
- `src/data/promos.ts`: aggiungere campo opzionale `productIds: string[]` a ogni `Promo` per indicare quali prodotti la attivano (es. promo-colazione → espresso, cappuccino, croissant classico/crema/pistacchio, spremuta; promo-aperitivo → drink della casa, drink classico, calice, tagliere, stuzzichini).
- Nuovo helper `getPromoForProduct(productId)` che ritorna la promo collegata se il prodotto è incluso.

### UI
- `src/components/menu/ProductModal.tsx`: sotto la sezione allergeni, se esiste una promo collegata, renderizzare una card upsell:
  - layout orizzontale (immagine sinistra 80×80 rounded, testo a destra)
  - etichetta oro maiuscola "Abbinalo alla promo" (con traduzioni IT/EN/FR)
  - titolo serif italic + sottotitolo small cream/70
  - prezzo in tag oro a destra
  - bordo gold, sfondo brand-dark/60, look coerente col modal
  - non cliccabile (no ordini), solo informativa

### i18n
- `src/i18n/LocaleContext`: aggiungere chiave `pairWithPromo` (IT: "Abbinalo alla promo", EN: "Pair it with the deal", FR: "Associez-le à l'offre").

### Scope
Solo modifica visiva/dati del modal prodotto. Nessun cambio a Home, liste menu, favoriti, navigazione.