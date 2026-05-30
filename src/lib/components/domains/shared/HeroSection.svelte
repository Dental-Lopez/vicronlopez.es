<script lang="ts">
  import type { Locale } from '@/i18n/utils';
  import { getDictionary } from '@/i18n/utils';
  import HeroSearchIsland from '@/components/ui/HeroSearchIsland.svelte';
  import { getSearchableVehicles } from '@/lib/vehicles';
  import heroImg from '$lib/assets/vehicles/lamborghini-huracan-evo.webp?enhanced';

  interface Props {
    locale: Locale;
  }

  let { locale }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));
  const searchableVehicles = getSearchableVehicles();
  const vehicleCount = searchableVehicles.length;
</script>

<section class="relative min-h-[90vh] flex items-center pt-20 bg-surface z-20">
  <!-- Background Decorations (Clipped) -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-[-10%] right-[-5%] w-[60%] aspect-square bg-primary/5 rounded-full blur-[120px]" aria-hidden="true"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[40%] aspect-square bg-primary/5 rounded-full blur-[100px]" aria-hidden="true"></div>
  </div>

  <div class="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-50 overflow-visible">
    <div class="w-full max-w-3xl">
      <!-- Headline Group -->
      <div class="space-y-md">
        <h1 class="text-[clamp(3.5rem,8vw,5.5rem)] font-display font-black tracking-tight leading-none text-on-surface">
          {t.hero.headline}
        </h1>
        <p class="text-body-lg text-on-surface-variant max-w-[60ch] leading-relaxed">
          {t.hero.subheadline}
        </p>
      </div>

      <!-- Search Island -->
      <div class="w-full mt-lg animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 overflow-visible relative z-50">
        <HeroSearchIsland
          {locale}
          placeholder={t.hero.searchPlaceholder}
          filterLabel={t.hero.filterLabel}
          noResults={t.filters.noResults}
          noResultsHint={t.filters.noResultsHint}
          perDay={t.vehicles.perDay}
          vehiclesSlug={t.nav.slugs.vehicles}
          vehicles={searchableVehicles}
        />

        <!-- Stats/Trust -->
        <div class="mt-md flex items-center space-x-lg text-on-surface-variant">
          <div class="flex items-center gap-xs">
            <span class="text-h3 font-display font-bold text-on-surface">{vehicleCount}+</span>
            <span class="text-label-caps uppercase tracking-wider">{t.nav.inventory}</span>
          </div>
          <div class="h-8 w-px bg-outline-variant/30"></div>
          <div class="flex items-center gap-xs">
            <span class="text-h3 font-display font-bold text-on-surface">24/7</span>
            <span class="text-label-caps uppercase tracking-wider">{t.nav.services}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Hero Image/Asset -->
  <div class="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-[45%] xl:w-[55%] h-[70%] pointer-events-none animate-in fade-in zoom-in duration-1000 delay-500 z-10">
    <div class="relative w-full h-full">
      <div class="absolute inset-0 bg-gradient-to-l from-surface via-transparent to-transparent z-10"></div>
      <enhanced:img
        src={heroImg}
        alt="Vicron Lopez Hero"
        class="w-full h-full object-cover rounded-l-[120px] border-l border-y border-outline-variant/20 shadow-2xl"
        fetchpriority="high"
        sizes="(min-width: 1280px) 55vw, (min-width: 1024px) 45vw, 0px"
      />
    </div>
  </div>
</section>
