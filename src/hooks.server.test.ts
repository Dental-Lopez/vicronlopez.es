import { describe, it, expect, vi } from 'vitest';
import { handle } from './hooks.server';

function makeEvent(pathname: string) {
  const url = new URL(`https://example.com${pathname}`);
  return {
    url,
    request: new Request(url),
    locals: {},
    cookies: {} as any,
    platform: {},
    route: { id: null },
    params: {},
    isDataRequest: false,
    isSubRequest: false,
    setHeaders: vi.fn(),
    getClientAddress: vi.fn(),
    fetch: vi.fn(),
  };
}

async function callHandle(pathname: string) {
  const event = makeEvent(pathname) as any;
  const resolve = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));
  const result = await handle({ event, resolve });
  return { event, resolve, result };
}

describe('handle (i18n Redirect Middleware)', () => {
  it('redirects technical /es/vehicles/ to localized /es/vehiculos/ with 301', async () => {
    const { result, resolve } = await callHandle('/es/vehicles/');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/es/vehiculos/');
  });

  it('redirects technical /es/vehicles/for-rent/ to localized /es/vehiculos/en-alquiler/ with 301', async () => {
    const { result, resolve } = await callHandle('/es/vehicles/for-rent/');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/es/vehiculos/en-alquiler/');
  });

  it('redirects technical /es/vehicles/for-sell/ to localized /es/vehiculos/en-venta/ with 301', async () => {
    const { result, resolve } = await callHandle('/es/vehicles/for-sell/');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/es/vehiculos/en-venta/');
  });

  it('redirects technical /es/about/ to localized /es/sobre-nosotros/ with 301', async () => {
    const { result, resolve } = await callHandle('/es/about/');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/es/sobre-nosotros/');
  });

  it('redirects technical /es/contact/ to localized /es/contacto/ with 301', async () => {
    const { result, resolve } = await callHandle('/es/contact/');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/es/contacto/');
  });

  it('redirects technical detail /es/vehicles/byd-seal/ to localized /es/vehiculos/byd-seal/', async () => {
    const { result, resolve } = await callHandle('/es/vehicles/byd-seal/');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/es/vehiculos/byd-seal/');
  });

  it('handles technical robots.txt typos with 301', async () => {
    const { result, resolve } = await callHandle('/robot.txt');
    expect(resolve).not.toHaveBeenCalled();
    expect(result.status).toBe(301);
    expect(result.headers.get('Location')).toBe('/robots.txt');
  });

  it('resolves normal paths without redirect', async () => {
    const { resolve, result } = await callHandle('/en/vehicles/');
    expect(resolve).toHaveBeenCalled();
    expect(result.status).toBe(200);
  });

  it('calls resolve with transformPageChunk that replaces lang attribute', async () => {
    const event = makeEvent('/es/vehiculos/') as any;
    event.params = { lang: 'es' };
    const resolve = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));
    await handle({ event, resolve });
    
    expect(resolve).toHaveBeenCalled();
    const resolveOptions = resolve.mock.calls[0][1];
    expect(resolveOptions.transformPageChunk).toBeDefined();
    
    const inputHtml = '<!doctype html><html lang="en" class=""><body></body></html>';
    const outputHtml = resolveOptions.transformPageChunk({ html: inputHtml });
    expect(outputHtml).toContain('lang="es"');
  });
});
