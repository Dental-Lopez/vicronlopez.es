import { describe, it, expect } from 'vitest';
import {
  ORG_ID,
  WEBSITE_ID,
  organization,
  website,
  breadcrumb,
  car,
  collectionPage,
  webPage,
} from './schema';
import { business } from '@/business';
import { getAllVehicles } from '@/lib/vehicles';
import { en } from '@/i18n/en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const node = (n: unknown) => n as any;

const vehicle = getAllVehicles()[0];

describe('schema builders', () => {
  it('organization carries NAP/geo from the single source of truth under a stable @id', () => {
    const org = node(organization('es'));
    expect(org['@type']).toBe('AutoRental');
    expect(org['@id']).toBe(ORG_ID);
    expect(org.telephone).toBe(business.phone.e164);
    expect(org.email).toBe(business.email);
    expect(org.address.addressCountry).toBe(business.address.country);
    expect(org.geo.latitude).toBe(business.geo.latitude);
    expect(org.openingHoursSpecification).toHaveLength(business.openingHours.length);
  });

  it('website references the organization as publisher', () => {
    const site = node(website('es', en));
    expect(site['@id']).toBe(WEBSITE_ID);
    expect(site.publisher['@id']).toBe(ORG_ID);
    expect(site.inLanguage).toBe('es-ES');
  });

  it('car offer uses EUR, encodes availability and references the org as seller', () => {
    const available = node(car({ ...vehicle, available: true }, 'es', en));
    expect(available['@type']).toBe('Car');
    expect(available.offers.priceCurrency).toBe('EUR');
    expect(available.offers.availability).toBe('https://schema.org/InStock');
    expect(available.offers.seller['@id']).toBe(ORG_ID);
    expect(available.offers.url.startsWith(business.url)).toBe(true);
    expect(available.image.startsWith(business.url)).toBe(true);

    const sold = node(car({ ...vehicle, available: false }, 'en', en));
    expect(sold.offers.availability).toBe('https://schema.org/OutOfStock');
  });

  it('collectionPage lists vehicles with sequential positions and absolute urls', () => {
    const list = node(collectionPage('es', en, [{ slug: 'a' }, { slug: 'b' }]));
    const items = list.mainEntity.itemListElement;
    expect(items).toHaveLength(2);
    expect(items[0].position).toBe(1);
    expect(items[1].position).toBe(2);
    expect(items[0].url.startsWith(business.url)).toBe(true);
  });

  it('breadcrumb numbers items from 1', () => {
    const bc = node(
      breadcrumb([
        { name: 'Home', url: 'https://x/' },
        { name: 'Inventory', url: 'https://x/inv/' },
      ]),
    );
    expect(bc['@type']).toBe('BreadcrumbList');
    expect(bc.itemListElement.map((i: { position: number }) => i.position)).toEqual([1, 2]);
    expect(bc.itemListElement[1].item).toBe('https://x/inv/');
  });

  it('webPage exposes dateModified when provided', () => {
    const wp = node(
      webPage({
        locale: 'es',
        t: en,
        url: 'https://www.vicronlopez.es/es/legal/privacidad/',
        name: 'Privacy',
        description: 'Privacy policy',
        dateModified: '2025-01-01',
      }),
    );
    expect(wp['@type']).toBe('WebPage');
    expect(wp.dateModified).toBe('2025-01-01');
    expect(wp.isPartOf['@id']).toBe(WEBSITE_ID);
  });
});
