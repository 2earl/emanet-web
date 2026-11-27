import { cloudflareTest } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';

/**
 * The site runs with a stand-in for emanet-core's PublicApi: 2earl's company details, or none
 * after testSet(null).
 */
const CORE = `
import { WorkerEntrypoint } from 'cloudflare:workers';
let company = { name: '2earl Teknoloji A.Ş.', address: 'Maslak Mah. Büyükdere Cad. No: 255, Sarıyer, İstanbul',
  taxOffice: 'Maslak', vkn: '0123456789', mersis: '0012345678900015', kep: '2earl@hs01.kep.tr', email: 'iletisim@emanet.dev' };
export class PublicApi extends WorkerEntrypoint {
  async company() { return { ok: true, value: company }; }
  async testSet(value) { company = value; }
}
export default { fetch() { return new Response(null, { status: 404 }); } };
`;

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: './wrangler.jsonc' },
      miniflare: {
        workers: [
          { name: 'emanet-core', modules: true, compatibilityDate: '2026-11-01', script: CORE },
        ],
      },
    }),
  ],
});
