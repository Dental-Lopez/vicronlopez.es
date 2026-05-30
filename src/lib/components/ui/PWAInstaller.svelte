<script lang="ts">
  import { onMount } from 'svelte';
  import { getDictionary } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
    visible?: boolean;
    height?: number;
    bottomOffset?: number;
  }

  let {
    locale,
    visible = $bindable(false),
    height = $bindable(0),
    bottomOffset = 24
  }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));

  let banner: HTMLDivElement | null = $state(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let deferredPrompt: any = null;

  function hideBanner() {
    visible = false;
  }

  async function install() {
    if (!deferredPrompt) {
      alert('Para instalar esta aplicación, usa la opción "Añadir a la pantalla de inicio" de tu navegador.');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installer-dismissed', 'true');
      hideBanner();
    }
    deferredPrompt = null;
  }

  function close() {
    localStorage.setItem('pwa-installer-dismissed', 'true');
    hideBanner();
  }

  onMount(() => {
    const isDismissed = localStorage.getItem('pwa-installer-dismissed');
    if (isDismissed) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    const trigger = document.getElementById('below-the-fold-trigger');
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              visible = true;
            }, 2000);
            observer.unobserve(trigger);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(trigger);
  });
</script>

<div
  bind:this={banner}
  bind:clientHeight={height}
  id="pwa-installer"
  class="fixed left-6 right-6 md:left-auto md:right-6 z-[90] transition-all duration-700 ease-out p-0 md:w-[450px]"
  class:translate-y-full={!visible}
  class:opacity-0={!visible}
  class:pointer-events-none={!visible}
  class:translate-y-0={visible}
  class:opacity-100={visible}
  style="bottom: {bottomOffset}px; will-change: transform, opacity, bottom;"
  role="complementary"
>
  <div class="bg-surface-container-high/95 backdrop-blur-3xl border border-outline-variant/30 rounded-3xl p-5 md:p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] flex items-center gap-5 overflow-hidden relative group">
    <!-- Glow effect -->
    <div class="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="shrink-0 relative">
      <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center shadow-inner overflow-hidden border border-outline-variant/20 p-2">
        <picture class="w-full h-full object-contain rounded-full flex items-center justify-center">
          <source
            srcset="/icons/icon-48.webp 48w,
                    /icons/icon-72.webp 72w,
                    /icons/icon-96.webp 96w,
                    /icons/icon-144.webp 144w,
                    /icons/icon-192.webp 192w"
            sizes="48px"
            type="image/webp"
          />
          <source
            srcset="/icons/icon-48.png 48w,
                    /icons/icon-72.png 72w,
                    /icons/icon-96.png 96w,
                    /icons/icon-144.png 144w,
                    /icons/icon-192x192.png 192w"
            sizes="48px"
            type="image/png"
          />
          <img
            src="/icons/icon-192x192.png"
            alt="App Icon"
            class="w-full h-full object-contain rounded-full"
            loading="lazy"
            width="48"
            height="48"
          />
        </picture>
      </div>
      <!-- Badge-like effect -->
      <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-surface-container-high flex items-center justify-center">
        <span class="material-symbols-outlined text-on-primary text-[14px]">download</span>
      </div>
    </div>

    <div class="flex-1 min-w-0 relative z-10">
      <h3 class="font-display text-title-md text-on-surface font-bold truncate">
        {t.legal.pwa.title}
      </h3>
      <p class="font-body text-body-sm text-on-surface-variant line-clamp-2 mt-1">
        {t.legal.pwa.description}
      </p>
    </div>

    <div class="flex items-center gap-3 shrink-0 relative z-10">
      <button
        id="install-pwa-btn"
        onclick={install}
        class="px-5 py-2.5 rounded-full bg-primary text-on-primary font-display text-label-lg font-bold flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20"
      >
        <span class="material-symbols-outlined text-[18px]">download</span>
        {t.legal.pwa.install}
      </button>
      <button
        id="close-pwa-installer"
        onclick={close}
        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"
        aria-label="Close"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
  </div>
</div>
