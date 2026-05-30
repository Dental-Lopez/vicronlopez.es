<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import Badge from '@/components/ui/Badge.svelte';
  import VehicleImage from '@/components/ui/VehicleImage.svelte';
  import { formatCurrency } from '@/lib/formatters';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const specsEntries = $derived(
    [
      data.vehicle.specs.acceleration && { icon: 'speed', label: data.t.vehicles.acceleration, value: data.vehicle.specs.acceleration },
      data.vehicle.specs.range && { icon: 'bolt', label: data.t.vehicles.range, value: data.vehicle.specs.range },
      data.vehicle.specs.drivetrain && { icon: 'settings', label: data.t.vehicles.drivetrain, value: data.vehicle.specs.drivetrain },
      data.vehicle.specs.seats && { icon: 'group', label: data.t.vehicles.seats, value: `${data.vehicle.specs.seats}` },
      data.vehicle.specs.fuel && { icon: 'local_gas_station', label: data.t.vehicles.fuel, value: data.vehicle.specs.fuel },
    ].filter(Boolean) as Array<{ icon: string; label: string; value: string }>
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const carSchema = $derived({
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
      "availability": data.vehicle.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  });
</script>

<svelte:head>
  <title>{data.vehicle.brand} {data.vehicle.model} {data.vehicle.year} | {data.t.site.name}</title>
  <meta name="description" content="{data.t.vehicleDetail.forRent}: {data.vehicle.brand} {data.vehicle.model} — {data.t.vehicleDetail.specifications}" />
  <script type="application/ld+json">
    {@html JSON.stringify(carSchema)}
  </script>
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

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row gap-sm pt-sm">
          {#if data.vehicle.available}
            <a
              href="/{data.locale}{data.t.nav.links.contact}"
              class="flex-1 text-center bg-primary text-on-primary rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95"
            >
              {data.t.vehicleDetail.bookVehicle}
            </a>
          {:else}
            <span class="flex-1 text-center bg-surface-container text-on-surface-variant rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold">
              {data.t.vehicleDetail.unavailable}
            </span>
          {/if}
          <a
            href="/{data.locale}{data.t.nav.links.inventory}"
            class="flex-1 text-center bg-transparent text-on-surface border border-outline rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-surface-container transition-all duration-300"
          >
            {data.t.vehicleDetail.viewAll}
          </a>
        </div>
      </div>
    </div>
  </div>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
