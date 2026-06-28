/**
 * Cloudflare Pages Functions — Proxy sicuro per Xano ERP.
 *
 * Questo endpoint evita di esporre la API key di Xano nel bundle frontend.
 * La VITE_XANO_API_KEY non va MAI passata al client: Vite la inietterebbe
 * nel JS bundle visibile a chiunque ispezioni il sito.
 *
 * Uso:
 *   Frontend chiama   GET /api/menu?limit=100&offset=0
 *   Questa funzione   legge XANO_API_KEY da env (secret Pages) e inoltra
 *                     la richiesta al backend Xano in sicurezza.
 *
 * Setup Cloudflare:
 *   npx wrangler pages secret put XANO_API_KEY --project-name=menu-toretturin
 *
 * RIMUOVERE DA ENV DEL FRONTEND:
 *   Eliminare VITE_XANO_API_KEY dalle variabili d'ambiente sia locali (.env)
 *   che Cloudflare, perché Vite la esporrebbe client‑side.
 */

export async function onRequest(context: {
  request: Request;
  env: Record<string, string>;
  waitUntil: (p: Promise<unknown>) => void;
  next: (req?: Request) => Promise<Response>;
  data: Record<string, unknown>;
}): Promise<Response> {
  const { request, env } = context;

  // HEADERS CORS — permessi a tutte le origini (pubblico)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Preflight OPTIONS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Leggi API key da Pages environment secret (MAI dal client)
  const apiKey = env.XANO_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'XANO_API_KEY not configured on server side',
        hint: 'Set it via: npx wrangler pages secret put XANO_API_KEY --project-name=menu-toretturin',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  }

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '100', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  // Endpoint Xano ERP (vecchio endpoint funzionante per menu_products)
  // Il nuovo endpoint api:erp-api/Erp serve solo per menu_categories (via /api/categories)
  const xanoEndpoint = env.XANO_ERP_ENDPOINT || 'https://x8ki-letl-twmt.n7.xano.io/api:gubKa7ve/Erp';

  try {
    const response = await fetch(xanoEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        action: 'list',
        table: 'menu_products',
        limit,
        offset,
      }),
    });

    if (!response.ok) {
      throw new Error(`Xano responded with status ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch menu from Xano',
        detail: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  }
}
