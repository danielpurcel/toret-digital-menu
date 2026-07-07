## Pianificazione

**Obiettivo:** Alzare l'immagine hero tagliando una parte del soffitto in alto, mostrando più del centro-basso del locale.

**File coinvolto:** `src/components/menu/Hero.tsx`

**Modifica:**
- Riga 12: cambiare `object-center` in `object-[center_60%]` (o un valore simile da affinare in base al risultato visivo).
- Questo sposta il punto focale dell'immagine verso il basso, riducendo la visibilità del soffitto e mostrando più tavoli/pareti.

**Verifica:** controllare nel preview che il soffitto venga parzialmente tagliato e che la parte interessante del locale sia più visibile.
