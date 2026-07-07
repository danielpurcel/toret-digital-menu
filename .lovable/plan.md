## Modifica altezza e comportamento immagine nel modale prodotto

**File:** `src/components/menu/ProductModal.tsx`

**Cambiamenti:**
1. All'immagine hero (riga 78) riportare `object-cover` invece di `object-contain`.
2. Al contenitore dell'immagine (riga 73) aumentare l'altezza da `h-[34vh] min-h-[220px]` a `h-[44vh] min-h-[280px]`.

**Risultato atteso:** l'immagine torna a riempire l'intero riquadro con `object-cover`, ma grazie all'altezza maggiore (44vh) l'eventuale ritaglio è meno aggressivo e la foto si vede meglio.