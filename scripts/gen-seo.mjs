/**
 * Generatore dati strutturati (schema.org) + sitemap + robots per Caffè Torèt.
 * Eseguito in prebuild: legge i prodotti reali e inietta un JSON-LD completo
 * nell'index.html. Il look della pagina non cambia: cambia solo ciò che vede Google.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://menu.toretturin.it";

// --- 1. Carica prodotti reali dal sorgente TypeScript (immagini neutralizzate) ---
const outFile = path.join(root, "node_modules/.cache/toret-products.mjs");
await build({
  entryPoints: [path.join(root, "src/data/importedProducts.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: outFile,
  logLevel: "error",
  loader: { ".jpg": "empty", ".jpeg": "empty", ".png": "empty", ".webp": "empty", ".svg": "empty" },
});
const mod = await import(`${outFile}?t=${Date.now()}`);
const products = mod.importedProducts.filter((p) => p.available !== false);

const MACROS = [
  { id: "colazione", label: "Colazione", hours: "07:30 – 11:00" },
  { id: "pranzo", label: "Pranzo", hours: "12:00 – 15:00" },
  { id: "aperitivo", label: "Aperitivo", hours: "18:00 – 20:00" },
];

const clean = (s) => (s || "").toString().replace(/\s+/g, " ").trim();

const menuSections = MACROS.map((m) => {
  const items = products
    .filter((p) => p.macroCategory === m.id)
    .map((p) => ({
      "@type": "MenuItem",
      name: clean(p.name),
      ...(p.description ? { description: clean(p.translations?.it?.description || p.description) } : {}),
      offers: {
        "@type": "Offer",
        price: Number(p.price).toFixed(2),
        priceCurrency: "EUR",
      },
      ...(p.allergens?.length
        ? {
            additionalProperty: p.allergens.map((a) => ({
              "@type": "PropertyValue",
              name: "Allergene",
              value: a,
            })),
          }
        : {}),
    }))
    .filter((x) => x.name);

  return {
    "@type": "MenuSection",
    name: `${m.label} (${m.hours})`,
    hasMenuItem: items,
  };
}).filter((s) => s.hasMenuItem.length > 0);

const restaurant = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "CafeOrCoffeeShop", "BarOrPub", "LocalBusiness"],
  "@id": `${SITE}/#restaurant`,
  name: "Caffè Torèt",
  alternateName: ["Caffè TORÈT", "Caffè Toret", "Cafe Toret Torino"],
  description:
    "Caffetteria e bar in centro a Torino, in Corso Palestro 2/F. Colazione, pranzo con menu del giorno e aperitivo. Caffè Costadoro, Bicerin, Panna Torèt, birre artigianali Metzger 1848.",
  url: SITE,
  image: `${SITE}/og-image.jpg`,
  logo: `${SITE}/icon-512.png`,
  telephone: "+39 351 767 9689",
  email: "bartoretturin@gmail.com",
  priceRange: "€",
  currenciesAccepted: "EUR",
  servesCuisine: ["Caffetteria", "Italiana", "Piemontese", "Colazione", "Aperitivo"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Corso Palestro, 2/F",
    addressLocality: "Torino",
    addressRegion: "TO",
    postalCode: "10122",
    addressCountry: "IT",
  },
  geo: { "@type": "GeoCoordinates", latitude: 45.0751954, longitude: 7.6732049 },
  hasMap: "https://www.google.com/maps/search/?api=1&query=Caff%C3%A8%20Tor%C3%A8t%20Corso%20Palestro%202%20Torino",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  sameAs: ["https://instagram.com/caffe_toret_turin"],
  hasMenu: {
    "@type": "Menu",
    name: "Menu Caffè Torèt",
    url: `${SITE}/menu`,
    inLanguage: "it",
    hasMenuSection: menuSections,
  },
  acceptsReservations: "False",
  smokingAllowed: false,
  petsAllowed: true,
  publicAccess: true,
};

// --- 2. Inietta il JSON-LD nell'index.html ---
const indexPath = path.join(root, "index.html");
let html = readFileSync(indexPath, "utf8");
const marker = "<!-- JSONLD:auto -->";
const jsonLd = `${marker}\n    <script type="application/ld+json">${JSON.stringify(restaurant)}</script>`;
if (html.includes(marker)) {
  html = html.replace(new RegExp(`${marker}[\\s\\S]*?<\\/script>`), jsonLd);
} else {
  html = html.replace("</head>", `  ${jsonLd}\n  </head>`);
}
writeFileSync(indexPath, html);

// --- 3. Sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: "/", p: "1.0", c: "weekly" },
  { loc: "/menu", p: "0.9", c: "weekly" },
  { loc: "/menu/colazione", p: "0.8", c: "weekly" },
  { loc: "/menu/pranzo", p: "0.8", c: "weekly" },
  { loc: "/menu/aperitivo", p: "0.8", c: "weekly" },
  { loc: "/info", p: "0.7", c: "monthly" },
  { loc: "/cerca", p: "0.3", c: "monthly" },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.c}</changefreq>
    <priority>${u.p}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(path.join(root, "public/sitemap.xml"), sitemap);

const items = menuSections.reduce((n, s) => n + s.hasMenuItem.length, 0);
console.log(`[seo] JSON-LD generato: ${menuSections.length} sezioni, ${items} prodotti`);
