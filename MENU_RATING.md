# Menu QR Rating Loop

Target: 9.5/10 on estetica, UX mobile, dati Xano, ricerca, allergeni, performance, SEO, QR tavoli.

## Current Pass

- Estetica: 8.5 - visual direction preserved, no new product photos added.
- UX mobile: 8.8 - macro flow is strong; category chips and loading/error states added.
- Dati Xano: 8.0 - client supports real `menu_products` through ERP endpoint with static fallback; production needs a safe read-only endpoint or env configuration.
- Ricerca: 9.3 - accent-insensitive search across name, description, category, tags, allergens.
- Allergeni: 9.25 - FIPE Roma/Reg. UE 1169/2011 reference applied, 14-category list visible with small badges, product fallback added; exact per-product mapping still needs ingredient/allergen data in Xano.
- Performance: 8.8 - lazy images and no forced product images for Xano; Lighthouse still required.
- SEO: 9.0 - Italian lang, canonical, manifest, robots sitemap pointer, sitemap added.
- QR tavoli: 8.8 - production routes exist; final table QR needs deployed domain and physical QR test.

## Needed For 9.5

- Per-product allergen table or ingredient/allergen fields in Xano, verified against supplier documentation.
- Safe Xano read path: public read-only endpoint, proxy, or deploy env var. Do not commit private API keys in the public frontend repo.
- Exact Xano category mapping for `categorie_menu` and `menu_products.category_id`.
- Final production URL deploy on `menu.toretturin.it`.
- Real product photos from Danny before product image assignment.
- Lighthouse mobile report after deploy.
