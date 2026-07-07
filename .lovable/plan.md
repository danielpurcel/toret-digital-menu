## Problema
L'immagine nel modale prodotto usa `object-cover`, che ritaglia l'immagine per riempire l'area. L'utente vuole vedere l'intera foto senza tagli.

## Soluzione
Nel componente `ProductModal.tsx`, modificare l'immagine prodotto in cima al drawer:

1. **Sostituire `object-cover` con `object-contain`** — mostra l'intera foto, rispettando le proporzioni.
2. **Aggiungere un background uniforme** (`bg-toret-cream`) alla shell dell'immagine, così gli eventuali spazi vuoti lasciati da `object-contain` non risultano brutti.
3. **Mantenere l'altezza dell'area** (`h-[34vh] min-h-[220px]`) perché con `object-contain` l'immagine si adatta da sola; se l'utente poi chiede più spazio, si può aumentare in un secondo step.

## File da modificare
- `src/components/menu/ProductModal.tsx` (unico file)

## Note tecniche
- Nessuna dipendenza aggiuntiva.
- Il resto del layout (testo, prezzo, allergeni, abbinamenti) rimane invariato.
- Se l'immagine è in landscape, `object-contain` la farà apparire più bassa; il background nasconde lo spazio vuoto.