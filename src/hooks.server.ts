import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // Handle common robots.txt typos
  if (pathname === '/robot.txt' || pathname === '/robot.txt/' || pathname === '/robots.txt/') {
    return new Response(null, { status: 301, headers: { Location: '/robots.txt' } });
  }

  // We only handle redirects here.
  // Rewrites (localized -> technical) are now handled in src/hooks.ts via the reroute hook.
  if (!building && pathname.startsWith('/es/')) {
    const redirect = (to: string) =>
      new Response(null, { status: 301, headers: { Location: to } });

    // Block direct access to technical paths - redirect to localized
    if (pathname === '/es/vehicles' || pathname === '/es/vehicles/')
      return redirect('/es/vehiculos/');
    if (pathname === '/es/contact' || pathname === '/es/contact/')
      return redirect('/es/contacto/');
    if (pathname === '/es/about' || pathname === '/es/about/')
      return redirect('/es/sobre-nosotros/');
    if (pathname === '/es/sitemap' || pathname === '/es/sitemap/')
      return redirect('/es/mapa-del-sitio/');
    if (pathname === '/es/legal/privacy' || pathname === '/es/legal/privacy/')
      return redirect('/es/legal/privacidad/');
    if (pathname === '/es/legal/terms' || pathname === '/es/legal/terms/')
      return redirect('/es/legal/terminos/');

    // Dynamic vehicle detail redirects (technical → localized)
    if (pathname.startsWith('/es/vehicles/')) {
      const slug = pathname.replace('/es/vehicles/', '').replace(/\/$/, '');
      if (slug) return redirect(`/es/vehiculos/${slug}/`);
    }
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      const lang = event.params.lang || 'en';
      return html.replace('lang="en"', `lang="${lang}"`);
    },
    preload: ({ type, path }) => {
      if (type === 'font') {
        // Only preload the critical text fonts (Latin subsets) above the fold.
        // Exclude the 280KB material symbols icon font from critical preloads to avoid
        // bandwidth contention and reduce LCP element render delay.
        return path.includes('inter-latin-') || 
               path.includes('space-grotesk-latin-');
      }
      return type === 'js' || type === 'css';
    }
  });
};
