import { Hono } from 'hono';
import { CONTACT, company } from './company';
import { APPLICATION_FORM, application, cookies, imprint, privacy, terms } from './legal';
import { escaped, front, legal, notFound } from './pages';

/**
 * emanet.dev: Emanet's public site. The front page for companies and field agents, and the
 * legal pages written for Turkish law. No cookies, no scripts, no visitor logs.
 */

export const CSP = [
  "default-src 'none'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ');

const HEADERS: Readonly<Record<string, string>> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy': CSP,
};

export function createApp() {
  const app = new Hono<{ Bindings: Env }>();

  app.use('*', async (c, next) => {
    await next();
    c.res = new Response(c.res.body, c.res);
    for (const [name, value] of Object.entries(HEADERS)) c.res.headers.set(name, value);
    if (!c.res.headers.has('Cache-Control')) {
      c.res.headers.set('Cache-Control', 'public, max-age=300');
    }
  });

  // The company details change rarely; pages are cached for five minutes.
  const details = async (env: Env) => {
    const { company: raw, known } = await company(env);
    return { raw, safe: escaped(raw), known };
  };

  app.get('/', async (c) => c.html(front('tr', (await details(c.env)).raw)));
  app.get('/en', async (c) => c.html(front('en', (await details(c.env)).raw)));

  app.get('/gizlilik', async (c) => {
    const d = await details(c.env);
    return c.html(legal(privacy(d.safe), d.raw));
  });
  app.get('/kullanim-sartlari', async (c) => {
    const d = await details(c.env);
    return c.html(legal(terms(d.safe), d.raw));
  });
  app.get('/cerezler', async (c) => c.html(legal(cookies(), (await details(c.env)).raw)));
  app.get('/kvkk-basvuru', async (c) => {
    const d = await details(c.env);
    return c.html(legal(application(d.safe), d.raw));
  });
  app.get('/kunye', async (c) => {
    const d = await details(c.env);
    return c.html(legal(imprint(d.safe, d.known), d.raw));
  });
  app.get('/kvkk-basvuru-formu.txt', (c) =>
    c.body(APPLICATION_FORM, 200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="emanet-kvkk-basvuru-formu.txt"',
    }),
  );

  // Old English-looking addresses people may guess.
  for (const [from, to] of [
    ['/privacy', '/gizlilik'],
    ['/terms', '/kullanim-sartlari'],
    ['/cookies', '/cerezler'],
    ['/imprint', '/kunye'],
  ] as const) {
    app.get(from, (c) => c.redirect(to, 301));
  }

  app.get('/robots.txt', (c) =>
    c.text('User-agent: *\nAllow: /\n\nSitemap: https://emanet.dev/sitemap.xml\n'),
  );
  app.get('/sitemap.xml', (c) => {
    const pages = [
      '/',
      '/en',
      '/gizlilik',
      '/kullanim-sartlari',
      '/cerezler',
      '/kvkk-basvuru',
      '/kunye',
    ];
    return c.body(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
        .map((p) => `<url><loc>https://emanet.dev${p}</loc></url>`)
        .join('')}</urlset>\n`,
      200,
      { 'Content-Type': 'application/xml; charset=utf-8' },
    );
  });
  app.get('/.well-known/security.txt', (c) =>
    c.text(
      `Contact: mailto:${CONTACT}\nExpires: 2027-11-30T00:00:00.000Z\nPreferred-Languages: tr, en\nCanonical: https://emanet.dev/.well-known/security.txt\n`,
    ),
  );
  app.get('/healthz', (c) => {
    c.header('Cache-Control', 'no-store');
    return c.json({ status: 'ok' });
  });

  // Styles and the icon; anything else is not found.
  app.get('*', async (c) => {
    const asset = await c.env.ASSETS.fetch(c.req.raw);
    if (asset.status !== 404) return asset;
    return c.html(notFound((await details(c.env)).raw), 404);
  });

  return app;
}

const app = createApp();
export default { fetch: app.fetch } satisfies ExportedHandler<Env>;
