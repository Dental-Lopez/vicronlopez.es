<script lang="ts">
  import { getDictionary } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
  }

  let { locale }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));
</script>

<section class="py-xl bg-surface relative overflow-hidden" id="welcome">
  <!-- Glow Background Decorations -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square bg-primary/5 rounded-full blur-[120px]" aria-hidden="true"></div>
  </div>

  <div class="max-w-7xl mx-auto px-8 relative z-10">
    <div class="max-w-4xl mx-auto text-center space-y-md">
      <!-- Premium Badge -->
      <div class="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary/10 border border-primary/20 text-primary animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span class="material-symbols-outlined text-base filled">star</span>
        <span class="text-label-caps uppercase font-bold tracking-wider">{t.welcome.badge}</span>
      </div>

      <!-- Heading -->
      <h2 class="text-h1 md:text-display font-display font-black tracking-tight leading-tight text-on-surface animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        {t.welcome.title}
      </h2>

      <!-- Subtitle -->
      <p class="text-body-lg text-on-surface-variant font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        {t.welcome.subtitle}
      </p>

      <!-- Glass divider -->
      <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto my-md"></div>

      <!-- Description -->
      <p class="text-body-md text-on-surface-variant/80 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
        {t.welcome.description}
      </p>
    </div>
  </div>
</section>
