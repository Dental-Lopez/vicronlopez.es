<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import CookieManager from '@/components/domains/legal/CookieManager.svelte';
  import { jsonLdScript } from '@/lib/jsonLd';
  import { business, absoluteUrl } from '@/business';
  import { webPage, breadcrumb } from '@/seo/schema';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const schemaScript = $derived(
    jsonLdScript({
      '@context': 'https://schema.org',
      '@graph': [
        webPage({
          locale: data.locale,
          t: data.t,
          url: absoluteUrl($page.url.pathname),
          name: `${data.t.legal.cookiesTitle} | ${data.t.site.name}`,
          description: `${data.t.legal.cookiesTitle} | ${data.t.site.name}`,
          dateModified: business.legalUpdated,
        }),
        breadcrumb([
          { name: data.t.nav.overview, url: absoluteUrl(`/${data.locale}/`) },
          { name: data.t.legal.cookiesTitle, url: absoluteUrl($page.url.pathname) },
        ]),
      ],
    })
  );
</script>

<svelte:head>
  <title>{data.t.legal.cookiesTitle} | {data.t.site.name}</title>
  <meta name="description" content={data.t.legal.cookiesLastUpdated} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html schemaScript}
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main class="pt-24 pb-xl relative overflow-hidden">
  <div class="absolute top-0 right-0 w-[40%] aspect-square bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

  <div class="max-w-3xl mx-auto px-8 relative z-10">
    <div class="text-center mb-2xl space-y-md">
      <h1 class="text-h1 font-display font-black tracking-tight text-on-surface">
        {data.t.legal.cookiesTitle}
      </h1>
      <p class="text-body-lg text-on-surface-variant leading-relaxed">
        {data.t.legal.cookiesLastUpdated}
      </p>
    </div>

    <!-- Cookie preferences manager -->
    <div class="mb-xl">
      <CookieManager dictionary={data.t.legal.cookies} />
    </div>

    {#each data.t.legal.cookies.policySections as section}
      <div class="bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/20 mb-xl shadow-sm">
        <h2 class="text-h2 font-display font-bold text-on-surface mb-md">{section.title}</h2>
        <p class="text-body-lg text-on-surface-variant leading-relaxed">{section.content}</p>
      </div>
    {/each}
  </div>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
