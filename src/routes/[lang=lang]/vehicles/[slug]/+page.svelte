<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import Badge from '@/components/ui/Badge.svelte';
  import VehicleImage from '@/components/ui/VehicleImage.svelte';
  import PaymentMethods from '@/components/ui/PaymentMethods.svelte';
  import { formatCurrency } from '@/lib/formatters';
  import { jsonLdScript } from '@/lib/jsonLd';
  import { WHATSAPP_NUMBER } from '@/contact';
  import { buildBookingMessage } from '@/booking';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let showDepositInfo = $state(false);

  const bookingMessage = $derived(buildBookingMessage(data.vehicle, $page.url.href, data.t, data.locale));
  const whatsappBookingUrl = $derived(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingMessage)}`);
  const emailBookingUrl = $derived(`/${data.locale}${data.t.nav.links.contact}?vehicle=${data.vehicle.slug}`);

  const specsEntries = $derived(
    [
      data.vehicle.specs.acceleration && { icon: 'speed', label: data.t.vehicles.acceleration, value: data.vehicle.specs.acceleration },
      data.vehicle.specs.range && { icon: 'bolt', label: data.t.vehicles.range, value: data.vehicle.specs.range },
      data.vehicle.specs.drivetrain && { icon: 'settings', label: data.t.vehicles.drivetrain, value: data.vehicle.specs.drivetrain },
      data.vehicle.specs.seats && { icon: 'group', label: data.t.vehicles.seats, value: `${data.vehicle.specs.seats}` },
      data.vehicle.specs.fuel && { icon: 'local_gas_station', label: data.t.vehicles.fuel, value: data.vehicle.specs.fuel },
    ].filter(Boolean) as Array<{ icon: string; label: string; value: string }>
  );
  const carSchemaScript = $derived(
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "Car",
      "name": `${data.vehicle.brand} ${data.vehicle.model}`,
      "image": `https://www.vicronlopez.es${data.vehicle.image}`,
      "description": `${data.t.vehicleDetail.forRent}: ${data.vehicle.brand} ${data.vehicle.model} (${data.vehicle.year})`,
      "model": data.vehicle.model,
      "brand": {
        "@type": "Brand",
        "name": data.vehicle.brand
      },
      "modelDate": data.vehicle.year,
      "offers": {
        "@type": "Offer",
        "price": data.vehicle.pricePerDay,
        "priceCurrency": data.locale === 'es' ? 'ARS' : 'USD',
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": data.vehicle.pricePerDay,
          "priceCurrency": data.locale === 'es' ? 'ARS' : 'USD',
          "unitText": "day"
        },
      }
    })
  );
</script>

<svelte:window
  onclick={(e) => {
    if (showDepositInfo && !(e.target as HTMLElement).closest('.deposit-info-container')) {
      showDepositInfo = false;
    }
  }}
/>

<svelte:head>
  <title>{data.vehicle.brand} {data.vehicle.model} {data.vehicle.year} | {data.t.site.name}</title>
  <meta name="description" content="{data.t.vehicleDetail.forRent}: {data.vehicle.brand} {data.vehicle.model} — {data.t.vehicleDetail.specifications}" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html carSchemaScript}
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main class="pt-24 pb-xl">
  <div class="max-w-7xl mx-auto px-8">
    <a
      href="/{data.locale}{data.t.nav.links.inventory}"
      class="inline-flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-primary transition-colors mb-lg"
    >
      <span class="material-symbols-outlined text-base">arrow_back</span>
      {data.t.vehicleDetail.backToInventory}
    </a>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
      <!-- Image -->
      <div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20">
        <VehicleImage
          slug={data.vehicle.slug}
          alt="{data.vehicle.brand} {data.vehicle.model}"
          class="w-full h-full object-contain p-8"
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="eager"
          fetchpriority="high"
        />
        {#if !data.vehicle.available}
          <div class="absolute inset-0 bg-surface/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <span class="px-lg py-sm bg-surface/90 rounded-full text-on-surface font-bold uppercase tracking-wider text-label-caps">
              {data.t.vehicleDetail.unavailable}
            </span>
          </div>
        {/if}
      </div>

      <!-- Details -->
      <div class="flex flex-col gap-lg">
        <div>
          <div class="flex flex-wrap gap-xs mb-md">
            <Badge variant="tertiary">{data.t.categories[data.vehicle.category as keyof typeof data.t.categories]}</Badge>
            <Badge variant="secondary">{data.t.vehicleDetail.forRent}</Badge>
          </div>
          <p class="text-label-caps text-on-surface-variant tracking-wider mb-xs">{data.vehicle.year} · {data.vehicle.brand}</p>
          <h1 class="text-h1 font-display font-black tracking-tight text-on-surface">{data.vehicle.model}</h1>
        </div>

        <!-- Pricing -->
        <div class="flex flex-wrap gap-md">
          <div class="bg-surface-container rounded-xl p-md flex-1 min-w-[140px]">
            <p class="text-label-caps text-on-surface-variant tracking-wider mb-xs">{data.t.vehicleDetail.rentPrice}</p>
            <p class="text-h2 font-display font-black text-secondary">
              {formatCurrency(data.vehicle.pricePerDay, data.locale)}
              <span class="text-body-sm font-body font-normal text-on-surface-variant">{data.t.vehicleDetail.perDay}</span>
            </p>
          </div>
        </div>

        <!-- Specs -->
        {#if specsEntries.length > 0}
          <div>
            <h2 class="text-h3 font-display font-bold text-on-surface mb-md">{data.t.vehicleDetail.specifications}</h2>
            <dl class="grid grid-cols-2 gap-sm">
              {#each specsEntries as { icon, label, value }}
                <div class="flex items-center gap-sm bg-surface-container rounded-lg p-sm">
                  <span class="material-symbols-outlined text-xl text-primary opacity-70">{icon}</span>
                  <div>
                    <dt class="text-[10px] text-on-surface-variant uppercase tracking-wider">{label}</dt>
                    <dd class="text-body-sm font-semibold text-on-surface">{value}</dd>
                  </div>
                </div>
              {/each}
            </dl>
          </div>
        {/if}

        <!-- Included Services -->
        <div class="border-t border-outline-variant/10 pt-md">
          <h2 class="text-h3 font-display font-bold text-on-surface mb-md">{data.t.vehicleDetail.includedTitle}</h2>
          <ul class="space-y-sm">
            <li class="flex items-start gap-sm">
              <span class="material-symbols-outlined text-lg text-secondary mt-0.5">verified_user</span>
              <span class="text-body-sm text-on-surface">{data.t.vehicleDetail.insurance}</span>
            </li>
            <li class="flex items-start gap-sm">
              <span class="material-symbols-outlined text-lg text-secondary mt-0.5">cleaning_services</span>
              <span class="text-body-sm text-on-surface">{data.t.vehicleDetail.cleaning}</span>
            </li>
            <li class="flex items-start gap-sm">
              <span class="material-symbols-outlined text-lg text-secondary mt-0.5">local_gas_station</span>
              <span class="text-body-sm text-on-surface">{data.t.vehicleDetail.refuelService}</span>
            </li>
          </ul>
        </div>

        <!-- Payment Methods -->
        <div class="border-t border-outline-variant/10 pt-md">
          <!-- Deposit Info -->
          <div class="deposit-info-container flex items-center gap-xs mb-xs relative">
            <span class="text-body-sm font-semibold text-on-surface">
              {data.t.vehicleDetail.depositLabel}:
            </span>
            <!-- Information Icon (i) -->
            <button
              type="button"
              onclick={() => showDepositInfo = !showDepositInfo}
              class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant transition-colors"
              aria-label="Info"
            >
              <span class="material-symbols-outlined text-[16px] font-bold">info</span>
            </button>

            <!-- Tooltip Popover -->
            {#if showDepositInfo}
              <div class="absolute left-0 top-7 z-10 w-72 p-md rounded-xl bg-surface-container/95 backdrop-blur-md border border-outline-variant/30 shadow-lg text-body-xs text-on-surface-variant leading-relaxed">
                {data.t.vehicleDetail.depositInfoText}
              </div>
            {/if}
          </div>

          <!-- Permanent details -->
          <p class="text-body-xs text-on-surface-variant mb-md leading-relaxed">
            {data.t.vehicleDetail.permanentDetails}
          </p>

          <!-- Payment methods images -->
          <PaymentMethods t={data.t.payments} hideTitle={true} />
        </div>

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row gap-sm pt-sm">
          {#if data.vehicle.available}
            <a
              href={emailBookingUrl}
              class="flex-1 flex items-center justify-center text-center bg-primary text-on-primary rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95"
            >
              {data.t.vehicleDetail.bookVehicle}
            </a>
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 flex items-center justify-center text-center bg-[#25d366] text-white rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-[#1ebe57] transition-all duration-300 active:scale-95"
            >
              {data.t.vehicleDetail.bookWhatsApp}
            </a>
          {:else}
            <span class="flex-1 flex items-center justify-center text-center bg-surface-container text-on-surface-variant rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold">
              {data.t.vehicleDetail.unavailable}
            </span>
          {/if}
          <a
            href="/{data.locale}{data.t.nav.links.inventory}"
            class="flex-1 flex items-center justify-center text-center bg-transparent text-on-surface border border-outline rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-surface-container transition-all duration-300"
          >
            {data.t.vehicleDetail.viewAll}
          </a>
        </div>
      </div>
    </div>

    <!-- Why Rent This Vehicle Description -->
    {#if data.t.vehicleDescriptions[data.vehicle.slug as keyof typeof data.t.vehicleDescriptions]}
      <div class="mt-xl border-t border-outline-variant/10 pt-xl flex flex-col items-center text-center">
        <h2 class="text-h2 font-display font-black tracking-tight text-on-surface mb-md max-w-2xl">
          {data.t.vehicleDetail.whyIdealTitle}
        </h2>
        <p class="text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          {data.t.vehicleDescriptions[data.vehicle.slug as keyof typeof data.t.vehicleDescriptions]}
        </p>
      </div>
    {/if}
  </div>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
