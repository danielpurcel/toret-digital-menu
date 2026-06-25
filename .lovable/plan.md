Il logo dell'header (fisso, h-20) si sovrappone al titolo "Caffè Torèt" della pagina Info perché il padding-top attuale (`pt-12` = 48px) è minore dell'altezza dell'header (80px).

### Modifica a `src/pages/InfoPage.tsx`
- Cambiare il `pt-12` del primo `<div>` (riga 11) in `pt-28` (112px), così il titolo parte sotto il logo dell'header con un po' di respiro.
- Nessun'altra modifica: hero gradient, tipografia e card restano invariati.