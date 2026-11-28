import { CONTACT, type Company } from './company';
import { UPDATED, type Block, type LegalPage } from './legal';
import { icon, scene, type IconName } from './icons';

const HOW_ICONS: IconName[] = ['plus', 'search', 'phone', 'check'];
const TRUST_ICONS: IconName[] = ['privacy', 'agents', 'lock'];

/**
 * emanet.dev's pages, server-rendered, no scripts. Turkish first: Emanet works in Turkey under
 * Turkish law. The front page also has an English version at /en; the legal pages are Turkish,
 * the text that counts.
 */

export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Company details go into pages that are otherwise trusted HTML: escape them once, here. */
export const escaped = (c: Company): Company => ({
  name: esc(c.name),
  address: esc(c.address),
  taxOffice: esc(c.taxOffice),
  vkn: esc(c.vkn),
  mersis: esc(c.mersis),
  kep: esc(c.kep),
  email: esc(c.email),
});

export type Lang = 'tr' | 'en';

const KURUMSAL = 'https://kurumsal.emanet.dev';
const SAHA = 'https://saha.emanet.dev';

/** The Emanet mark: the 2earl hands holding something entrusted to them. */
export const MARK =
  '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
  '<path fill="#F15A24" d="M0 0 50 50V100L0 50Z"/>' +
  '<path fill="#F7931E" d="M100 0 50 50V100L100 50Z"/>' +
  '<path fill="#ED1C24" d="M0 50 50 100H15A15 15 0 0 1 0 85Z"/>' +
  '<path fill="#FBB03B" d="M100 50V85A15 15 0 0 1 85 100H50Z"/>' +
  '<path fill="#ED1C24" d="M50 7 66 23 50 39 34 23Z"/>' +
  '</svg>';

/**
 * JSON for a `<script type="application/ld+json">`: `<`, `>` and `&` escaped so no text in it
 * can close the element. It is data, never run, so the site's CSP (no scripts) still holds.
 */
export function jsonLd(item: Record<string, unknown>): string {
  return JSON.stringify(item)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/** Who runs the site, and its questions, for search engines (schema.org). */
function frontData(lang: Lang, f: Front, company: Company): Record<string, unknown>[] {
  const url = `https://emanet.dev${lang === 'tr' ? '/' : '/en'}`;
  // The legal name only once staff have entered it, never the placeholder.
  const legalName = company.name.startsWith('[') ? {} : { legalName: company.name };
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Emanet',
      ...legalName,
      url: 'https://emanet.dev/',
      logo: 'https://emanet.dev/icon.svg',
      email: CONTACT,
      parentOrganization: { '@type': 'Organization', name: '2earl', url: 'https://2earl.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      url,
      inLanguage: lang,
      mainEntity: f.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];
}

interface Meta {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  /** The same page in the other language, if there is one. */
  alternate?: { lang: Lang; path: string };
  /** Structured data for search engines (schema.org), written as JSON-LD. */
  jsonLd?: Record<string, unknown>[];
}

function layout(meta: Meta, body: string, company: Company): string {
  const t = meta.lang === 'tr';
  const url = `https://emanet.dev${meta.path}`;
  const alt = meta.alternate;
  return `<!doctype html>
<html lang="${meta.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${url}">
${alt ? `<link rel="alternate" hreflang="${meta.lang}" href="${url}"><link rel="alternate" hreflang="${alt.lang}" href="https://emanet.dev${alt.path}">` : ''}
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${t ? 'tr_TR' : 'en_GB'}">
<meta name="theme-color" content="#ffffff">
<link rel="stylesheet" href="/site.css">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
${(meta.jsonLd ?? []).map((item) => `<script type="application/ld+json">${jsonLd(item)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">${t ? 'İçeriğe geç' : 'Skip to content'}</a>
<header class="top">
  <a class="brand" href="${t ? '/' : '/en'}">${MARK}<span>Emanet</span></a>
  <nav aria-label="${t ? 'Uygulamalar' : 'Apps'}">
    <a href="${KURUMSAL}">${t ? 'Kurumlar' : 'Companies'}</a>
    <a href="${SAHA}">${t ? 'Saha görevlileri' : 'Field agents'}</a>
    <a href="${t ? '/' : '/en'}#contact">${t ? 'İletişim' : 'Contact'}</a>
    ${alt ? `<a href="${alt.path}" hreflang="${alt.lang}" lang="${alt.lang}">${alt.lang === 'en' ? 'English' : 'Türkçe'}</a>` : ''}
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div>
    <p class="brand small">${MARK}<span>Emanet</span></p>
    <p>${t ? 'Emanet, 2earl’ün bir hizmetidir. Kamu kurumu değildir; icra işlemi yapmaz.' : 'Emanet is a 2earl service. It is not a public authority and takes no enforcement action.'}</p>
    <p>${esc(company.name)} · <a href="mailto:${CONTACT}">${CONTACT}</a></p>
  </div>
  <nav aria-label="${t ? 'Yasal' : 'Legal'}">
    <a href="/gizlilik">${t ? 'Aydınlatma metni' : 'Privacy notice (Turkish)'}</a>
    <a href="/kullanim-sartlari">${t ? 'Kullanım şartları' : 'Terms of use (Turkish)'}</a>
    <a href="/cerezler">${t ? 'Çerez politikası' : 'Cookie policy (Turkish)'}</a>
    <a href="/kvkk-basvuru">${t ? 'KVKK başvurusu' : 'Data protection requests (Turkish)'}</a>
    <a href="/kunye">${t ? 'Künye' : 'Company details (Turkish)'}</a>
  </nav>
</footer>
</body>
</html>`;
}

// ---- Front page -----------------------------------------------------------------------------------

interface Front {
  title: string;
  description: string;
  h1: string;
  lede: string;
  forCompanies: string;
  forAgents: string;
  example: string;
  steps: [string, string, string][];
  feeNote: string;
  how: string;
  howSteps: [string, string][];
  companiesH: string;
  companies: string[];
  companiesCta: string;
  agentsH: string;
  agents: string[];
  agentsCta: string;
  rulesH: string;
  rules: string[];
  devH: string;
  devText: string;
  devCta: string;
  trust: [string, string][];
  contact: string;
  newCompany: string;
  newCompanyCta: string;
  newCompanySubject: string;
  existing: string;
  faqH: string;
  faq: [string, string][];
  contactNav: string;
}

const FRONT: Record<Lang, Front> = {
  tr: {
    title: 'Emanet: yakalama şerhli araçlar, kolluk eliyle yediemine',
    description:
      'Emanet, alacaklıların yakalama şerhli araçlarını doğrulanmış saha görevlileriyle bulur, kolluğa bildirir ve yediemine teslimi belgeler. Ücret yalnızca teslimde.',
    h1: 'Yakalama şerhli aracınız, yediemine kadar.',
    lede: 'Alacaklılar araçlarını ekler. Kimliği doğrulanmış saha görevlileri bu araçları sokakta arar; gördüklerinde 112’yi arar. Kolluk aracı yakalar ve yediemine teslim eder. Siz her adımı belgeleriyle görürsünüz ve yalnızca teslim edilen araç için ödersiniz.',
    forCompanies: 'Kurumlar için giriş',
    forAgents: 'Saha görevlisi olun',
    example: 'Örnek bir dosya',
    steps: [
      ['09:12', 'Dosya eklendi', 'İcra dairesi ve dosya numarasıyla'],
      ['14:03', 'Araç görüldü', 'Saha görevlisi fotoğrafladı, 112’yi aradı'],
      ['14:41', 'Kolluk yakaladı', 'Tutanak düzenlendi'],
      ['16:20', 'Yedieminde', 'Teslim tutanağı dosyada'],
    ],
    feeNote: 'Ücret yalnızca bu son adımda.',
    how: 'Nasıl işler',
    howSteps: [
      [
        'Aracı ekleyin',
        'Form, CSV dosyası veya API ile. Plaka, şasi numarası, icra dairesi ve dosya numarası; aracın aranabileceği yerler.',
      ],
      [
        'Saha görevlisi arar',
        'Görevli aracı üstlenir, adresleri yalnızca o süre boyunca görür. Borçlunun adını ve borcunu hiç görmez.',
      ],
      [
        'Görünce 112',
        'Görevli aracın fotoğrafını konumuyla gönderir ve kolluğu arar. Araca dokunmaz, kimseyi beklemez.',
      ],
      [
        'Kolluk teslim eder',
        'Kolluk aracı yakalar ve yediemine teslim eder. Tutanaklar ve fotoğraflar dosyanıza, bildirim sisteminize gelir.',
      ],
    ],
    companiesH: 'Bankalar ve varlık yönetim şirketleri',
    companies: [
      'Teslim olmayan araç için ücret yok; ücret aracı eklediğiniz anda sabitlenir.',
      'Form, CSV, API ve webhook; her dosyanın zaman çizelgesi ve teslim belgeleri.',
      'Ekibiniz 2earl hesaplarıyla, iki adımlı doğrulamayla ve rollerle girer.',
      'Veriler AB’de, KVKK’ya ve bankaların destek hizmeti kurallarına uygun sözleşmeyle.',
    ],
    companiesCta: 'Emanet Kurumsal’a giriş yapın',
    agentsH: 'Saha görevlileri',
    agents: [
      'Kendi saatinizde, kendi şehrinizde araç arayın.',
      'Araç yediemine ulaşınca ödemeniz kendi adınıza IBAN’a gelir.',
      'Başlamadan önce kimliğiniz ve banka hesabınız doğrulanır.',
    ],
    agentsCta: 'Emanet Saha’ya başvurun',
    devH: 'Sistemlerinizle konuşur',
    devText:
      'Dosyaları API ile ekleyin, teslimleri webhook ile alın. OpenAPI belgesi Postman’e veya kod üretecinize doğrudan aktarılır.',
    devCta: 'API başvurusu',
    trust: [
      ['Yalnızca kolluk yakalar', 'Görevli araca dokunmaz; aracı görür ve 112’yi arar.'],
      [
        'Kimliği doğrulanmış görevliler',
        'E-posta, T.C. kimlik no, görüntülü görüşme ve kendi adına IBAN.',
      ],
      [
        'Veriler AB’de, KVKK’ya uygun',
        'Adresler yalnızca arama süresince görünür, dosya kapanınca silinir.',
      ],
    ],
    rulesH: 'Kurallarımız',
    rules: [
      'Kişi değil araç aranır. Kimse takip edilmez.',
      'Araca dokunulmaz, çekilmez, taşınmaz. Yakalama ve teslim yalnızca kolluğun işidir.',
      'Borç konuşulmaz, para alınmaz.',
      'Adresler yalnızca aracı arayan görevliye, yalnızca o süre için gösterilir; her görüntüleme kaydedilir.',
      'Emanet bir kamu kurumu değildir ve icra işlemi yapmaz.',
    ],
    contact: 'Kurumunuzu Emanet’e almak veya sorularınız için',
    newCompany:
      'Emanet Kurumsal’a davetle girilir. Kurumunuzu tanıtın; sözleşmeyi ve fiyat listesini birlikte hazırlayalım, ekibinize davet gönderelim.',
    newCompanyCta: 'Bize yazın',
    newCompanySubject: 'Emanet Kurumsal hakkında',
    existing:
      'Zaten kullanıyor musunuz? Sorularınızı uygulamanın içinden, Emanet Kurumsal’da “Destek”, Emanet Saha’da “Yardım” bölümünden gönderin; yanıtı orada görürsünüz.',
    faqH: 'Sık sorulanlar',
    faq: [
      [
        'Ne kadar ödüyoruz?',
        'Yalnızca yediemine teslim edilen araç için, sözleşmenizdeki fiyat listesine göre bir ücret. Ücret aracı eklediğiniz anda sabitlenir; bulunmayan, geri çektiğiniz ya da süresi dolan dosya için ücret yoktur.',
      ],
      [
        'Aracı kim yakalıyor?',
        'Yalnızca kolluk. Saha görevlisi aracı görür, fotoğraflar ve 112’yi arar. Araca dokunmaz, çekmez, borçluyla konuşmaz.',
      ],
      [
        'Görevliler borçluyu görüyor mu?',
        'Hayır. Görevli plakayı, aracı ve aranacak adresleri yalnızca aracı üstlendiği süre boyunca görür. Borçlunun adını ve borcunu hiç görmez; her adres görüntülemesi kaydedilir.',
      ],
      [
        'Kimler saha görevlisi olabilir?',
        '18 yaşını doldurmuş, T.C. kimlik numarası, kendi adına IBAN’ı ve e-Devlet’ten adli sicil kaydı ve nüfus kayıt örneği olan herkes başvurabilir. Başlamadan önce kısa bir görüntülü görüşme yapılır.',
      ],
      [
        'Görevliye ödeme ne zaman yapılır?',
        'Araç yediemine ulaşıp alacaklı ödemesini yaptıktan sonra, görevlinin kendi adına IBAN’ına. Her ödemenin özeti Emanet Saha’da görünür ve indirilebilir.',
      ],
      [
        'Sistemlerimizle bağlantı kurabilir miyiz?',
        'Evet. Dosyaları API veya CSV ile ekleyebilir, teslim ve diğer olayları webhook ile alabilirsiniz. Belgeler herkese açıktır.',
      ],
    ],
    contactNav: 'İletişim',
  },
  en: {
    title: 'Emanet: vehicles under seizure orders, into custody by the police',
    description:
      'Emanet helps creditors in Turkey find vehicles under seizure orders with verified field agents, reports them to the police and documents their delivery into custody. You pay only on delivery.',
    h1: 'Your vehicle under a seizure order, all the way into custody.',
    lede: 'Creditors add their vehicles. Verified field agents look for them on the street and call 112 when they see one. The police take the vehicle into a custodian car park. You see every step with its documents, and you pay only for vehicles that reach custody.',
    forCompanies: 'Sign in for companies',
    forAgents: 'Become a field agent',
    example: 'An example case',
    steps: [
      ['09:12', 'Case added', 'With the enforcement office and file number'],
      ['14:03', 'Vehicle seen', 'The agent took a photo and called 112'],
      ['14:41', 'Police seized it', 'A report was made'],
      ['16:20', 'In custody', 'The custodian’s receipt is on the case'],
    ],
    feeNote: 'The fee is due only at this last step.',
    how: 'How it works',
    howSteps: [
      [
        'Add the vehicle',
        'By form, CSV file or API: plate, chassis number, enforcement office and file number, and where it might be.',
      ],
      [
        'An agent looks',
        'The agent takes the vehicle and sees its addresses only while they look. They never see the debtor’s name or debt.',
      ],
      [
        'Seen, then 112',
        'The agent sends a photo with its location and calls the police. They don’t touch the vehicle or wait for anyone.',
      ],
      [
        'The police deliver',
        'The police seize the vehicle and take it to a custodian car park. Reports and photos come to your case and your systems.',
      ],
    ],
    companiesH: 'Banks and asset management companies',
    companies: [
      'No fee for vehicles that aren’t delivered; the fee is fixed when you add the vehicle.',
      'Form, CSV, API and webhooks; a timeline and custody documents for every case.',
      'Your team signs in with 2earl accounts, two-step verification and roles.',
      'Data in the EU, under an agreement written for KVKK and banks’ outsourcing rules.',
    ],
    companiesCta: 'Sign in to Emanet Kurumsal',
    agentsH: 'Field agents',
    agents: [
      'Look for vehicles in your own city, on your own time.',
      'When a vehicle reaches custody, you’re paid to an IBAN in your own name.',
      'Your identity and bank account are checked before you start.',
    ],
    agentsCta: 'Apply to Emanet Saha',
    devH: 'It talks to your systems',
    devText:
      'Add cases through the API and hear about deliveries by webhook. The OpenAPI document imports straight into Postman or your code generator.',
    devCta: 'API reference',
    trust: [
      ['Only the police seize', 'An agent never touches the vehicle; they see it and call 112.'],
      [
        'Agents with a verified identity',
        'Email, national ID number, a video call, and an IBAN in their own name.',
      ],
      [
        'Data in the EU, under KVKK',
        'Addresses show only during the search and are erased when the case closes.',
      ],
    ],
    rulesH: 'Our rules',
    rules: [
      'We look for vehicles, not people. Nobody is followed.',
      'Nobody touches, tows or moves a vehicle. Seizure and delivery are for the police alone.',
      'No talk of debts, no money taken.',
      'Addresses are shown only to the agent looking, only for that time; every view is recorded.',
      'Emanet is not a public authority and takes no enforcement action.',
    ],
    contact: 'To bring your company to Emanet, or with any question',
    newCompany:
      'Emanet Kurumsal is by invitation. Tell us about your company; we prepare the agreement and the price list with you and invite your team.',
    newCompanyCta: 'Write to us',
    newCompanySubject: 'About Emanet Kurumsal',
    existing:
      'Already using Emanet? Ask from inside the app, under Support in Emanet Kurumsal or Help in Emanet Saha; the answer appears there.',
    faqH: 'Questions',
    faq: [
      [
        'What do we pay?',
        'A fee only for vehicles that reach a custodian car park, by the price list in your agreement. The fee is fixed when you add the vehicle; nothing is due for a case that is not found, that you withdraw or that expires.',
      ],
      [
        'Who seizes the vehicle?',
        'Only the police. A field agent sees the vehicle, takes a photo and calls 112. They never touch or tow it and never speak to the debtor.',
      ],
      [
        'Do agents see the debtor?',
        'No. An agent sees the plate, the vehicle and the places to look, only while they hold the vehicle. They never see the debtor’s name or debt, and every look at an address is recorded.',
      ],
      [
        'Who can become a field agent?',
        'Anyone 18 or older with a Turkish ID number, an IBAN in their own name, and a criminal record and a population register extract from e-Devlet. There is a short video call before they start.',
      ],
      [
        'When is an agent paid?',
        'After the vehicle reaches custody and the creditor has paid, to an IBAN in the agent’s own name. Each payment’s statement is in Emanet Saha and can be downloaded.',
      ],
      [
        'Can it connect to our systems?',
        'Yes. Add cases by API or CSV, and receive deliveries and other events by webhook. The reference is public.',
      ],
    ],
    contactNav: 'Contact',
  },
};

export function front(lang: Lang, company: Company): string {
  const f = FRONT[lang];
  const body = `
<section class="hero">
  <div class="hero-text">
    <h1>${f.h1}</h1>
    <p class="lede">${f.lede}</p>
    <p class="ctas">
      <a class="button" href="${KURUMSAL}">${f.forCompanies}</a>
      <a class="button ghost" href="${SAHA}">${f.forAgents}</a>
    </p>
  </div>
  <figure class="case" aria-label="${f.example}">
    <figcaption>${f.example}</figcaption>
    <p class="plate" translate="no"><span>34 EMN 026</span></p>
    <ol class="journey">
      ${f.steps
        .map(
          ([time, what, detail], i) =>
            `<li${i === f.steps.length - 1 ? ' class="done"' : ''}><time>${time}</time><strong>${what}</strong><span>${detail}</span></li>`,
        )
        .join('')}
    </ol>
    <p class="fee">${f.feeNote}</p>
  </figure>
</section>

<section class="trust">
  ${f.trust.map(([h, p], i) => `<div>${icon(TRUST_ICONS[i] ?? 'check')}<div><strong>${h}</strong><span>${p}</span></div></div>`).join('')}
</section>

<section class="how">
  <h2>${f.how}</h2>
  <ol>
    ${f.howSteps.map(([h, p], i) => `<li><span class="how-icon">${icon(HOW_ICONS[i] ?? 'check')}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}
  </ol>
</section>

<section class="audiences">
  <div>
    <span class="aud-icon">${icon('partners')}</span>
    <h2>${f.companiesH}</h2>
    <ul>${f.companies.map((x) => `<li>${x}</li>`).join('')}</ul>
    <p><a class="button" href="${KURUMSAL}">${f.companiesCta}</a></p>
  </div>
  <div>
    <span class="aud-icon">${icon('agents')}</span>
    <h2>${f.agentsH}</h2>
    <ul>${f.agents.map((x) => `<li>${x}</li>`).join('')}</ul>
    <p><a class="button ghost" href="${SAHA}">${f.agentsCta}</a></p>
  </div>
</section>

<section class="dev">
  <div>
    <h2>${icon('code')} ${f.devH}</h2>
    <p>${f.devText}</p>
    <p><a class="button ghost" href="${KURUMSAL}/docs/api">${f.devCta}</a></p>
  </div>
  <pre translate="no" aria-hidden="true">POST /api/v1/cases
{
  "external_ref": "K-2026-0001",
  "plate": "34 EMN 026",
  "vin": "VF1RJA00061234567",
  "icra_file_no": "2026/12345",
  "legal_basis": "rehin"
}

→ webhook  case.delivered</pre>
</section>

<section class="rules">
  <div class="rules-head">${scene('shield')}<h2>${f.rulesH}</h2></div>
  <ul>${f.rules.map((x) => `<li>${x}</li>`).join('')}</ul>
</section>

<section class="faq">
  <h2>${f.faqH}</h2>
  ${f.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
</section>

<section class="contact" id="contact">
  <h2>${f.contactNav}</h2>
  <div class="contact-grid">
    <div>
      <h3>${f.companiesH}</h3>
      <p>${f.newCompany}</p>
      <p><a class="button" href="mailto:${CONTACT}?subject=${encodeURIComponent(f.newCompanySubject)}">${f.newCompanyCta}</a></p>
    </div>
    <div>
      <p>${f.existing}</p>
      <p>${f.contact}: <a href="mailto:${CONTACT}">${CONTACT}</a></p>
    </div>
  </div>
</section>`;
  return layout(
    {
      title: f.title,
      description: f.description,
      path: lang === 'tr' ? '/' : '/en',
      lang,
      alternate: lang === 'tr' ? { lang: 'en', path: '/en' } : { lang: 'tr', path: '/' },
      jsonLd: frontData(lang, f, company),
    },
    body,
    company,
  );
}

// ---- Legal pages ----------------------------------------------------------------------------------

/** A legal page. Its text is trusted HTML written in src/legal.ts, with company values escaped. */
export function legal(page: LegalPage, company: Company): string {
  const paragraphs = (list: string[] | undefined) =>
    (list ?? []).map((p) => `<p>${p}</p>`).join('');
  const table = (b: Block) => {
    if (!b.table) return '';
    // A table without headings is a list of facts.
    if (b.table.head.every((h) => h === '')) {
      return `<dl class="facts">${b.table.rows.map(([k = '', v = '']) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
    }
    const head = b.table.head.map((h) => `<th scope="col">${h}</th>`).join('');
    const rows = b.table.rows
      .map(
        (r) =>
          `<tr>${r.map((cell, i) => (i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`)).join('')}</tr>`,
      )
      .join('');
    return `<div class="table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  };
  // A section with a table: the table, then its notes. Otherwise paragraphs, then the list.
  const sections = page.blocks
    .map(
      (b, i) =>
        `<section id="b${String(i)}"><h2>${b.h}</h2>${
          b.table
            ? table(b) + paragraphs(b.p)
            : paragraphs(b.p) +
              (b.list ? `<ul>${b.list.map((x) => `<li>${x}</li>`).join('')}</ul>` : '')
        }</section>`,
    )
    .join('');
  const toc =
    page.blocks.length > 4
      ? `<nav class="toc" aria-label="İçindekiler"><ol>${page.blocks
          .map((b, i) => `<li><a href="#b${String(i)}">${b.h.replace(/^\d+\.\s*/, '')}</a></li>`)
          .join('')}</ol></nav>`
      : '';
  return layout(
    {
      title: `${page.title} · Emanet`,
      description: page.lede.replace(/<[^>]+>/g, '').slice(0, 160),
      path: page.path,
      lang: 'tr',
    },
    `<article class="doc">
      <h1>${page.title}</h1>
      <p class="lede">${page.lede}</p>
      <p class="updated">Son güncelleme: ${UPDATED}</p>
      ${toc}
      ${sections}
    </article>`,
    company,
  );
}

export function notFound(company: Company): string {
  return layout(
    { title: 'Sayfa bulunamadı · Emanet', description: 'Bu sayfa yok.', path: '/404', lang: 'tr' },
    `<article class="doc"><h1>Bu sayfa yok.</h1><p class="lede"><a href="/">Ana sayfaya dönün</a> ya da <a href="mailto:${CONTACT}">${CONTACT}</a> adresine yazın.</p></article>`,
    company,
  );
}
