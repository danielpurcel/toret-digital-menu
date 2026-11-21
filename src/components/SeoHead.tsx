import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://menu.toretturin.it";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Caffè Torèt Torino — Caffetteria e Bar in Corso Palestro 2/F",
    description:
      "Caffè Torèt, caffetteria e bar in centro a Torino, Corso Palestro 2/F. Caffè Costadoro, Bicerin, Panna Torèt, pranzo e aperitivo. Aperto lun–sab 7:00–20:00.",
  },
  "/menu": {
    title: "Menu completo — Caffè Torèt Torino",
    description:
      "Il menu di Caffè Torèt: colazione, pranzo e aperitivo con prezzi. Caffè, brioche, panini, taglieri, vini, birre Metzger, cocktail. Corso Palestro 2/F, Torino.",
  },
  "/menu/colazione": {
    title: "Menu Colazione — Caffè Torèt Torino",
    description:
      "Colazione al Caffè Torèt: caffè Costadoro, cappuccino, bicerin, panna montata, zabaione, brioche e spremute fresche. Corso Palestro 2/F, Torino.",
  },
  "/menu/pranzo": {
    title: "Menu Pranzo e Menu del Giorno — Caffè Torèt Torino",
    description:
      "Pranzo al Caffè Torèt: panini, focacce, tramezzini, piadine e menu del giorno con contorni. Corso Palestro 2/F, Torino.",
  },
  "/menu/aperitivo": {
    title: "Menu Aperitivo — Caffè Torèt Torino",
    description:
      "Aperitivo al Caffè Torèt: spritz, vini piemontesi, prosecco, birre artigianali Metzger 1848, taglieri. Corso Palestro 2/F, Torino.",
  },
  "/info": {
    title: "Dove siamo e orari — Caffè Torèt Torino",
    description:
      "Caffè Torèt, Corso Palestro 2/F, 10122 Torino. Tel +39 351 767 9689. Aperto lunedì–sabato 7:00–20:00, domenica chiuso. Zona XVIII Dicembre.",
  },
  "/cerca": {
    title: "Cerca nel menu — Caffè Torèt Torino",
    description: "Cerca un prodotto nel menu di Caffè Torèt, caffetteria in Corso Palestro 2/F a Torino.",
  },
  "/preferiti": {
    title: "I tuoi preferiti — Caffè Torèt Torino",
    description: "I tuoi prodotti preferiti del menu di Caffè Torèt, Torino.",
  },
};

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    if (selector.includes("property=")) el.setAttribute("property", selector.split('property="')[1].split('"')[0]);
    if (selector.includes("name=")) el.setAttribute("name", selector.split('name="')[1].split('"')[0]);
    if (selector.startsWith("link")) el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/**
 * Gestisce title, description, canonical e Open Graph in base alla rotta corrente.
 * Il canonical dell'index.html è volutamente assente: ogni pagina dichiara il proprio,
 * così Google non le tratta come doppioni della home.
 */
const SeoHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const meta = PAGE_META[path] ?? PAGE_META["/"];
    const url = `${SITE}${path === "/" ? "/" : path}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
  }, [pathname]);

  return null;
};

export default SeoHead;
