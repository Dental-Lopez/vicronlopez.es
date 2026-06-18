import { test, expect } from '@playwright/test';
import vehiclesData from '../src/lib/data/vehicles.json' with { type: 'json' };

const vehicles = vehiclesData.vehicles;
const slugs = vehicles.map(v => v.slug);

// Define all expected URLs that MUST be in the sitemap
const expectedPaths = [
  '/',
  '/en/',
  '/es/',
  '/en/about/',
  '/es/sobre-nosotros/',
  '/en/contact/',
  '/es/contacto/',
  '/en/legal/cookies/',
  '/es/legal/cookies/',
  '/en/legal/privacy/',
  '/es/legal/privacidad/',
  '/en/legal/terms/',
  '/es/legal/terminos/',
  '/en/sitemap/',
  '/es/mapa-del-sitio/',
  '/en/vehicles/',
  '/es/vehiculos/',
  ...slugs.map(s => `/en/vehicles/${s}/`),
  ...slugs.map(s => `/es/vehiculos/${s}/`),
];

test.describe('Sitemap Integrity', () => {
  test('sitemap.xml should contain all expected URLs', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');
    expect(response?.status()).toBe(200);
    
    const xml = await response?.text();
    if (!xml) throw new Error('Sitemap is empty');

    // Extract all <loc> entries
    const locs = xml.match(/<loc>(.*?)<\/loc>/g)?.map(l => l.replace(/<\/?loc>/g, '')) || [];
    
    // Convert full URLs to paths for comparison
    const sitemapPaths = locs.map(loc => {
      try {
        const url = new URL(loc);
        return url.pathname;
      } catch {
        return loc;
      }
    });

    const uniqueExpected = [...new Set(expectedPaths)];
    const missingPaths = uniqueExpected.filter(p => !sitemapPaths.includes(p));
    
    if (missingPaths.length > 0) {
      console.log(`Browser: ${test.info().project.name}`);
      console.log(`Total Expected: ${uniqueExpected.length}, Total Found: ${sitemapPaths.length}`);
      console.log('First 5 Sitemap Paths:', sitemapPaths.slice(0, 5));
      console.error('Missing paths in sitemap (first 10):', missingPaths.slice(0, 10));
    }

    expect(missingPaths).toHaveLength(0);
  });

  test('sitemap.xml should not contain technical English paths in Spanish locale', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');
    const xml = await response?.text();
    if (!xml) throw new Error('Sitemap is empty');

    const locs = xml.match(/<loc>(.*?)<\/loc>/g)?.map(l => l.replace(/<\/?loc>/g, '')) || [];
    const alternates = xml.match(/href="(.*?)"/g)?.map(h => h.replace(/href="(.*?)"/, '$1')) || [];

    const allPaths = [...locs, ...alternates].map(link => {
      try {
        const url = new URL(link);
        return url.pathname;
      } catch {
        return link;
      }
    });
    
    const technicalEsPaths = [...new Set(allPaths.filter(p => 
      p.startsWith('/es/') && (
        p.includes('/vehicles/') || 
        p === '/es/contact/' || p === '/es/contact' ||
        p === '/es/about/' || p === '/es/about' ||
        p === '/es/sitemap/' || p === '/es/sitemap' ||
        p === '/es/legal/privacy/' || p === '/es/legal/privacy' ||
        p === '/es/legal/terms/' || p === '/es/legal/terms'
      )
    ))];

    if (technicalEsPaths.length > 0) {
      console.error('Technical ES paths found in sitemap:', technicalEsPaths);
    }

    expect(technicalEsPaths).toHaveLength(0);
  });

  test('sitemap page should display all active vehicles', async ({ page }) => {
    // Navigate to Spanish sitemap page
    await page.goto('/es/mapa-del-sitio/');
    await expect(page.locator('h1')).toHaveText('Mapa del Sitio');
    
    // Check for the three vehicles in Spanish
    const porscheLinkEs = page.locator('a[href="/es/vehiculos/porsche-992-gt3/"]');
    await expect(porscheLinkEs).toBeVisible();
    await expect(porscheLinkEs).toHaveText(/Porsche 992 GT3/);

    const fiatLinkEs = page.locator('a[href="/es/vehiculos/fiat-500-1969/"]');
    await expect(fiatLinkEs).toBeVisible();
    await expect(fiatLinkEs).toHaveText(/Fiat 500/);

    const mercedesLinkEs = page.locator('a[href="/es/vehiculos/mercedes-amg-gts/"]');
    await expect(mercedesLinkEs).toBeVisible();
    await expect(mercedesLinkEs).toHaveText(/Mercedes.*AMG GTS/);

    // Navigate to English sitemap page
    await page.goto('/en/sitemap/');
    await expect(page.locator('h1')).toHaveText('Sitemap');

    // Check for the three vehicles in English
    const porscheLinkEn = page.locator('a[href="/en/vehicles/porsche-992-gt3/"]');
    await expect(porscheLinkEn).toBeVisible();
    await expect(porscheLinkEn).toHaveText(/Porsche 992 GT3/);

    const fiatLinkEn = page.locator('a[href="/en/vehicles/fiat-500-1969/"]');
    await expect(fiatLinkEn).toBeVisible();
    await expect(fiatLinkEn).toHaveText(/Fiat 500/);

    const mercedesLinkEn = page.locator('a[href="/en/vehicles/mercedes-amg-gts/"]');
    await expect(mercedesLinkEn).toBeVisible();
    await expect(mercedesLinkEn).toHaveText(/Mercedes.*AMG GTS/);
  });
});
