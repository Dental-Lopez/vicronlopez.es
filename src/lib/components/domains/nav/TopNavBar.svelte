<script lang="ts">
  import { getDictionary, getLocalizedPath } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';
  import { business, telHref, mailtoHref } from '@/business';
  import ThemeToggle from '@/components/ui/ThemeToggle.svelte';

  interface Props {
    locale: Locale;
    currentUrl: URL;
    lightLabel: string;
    darkLabel: string;
  }

  let { locale, currentUrl, lightLabel, darkLabel }: Props = $props();
  const currentPath = $derived(currentUrl.pathname);
  const t = $derived.by(() => getDictionary(locale));

  const navLinks = $derived([
    { href: `/${locale}/`, label: t.nav.overview },
    { href: `/${locale}${t.nav.links.inventory}`, label: t.nav.inventory },
    { href: `/${locale}${t.nav.links.about}`, label: t.nav.about },
    { href: `/${locale}${t.nav.links.contact}`, label: t.nav.contact },
  ]);

  function isActive(href: string): boolean {
    const normalizedPath = currentPath.replace(/\/$/, '');
    const normalizedHref = href.replace(/\/$/, '');
    return normalizedPath === normalizedHref;
  }

  let isOpen = $state(false);

  function toggleMenu() {
    isOpen = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (isOpen) toggleMenu();
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 nav-shadow">
  <nav class="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30">
    <div class="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
      <!-- Logo -->
      <a href={`/${locale}/`} class="shrink-0" aria-label="Vicron Lopez - Home">
        <img
          src="/vicronlopez/vicron-horizontal-claro.svg"
          alt=""
          width="292"
          height="104"
          fetchpriority="high"
          class="block dark:hidden h-10 md:h-12 w-auto"
        />
        <img
          src="/vicronlopez/vicron-horizontal-oscuro.svg"
          alt=""
          width="292"
          height="104"
          fetchpriority="high"
          class="hidden dark:block h-10 md:h-12 w-auto"
        />
      </a>

      <!-- Desktop Nav Links -->
      <ul class="hidden lg:flex items-center space-x-lg" role="list">
        {#each navLinks as { href, label } (href)}
          <li>
            <a
              {href}
              class={isActive(href)
                ? 'text-primary border-b-2 border-primary pb-1 font-body text-body-md transition-colors duration-300'
                : 'text-on-surface-variant hover:text-primary font-body text-body-md transition-colors duration-300'}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Actions -->
      <div class="flex items-center space-x-4 md:space-x-6">
        <!-- Lang Selector -->
        <div class="flex items-center bg-surface-container-high rounded-full p-1.5 shadow-inner">
          {#each ['EN', 'ES'] as lang (lang)}
            {@const l = lang.toLowerCase() as Locale}
            {@const active = locale === l}
            <a
              href={getLocalizedPath(currentUrl, l)}
              class="px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-black transition-all duration-300 {active
                ? 'bg-primary text-on-primary shadow-md scale-105'
                : 'text-on-surface-variant hover:text-primary'}"
            >
              {lang}
            </a>
          {/each}
        </div>

        <div class="scale-110 md:scale-100">
          <ThemeToggle {lightLabel} {darkLabel} />
        </div>

        <!-- Phone -->
        <a
          href={telHref}
          class="inline-flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:rounded-full bg-primary text-on-primary md:px-lg md:py-2.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-90"
          aria-label={`${t.nav.callAria} ${business.phone.display}`}
        >
          <span class="material-symbols-outlined md:hidden text-[24px]">call</span>
          <span class="hidden md:inline text-label-caps uppercase tracking-[0.05em] font-semibold font-body">{business.phone.display}</span>
        </a>

        <!-- Burger Button -->
        <button
          id="mobile-menu-button"
          onclick={toggleMenu}
          class="lg:hidden flex items-center justify-center w-12 h-12 bg-transparent text-on-surface-variant hover:text-primary transition-all duration-300 relative"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span
            class="material-symbols-outlined text-[32px] absolute transition-all duration-300"
            class:opacity-0={isOpen}
            class:scale-50={isOpen}
            class:rotate-90={isOpen}
          >
            menu
          </span>
          <span
            class="material-symbols-outlined text-[32px] absolute transition-all duration-300"
            class:opacity-0={!isOpen}
            class:scale-50={!isOpen}
          >
            close
          </span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div
    id="mobile-menu"
    class="fixed inset-0 top-20 bg-surface/95 backdrop-blur-2xl lg:hidden transition-transform duration-500 ease-out z-40"
    class:translate-x-full={!isOpen}
  >
    <div class="flex flex-col h-full p-8">
      <ul class="space-y-6" role="list">
        {#each navLinks as { href, label }, index (href)}
          <li
            class="transition-all duration-500 delay-100"
            class:translate-y-8={!isOpen}
            class:opacity-0={!isOpen}
            style="transition-delay: {isOpen ? 100 + index * 50 : 0}ms"
          >
            <a
              {href}
              onclick={closeMenu}
              class={isActive(href)
                ? 'text-4xl font-display font-black text-primary'
                : 'text-4xl font-display font-black text-on-surface-variant hover:text-primary transition-colors'}
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>

      <div
        class="mt-auto pt-8 border-t border-outline-variant/20 transition-all duration-500"
        class:translate-y-8={!isOpen}
        class:opacity-0={!isOpen}
        style="transition-delay: {isOpen ? 300 : 0}ms"
      >
        <p class="text-label-caps text-on-surface-variant/60 mb-4">{t.contact.title}</p>
        <a href={mailtoHref} class="text-xl font-body text-on-surface hover:text-primary transition-colors">
          {business.email}
        </a>
      </div>
    </div>
  </div>
</header>

<style>
  .nav-shadow {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
  }
</style>
