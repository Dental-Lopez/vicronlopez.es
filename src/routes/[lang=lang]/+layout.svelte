<script lang="ts">
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import WhatsAppWidget from '@/components/ui/WhatsAppWidget.svelte';
  import CookieBanner from '@/components/ui/CookieBanner.svelte';
  import PWAInstaller from '@/components/ui/PWAInstaller.svelte';
  import { business, absoluteUrl } from '@/business';
  import { jsonLdScript } from '@/lib/jsonLd';
  import { organization, website } from '@/seo/schema';
  import { getLocalizedPath } from '@/i18n/utils';
  import '../../app.css';

  interface Props {
    data: LayoutData;
    children: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();

  $effect(() => {
    if (document.documentElement.lang !== data.locale) {
      document.documentElement.lang = data.locale;
    }
  });

  $effect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('SW registered', reg))
          .catch((err) => console.log('SW failed', err));
      });
    }
  });

  // State coordination for visibility of overlays
  let isCookieVisible = $state(false);
  let isPwaVisible = $state(false);

  // Dynamic OpenGraph metadata calculation
  const ogMetadata = $derived.by(() => {
    const locale = data.locale;
    const t = data.t;
    const url = $page.url;
    const path = url.pathname;
    
    let title = t.site.name;
    let description = t.site.description;
    let image = absoluteUrl(business.logoPath);
    let type = 'website';

    // 1. Vehicle Detail Page
    if ($page.data.vehicle) {
      const v = $page.data.vehicle;
      title = `${v.brand} ${v.model} ${v.year} | ${t.site.name}`;
      description = `${t.vehicleDetail.forRent}: ${v.brand} ${v.model} - ${t.vehicleDetail.specifications}`;
      image = absoluteUrl(v.image);
    }
    // 2. About Page
    else if (path.includes('/about') || path.includes('/sobre-nosotros')) {
      title = `${t.about.title} | ${t.site.name}`;
      description = t.about.subtitle;
    }
    // 3. Contact Page
    else if (path.includes('/contact') || path.includes('/contacto')) {
      title = `${t.contact.title} | ${t.site.name}`;
      description = t.contact.subtitle || t.site.description;
    }
    // 4. Vehicles Inventory Page
    else if (path.includes('/vehicles') || path.includes('/vehiculos')) {
      title = `${t.nav.inventory} | ${t.site.name}`;
      description = t.vehicles.allVehiclesSubline || t.site.description;
    }
    // 5. Sitemap Page
    else if (path.includes('/sitemap') || path.includes('/mapa-del-sitio')) {
      title = `${t.sitemap.title} | ${t.site.name}`;
      description = t.sitemap.subtitle;
    }
    // 6. Legal pages
    else if (path.includes('/legal/cookies')) {
      title = `${t.legal.cookiesTitle} | ${t.site.name}`;
      description = `${t.legal.cookiesTitle} | ${t.site.name}`;
    }
    else if (path.includes('/legal/privacy') || path.includes('/legal/privacidad')) {
      title = `${t.legal.privacyTitle} | ${t.site.name}`;
      description = `${t.legal.privacyTitle} | ${t.site.name}`;
    }
    else if (path.includes('/legal/terms') || path.includes('/legal/terminos')) {
      title = `${t.legal.termsTitle} | ${t.site.name}`;
      description = `${t.legal.termsTitle} | ${t.site.name}`;
    }
    
    return {
      title,
      description,
      image,
      url: absoluteUrl(path),
      type,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES'
    };
  });

  // Site-wide structured data: the business (Organization) + WebSite, emitted
  // once here and referenced by @id from every page's own schema.
  const baseSchemaScript = $derived(
    jsonLdScript({
      '@context': 'https://schema.org',
      '@graph': [organization(data.locale), website(data.locale, data.t)],
    })
  );

  // Canonical + hreflang alternates, derived from the single-source-of-truth URL.
  const canonicalUrl = $derived(absoluteUrl($page.url.pathname));
  const alternates = $derived([
    { hreflang: 'es', href: absoluteUrl(getLocalizedPath($page.url, 'es')) },
    { hreflang: 'en', href: absoluteUrl(getLocalizedPath($page.url, 'en')) },
    { hreflang: 'x-default', href: absoluteUrl(getLocalizedPath($page.url, 'en')) },
  ]);
</script>

<svelte:head>
  <meta name="description" content={ogMetadata.description} />
  <link rel="canonical" href={canonicalUrl} />
  {#each alternates as alt (alt.hreflang)}
    <link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
  {/each}
  <link rel="apple-touch-icon" href="/icons/icon-180.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#0043c8" />
  <!-- Fonts are self-hosted and bundled via app.css (Fontsource + subset icons) -->

  <!-- Site-wide structured data: Organization + WebSite -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html baseSchemaScript}

  <!-- OpenGraph Metadata -->
  <meta property="og:title" content={ogMetadata.title} />
  <meta property="og:description" content={ogMetadata.description} />
  <meta property="og:type" content={ogMetadata.type} />
  <meta property="og:url" content={ogMetadata.url} />
  <meta property="og:image" content={ogMetadata.image} />
  <meta property="og:site_name" content={data.t.site.name} />
  <meta property="og:locale" content={ogMetadata.locale} />
  <meta property="og:locale:alternate" content={ogMetadata.alternateLocale} />

  <!-- Twitter Card Metadata -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={ogMetadata.title} />
  <meta name="twitter:description" content={ogMetadata.description} />
  <meta name="twitter:image" content={ogMetadata.image} />
</svelte:head>

{@render children()}

<div id="below-the-fold-trigger" class="absolute top-[100vh] h-1 w-full pointer-events-none"></div>

<!-- WhatsApp Widget Wrapper: isolated fixed position with CSS transform translations -->
<div
  class="fixed bottom-6 right-6 z-[80] whatsapp-wrapper"
  class:cookie-visible={isCookieVisible && !isPwaVisible}
  class:pwa-visible={!isCookieVisible && isPwaVisible}
  class:both-visible={isCookieVisible && isPwaVisible}
>
  <WhatsAppWidget locale={data.locale} />
</div>

<!-- PWA Installer Wrapper: isolated fixed position with CSS transform translation -->
<div
  class="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-[85] pointer-events-none pwa-wrapper"
  class:cookie-visible={isCookieVisible}
>
  <PWAInstaller locale={data.locale} bind:visible={isPwaVisible} />
</div>

<!-- Cookie Banner Wrapper: isolated fixed position -->
<div class="fixed bottom-0 left-0 right-0 z-[90] pointer-events-none p-6">
  <CookieBanner locale={data.locale} bind:visible={isCookieVisible} />
</div>

<style>
  .whatsapp-wrapper {
    --translate-y: 0px;
    transform: translateY(var(--translate-y));
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pwa-wrapper {
    --translate-y: 0px;
    transform: translateY(var(--translate-y));
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Shifting when cookie banner is visible */
  .whatsapp-wrapper.cookie-visible {
    --translate-y: -140px;
  }
  .pwa-wrapper.cookie-visible {
    --translate-y: -140px;
  }
  @media (max-width: 768px) {
    .whatsapp-wrapper.cookie-visible,
    .pwa-wrapper.cookie-visible {
      --translate-y: -210px; /* Cookie banner is taller on mobile */
    }
  }

  /* Shifting when PWA installer is visible */
  .whatsapp-wrapper.pwa-visible {
    --translate-y: -140px;
  }
  @media (max-width: 768px) {
    .whatsapp-wrapper.pwa-visible {
      --translate-y: -160px;
    }
  }

  /* Shifting when both are visible */
  .whatsapp-wrapper.both-visible {
    --translate-y: -280px;
  }
  @media (max-width: 768px) {
    .whatsapp-wrapper.both-visible {
      --translate-y: -390px;
    }
  }
</style>

