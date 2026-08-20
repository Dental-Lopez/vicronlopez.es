/**
 * Single source of truth for the business's atomic identity data (NAP, geo,
 * hours, currency, canonical URL). Everything that needs these facts - JSON-LD
 * schema, tel/mailto/WhatsApp/maps links, footer/contact NAP - imports from
 * here so the whole site speaks the same language. Localized marketing prose
 * stays in i18n; only atomic data lives here.
 *
 * NOTE: `url` is the canonical host (with www). It must match
 * `prerender.origin` in svelte.config.js.
 */
export const business = {
  url: 'https://www.vicronlopez.es',
  name: 'Vicron Lopez',
  /** Square brand logo, used as the Organization logo in JSON-LD. */
  logoPath: '/og/logo-512.png',
  /** 1200x630 social card served as the default og:image. */
  ogImage: { path: '/og/og-default.png', width: 1200, height: 630, type: 'image/png' },
  email: 'info@vicronlopez.es',
  phone: { e164: '+34698133249', display: '+34 698 13 32 49' },
  whatsapp: '34698133249',
  address: { locality: 'Ourense', region: 'Galicia', country: 'ES' },
  geo: { latitude: 42.3383925, longitude: -7.8842851 },
  openingHours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], opens: '09:00', closes: '19:00' },
  ],
  priceRange: '€€',
  currency: 'EUR',
  /** ISO date of the last legal-document revision (used for schema dateModified). */
  legalUpdated: '2025-01-01',
  sameAs: [] as string[],
} as const;

/** Resolves a site-relative path to an absolute URL on the canonical host. */
export const absoluteUrl = (path: string): string =>
  `${business.url}${path.startsWith('/') ? path : `/${path}`}`;

export const telHref = `tel:${business.phone.e164}`;
export const mailtoHref = `mailto:${business.email}`;
export const whatsappUrl = `https://wa.me/${business.whatsapp}`;

const mapsQuery = `${business.address.locality}, ${business.address.region}, Spain`;
/** Embeddable Google Maps iframe URL centered on the business locality. */
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
/** Full Google Maps place URL (opens in a new tab). */
export const mapsUrl = `https://www.google.com/maps/place/Ourense,+Province+of+Ourense/@${business.geo.latitude},${business.geo.longitude},14z`;
