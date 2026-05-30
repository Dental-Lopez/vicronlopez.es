<script lang="ts">
  import type { Vehicle } from '@/schemas/vehicle';
  import type { Locale } from '@/i18n/utils';
  import { filterVehicles, getUniqueBrands, getUniqueCategories } from '@/lib/vehicles';
  import { formatCurrency } from '@/lib/formatters';
  import SearchPill from '$lib/components/ui/SearchPill.svelte';
  import QuickFilterTags from '$lib/components/ui/QuickFilterTags.svelte';
  import VehicleImage from '$lib/components/ui/VehicleImage.svelte';
  import { SvelteSet } from 'svelte/reactivity';

  interface FilterState {
    brand?: string;
    category?: string;
    maxPrice?: number;
  }

  interface VehicleHubLabels {
    placeholder: string;
    filterLabel: string;
    menuLabels: {
      title: string;
      clearAll: string;
      brand: string;
      category: string;
      allBrands: string;
      allCategories: string;
      maxPrice: string;
      anyPrice: string;
    };
    filters: Array<{ label: string; value: string }>;
    noResults: string;
    clearFilters: string;
    found: string;
    bookNow: string;
  }

  interface Props {
    vehicles: Vehicle[];
    locale: Locale;
    labels: VehicleHubLabels;
    vehiclesSlug: string;
  }

  let { vehicles, locale, labels, vehiclesSlug }: Props = $props();

  let query = $state('');
  let filters = $state<FilterState>({});
  let activeTags = $state<string[]>([]);

  const brands = $derived(getUniqueBrands(vehicles));
  const categories = $derived(getUniqueCategories(vehicles));

  const filtered = $derived.by(() => {
    let result = filterVehicles(vehicles, {
      search: query || undefined,
      brand: filters.brand,
      category: filters.category,
      maxPricePerDay: filters.maxPrice,
    });

    if (activeTags.length > 0) {
      const catSet = new SvelteSet<string>();
      let maxRent: number | undefined;

      for (const tag of activeTags) {
        if (tag === 'electric') catSet.add('electric-sedan');
        if (tag === 'suv') {
          catSet.add('suv');
          catSet.add('luxury-suv');
        }
        if (tag === 'luxury') {
          catSet.add('luxury-suv');
          catSet.add('sports-coupe');
        }
        if (tag === 'budget') {
          maxRent = 150;
        }
      }

      result = result.filter((v) => {
        if (catSet.size > 0 && !catSet.has(v.category)) return false;
        if (maxRent !== undefined && v.pricePerDay > maxRent) return false;
        return true;
      });
    }

    return result;
  });
</script>

<div class="w-full">
  <div class="relative z-30 mb-lg">
    <SearchPill
      placeholder={labels.placeholder}
      filterLabel={labels.filterLabel}
      menuLabels={labels.menuLabels}
      {brands}
      {categories}
      onSearch={(q) => { query = q; }}
      onFilterChange={(f) => { filters = f; }}
    />
  </div>

  <QuickFilterTags
    filters={labels.filters}
    onFilterChange={(tags) => { activeTags = tags; }}
  />

  <p data-testid="result-count" class="text-body-sm text-on-surface-variant mt-lg mb-md">
    <span class="font-bold text-on-surface">{filtered.length}</span>
    {labels.found}
  </p>

  {#if filtered.length === 0}
    <div class="py-xl text-center">
      <span class="material-symbols-outlined text-5xl text-outline/40 block mb-md">
        directions_car
      </span>
      <p data-testid="empty-state" class="text-body-lg text-on-surface-variant">
        {labels.noResults}
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg">
      {#each filtered as vehicle, i (vehicle.id)}
        {@const formatted = formatCurrency(vehicle.pricePerDay, locale)}
        {@const suffix = ' / day'}
        <div
          class="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style="animation-delay: {i * 60}ms"
        >
          <article class="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:atmospheric-shadow hover:-translate-y-1">
            <div class="relative aspect-[16/10] overflow-hidden">
              <VehicleImage
                slug={vehicle.slug}
                alt={`${vehicle.brand} ${vehicle.model}`}
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              />
              {#if !vehicle.available}
                <div class="absolute inset-0 bg-surface/60 backdrop-blur-[2px] flex items-center justify-center">
                  <span class="px-4 py-1 rounded-full bg-surface/80 text-on-surface text-xs font-bold uppercase tracking-wider">
                    Unavailable
                  </span>
                </div>
              {/if}
            </div>
            <div class="p-md flex flex-col gap-sm">
              <div class="flex justify-between items-start gap-xs">
                <div>
                  <p class="text-label-caps text-on-surface-variant font-medium tracking-wider mb-xs">
                    {vehicle.year} · {vehicle.brand}
                  </p>
                  <h3 class="text-h3 font-display font-bold text-on-surface leading-tight">
                    {vehicle.model}
                  </h3>
                </div>
                <p class="text-h3 font-display font-bold text-primary text-right">
                  {formatted}
                  <span class="text-body-sm font-body font-normal text-on-surface-variant">
                    {suffix}
                  </span>
                </p>
              </div>
              <a
                href={`/${locale}/${vehiclesSlug}/${vehicle.slug}`}
                class="mt-xs block text-center bg-primary text-on-primary rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95"
              >
                {labels.bookNow}
              </a>
            </div>
          </article>
        </div>
      {/each}
    </div>
  {/if}
</div>
