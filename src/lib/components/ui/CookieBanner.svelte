<script lang="ts">
  import { onMount } from 'svelte';
  import { getDictionary } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
    visible?: boolean;
  }

  let {
    locale,
    visible = $bindable(false)
  }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));

  onMount(() => {
    const hasAccepted = localStorage.getItem('cookies-accepted');
    if (hasAccepted) return;

    setTimeout(() => {
      visible = true;
    }, 2000);
  });

  function accept() {
    localStorage.setItem('cookies-accepted', 'true');
    visible = false;
  }
</script>

<div
  id="cookie-banner"
  class="w-full transition-[transform,opacity] duration-500 ease-out
         translate-y-full opacity-0 pointer-events-none
         starting:translate-y-full starting:opacity-0
         motion-reduce:transition-none
         [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 [&.is-visible]:pointer-events-auto"
  class:is-visible={visible}
  role="alert"
  aria-hidden={!visible}
  inert={!visible}
  style="will-change: transform, opacity;"
>
  <div class="max-w-7xl mx-auto">
    <div class="bg-surface-container-high/95 backdrop-blur-3xl border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
      <!-- Glow effect -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="flex items-start md:items-center gap-6 relative z-10">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
          <span class="material-symbols-outlined text-primary text-2xl">cookie</span>
        </div>
        <div>
          <p class="font-body text-body-md text-on-surface leading-relaxed max-w-2xl">
            {t.legal.cookies.banner}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4 shrink-0 w-full md:w-auto relative z-10">
        <a
          href={`/${locale}/legal/cookies/`}
          class="flex-1 md:flex-none text-center px-6 py-3 rounded-full border border-outline text-on-surface-variant font-display text-label-md hover:bg-surface-container-highest transition-colors"
        >
          {t.legal.cookies.settings}
        </a>
        <button
          id="accept-cookies"
          onclick={accept}
          class="flex-1 md:flex-none px-8 py-3 rounded-full bg-primary text-on-primary font-display text-label-md font-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          {t.legal.cookies.accept}
        </button>
      </div>
    </div>
  </div>
</div>
