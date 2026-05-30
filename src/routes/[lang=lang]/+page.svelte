<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import HeroSection from '@/components/domains/shared/HeroSection.svelte';
  import OverviewSection from '@/components/domains/landing/OverviewSection.svelte';
  import FeaturedVehicles from '@/components/domains/vehicles/FeaturedVehicles.svelte';
  import ServicesSection from '@/components/domains/landing/ServicesSection.svelte';
  import ReviewsSection from '@/components/domains/landing/ReviewsSection.svelte';
  import ContactSection from '@/components/domains/landing/ContactSection.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const websiteSchemaScript = $derived(
    `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `https://www.vicronlopez.es/${data.locale}/#website`,
          "url": `https://www.vicronlopez.es/${data.locale}/`,
          "name": data.t.site.name,
          "description": data.t.site.description
        },
        {
          "@type": "AutoRental",
          "@id": `https://www.vicronlopez.es/${data.locale}/#autorental`,
          "name": data.t.site.name,
          "url": `https://www.vicronlopez.es/${data.locale}/`,
          "image": "https://www.vicronlopez.es/icons/icon-512.png",
          "telephone": "+34 600 123 456",
          "email": "info@vicronlopez.es",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ourense",
            "addressRegion": "Galicia",
            "addressCountry": "ES"
          }
        }
      ]
    })}</` + `script>`
  );
</script>

<svelte:head>
  <title>{data.t.site.name}</title>
  <link rel="canonical" href="https://www.vicronlopez.es/{data.locale}/" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html websiteSchemaScript}
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main>
  <HeroSection locale={data.locale} />
  <OverviewSection locale={data.locale} />
  <FeaturedVehicles locale={data.locale} />
  <ServicesSection locale={data.locale} />
  <ReviewsSection locale={data.locale} />
  <ContactSection locale={data.locale} />
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
