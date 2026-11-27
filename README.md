# emanet-web

**emanet.dev**, Emanet's public site: the front page for companies (banks, asset management
companies) and field agents, and the legal pages, written for Turkish law.

| Path | What |
|---|---|
| `/`, `/en` | Front page, Turkish and English |
| `/gizlilik` | KVKK aydınlatma metni |
| `/kullanim-sartlari` | Kullanım şartları |
| `/cerezler` | Çerez politikası (the apps' strictly necessary cookies; emanet.dev sets none) |
| `/kvkk-basvuru`, `/kvkk-basvuru-formu.txt` | How to use KVKK m. 11 rights, and a form |
| `/kunye` | Company details |

The company named as data controller comes from emanet-core's `PublicApi` (set by staff in Emanet
Merkez → Settings). The apps (kurumsal, merkez, saha .emanet.dev) link here from their footers.

No cookies, no scripts, no visitor logs (`observability` off). Sign-in stays at login.2earl.com.

The legal texts (`src/legal.ts`) are drafts for a lawyer's review. Change `UPDATED` with every
change.

## Development

```sh
pnpm install
pnpm test        # Workers runtime, with a stand-in for emanet-core
pnpm lint
pnpm typecheck
```

## Deployment

`.github/workflows/deploy.yml` deploys `main` after the owner approves (environment
`production`, secret `CLOUDFLARE_API_TOKEN`). After the first deploy, set `web_live = true` in
2earl/emanet-core `infra/variables.tf` so emanet.dev points here.
