<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import { jsonLdScript } from '@/lib/jsonLd';
  import { absoluteUrl } from '@/business';
  import { webPage, breadcrumb } from '@/seo/schema';
  import { getAllVehicles } from '@/lib/vehicles';
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
          name: `${data.t.sitemap.title} | ${data.t.site.name}`,
          description: data.t.sitemap.subtitle,
        }),
        breadcrumb([
          { name: data.t.nav.overview, url: absoluteUrl(`/${data.locale}/`) },
          { name: data.t.sitemap.title, url: absoluteUrl($page.url.pathname) },
        ]),
      ],
    })
  );

  interface SitemapLink {
    href: string;
    label: string;
    indent?: boolean;
  }

  const activeVehicles = getAllVehicles().filter((v) => v.available);
  const vehicleLinks: SitemapLink[] = activeVehicles.map((v) => ({
    href: `/${data.locale}${data.t.nav.links.inventory}${v.slug}/`,
    label: `${v.brand} ${v.model}`,
    indent: true,
  }));

  const sitemapData = $derived<{ title: string; links: SitemapLink[] }[]>([
    {
      title: data.t.sitemap.sections.main,
      links: [
        { href: `/${data.locale}/`, label: data.t.nav.home },
        { href: `/${data.locale}${data.t.nav.links.about}`, label: data.t.nav.about },
        { href: `/${data.locale}${data.t.nav.links.contact}`, label: data.t.nav.contact },
      ],
    },
    {
      title: data.t.sitemap.sections.inventory,
      links: [
        { href: `/${data.locale}${data.t.nav.links.inventory}`, label: data.t.nav.inventory },
        ...vehicleLinks,
      ],
    },
    {
      title: data.t.sitemap.sections.legal,
      links: [
        { href: `/${data.locale}${data.t.nav.links.privacy}`, label: data.t.footer.privacy },
        { href: `/${data.locale}${data.t.nav.links.terms}`, label: data.t.footer.terms },
        { href: `/${data.locale}${data.t.nav.links.cookies}`, label: data.t.footer.cookies },
      ],
    },
  ]);
</script>

<svelte:head>
  <title>{data.t.sitemap.title} | {data.t.site.name}</title>
  <meta name="description" content={data.t.sitemap.subtitle} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html schemaScript}
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main class="pt-32 pb-24 min-h-screen">
  <div class="max-w-7xl mx-auto px-6 md:px-8">
    <div class="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h1 class="text-h1 font-display font-black tracking-tight text-on-surface mb-6">
        {data.t.sitemap.title}
      </h1>
      <p class="text-body-lg text-on-surface-variant leading-relaxed">
        {data.t.sitemap.subtitle}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each sitemapData as section, idx (section.title)}
        <div
          class="bg-surface-container-low/40 backdrop-blur-sm border border-outline-variant/20 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-12 duration-1000"
          style="transition-delay: {idx * 100}ms"
        >
          <h2 class="text-label-caps text-primary font-black tracking-widest mb-6">
            {section.title}
          </h2>
          <ul class="space-y-4">
            {#each section.links as link (link.href)}
              <li class={link.indent ? 'pl-6' : ''}>
                <a
                  href={link.href}
                  class="group flex items-center text-body-md text-on-surface-variant hover:text-primary transition-all duration-300"
                >
                  {#if link.indent}
                    <span class="w-1 h-1 rounded-full bg-outline-variant/60 mr-2.5 group-hover:bg-primary/60 transition-all"></span>
                  {:else}
                    <span class="w-1.5 h-1.5 rounded-full bg-outline-variant mr-3 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                  {/if}
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
