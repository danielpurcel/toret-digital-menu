# Xano Product Allergens Table

Danny prefers a dedicated table for allergens instead of storing a loose array on `menu_products`.

## Recommended Table

Table name: `product_allergens`

Status: created in Xano on 2026-06-26.

Xano table ID: `860590`

Fields:

- `id`: integer, primary key
- `menu_product_id`: integer, relation/reference to `menu_products.id`
- `allergen_key`: text/enum, one of the 14 EU keys used by the frontend
- `source`: text, optional supplier/recipe/manual source
- `notes`: text, optional internal note
- `is_trace`: boolean, default `false`
- `is_active`: boolean, default `true`
- `verified_at`: timestamp, optional
- `verified_by`: text/integer, optional

## Allowed `allergen_key` Values

- `glutine`
- `crostacei`
- `uova`
- `pesce`
- `arachidi`
- `soia`
- `latte`
- `frutta a guscio`
- `sedano`
- `senape`
- `sesamo`
- `solfiti`
- `lupini`
- `molluschi`

## API Shape For Menu Frontend

The menu endpoint should return products with:

```json
{
  "id": 37,
  "name": "Riso basmati...",
  "price": 8,
  "category_id": 2,
  "is_active": true,
  "allergens": ["latte", "glutine"],
  "trace_allergens": ["frutta a guscio"]
}
```

## Why Dedicated Table

- Easier to audit changes.
- One product can have many allergens without editing a text field.
- Can distinguish direct allergen from possible traces.
- Can later connect to recipes, ingredients, and supplier documentation.

## Creation Plan

Completed with Xano Metadata API and a valid JWT access token:

`POST /workspace/{workspace_id}/table`

```json
{
  "name": "product_allergens",
  "description": "Allergeni prodotto menu Caffe Toret. Tabella dedicata per Reg. UE 1169/2011.",
  "docs": "Relazione prodotto menu -> allergene UE. Usare is_trace per possibili tracce.",
  "auth": false,
  "tag": ["menu", "allergeni", "compliance"]
}
```

Then add fields:

- `menu_product_id`: int, required
- `allergen_key`: enum/text, required
- `source`: text, nullable
- `notes`: text, nullable
- `is_trace`: bool, default `false`
- `is_active`: bool, default `true`
- `verified_at`: timestamp, nullable
- `verified_by`: text, nullable

Recommended indexes:

- btree on `menu_product_id`
- unique on `menu_product_id`, `allergen_key`, `is_trace`
