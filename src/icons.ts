/**
 * The icon set, shared by the Emanet apps: drawn here, 24 by 24, in the text's colour. Inline SVG,
 * so no request is made and the page's content security policy stays as it is. An icon never
 * carries meaning alone: it sits beside its label and is hidden from screen readers.
 */

const PATHS = {
  today:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8.5 15.5l2.2 2.2 4.8-4.8"/>',
  reviews:
    '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 13.5l2 2 4-4.5"/>',
  onboarding:
    '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2.5 21h19M8 7.5h4M8 11.5h4M8 15.5h4"/>',
  partners: '<path d="M3 10l9-6 9 6M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 21h18M3 10h18"/>',
  agents: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16.5 11.5l2 2 3.5-4"/>',
  money:
    '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',
  settings:
    '<path d="M4 6h9M19 6h1M4 12h3M13 12h7M4 18h11M20 18h0"/><circle cx="16" cy="6" r="2.2"/><circle cx="10" cy="12" r="2.2"/><circle cx="18" cy="18" r="2.2"/>',
  audit: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  privacy: '<path d="M12 3l8 3v6c0 4.6-3.2 8-8 9-4.8-1-8-4.4-8-9V6zM9 12l2.2 2.2L15.5 10"/>',
  system: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  guide:
    '<path d="M12 6.5C10 5 7 4.5 4 4.5v14c3 0 6 .5 8 2 2-1.5 5-2 8-2v-14c-3 0-6 .5-8 2zM12 6.5v14"/>',
  car: '<path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v5h-1.5M4.5 18H3v-5h18M9.5 18h5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  camera:
    '<path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
  phone:
    '<path d="M6 3h3l2 5-2.5 1.6a11 11 0 0 0 5.9 5.9L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<path d="M5 12.5l5 5 9-10.5"/>',
  alert: '<path d="M12 4l9 16H3zM12 10v4.5M12 17.5h.01"/>',
  file: '<path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16.5 6.5l3 3M14 9l2 2"/>',
  plug: '<path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 0 1-10 0zM12 17v4"/>',
  chart: '<path d="M4 20V4M4 20h16M8.5 16v-4M12.5 16V8M16.5 16v-6"/>',
  invoice: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7.5l9 6 9-6"/>',
  wallet: '<path d="M18 9V5H5a2 2 0 0 0 0 4h15v10H5a2 2 0 0 1-2-2V7M16.5 14h.01"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
  scale:
    '<path d="M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.4 3.4 0 0 0 6 0zM19 7l-3 7a3.4 3.4 0 0 0 6 0z"/>',
  home: '<path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  undo: '<path d="M9 6L4 11l5 5M4 11h10a5 5 0 0 1 0 10h-2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
} as const;

export type IconName = keyof typeof PATHS;

export function icon(name: IconName, className = ''): string {
  return `<svg class="icon${className ? ` ${className}` : ''}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;
}

/**
 * A small drawn scene for an empty page or a welcome: a number plate, a document, a shield. Two
 * tones from the theme, so it follows light and dark.
 */
export function scene(kind: 'plate' | 'documents' | 'shield' | 'inbox' | 'road'): string {
  const open =
    '<svg class="scene" viewBox="0 0 240 140" role="img" aria-hidden="true" focusable="false">';
  const ground = '<ellipse cx="120" cy="124" rx="96" ry="9" fill="var(--tint)"/>';
  const bodies: Record<typeof kind, string> = {
    plate: `${ground}<rect x="42" y="44" width="156" height="52" rx="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="4"/><rect x="44" y="46" width="24" height="48" rx="5" fill="var(--plate-blue)"/><rect x="82" y="62" width="22" height="16" rx="3" fill="var(--ink)"/><rect x="112" y="62" width="34" height="16" rx="3" fill="var(--ink)"/><rect x="154" y="62" width="30" height="16" rx="3" fill="var(--ink)"/><circle cx="196" cy="34" r="16" fill="var(--good)"/><path d="M188 34l6 6 10-11" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    documents: `${ground}<rect x="62" y="26" width="84" height="92" rx="8" fill="var(--sunken)" stroke="var(--rule)" stroke-width="3" transform="rotate(-6 104 72)"/><rect x="92" y="22" width="84" height="96" rx="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><path d="M106 46h56M106 62h56M106 78h36" stroke="var(--muted)" stroke-width="4" stroke-linecap="round"/><circle cx="154" cy="98" r="11" fill="none" stroke="var(--brand)" stroke-width="3"/><path d="M149 98l4 4 6-7" fill="none" stroke="var(--brand)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    shield: `${ground}<path d="M120 18l44 16v32c0 26-18 44-44 52-26-8-44-26-44-52V34z" fill="var(--paper)" stroke="var(--action)" stroke-width="4" stroke-linejoin="round"/><path d="M102 68l13 13 24-28" fill="none" stroke="var(--action)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
    inbox: `${ground}<path d="M52 70l20-38h96l20 38v34a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8z" fill="var(--paper)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/><path d="M52 70h42a26 26 0 0 0 52 0h42" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/><path d="M108 48l9 9 16-18" fill="none" stroke="var(--good)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    road: `${ground}<path d="M20 108c40-30 60-30 100-30s60 0 100-30" fill="none" stroke="var(--rule)" stroke-width="22" stroke-linecap="round"/><path d="M20 108c40-30 60-30 100-30s60 0 100-30" fill="none" stroke="var(--paper)" stroke-width="3" stroke-dasharray="10 12" stroke-linecap="round"/><path d="M150 62s16-14 16-26a16 16 0 0 0-32 0c0 12 16 26 16 26z" fill="var(--brand)"/><circle cx="150" cy="36" r="6" fill="var(--paper)"/><rect x="52" y="78" width="46" height="18" rx="6" fill="var(--action)"/><rect x="60" y="68" width="28" height="14" rx="5" fill="var(--action)"/><circle cx="62" cy="98" r="6" fill="var(--ink)"/><circle cx="88" cy="98" r="6" fill="var(--ink)"/>`,
  };
  return `${open}${bodies[kind]}</svg>`;
}
