## Miglioramento icone allergeni

Il componente `AllergenBadge` mostra icone allergeni circolari (40px / 36px in modalità compact) con sfondo paper e nessun bordo esplicito. Le immagini PNG hanno stili variabili e mancano di contrasto sullo sfondo chiaro.

### Modifiche
1. **Aggiungere bordo visibile** a ogni icona: `warm-border-strong` o bordo dorato sottile per definirla chiaramente.
2. **Aggiungere padding interno** (2-3px) tra il bordo e l'immagine, riducendo leggermente la dimensione effettiva dell'immagine all'interno del contenitore.
3. **Aggiungere ombra leggera** (`shadow-1`) per dare profondità e separazione dallo sfondo.
4. **Migliorare allineamento** nel container flex: aumentare leggermente il `gap` da `1.5` a `2` per evitare sovrapposizioni visive, e assicurare `items-center`.
5. **Mantenere le dimensioni attuali** (non ingrandire) come richiesto.

### File coinvolti
- `src/components/menu/AllergenBadge.tsx` — stile badge e contenitore immagine
- `src/components/menu/ProductModal.tsx` — gap del flex container allergeni
- `src/pages/InfoPage.tsx` — gap del flex container allergeni (sezione info)

Nessuna modifica alle immagini PNG esistenti, solo restyling CSS del componente.