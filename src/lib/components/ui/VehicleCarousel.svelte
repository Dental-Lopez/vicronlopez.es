<script lang="ts">
  import { getVehicleImages } from '@/lib/vehicleImages';
  import VehicleImage from './VehicleImage.svelte';
  import type { Picture } from '@sveltejs/enhanced-img';

  interface Props {
    slug: string;
    alt: string;
    class?: string;
  }

  let { slug, alt, class: className = '' }: Props = $props();

  const images: Picture[] = $derived(getVehicleImages(slug));

  let carouselEl = $state<HTMLDivElement | null>(null);
  let activeIndex = $state(0);

  function handleScroll() {
    if (!carouselEl) return;
    const { scrollLeft, clientWidth } = carouselEl;
    if (clientWidth > 0) {
      activeIndex = Math.round(scrollLeft / clientWidth);
    }
  }

  function scrollTo(index: number) {
    if (!carouselEl) return;
    carouselEl.scrollTo({
      left: index * carouselEl.clientWidth,
      behavior: 'smooth',
    });
  }
</script>

<div class="relative group/carousel w-full h-full select-none {className}">
  <!-- Main Carousel Container -->
  <div
    bind:this={carouselEl}
    onscroll={handleScroll}
    class="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
  >
    {#each images as img, index}
      <div class="w-full h-full shrink-0 snap-center flex items-center justify-center bg-surface-container-low/40">
        <VehicleImage
          picture={img}
          {alt}
          class="w-full h-full object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchpriority={index === 0 ? 'high' : 'auto'}
        />
      </div>
    {/each}
  </div>

  <!-- Glassmorphic Navigation Arrows (Only if multiple images) -->
  {#if images.length > 1}
    <!-- Left Arrow -->
    {#if activeIndex > 0}
      <button
        type="button"
        onclick={() => scrollTo(activeIndex - 1)}
        class="absolute left-md top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg text-on-surface hover:bg-white/25 dark:hover:bg-black/40 transition-all duration-300 active:scale-90 opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 cursor-pointer"
        aria-label="Previous image"
      >
        <span class="material-symbols-outlined text-[20px] font-bold">arrow_back_ios_new</span>
      </button>
    {/if}

    <!-- Right Arrow -->
    {#if activeIndex < images.length - 1}
      <button
        type="button"
        onclick={() => scrollTo(activeIndex + 1)}
        class="absolute right-md top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg text-on-surface hover:bg-white/25 dark:hover:bg-black/40 transition-all duration-300 active:scale-90 opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 cursor-pointer"
        aria-label="Next image"
      >
        <span class="material-symbols-outlined text-[20px] font-bold">arrow_forward_ios</span>
      </button>
    {/if}

    <!-- Pagination Dots -->
    <div class="absolute bottom-md left-1/2 -translate-x-1/2 z-10 flex items-center gap-xs px-xs py-1.5 rounded-full bg-black/25 dark:bg-white/5 backdrop-blur-[4px] border border-white/10 dark:border-white/5">
      {#each images as _, index}
        <button
          type="button"
          onclick={() => scrollTo(index)}
          class="h-1.5 rounded-full transition-all duration-300 cursor-pointer {activeIndex === index ? 'w-4 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/60'}"
          aria-label="Go to image {index + 1}"
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Hide scrollbars for all browsers */
  .scrollbar-none {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
</style>
