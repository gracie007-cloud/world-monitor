// EIA (Energy Information Administration) API proxy
// Keeps API key server-side
<<<<<<< HEAD
export const config = { runtime: 'edge' };

function getCorsOrigin(req) {
  const origin = req.headers.get('origin') || '';
  // Allow *.worldmonitor.app and localhost
  if (
    origin.endsWith('.worldmonitor.app') ||
    origin === 'https://worldmonitor.app' ||
    origin.startsWith('http://localhost:')
  ) {
    return origin;
  }
  return 'https://worldmonitor.app';
}

export default async function handler(req) {
  const corsOrigin = getCorsOrigin(req);

  // Only allow GET and OPTIONS methods
  if (req.method !== 'GET' && req.method !== 'OPTIONS') {
    return Response.json({ error: 'Method not allowed' }, {
      status: 405,
      headers: { 'Access-Control-Allow-Origin': corsOrigin },
=======
import { getCorsHeaders, isDisallowedOrigin } from '../_cors.js';
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const cors = getCorsHeaders(req);
  if (isDisallowedOrigin(req)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403, headers: cors });
  }

  // Only allow GET and OPTIONS methods
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, {
      status: 405,
      headers: cors,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace('/api/eia', '');

  const apiKey = process.env.EIA_API_KEY;

  if (!apiKey) {
    return Response.json({
      configured: false,
      skipped: true,
      reason: 'EIA_API_KEY not configured',
    }, {
      status: 200,
<<<<<<< HEAD
      headers: { 'Access-Control-Allow-Origin': corsOrigin },
    });
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
=======
      headers: cors,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    });
  }

  // Health check
  if (path === '/health' || path === '') {
    return Response.json({ configured: true }, {
<<<<<<< HEAD
      headers: { 'Access-Control-Allow-Origin': corsOrigin },
=======
      headers: cors,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    });
  }

  // Petroleum data endpoint
  if (path === '/petroleum') {
    try {
      const series = {
        wti: 'PET.RWTC.W',
        brent: 'PET.RBRTE.W',
        production: 'PET.WCRFPUS2.W',
        inventory: 'PET.WCESTUS1.W',
      };

      const results = {};

      // Fetch all series in parallel
      const fetchPromises = Object.entries(series).map(async ([key, seriesId]) => {
        try {
          const response = await fetch(
            `https://api.eia.gov/v2/seriesid/${seriesId}?api_key=${apiKey}&num=2`,
            { headers: { 'Accept': 'application/json' } }
          );

          if (!response.ok) return null;

          const data = await response.json();
          const values = data?.response?.data || [];

          if (values.length >= 1) {
            return {
              key,
              data: {
                current: values[0]?.value,
                previous: values[1]?.value || values[0]?.value,
                date: values[0]?.period,
                unit: values[0]?.unit,
              }
            };
          }
        } catch (e) {
          console.error(`[EIA] Failed to fetch ${key}:`, e.message);
        }
        return null;
      });

      const fetchResults = await Promise.all(fetchPromises);

      for (const result of fetchResults) {
        if (result) {
          results[result.key] = result.data;
        }
      }

      return Response.json(results, {
        headers: {
<<<<<<< HEAD
          'Access-Control-Allow-Origin': corsOrigin,
          'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=300', // 30 min cache
=======
          ...cors,
          'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=300',
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        },
      });
    } catch (error) {
      console.error('[EIA] Fetch error:', error);
      return Response.json({
        error: 'Failed to fetch EIA data',
      }, {
        status: 500,
<<<<<<< HEAD
        headers: { 'Access-Control-Allow-Origin': corsOrigin },
=======
        headers: cors,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      });
    }
  }

  return Response.json({ error: 'Not found' }, {
    status: 404,
<<<<<<< HEAD
    headers: { 'Access-Control-Allow-Origin': corsOrigin },
=======
    headers: cors,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  });
}
