<script lang="ts">
  import { getDictionary } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
  }

  let { locale }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));

  const cards = $derived([
    {
      icon: 'precision_manufacturing',
      title: t.features.precisionTitle,
      body: t.features.precisionBody,
    },
    {
      icon: 'handshake',
      title: t.features.flexibleTitle,
      body: t.features.flexibleBody,
    },
    {
      icon: 'language',
      title: t.features.networkTitle,
      body: t.features.networkBody,
    },
  ] as const);
</script>

<section class="py-xl bg-surface-container-lowest relative z-10" id="overview">
  <div class="max-w-7xl mx-auto px-8">
    <h2 class="sr-only">{t.features.sectionTitle}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
      {#each cards as { icon, title, body } (icon)}
        <article class="p-lg rounded-xl border border-outline-variant/20 hover:atmospheric-shadow transition-all duration-300 group">
          <!-- Icon -->
          <div class="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-md">
            <span class="material-symbols-outlined filled text-2xl text-primary">{icon}</span>
          </div>

          <!-- Content -->
          <h3 class="text-h3 font-display font-semibold text-on-surface mb-sm">
            {title}
          </h3>
          <p class="text-body-md font-body text-on-surface-variant leading-relaxed">
            {body}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>
