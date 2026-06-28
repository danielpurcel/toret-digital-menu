export async function onRequest(context: {
  request: Request;
  env: Record<string, string>;
  waitUntil: (p: Promise<unknown>) => void;
  next: (req?: Request) => Promise<Response>;
  data: Record<string, unknown>;
}): Promise<Response> {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '100', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  // Nuovo endpoint ERP (senza auth, supporta menu_products)
  const xanoEndpoint = 'https://x8ki-letl-twmt.n7.xano.io/api:erp-api/Erp';

  try {
    const response = await fetch(xanoEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'list',
        table: 'menu_products',
        limit,
        offset,
        data_json: '{}',
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Xano responded with status ${response.status}: ${errText.slice(0, 200)}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch menu from Xano',
        detail: error instanceof Error ? error.message : String(error),
      }),
      { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }
}
