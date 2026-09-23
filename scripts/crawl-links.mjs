// Crawl every internal link reachable from the root + 13 property homepages.
// Reports: non-200 pages (with referrers), literal HTML entities in rendered
// text/meta, pages missing <title>/meta description/h1/canonical/JSON-LD,
// <img> without alt, and image URLs that fail to load.
//
// Usage: build, start `next start -p 3100` (the `web-prod` launch config), then
//   node scripts/crawl-links.mjs
// Set UA=facebookexternalhit to audit <head> metadata the way social crawlers
// see it (Googlebot gets streamed metadata in <body>, which this script's
// <head> checks would otherwise flag).
const UA = process.env.UA || 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const BASE = process.env.BASE || 'http://localhost:3100';
const SLUGS = ['underground-colosseum','pompeii-day-trip','rome-vespa','street-food-rome','tuscany-day-trip','private-vatican','golf-cart-rome','cooking-in-rome','rome-pizza-class','tiramisu-class','naples-street-food','amalfi-day-trip','tivoli-day-trip'];
const queue = ['/', ...SLUGS.map((s) => '/' + s)];
const seen = new Set(queue);
const referrers = new Map();
const brand = [], redirects = [], bad = [], entities = [], seo = [], noAlt = [], images = new Map();
const CONC = 8;

function norm(href, from) {
  if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/.test(href)) return null;
  let u;
  try { u = new URL(href, BASE + from); } catch { return null; }
  if (u.origin !== BASE) return null;
  if (/\.(png|jpe?g|svg|ico|xml|txt|webp)$/.test(u.pathname) || u.pathname.startsWith('/_next') || u.pathname.startsWith('/api') ) return null;
  return u.pathname.replace(/\/$/, '') || '/';
}

async function visit(path) {
  let res, html;
  try { res = await fetch(BASE + path, { redirect: 'manual', headers: { 'user-agent': UA } }); html = await res.text(); }
  catch (e) { bad.push({ path, status: 'ERR ' + e.message }); return; }
  if (res.status >= 300 && res.status < 400) { const loc = (res.headers.get('location') || '').split(',')[0].trim(); const p = loc && norm(loc, path); if (p && !seen.has(p)) { seen.add(p); queue.push(p); } redirects.push({ path, loc }); return; }
  if (res.status !== 200) { bad.push({ path, status: res.status }); return; }
  const head = html.split('</head>')[0];
  const body = html.slice(head.length).replace(/<script[\s\S]*?<\/script>/g, '');
  const ttl = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const firstH1 = ((body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '');
  if (/Page Not Found/i.test(ttl) || /page not found/i.test(firstH1) || /been built yet/.test(body)) { bad.push({ path, status: 'SOFT404', why: /been built yet/.test(body) ? 'placeholder' : /page not found/i.test(firstH1) ? 'h1' : 'title' }); return; }
  if (/Street Food Rome/.test(ttl) && /^\/(?!street-food-rome)[a-z-]+-[a-z-]+/.test(path) && SLUGS.includes(path.split('/')[1]) && path.split('/')[1] !== 'street-food-rome') brand.push(path);
  // literal entities: after HTML decoding, the text would show "&apos;" => raw html has "&amp;apos;" etc.
  const ent = [...html.matchAll(/&amp;(apos|rsquo|lsquo|quot|amp|ldquo|rdquo|mdash|ndash|nbsp);/g)].map((m) => m[0]);
  if (ent.length) {
    const ctx = [...html.matchAll(/.{0,50}&amp;(apos|rsquo|lsquo|quot|ldquo|rdquo|mdash|nbsp);.{0,20}/g)].slice(0, 2).map((m) => m[0]);
    entities.push({ path, n: ent.length, ctx });
  }
  const missing = [];
  if (!/<title>[^<]+<\/title>/.test(head)) missing.push('title');
  if (!/<meta name="description" content="[^"]+"/.test(head)) missing.push('description');
  if (!/<link rel="canonical"/.test(head)) missing.push('canonical');
  if (!/<meta property="og:title"/.test(head)) missing.push('og:title');
  if (!/<meta property="og:image"/.test(head)) missing.push('og:image');
  if (!/application\/ld\+json/.test(html)) missing.push('json-ld');
  const h1s = (body.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) missing.push(`h1x${h1s}`);
  const title = (head.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (title.length > 70) missing.push(`title-len${title.length}`);
  if (missing.length) seo.push({ path, missing, title });
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="[^"]+"/.test(tag)) noAlt.push({ path, tag: tag.slice(0, 140) });
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1];
    if (src) { const s = src.replace(/&amp;/g, '&'); if (!images.has(s)) images.set(s, path); }
  }
  for (const m of body.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const p = norm(m[1].replace(/&amp;/g, '&'), path);
    if (!p) continue;
    if (!referrers.has(p)) referrers.set(p, new Set());
    referrers.get(p).add(path);
    if (!seen.has(p)) { seen.add(p); queue.push(p); }
  }
}

let active = 0;
await new Promise((resolve) => {
  const pump = () => {
    if (!queue.length && !active) return resolve();
    while (active < CONC && queue.length) {
      const p = queue.shift(); active++;
      visit(p).finally(() => { active--; pump(); });
    }
  };
  pump();
});

// image checks
const imgBad = [];
const imgList = [...images.entries()];
for (let i = 0; i < imgList.length; i += 16) {
  await Promise.all(imgList.slice(i, i + 16).map(async ([src, page]) => {
    const url = src.startsWith('http') ? src : BASE + src;
    try { const r = await fetch(url, { method: 'GET' }); if (!r.ok) imgBad.push({ src, page, status: r.status }); await r.arrayBuffer(); }
    catch (e) { imgBad.push({ src, page, status: 'ERR' }); }
  }));
}

console.log(`PAGES CRAWLED: ${seen.size}  REDIRECTS: ${redirects.length}`); for (const r of redirects.filter((r) => r.loc.startsWith('/'))) console.log('  REDIR', r.path, '->', r.loc);
console.log(`\n== NON-200 (${bad.length})`);
for (const b of bad) console.log(b.status, b.why || '', b.path, '<-', [...(referrers.get(b.path) || [])].slice(0, 3).join(', '));
console.log(`\n== LITERAL ENTITIES (${entities.length})`);
for (const e of entities) console.log(e.path, e.n, JSON.stringify(e.ctx));
console.log(`\n== IMG NO ALT (${noAlt.length})`);
for (const n of noAlt.slice(0, 20)) console.log(n.path, n.tag);
console.log(`\n== BROKEN IMAGES (${imgBad.length} of ${images.size})`);
for (const b of imgBad.slice(0, 40)) console.log(b.status, b.src.slice(0, 120), '@', b.page);
const agg = {};
for (const s of seo) for (const m of s.missing) agg[m.replace(/\d+$/, '')] = (agg[m.replace(/\d+$/, '')] || 0) + 1;
console.log(`\n== SEO GAPS (pages with gaps: ${seo.length})`, JSON.stringify(agg));
for (const s of seo.slice(0, 400)) console.log(s.path, s.missing.join(','), '|', s.title.slice(0, 80));
