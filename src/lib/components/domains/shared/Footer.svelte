<script lang="ts">
  import { getDictionary, getLocalizedPath } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';
  import { business, telHref, mapsUrl } from '@/business';

  interface Props {
    locale: Locale;
    currentUrl: URL;
  }

  let { locale, currentUrl }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));

  const paymentMethods = $derived([
    { id: 'visa', label: t.payments.visa, icon: '/assets/images/visa.svg' },
    { id: 'mastercard', label: t.payments.mastercard, icon: '/assets/images/mastercard.svg' },
    { id: 'sepa', label: t.payments.sepa, icon: '/assets/images/sepa.svg' },
    { id: 'cash', label: t.payments.cash, icon: '/assets/images/cash.svg' }
  ]);

</script>

<footer class="bg-surface-container-lowest border-t border-outline-variant/30 py-xl mt-auto">
  <div class="max-w-7xl mx-auto px-6 md:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl pb-xl">
      <!-- Column 1: Acerca de Vicron Lopez -->
      <div class="space-y-md">
        <h2 class="text-title-lg font-display font-black text-on-surface">
          {t.footer.aboutTitle}
        </h2>
        <p class="text-body-sm text-on-surface-variant leading-relaxed font-body">
          {t.footer.aboutText}
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          {#each paymentMethods as { id, label, icon } (id)}
            <div class="bg-surface-container-high/90 border border-outline-variant/20 rounded px-2 py-1 shadow-sm hover:scale-105 transition-transform duration-300" title={label}>
              <img src={icon} alt={label} class="h-6 w-9 object-contain select-none" draggable="false" />
            </div>
          {/each}
        </div>
      </div>

      <!-- Column 2: Encuéntranos allí -->
      <div class="space-y-md">
        <h2 class="text-title-lg font-display font-black text-on-surface">
          {t.footer.findUsTitle}
        </h2>
        <ul class="space-y-4 font-body text-body-sm text-on-surface-variant">
          <li class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-xl">phone</span>
            <a href={telHref} class="hover:text-primary hover:underline transition-colors">
              {business.phone.display}
            </a>
          </li>
          <li class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-xl">location_on</span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" class="hover:text-primary hover:underline transition-colors">
              Ourense, Galicia, España
            </a>
          </li>
          <li class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-xl">schedule</span>
            <span>{t.contact.hoursLabel}</span>
          </li>
          <li class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-xl">verified</span>
            <a href="https://www.ourense.gal/" target="_blank" rel="noopener noreferrer" class="hover:text-primary hover:underline flex items-center gap-xs">
              {t.footer.licenseText}
              <span class="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </li>
        </ul>

      </div>

      <!-- Column 3: Elegante y potente -->
      <div class="space-y-md flex flex-col justify-between">
        <div class="space-y-md">
          <h2 class="text-title-lg font-display font-black text-on-surface">
            {t.footer.elegantTitle}
          </h2>
          <p class="text-body-sm text-on-surface-variant leading-relaxed font-body">
            {t.footer.elegantText}
          </p>
        </div>
        <div class="pt-4">
          <a
            href={`/${locale}${t.nav.links.inventory}`}
            class="inline-flex items-center gap-sm bg-primary text-on-primary px-lg py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95 font-display text-label-lg font-bold shadow-lg shadow-primary/20"
          >
            {t.footer.rentCta}
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright and Legal Links -->
    <div class="pt-lg border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-md">
      <p class="text-on-surface-variant font-body text-body-sm">
        {t.footer.copyright}
      </p>
      
      <div class="flex items-center gap-md font-body text-body-sm">
        <a href={`/${locale}${t.nav.links.privacy}`} class="text-on-surface-variant hover:text-primary transition-colors">
          {t.footer.privacy}
        </a>
        <span class="text-on-surface-variant/30">•</span>
        <a href={`/${locale}${t.nav.links.terms}`} class="text-on-surface-variant hover:text-primary transition-colors">
          {t.footer.terms}
        </a>
        <span class="text-on-surface-variant/30">•</span>
        <a href={`/${locale}${t.nav.links.cookies}`} class="text-on-surface-variant hover:text-primary transition-colors">
          {t.footer.cookies}
        </a>
        <span class="text-on-surface-variant/30">•</span>
        <a href={`/${locale}${t.nav.links.sitemap}`} class="text-on-surface-variant hover:text-primary transition-colors">
          {t.footer.sitemap}
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
