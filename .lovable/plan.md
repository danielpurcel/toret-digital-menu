## Pianificazione

**Obiettivo:** Ridurre l'altezza hero a 34vh e mostrare l'interno con un'inquadratura più ampia (più larga, meno ritaglio laterale).

**File coinvolto:** `src/components/menu/Hero.tsx`

**Diagnosi:**
- La foto originale è in formato orizzontale (panoramica dell'interno).
- L'app è racchiusa in un contenitore di max 440px.
- Con un hero alto 34vh, sul mobile il contenitore diventa più "panoramico" (es. 390×187px ≈ 2.08:1), più largo della foto 16:9.
- Con `object-cover` in un contenitore più panoramico della foto, il ritaglio avviene in verticale (alto/basso), mostrando quasi tutta la larghezza del locale: questo è l'effetto "inquadratura più ampia".
- L'attuale trucco `top-[-100px] h-[calc(100%+100px)]` invece forza un ritaglio verticale e va rimosso per permettere l'inquadratura larga.

**Modifiche proposte:**
1. Altezza hero: `h-[34vh] min-h-[180px] sm:h-[300px]` (34vh su mobile, fallback più sicuro su desktop).
2. Immagine: tornare a `h-full w-full object-cover` rimuovendo lo spostamento `top-[-100px]`.
3. Posizionamento verticale: usare `object-[center_45%]` (o `center_40%`) per tagliare un po' di soffitto e mostrare il centro del locale.
4. Testi: ridurre la dimensione del titolo e il padding inferiore sulle altezze basse, es. `text-[2rem] sm:text-[2.75rem]` e `pb-5 sm:pb-7`.

**Verifica:**
- Controllare nel preview che l'hero sia più basso (~34vh).
- Verificare che si veda più larghezza del locale (tavoli, pareti, portabottiglie) e meno ritaglio laterale.
- Verificare che il testo "Buongiorno" resti leggibile sopra il gradiente.