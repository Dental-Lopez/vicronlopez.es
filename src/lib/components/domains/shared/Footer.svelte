<script lang="ts">
  import { getDictionary, getLocalizedPath } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
    currentUrl: URL;
  }

  let { locale, currentUrl }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));
</script>

<footer class="bg-surface-container-lowest border-t border-outline-variant/30 py-xl">
  <div class="max-w-7xl mx-auto px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-lg">
      <!-- Brand -->
      <div class="md:col-span-1">
        <a href={`/${locale}/`} class="text-2xl font-black tracking-tighter font-display text-primary">
          Vicron Lopez
        </a>
        <p class="mt-md text-on-surface-variant font-body text-body-sm leading-relaxed">
          {t.site.description}
        </p>
      </div>

      <!-- Links Column 1 -->
      <div>
        <h2 class="font-display text-label-caps uppercase tracking-wider text-on-surface font-bold mb-md">
          {t.nav.inventory}
        </h2>
        <ul class="space-y-sm">
          <li><a href={`/${locale}${t.nav.links.inventory}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.nav.inventory}</a></li>
        </ul>
      </div>

      <!-- Links Column 2 -->
      <div>
        <h2 class="font-display text-label-caps uppercase tracking-wider text-on-surface font-bold mb-md">
          {t.footer.company}
        </h2>
        <ul class="space-y-sm">
          <li><a href={`/${locale}${t.nav.links.about}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.nav.about}</a></li>
          <li><a href={`/${locale}${t.nav.links.contact}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.footer.contact}</a></li>
          <li><a href={`/${locale}${t.nav.links.sitemap}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.footer.sitemap}</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h2 class="font-display text-label-caps uppercase tracking-wider text-on-surface font-bold mb-md">
          Legal
        </h2>
        <ul class="space-y-sm">
          <li><a href={`/${locale}${t.nav.links.privacy}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.footer.privacy}</a></li>
          <li><a href={`/${locale}${t.nav.links.terms}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.footer.terms}</a></li>
          <li><a href={`/${locale}${t.nav.links.cookies}`} class="text-on-surface-variant hover:text-primary transition-colors text-body-sm">{t.footer.cookies}</a></li>
        </ul>
      </div>
    </div>

    <div class="mt-xl pt-lg border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-md">
      <p class="text-on-surface-variant font-body text-body-sm">
        {t.footer.copyright}
      </p>
      <div class="flex items-center gap-md">
        <a href="tel:+34600123456" class="text-primary font-bold font-body text-body-sm hover:underline transition-colors">
          {t.footer.phone}
        </a>
        <span class="text-on-surface-variant/30">•</span>
        <a href="mailto:info@vicronlopez.es" class="text-primary font-bold font-body text-body-sm hover:underline transition-colors">
          {t.footer.email}
        </a>
      </div>
      <div class="flex items-center space-x-lg">
        {#each ['en', 'es'] as l (l)}
          <a
            href={getLocalizedPath(currentUrl, l as Locale)}
            class="text-body-sm transition-colors duration-300 {locale === l
              ? 'text-primary font-black'
              : 'text-on-surface-variant hover:text-primary'}"
          >
            {l.toUpperCase()}
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>
