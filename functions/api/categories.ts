/**
 * Cloudflare Pages Functions — Proxy sicuro per menu_categories Xano.
 *
 * Endpoint: GET /api/categories
 * Restituisce la lista di tutte le categorie/sottocategorie del menu
 * dalla tabella Xano menu_categories.
 *
 * I dati includono: id, name_it, name_en, name_fr, name_es, icon,
 * sort_order, is_active, macro (colazione/pranzo/aperitivo), parent_id.
 *
 * Il frontend usa questi dati per costruire dinamicamente la struttura
 * del menu — niente hardcode.
 */

export async function onRequest(context: {
  request: Request;
  env: Record<string, string>;
  waitUntil: (p: Promise<unknown>) => void;
  next: (req?: Request) => Promise<Response>;
  data: Record<string, unknown>;
}): Promise<Response> {
  const { env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const apiKey = env.XANO_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'XANO_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  // Usa il nuovo endpoint ERP che supporta menu_categories
  const xanoEndpoint =
    env.XANO_ERP_ENDPOINT || 'https://x8ki-letl-twmt.n7.xano.io/api:gubKa7ve/Erp';

  // Per menu_categories serve il nuovo endpoint api:erp-api/Erp
  const erpEndpoint = 'https://x8ki-letl-twmt.n7.xano.io/api:erp-api/Erp';

  try {
    const response = await fetch(erpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'list',
        table: 'menu_categories',
        limit: 100,
        offset: 0,
        data_json: '{}',
      }),
    });

    if (!response.ok) {
      throw new Error(`Xano responded with status ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch categories from Xano',
        detail: error instanceof Error ? error.message : String(error),
      }),
      { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }
}
