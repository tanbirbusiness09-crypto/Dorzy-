import { readFile } from 'node:fs/promises';
const configUrl = new URL('../public/visit-config.json', import.meta.url);
const coordinate = (v, limit) => typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= limit;
const clean = value => typeof value === 'string' ? value.slice(0, 600) : '';

export async function resolveVisitLocation(point, config, request = fetch) {
  const jobs = [
    (async () => {
      const shop = config.shop;
      if (!shop || !coordinate(shop.latitude,90) || !coordinate(shop.longitude,180) || !config.routingBaseUrl) throw Error('not configured');
      const url = new URL(config.routingBaseUrl);
      if (url.protocol !== 'https:') throw Error('HTTPS required');
      url.pathname = `${url.pathname.replace(/\/$/, '')}/${shop.longitude},${shop.latitude};${point.longitude},${point.latitude}`;
      url.search = 'overview=false&steps=false';
      const response = await request(url, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw Error('route unavailable');
      const data = await response.json();
      const meters = data.routes?.[0]?.distance;
      if (data.code !== 'Ok' || !Number.isFinite(meters) || meters < 0) throw Error('no route');
      return meters / 1000;
    })(),
    (async () => {
      if (!config.reverseGeocodingUrl) throw Error('not configured');
      const url = new URL(config.reverseGeocodingUrl);
      if (url.protocol !== 'https:') throw Error('HTTPS required');
      url.search = new URLSearchParams({ lat:point.latitude, lon:point.longitude, limit:3, radius:1, lang:point.language === 'ar' ? 'ar' : 'en' }).toString();
      const response = await request(url, { signal: AbortSignal.timeout(10000), headers:{'User-Agent':'NamaaAlQimmahBooking/1.0'} });
      if (!response.ok) throw Error('address unavailable');
      const data = await response.json();
      const candidates = data.features || [];
      const p = (candidates.find(f=>f.properties?.street) || candidates[0])?.properties;
      if (!p) throw Error('no address');
      const city = clean(p.city || p.town || p.village);
      const district = clean(p.district || p.suburb || p.locality);
      const street = [clean(p.housenumber), clean(p.street)].filter(Boolean).join(' ');
      return { city, district, address:street ? [street,district,city,clean(p.postcode)].filter(Boolean).join(', ') : '', addressApproximate:true };
    })(),
  ];
  const [route, address] = await Promise.allSettled(jobs);
  return {
    distanceKm: route.status === 'fulfilled' ? route.value : null,
    routeStatus: route.status === 'fulfilled' ? 'ready' : 'unavailable',
    addressStatus: address.status === 'fulfilled' && address.value.address ? 'ready' : 'unavailable',
    ...(address.status === 'fulfilled' ? address.value : { city:'', district:'', address:'' }),
  };
}

export async function locationWebResponse(request, dependencies = {}) {
  const headers = { 'Cache-Control': 'no-store' };
  if (request.method !== 'POST') return Response.json({error:'POST required'}, {status:405,headers:{...headers,Allow:'POST'}});
  try {
    const origin = request.headers.get('origin');
    if (origin && new URL(origin).host !== new URL(request.url).host) return Response.json({error:'Same-origin requests only'},{status:403,headers});
    const body = await request.text();
    if (Buffer.byteLength(body) > 1024) return Response.json({error:'Request too large'},{status:413,headers});
    let point;
    try {point=JSON.parse(body);} catch {return Response.json({error:'Invalid JSON'},{status:400,headers});}
    if (!point || !coordinate(point.latitude,90) || !coordinate(point.longitude,180)) return Response.json({error:'Invalid coordinates'},{status:400,headers});
    const config = dependencies.config || JSON.parse(await readFile(configUrl,'utf8'));
    const result = await resolveVisitLocation(point,config,dependencies.fetcher || fetch);
    return Response.json(result,{headers});
  } catch {return Response.json({error:'Location calculation unavailable'},{status:502,headers});}
}

export async function visitLocationHandler(req,res,next) {
  if (req.url?.split('?')[0] !== '/api/visit-location') return next();
  const send = (status,value) => {res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  if (req.method !== 'POST') return send(405,{error:'POST required'});
  try {
    if(req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return send(403,{error:'Same-origin requests only'});
    let body='';
    for await(const chunk of req) { body+=chunk; if(Buffer.byteLength(body)>1024) return send(413,{error:'Request too large'}); }
    let point;
    try {point=JSON.parse(body);} catch{return send(400,{error:'Invalid JSON'});}
    if(!point || !coordinate(point.latitude,90)||!coordinate(point.longitude,180)) return send(400,{error:'Invalid coordinates'});
    const config=JSON.parse(await readFile(configUrl,'utf8'));
    const result=await resolveVisitLocation(point,config);
    return send(200,result);
  } catch {return send(502,{error:'Location calculation unavailable'});}
}

export function visitLocationPlugin() {
  return { name:'visit-location-api', configureServer(server){server.middlewares.use(visitLocationHandler);}, configurePreviewServer(server){server.middlewares.use(visitLocationHandler);} };
}
