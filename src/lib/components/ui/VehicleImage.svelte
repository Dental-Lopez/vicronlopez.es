<script lang="ts">
  import { getVehicleImage } from '@/lib/vehicleImages';
  import type { Picture } from '@sveltejs/enhanced-img';

  interface Props {
    slug?: string;
    picture?: Picture;
    alt: string;
    class?: string;
    sizes?: string;
    loading?: 'lazy' | 'eager';
    fetchpriority?: 'high' | 'low' | 'auto';
  }

  let {
    slug,
    picture,
    alt,
    class: klass,
    sizes,
    loading = 'lazy',
    fetchpriority,
  }: Props = $props();

  const pic = $derived(picture ?? (slug ? getVehicleImage(slug) : undefined));
</script>

{#if pic}
  <enhanced:img src={pic} {alt} class={klass} {sizes} {loading} {fetchpriority} />
{/if}

