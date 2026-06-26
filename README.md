# Caffe Toret Digital Menu

Menu QR pubblico di Caffe Toret Turin.

Produzione: https://menu.toretturin.it/

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Cloudflare Pages
- Xano per i dati menu

## Funzionalita

- Home mobile-first per Colazione, Pranzo e Aperitivo
- Menu per momenti d'uso
- Ricerca con normalizzazione accenti
- Preferiti locali
- Dettaglio prodotto
- Informativa allergeni basata sulle 14 categorie UE
- Badge allergeni piccoli e leggibili
- Manifest, sitemap e robots per produzione

## Dati

Il frontend supporta dati reali da Xano tramite endpoint configurabile.
Se Xano non e configurato, usa un fallback statico locale.

Variabili ambiente previste:

```bash
VITE_XANO_ERP_ENDPOINT=
VITE_XANO_API_KEY=
```

Nota: non committare chiavi private nel repository pubblico. Per produzione e preferibile usare un endpoint read-only o un proxy.

## Allergeni

La tabella Xano dedicata e:

- `product_allergens`
- ID Xano: `860590`

Documentazione tecnica:

```text
docs/xano-product-allergens.md
```

## Sviluppo

```bash
npm install
npm run dev
```

## Verifiche

```bash
npm run build
npm run test
npm run lint
```

Il lint puo mostrare warning Fast Refresh sui componenti shadcn generati, non bloccanti.

## Deploy

Build:

```bash
npm run build
```

Deploy Cloudflare Pages:

```bash
npx wrangler pages deploy dist --project-name=menu-toretturin --branch=main
```

## Note operative

- Non aggiungere immagini prodotto finte o stock.
- Le foto prodotto reali verranno aggiunte dopo shooting e revisione marketing.
- Non modificare prezzi o dati Xano senza conferma.
