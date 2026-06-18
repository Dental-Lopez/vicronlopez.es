import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
  
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Sitemap: https://www.vicronlopez.es/sitemap.xml'
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
