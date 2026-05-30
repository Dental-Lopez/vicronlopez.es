<script lang="ts">
  import { onMount } from 'svelte';
  import SearchPill from '$lib/components/ui/SearchPill.svelte';
  import VehicleImage from '$lib/components/ui/VehicleImage.svelte';
  import { getUniqueBrands, getUniqueCategories } from '@/lib/vehicles';

  interface SearchableVehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    category: string;
    slug: string;
    image: string;
    pricePerDay: number;
  }

  interface FilterState {
    brand?: string;
    category?: string;
    maxPrice?: number;
  }

  interface Props {
    locale: string;
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
    noResults: string;
    noResultsHint: string;
    perDay: string;
    vehiclesSlug: string;
    vehicles: SearchableVehicle[];
  }

  let {
    locale,
    placeholder,
    filterLabel,
    menuLabels,
    noResults,
    noResultsHint,
    perDay,
    vehiclesSlug,
    vehicles,
  }: Props = $props();

  let query = $state('');
  let filters = $state<FilterState>({});
  let isDropdownVisible = $state(false);
  let containerRef: HTMLDivElement | null = $state(null);

  const brands = $derived(getUniqueBrands(vehicles as { brand: string }[]));
  const categories = $derived(getUniqueCategories(vehicles as { category: string }[]));

  const hasContent = $derived(
    query.trim().length > 0 || !!filters.brand || !!filters.category || !!filters.maxPrice
  );
  const showDropdown = $derived(isDropdownVisible && hasContent);

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase();

    return vehicles
      .filter((v) => {
        if (filters.brand && v.brand !== filters.brand) return false;
        if (filters.category && v.category !== filters.category) return false;
        if (filters.maxPrice && v.pricePerDay > filters.maxPrice) return false;
        if (q) {
          const full = `${v.brand} ${v.model} ${v.category}`.toLowerCase();
          return full.includes(q);
        }
        return true;
      })
      .slice(0, 5);
  });

  function formatPrice(v: SearchableVehicle): string {
    return `$${String(v.pricePerDay)} ${perDay}`;
  }

  onMount(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef && !containerRef.contains(e.target as Node)) {
        isDropdownVisible = false;
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        isDropdownVisible = false;
      }
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onEsc);
    };
  });
</script>

<div bind:this={containerRef} class="relative w-full max-w-2xl z-50">
  <div class="relative z-10">
    <SearchPill
      {placeholder}
      {filterLabel}
      {menuLabels}
      {brands}
      {categories}
      onSearch={(q) => {
        query = q;
        isDropdownVisible = true;
      }}
      onFilterChange={(f) => {
        filters = f;
        isDropdownVisible = true;
      }}
    />
  </div>

  {#if showDropdown}
    <div class="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xl overflow-hidden z-[100]">
      {#if filtered.length === 0}
        <div class="px-lg py-md text-center">
          <p class="text-on-surface font-semibold text-body-md">{noResults}</p>
          <p class="text-on-surface-variant text-body-sm mt-xs">{noResultsHint}</p>
        </div>
      {:else}
        <ul>
          {#each filtered as v (v.id)}
            {@const p = formatPrice(v)}
            <li>
              <a
                href={`/${locale}/${vehiclesSlug}/${v.slug}`}
                class="flex items-center gap-md px-lg py-sm hover:bg-surface-container transition-colors duration-150 group"
                onclick={() => { query = ''; }}
              >
                <VehicleImage
                  slug={v.slug}
                  alt={`${v.brand} ${v.model}`}
                  class="w-16 h-10 object-cover rounded-lg shrink-0 border border-outline-variant/20"
                  sizes="64px"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-on-surface font-semibold text-body-md truncate group-hover:text-primary transition-colors">
                    {v.year} {v.brand} {v.model}
                  </p>
                  <p class="text-on-surface-variant text-body-sm capitalize">
                    {v.category.replace(/-/g, ' ')}
                  </p>
                </div>
                {#if p}
                  <span class="text-primary font-bold text-body-sm shrink-0">{p}</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>
