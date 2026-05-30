<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import ContactForm from '@/components/ui/ContactForm.svelte';
  import { jsonLdScript } from '@/lib/jsonLd';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=Ourense,+Galicia,+Spain&t=&z=14&ie=UTF8&iwloc=&output=embed';
  const MAPS_FULL_URL = 'https://www.google.com/maps/place/Ourense,+Province+of+Ourense/@42.3383925,-7.8842851,14z';

  const contactSchemaScript = $derived(
    jsonLdScript({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `https://www.vicronlopez.es${$page.url.pathname}#contactpage`,
          "url": `https://www.vicronlopez.es${$page.url.pathname}`,
          "name": `${data.t.contact.title} | ${data.t.site.name}`,
          "description": data.t.contact.subtitle
        },
        {
          "@type": "AutoRental",
          "@id": `https://www.vicronlopez.es/${data.locale}/#autorental`,
          "name": data.t.site.name,
          "url": `https://www.vicronlopez.es/${data.locale}/`,
          "image": "https://www.vicronlopez.es/icons/icon-512.png",
          "telephone": "+34 600 123 456",
          "email": "info@vicronlopez.es",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ourense",
            "addressRegion": "Galicia",
            "addressCountry": "ES"
          }
        }
      ]
    })
  );
</script>

<svelte:head>
  <title>{data.t.contact.title} | {data.t.site.name}</title>
  <meta name="description" content={data.t.contact.subtitle} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html contactSchemaScript}
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main class="pt-24 pb-xl relative overflow-hidden">
  <div class="absolute top-0 right-0 w-[40%] aspect-square bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-8 relative z-10">
    <div class="text-center mb-xl">
      <div class="inline-flex items-center gap-sm px-md py-2 rounded-full bg-primary/10 border border-primary/20 mb-lg">
        <span class="material-symbols-outlined text-primary" style="font-size:14px;font-variation-settings:'FILL' 1">support_agent</span>
        <span class="text-xs font-black uppercase tracking-[0.12em] text-primary font-display">{data.t.contact.title}</span>
      </div>
      <h1 class="text-h1 font-display font-black tracking-tight text-on-surface mb-md">
        {data.t.contact.headline}
      </h1>
      <p class="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-medium">
        {data.t.contact.subtitle}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-xl">
      <div class="lg:col-span-3 space-y-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <a href={MAPS_FULL_URL} target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-sm p-md bg-surface-container rounded-xl border border-outline-variant/20 hover:border-primary/30 hover:bg-surface-container-high transition-all">
            <span class="material-symbols-outlined text-xl text-primary">location_on</span>
            <span class="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Ourense, Galicia, España</span>
          </a>
          <a href="tel:+34600123456"
            class="group flex items-center gap-sm p-md bg-surface-container rounded-xl border border-outline-variant/20 hover:border-primary/30 hover:bg-surface-container-high transition-all">
            <span class="material-symbols-outlined text-xl text-primary">phone</span>
            <span class="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">+34 600 123 456</span>
          </a>
          <a href="mailto:{data.t.contact.emailLabel}"
            class="group flex items-center gap-sm p-md bg-surface-container rounded-xl border border-outline-variant/20 hover:border-primary/30 hover:bg-surface-container-high transition-all">
            <span class="material-symbols-outlined text-xl text-primary">mail</span>
            <span class="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{data.t.contact.emailLabel}</span>
          </a>
          <div class="flex items-center gap-sm p-md bg-surface-container rounded-xl border border-outline-variant/20">
            <span class="material-symbols-outlined text-xl text-primary">schedule</span>
            <span class="text-body-sm text-on-surface-variant">{data.t.contact.hoursLabel}</span>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-lg shadow-sm">
          <ContactForm
            labels={{
              name: data.t.contact.name,
              namePlaceholder: data.t.contact.namePlaceholder,
              email: data.t.contact.email,
              emailPlaceholder: data.t.contact.emailPlaceholder,
              phone: data.t.contact.phone,
              phonePlaceholder: data.t.contact.phonePlaceholder,
              message: data.t.contact.message,
              messagePlaceholder: data.t.contact.messagePlaceholder,
              submit: data.t.contact.submit,
              sending: data.t.contact.sending,
              successTitle: data.t.contact.successTitle,
              successBody: data.t.contact.successBody,
              required: data.t.contact.required,
              invalidEmail: data.t.contact.invalidEmail,
              minMessage: data.t.contact.minMessage,
            }}
          />
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="sticky top-28 rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm">
          <div class="p-md bg-surface-container-low flex justify-between items-center">
            <div class="flex items-center gap-sm">
              <span class="material-symbols-outlined text-primary">location_on</span>
              <span class="text-body-md font-semibold text-on-surface">Ourense, Galicia</span>
            </div>
            <a href={MAPS_FULL_URL} target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-xs text-primary text-body-sm font-semibold hover:underline">
              <span class="material-symbols-outlined text-base">open_in_new</span>
              {data.t.contact.viewOnMaps}
            </a>
          </div>
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            class="w-full h-[400px] lg:h-[520px] border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title={data.t.contact.mapTitle}
          ></iframe>
          <a href={MAPS_FULL_URL} target="_blank" rel="noopener noreferrer"
            class="block text-center py-md bg-primary text-on-primary font-semibold text-label-caps uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all">
            📍 {data.t.contact.directionsCta}
          </a>
        </div>
      </div>
    </div>
  </div>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
