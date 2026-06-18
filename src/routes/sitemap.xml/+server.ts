import * as sitemap from 'super-sitemap';
import type { RequestHandler } from './$types';
import { getAllVehicles } from '$lib/lib/vehicles';

type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
type Priority = 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;

export const GET: RequestHandler = async (event) => {
  const vehicles = getAllVehicles();
  const slugs = vehicles.map((v) => v.slug);

  const now = new Date().toISOString();
  const response = await sitemap.response({
    origin: event.url.origin,
    // We'll handle sorting in processPaths since we want custom sort (by date)
    sort: undefined,
    lang: {
      default: 'en',
      alternates: ['es'],
    },
    paramValues: {
      '/[lang=lang]': ['en', 'es'],
      '/[lang=lang]/about': ['en', 'es'],
      '/[lang=lang]/contact': ['en', 'es'],
      '/[lang=lang]/legal/cookies': ['en', 'es'],
      '/[lang=lang]/legal/privacy': ['en', 'es'],
      '/[lang=lang]/legal/terms': ['en', 'es'],
      '/[lang=lang]/sitemap': ['en', 'es'],
      '/[lang=lang]/vehicles': ['en', 'es'],
      '/[lang=lang]/vehicles/[slug]': slugs,
    },
    excludeRoutePatterns: [
      '.*\\+layout.*',
      '.*\\+error.*',
      '.*\\+server.*',
      '^/sitemap\\.xml$',
    ],
    processPaths: (paths) => {
      const processed = paths.map((path) => {
        let p = path.path;
        const lastmod = now;

        // Apply translations for Spanish routes
        if (p.startsWith('/es/')) {
          if (p === '/es/about') p = '/es/sobre-nosotros';
          else if (p === '/es/contact') p = '/es/contacto';
          else if (p === '/es/sitemap') p = '/es/mapa-del-sitio';
          else if (p === '/es/legal/privacy') p = '/es/legal/privacidad';
          else if (p === '/es/legal/terms') p = '/es/legal/terminos';
          // cookies remains /es/legal/cookies as per design
          else if (p === '/es/vehicles') p = '/es/vehiculos';
          else if (p.startsWith('/es/vehicles/')) {
            p = p.replace('/es/vehicles/', '/es/vehiculos/');
          }
        }

        // Ensure trailing slash for all paths (except root)
        if (p !== '/' && !p.endsWith('/')) {
          p += '/';
        }

        // Set priority and changefreq
        let priority: Priority = 0.5;
        let changefreq: Changefreq = 'monthly';

        if (p === '/' || p === '/en/' || p === '/es/') {
          priority = 1.0;
          changefreq = 'daily';
        } else if (p.includes('/vehicles/') || p.includes('/vehiculos/')) {
          priority = 0.8;
          changefreq = 'weekly';
        }

        return { 
          ...path, 
          path: p, 
          lastmod,
          priority,
          changefreq
        };
      });

      return processed.sort((a, b) => {
        if (b.lastmod !== a.lastmod) {
          return b.lastmod.localeCompare(a.lastmod);
        }
        return a.path.localeCompare(b.path);
      });
    }
  });

  const xml = await response.text();
  
  // Fix trailing slashes in alternates first
  // (super-sitemap might generate them without trailing slash for alternates)
  let finalXml = xml.replace(/href="([^"]+?\/e[ns]\/[^"]+?)(?<!\/)"/g, 'href="$1/"');

  // Post-process XML to fix alternates (super-sitemap doesn't translate them in processPaths)
  finalXml = finalXml
    .replaceAll('/es/about/', '/es/sobre-nosotros/')
    .replaceAll('/es/contact/', '/es/contacto/')
    .replaceAll('/es/sitemap/', '/es/mapa-del-sitio/')
    .replaceAll('/es/legal/privacy/', '/es/legal/privacidad/')
    .replaceAll('/es/legal/terms/', '/es/legal/terminos/')
    .replaceAll('/es/vehicles/', '/es/vehiculos/');

  const styledXml = finalXml.replace(
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<?xml version="1.0" encoding="UTF-8" ?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
  );

  return new Response(styledXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
