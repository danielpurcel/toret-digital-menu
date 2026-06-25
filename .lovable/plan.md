## Obiettivo

Cambiare la direzione visiva da "dark green app" a **bistrot torinese caldo** seguendo `colors_and_type.css` + screenshot allegati. L'app passa da fondo verde scuro a **fondo avorio chiaro** con verde profondo riservato a hero, header sticky e bottom nav.

## 1 · Design tokens (`src/index.css` + `tailwind.config.ts`)

Riscrittura completa dei token CSS:

- Palette nuova in HSL: `--toret-green #06542D`, `--toret-green-deep #04381E`, `--toret-gold #D5B74F`, `--toret-gold-warm #C39E33`, `--toret-cream #F7F2E8`, `--toret-ivory #FAFAF7`, `--toret-paper #FFFDF8`, `--toret-walnut #5C4326`, `--toret-ink #1A1A1A`.
- Rimappare shadcn semantic tokens: `background = ivory`, `foreground = ink`, `card = paper`, `primary = green`, `accent = gold`, `border = walnut 12%`.
- Aggiungere shadow calde `--sh-1..4` + `--sh-gold`, radii (`12/18/28/pill`), motion easing soft `cubic-bezier(0.32,0.72,0,1)`.
- Aggiornare `tailwind.config.ts` con i nuovi color token (`toret.green`, `toret.gold`, ecc.) e estendere `fontFamily` `serif: Playfair Display`, `sans: Inter`.
- `index.html`: sostituire Google Fonts con Playfair Display (400/600/700 + italic) + Inter (400/500/600/700).
- Body sfondo `--toret-ivory`, testo `--toret-ink`, non più nero.

## 2 · Layout shell

- `AppShell`: container `max-w-[420px]`, sfondo ivory, padding-bottom per bottom nav 72px.
- Rimuovere lo shadow nero esterno (era "phone on dark"), sostituire con un soft warm shadow su desktop.

## 3 · Header (`Header.tsx`) — versione "sticky compatta"

Come negli screenshot:
- Sticky in alto, **non più trasparente fisso**. Sfondo `rgba(250,250,247,0.78)` + `backdrop-blur(20px) saturate(180%)`. Border-bottom warm.
- Sinistra: mini-logo circolare 36px con bordo oro + testo "**Caffè Torèt**" (Playfair 17px) e eyebrow "TURIN · APERTO" (oro).
- Destra: icona search (Lucide, 24px, outline) + pill lingua "IT" (bordo warm).
- Hamburger rimosso (navigazione gestita da bottom nav).

## 4 · Bottom nav (`BottomNav.tsx`)

- Pill verde profondo `--toret-green-deep` con 5 voci: **Home, Menu, Cerca, Preferiti, Info**.
- Icone Lucide outline 24px, label Inter 11px.
- Voce attiva: icona oro + label oro + dot oro sotto.
- Floating con margine 12px, shadow warm, radius 28px.

## 5 · Hero (`Hero.tsx`)

- Foto full-bleed 380px, radius 18px in basso solo se card-style; nello screenshot è full-width edge-to-edge.
- Gradient protezione `linear-gradient(180deg, transparent 40%, rgba(4,56,30,0.85) 100%)`.
- In overlay: eyebrow oro "CAFFÈ TORÈT · TORINO", titolo Playfair "**Buongiorno**" (display-xl), sottotitolo crema "Bistrot torinese · colazione, pranzo e aperitivo dal mattino alla sera".
- Sotto la hero (sul fondo ivory): pill bianca con icona clock verde + "Aperto ora · cucina fino alle 22:30".

## 6 · Home (`Index.tsx`)

Sezioni nell'ordine degli screenshot:
1. Hero.
2. Pill "Aperto ora".
3. Sezione **COSA CERCHI / Scegli il momento** → grid 2×2 di category card foto con time chip oro in basso a sx ("07:30–11:00", "12:00–15:00", "18:00–22:00", "tutto il giorno") e titolo Playfair sovrapposto in basso. 4 card: Colazione, Pranzo, Aperitivo, Caffetteria (o solo 3 in grid 2 col).
4. Sezione **DA NON PERDERE / I nostri suggerimenti** con product list verticale (card orizzontali, vedi §8).
5. Promo banner colazione, restyled con sfondo verde profondo + accenti oro.

## 7 · Pagine categoria (`MacroPage.tsx`)

Come screenshot "02 · Pranzo":
- Hero immagine 240px con back button circolare bianco + search circolare bianco in overlay, eyebrow oro "12:00–15:00", titolo "Pranzo" Playfair, descrizione crema.
- Sotto: `CategoryTabs` orizzontali pill — attiva = pill verde con testo crema, inattive = pill bianca bordata warm con testo ink.
- Lista prodotti verticale con card orizzontali.

## 8 · ProductCard orizzontale (nuova anatomia)

Sostituzione totale dell'attuale grid card:
```
[ img 96×96 r12 ] [  badge "DA PROVARE" (verde, oro chip)        ]
                  [  Titolo Playfair 17 (truncate 1 riga)         ]
                  [  Descrizione Inter 13 muted (2 righe)         ]
                  [  € 14,00 (gold-warm, tabular)        ♡ outline]
```
- Sfondo `--toret-paper`, bordo warm 12%, shadow `--sh-2`, radius 12px.
- Cuore outline → fill oro on toggle, pulse animazione.
- Tap apre `ProductModal`.

## 9 · ProductModal / Dettaglio

Restyle come screenshot "03 · Dettaglio prodotto":
- Sheet full-screen su ivory.
- Top: foto full-bleed 420px con gradient bottom + 3 bottoni circolari bianchi (back, share, fav).
- Body su `--toret-paper`: badge "DA PROVARE", titolo Playfair display-l, sottotitolo italico Playfair, label "PREZZO" eyebrow, prezzo Inter 28px + chip rating ("91% preferito") con stella oro.
- CTA verde pieno full-width pill: "**+ Aggiungi ai preferiti per ordinare**" (azione = toggle favorite, niente carrello).
- Sezione allergeni e upsell promo invariati per logica, ma restyled con bordi warm + chip oro.

## 10 · Pagine secondarie

- **Cerca** (nuova rotta `/cerca`): pagina con search bar grande in cima (input pill warm), suggerimenti per tag e lista risultati filtrati su `menu.ts`. Aggiunta a `App.tsx` e a `BottomNav`.
- **Preferiti**: lista verticale stessa card orizzontale. Empty state Playfair "Non hai ancora aggiunto preferiti." + eyebrow oro sopra.
- **Info**: stesso contenuto attuale (contatti, orari, allergeni) ma su fondo ivory, card paper, link oro, header sticky non trasparente. Mantengo i link Google Maps/mail/tel/Instagram già aggiunti.
- **MenuIndex**: 3 category card grandi come la grid Home, full-width.

## 11 · Pulizia

- Rimuovere `bg-[#002F24]/...` gradient trasparente dall'header (non più adatto a fondo chiaro).
- Rimuovere `noTopPadding` di `AppShell` per Home — l'header diventa sticky opaco con blur, contenuto scorre sotto ma con padding normale. Hero parte sotto l'header (no overlap voluto).
- Aggiornare `i18n/LocaleContext.tsx` con nuove stringhe: "Buongiorno", "Bistrot torinese · ...", "Aperto ora", "Cosa cerchi", "Scegli il momento", "Da non perdere", "I nostri suggerimenti", "Cerca", "Aggiungi ai preferiti per ordinare" in IT/EN/FR.
- I dati prodotto in `src/data/menu.ts` restano invariati (stessa struttura). Aggiunti opzionalmente tag `da-provare` / `novita` / `stagione` per i badge.

## 12 · Note tecniche

- Nessun cambio backend / data layer.
- Nessuna nuova dipendenza (Lucide + Tailwind già presenti).
- Animazioni con Tailwind transition + un paio di keyframe in `index.css` (`fade-in`, `heart-pulse`).
- Verifica finale via Playwright headless: screenshot Home, Pranzo, Dettaglio per confronto con i mockup allegati.

## Fuori scopo

- Niente carrello/ordini/pagamenti.
- Niente cambi di routing oltre l'aggiunta di `/cerca`.
- Niente integrazione Xano/API (il data layer resta file-based, già pronto per swap).
