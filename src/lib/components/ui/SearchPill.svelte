<script lang="ts">
  import { onMount } from 'svelte';

  interface FilterState {
    brand?: string;
    category?: string;
    maxPrice?: number;
  }

  interface MenuLabels {
    title: string;
    clearAll: string;
    brand: string;
    category: string;
    allBrands: string;
    allCategories: string;
    maxPrice: string;
    anyPrice: string;
  }

  interface Props {
    placeholder: string;
    filterLabel: string;
    menuLabels: MenuLabels;
    brands?: string[];
    categories?: string[];
    onSearch?: (query: string) => void;
    onFilterChange?: (filters: FilterState) => void;
  }

  let {
    placeholder,
    filterLabel,
    menuLabels,
    brands = [],
    categories = [],
    onSearch,
    onFilterChange,
  }: Props = $props();

  let query = $state('');
  let isFilterOpen = $state(false);
  let filters = $state<FilterState>({});
  let menuRef: HTMLDivElement | null = $state(null);

  const hasActiveFilters = $derived(!!(filters.brand || filters.category || filters.maxPrice));

  function handleQueryChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    query = value;
    onSearch?.(value);
  }

  function updateFilter(key: keyof FilterState, value: string | number | undefined) {
    const nextFilters = { ...filters, [key]: value === '' ? undefined : value };
    filters = nextFilters;
    onFilterChange?.(nextFilters);

    if (key !== 'maxPrice') {
      isFilterOpen = false;
    }
  }

  function clearFilters() {
    const empty: FilterState = {};
    filters = empty;
    onFilterChange?.(empty);
  }

  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef && !menuRef.contains(event.target as Node)) {
        isFilterOpen = false;
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        isFilterOpen = false;
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  });
</script>

<div class="w-full max-w-2xl animate-in fade-in zoom-in duration-1000 delay-300 relative">
  <div class="w-full bg-surface/80 backdrop-blur-xl rounded-[2rem] sm:rounded-full p-1.5 shadow-lg border border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 transition-all duration-300 hover:shadow-xl hover:border-white/40">

    <!-- Search and Filter Row -->
    <div class="flex flex-1 items-center gap-1.5 min-w-0">
      <!-- Search Input Group -->
      <div class="flex-1 flex items-center px-4 min-w-0 bg-surface-container-highest/30 sm:bg-transparent rounded-full h-11 sm:h-auto">
        <span class="material-symbols-outlined text-on-surface-variant text-xl mr-3 opacity-50 shrink-0">search</span>
        <input
          type="text"
          value={query}
          oninput={handleQueryChange}
          {placeholder}
          class="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/50 text-body-md py-2 sm:py-0"
        />
      </div>

      <!-- Filter Trigger -->
      <button
        onclick={(e) => {
          e.stopPropagation();
          isFilterOpen = !isFilterOpen;
        }}
        class="flex items-center justify-center gap-2 px-4 sm:px-6 h-11 sm:h-10 rounded-full transition-all duration-300 shrink-0 relative {isFilterOpen || hasActiveFilters
          ? 'bg-primary text-on-primary shadow-md'
          : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}"
      >
        <span class="material-symbols-outlined text-xl">tune</span>
        <span class="text-label-sm font-bold hidden lg:inline">{filterLabel}</span>
        {#if hasActiveFilters}
          <span class="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border border-surface shadow-sm animate-pulse"></span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Filter Menu Dropdown -->
  {#if isFilterOpen}
    <div
      bind:this={menuRef}
      class="absolute top-full right-0 mt-3 w-full sm:w-80 bg-surface/95 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/20 z-[60] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
    >
      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <h3 class="text-label-sm font-black text-on-surface uppercase tracking-widest">{menuLabels.title}</h3>
          {#if hasActiveFilters}
            <button
              onclick={clearFilters}
              class="text-body-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {menuLabels.clearAll}
            </button>
          {/if}
        </div>

        <!-- Brand Filter -->
        <div class="flex flex-col gap-2">
          <label
            for="filter-brand"
            class="text-body-xs font-black text-on-surface-variant uppercase tracking-tighter opacity-70"
          >
            {menuLabels.brand}
          </label>
          <select
            id="filter-brand"
            value={filters.brand || ''}
            onchange={(e) => updateFilter('brand', (e.target as HTMLSelectElement).value)}
            class="w-full bg-surface-container-highest/40 border border-white/10 rounded-xl px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer appearance-none"
          >
            <option value="">{menuLabels.allBrands}</option>
            {#each brands as b (b)}
              <option value={b}>{b}</option>
            {/each}
          </select>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-col gap-2">
          <label
            for="filter-category"
            class="text-body-xs font-black text-on-surface-variant uppercase tracking-tighter opacity-70"
          >
            {menuLabels.category}
          </label>
          <select
            id="filter-category"
            value={filters.category || ''}
            onchange={(e) => updateFilter('category', (e.target as HTMLSelectElement).value)}
            class="w-full bg-surface-container-highest/40 border border-white/10 rounded-xl px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer appearance-none"
          >
            <option value="">{menuLabels.allCategories}</option>
            {#each categories as c (c)}
              <option value={c}>{c}</option>
            {/each}
          </select>
        </div>

        <!-- Price Filter -->
        <div class="flex flex-col gap-2">
          <label
            for="filter-price"
            class="text-body-xs font-black text-on-surface-variant uppercase tracking-tighter opacity-70"
          >
            {menuLabels.maxPrice}
          </label>
          <input
            id="filter-price"
            type="number"
            placeholder={menuLabels.anyPrice}
            value={filters.maxPrice || ''}
            oninput={(e) => {
              const v = (e.target as HTMLInputElement).value;
              updateFilter('maxPrice', v ? Number(v) : undefined);
            }}
            class="w-full bg-surface-container-highest/40 border border-white/10 rounded-xl px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </div>
    </div>
  {/if}
</div>
