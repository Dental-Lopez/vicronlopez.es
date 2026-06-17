<script lang="ts">
  import { getDictionary, getLocalizedPath } from '@/i18n/utils';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
    currentUrl: URL;
  }

  let { locale, currentUrl }: Props = $props();
  const t = $derived.by(() => getDictionary(locale));

  const paymentMethods = $derived([
    { id: 'visa', label: t.payments.visa, icon: '/assets/images/visa.svg' },
    { id: 'mastercard', label: t.payments.mastercard, icon: '/assets/images/mastercard.svg' },
    { id: 'maestro', label: t.payments.maestro, icon: '/assets/images/maestro.svg' },
    { id: 'amex', label: t.payments.amex, icon: '/assets/images/amex.svg' },
    { id: 'paypal', label: t.payments.paypal, icon: '/assets/images/paypal.svg' },
    { id: 'applePay', label: t.payments.applePay, icon: '/assets/images/apple-pay.svg' },
    { id: 'googlePay', label: t.payments.googlePay, icon: '/assets/images/google-pay.svg' },
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
            <a href="tel:+34698133249" class="hover:text-primary hover:underline transition-colors">
              +34 698 13 32 49
            </a>
          </li>
          <li class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-xl">location_on</span>
            <span>Ourense, Galicia, España</span>
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
        <!-- Social Icons in Yellow Circles -->
        <div class="flex items-center gap-md pt-2">
          <a
            href="https://wa.me/34698133249"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-black flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 12.008 0c3.202.001 6.212 1.249 8.477 3.518s3.513 5.278 3.513 8.484c-.004 6.557-5.341 11.905-11.951 11.905-2.005-.001-3.974-.505-5.732-1.47L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.584 1.968 14.117.943 11.99.943c-5.438 0-9.864 4.42-9.868 9.853-.001 1.762.476 3.483 1.38 5.006L2.46 21.571l5.867-1.537zm10.882-6.772c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-black flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-black flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>
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
            class="inline-flex items-center gap-sm bg-amber-400 text-black px-lg py-3 rounded-full hover:bg-amber-500 transition-all duration-300 active:scale-95 font-display text-label-lg font-bold shadow-lg shadow-amber-400/10"
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
