import { business, absoluteUrl } from '@/business';
import type { JsonLd } from '@/lib/jsonLd';
import type { Dictionary } from '@/i18n/en';
import type { Locale } from '@/i18n/utils';
import type { Vehicle } from '@/schemas/vehicle';

/** Stable, reusable @id values so every page references the same entities. */
export const ORG_ID = `${business.url}/#organization`;
export const WEBSITE_ID = `${business.url}/#website`;

const homeUrl = (locale: Locale) => absoluteUrl(`/${locale}/`);
const inLanguage = (locale: Locale) => (locale === 'es' ? 'es-ES' : 'en-US');

/**
 * The business as a LocalBusiness (AutoRental). Emitted once site-wide from the
 * layout; other nodes reference it by @id (ORG_ID) instead of duplicating it.
 */
export function organization(locale: Locale): JsonLd {
  return {
    '@type': 'AutoRental',
    '@id': ORG_ID,
    name: business.name,
    url: homeUrl(locale),
    logo: absoluteUrl(business.logoPath),
    image: absoluteUrl(business.logoPath),
    telephone: business.phone.e164,
    email: business.email,
    priceRange: business.priceRange,
    currenciesAccepted: business.currency,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${business.address.region}, Spain`,
    },
    openingHoursSpecification: business.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: business.phone.e164,
      email: business.email,
      areaServed: business.address.country,
      availableLanguage: ['es', 'en'],
    },
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

export function website(locale: Locale, t: Dictionary): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: homeUrl(locale),
    name: t.site.name,
    description: t.site.description,
    inLanguage: inLanguage(locale),
    publisher: { '@id': ORG_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumb(items: BreadcrumbItem[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Absolute URL of a vehicle detail page in the given locale. */
export function vehicleUrl(vehicle: Pick<Vehicle, 'slug'>, locale: Locale, t: Dictionary): string {
  return absoluteUrl(`/${locale}/${t.nav.slugs.vehicles}/${vehicle.slug}/`);
}

export function car(vehicle: Vehicle, locale: Locale, t: Dictionary): JsonLd {
  const url = vehicleUrl(vehicle, locale, t);
  return {
    '@type': 'Car',
    name: `${vehicle.brand} ${vehicle.model}`,
    url,
    image: absoluteUrl(vehicle.image),
    description: `${t.vehicleDetail.forRent}: ${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
    model: vehicle.model,
    brand: { '@type': 'Brand', name: vehicle.brand },
    modelDate: vehicle.year,
    offers: {
      '@type': 'Offer',
      price: vehicle.pricePerDay,
      priceCurrency: business.currency,
      availability: vehicle.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: vehicle.pricePerDay,
        priceCurrency: business.currency,
        unitCode: 'DAY',
      },
      seller: { '@id': ORG_ID },
    },
  };
}

export function collectionPage(
  locale: Locale,
  t: Dictionary,
  vehicles: Pick<Vehicle, 'slug'>[],
): JsonLd {
  return {
    '@type': 'CollectionPage',
    name: `${t.vehicles.allVehicles} | ${t.site.name}`,
    description: t.vehicles.allVehiclesSubline,
    url: absoluteUrl(`/${locale}/${t.nav.slugs.vehicles}/`),
    inLanguage: inLanguage(locale),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: vehicles.map((v, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: vehicleUrl(v, locale, t),
      })),
    },
  };
}

export interface WebPageOptions {
  locale: Locale;
  t: Dictionary;
  url: string;
  name: string;
  description: string;
  /** schema @type; defaults to WebPage. Use AboutPage/ContactPage where apt. */
  type?: string;
  /** ISO date for legal/policy pages. */
  dateModified?: string;
}

export function webPage(opts: WebPageOptions): JsonLd {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: inLanguage(opts.locale),
    isPartOf: { '@id': WEBSITE_ID },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}
