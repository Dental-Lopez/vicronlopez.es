<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import VehicleHubIsland from '@/components/ui/VehicleHubIsland.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.t.nav.inventory} | {data.t.site.name}</title>
  <meta name="description" content={data.t.vehicles.allVehiclesSubline} />
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main class="pt-24 pb-xl">
  <section class="mb-lg">
    <div class="max-w-7xl mx-auto px-8">
      <div class="border-b border-outline-variant/20 pb-lg">
        <div class="space-y-sm">
          <h1 class="text-h1 font-display font-black tracking-tight text-on-surface">
            {data.t.vehicles.allVehicles}
          </h1>
          <p class="text-body-lg text-on-surface-variant max-w-2xl">
            {data.t.vehicles.allVehiclesSubline}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="max-w-7xl mx-auto px-8">
      <h2 class="sr-only">{data.t.filters.searchLabel}</h2>
      <VehicleHubIsland
        vehicles={data.vehicles}
        locale={data.locale}
        labels={{
          placeholder: data.t.hero.searchPlaceholder,
          filterLabel: data.t.hero.filterLabel,
          filters: [
            { label: data.t.filters.electric, value: 'electric' },
            { label: data.t.filters.suv, value: 'suv' },
            { label: data.t.filters.luxury, value: 'luxury' },
            { label: data.t.filters.budget, value: 'budget' },
          ],
          noResults: data.t.filters.noResults,
          clearFilters: data.t.filters.clearFilters,
          found: data.t.filters.searchLabel,
          bookNow: data.t.vehicles.bookNow,
        }}
        vehiclesSlug={data.t.nav.slugs.vehicles}
      />
    </div>
  </section>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
