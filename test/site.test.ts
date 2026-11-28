import { env, exports } from 'cloudflare:workers';
import { afterEach, describe, expect, it } from 'vitest';

const get = (path: string) =>
  exports.default.fetch(new Request(`https://emanet.dev${path}`, { redirect: 'manual' }));
const core = () => env.CORE as unknown as { testSet(value: unknown): Promise<void> };

afterEach(async () => {
  await core().testSet({
    name: '2earl Teknoloji A.Ş.',
    address: 'Maslak Mah. Büyükdere Cad. No: 255, Sarıyer, İstanbul',
    taxOffice: 'Maslak',
    vkn: '0123456789',
    mersis: '0012345678900015',
    kep: '2earl@hs01.kep.tr',
    email: 'iletisim@emanet.dev',
  });
});

describe('emanet.dev', () => {
  it('serves the front page in Turkish, and in English at /en', async () => {
    const tr = await get('/');
    expect(tr.status).toBe(200);
    const html = await tr.text();
    expect(html).toContain('<html lang="tr">');
    expect(html).toContain('https://kurumsal.emanet.dev');
    expect(html).toContain('https://saha.emanet.dev');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('iletisim@emanet.dev');
    const en = await (await get('/en')).text();
    expect(en).toContain('<html lang="en">');
    expect(en).toContain('Sign in to Emanet Kurumsal');
    // A new company has a way in, and existing users are sent to support inside the apps.
    expect(html).toContain('mailto:iletisim@emanet.dev?subject=');
    expect(html).toContain('id="contact"');
    expect(html).toContain('<details><summary>Ne kadar ödüyoruz?</summary>');
    expect(en).toContain('under Support in Emanet Kurumsal or Help in Emanet Saha');
  });

  it('sets no cookie, runs no script and is safe to frame nowhere', async () => {
    for (const path of ['/', '/en', '/gizlilik', '/cerezler']) {
      const response = await get(path);
      expect(response.headers.get('Set-Cookie')).toBeNull();
      expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'none'");
      expect(response.headers.get('Content-Security-Policy')).toContain("frame-ancestors 'none'");
      // Structured data is the only script element, and it is data, never run.
      const html = await response.text();
      expect(
        html.replace(/<script type="application\/ld\+json">[^<]*<\/script>/g, ''),
      ).not.toContain('<script');
    }
  });

  it('describes the organization and its questions for search engines', async () => {
    const html = await (await get('/en')).text();
    const blocks = [
      ...html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g),
    ].map((m) => JSON.parse(m[1] ?? '{}') as Record<string, unknown>);
    expect(blocks.map((b) => b['@type'])).toEqual(['Organization', 'FAQPage']);
    expect(blocks[0]).toMatchObject({ name: 'Emanet', legalName: '2earl Teknoloji A.Ş.' });
    const faq = blocks[1]?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(faq.length).toBeGreaterThan(3);
    expect(html).toContain(faq[0]?.name ?? 'missing');
    await core().testSet(null);
    const pending = await (await get('/')).text();
    expect(pending).toContain('"@type":"FAQPage","url":"https://emanet.dev/","inLanguage":"tr"');
    expect(pending).not.toContain('legalName');
  });

  it('names 2earl’s company in the privacy notice, the terms and the imprint', async () => {
    for (const path of ['/gizlilik', '/kullanim-sartlari', '/kunye', '/kvkk-basvuru']) {
      const html = await (await get(path)).text();
      expect(html, path).toContain('2earl Teknoloji A.Ş.');
    }
    const privacy = await (await get('/gizlilik')).text();
    for (const words of [
      'KVKK',
      'Veri sorumlusu',
      'm. 11',
      'standart sözleşme',
      'otuz gün',
      'Kişisel Verileri Koruma Kurulu',
      // What the field app collects and keeps must be written here too.
      'adli sicil',
      'Verilerim',
      'şifrelenmiş ve erişimi kısıtlanmış',
    ]) {
      expect(privacy).toContain(words);
    }
  });

  it('says plainly when the company details aren’t set yet', async () => {
    await core().testSet(null);
    const html = await (await get('/kunye')).text();
    expect(html).toContain('[2earl şirket unvanı]');
    expect(html).toContain('Şirket bilgileri yakında');
  });

  it('escapes company details', async () => {
    await core().testSet({
      name: '<script>alert(1)</script>',
      address: 'a',
      taxOffice: 'b',
      vkn: 'c',
      mersis: 'd',
      kep: 'e',
      email: 'f',
    });
    for (const path of ['/gizlilik', '/kunye', '/']) {
      const html = await (await get(path)).text();
      expect(html, path).not.toContain('<script>alert');
      expect(html, path).toContain('&lt;script&gt;');
    }
  });

  it('serves the cookie policy, the application form and the small files', async () => {
    expect(await (await get('/cerezler')).text()).toContain('__Host-session');
    const form = await get('/kvkk-basvuru-formu.txt');
    expect(form.headers.get('Content-Disposition')).toContain('attachment');
    expect(await form.text()).toContain('BAŞVURU FORMU');
    expect(await (await get('/robots.txt')).text()).toContain(
      'Sitemap: https://emanet.dev/sitemap.xml',
    );
    expect(await (await get('/sitemap.xml')).text()).toContain(
      '<loc>https://emanet.dev/gizlilik</loc>',
    );
    expect(await (await get('/.well-known/security.txt')).text()).toContain(
      'mailto:iletisim@emanet.dev',
    );
    expect(await (await get('/healthz')).json()).toEqual({ status: 'ok' });
    expect((await get('/site.css')).status).toBe(200);
    expect((await get('/privacy')).headers.get('Location')).toBe('/gizlilik');
    expect((await get('/nope')).status).toBe(404);
  });
});
