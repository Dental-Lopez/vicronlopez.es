<script lang="ts">
  import type { Dictionary } from '@/i18n/en';

  interface Props {
    t: Dictionary['payments'];
    hideTitle?: boolean;
    class?: string;
  }

  let { t, hideTitle = false, class: className }: Props = $props();

  const methods = $derived([
    { id: 'visa', label: t.visa, icon: '/assets/images/visa.svg' },
    { id: 'mastercard', label: t.mastercard, icon: '/assets/images/mastercard.svg' },
    { id: 'maestro', label: t.maestro, icon: '/assets/images/maestro.svg' },
    { id: 'amex', label: t.amex, icon: '/assets/images/amex.svg' },
    { id: 'paypal', label: t.paypal, icon: '/assets/images/paypal.svg' },
    { id: 'apple-pay', label: t.applePay, icon: '/assets/images/apple-pay.svg' },
    { id: 'google-pay', label: t.googlePay, icon: '/assets/images/google-pay.svg' },
    { id: 'sepa', label: t.sepa, icon: '/assets/images/sepa.svg' },
    { id: 'cash', label: t.cash, icon: '/assets/images/cash.svg' }
  ] as const);
</script>

<div class="flex flex-col gap-md {className}">
  {#if !hideTitle}
    <h3 class="text-label-caps text-on-surface-variant tracking-wider">{t.title}</h3>
  {/if}

  <div class="flex flex-wrap gap-sm">
    {#each methods as { id, label, icon } (id)}
      <div class="flex items-center gap-xs px-sm py-xs rounded-xl bg-surface-container-low border border-outline-variant/10 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-surface-container-high/40" title={label}>
        <img src={icon} alt={label} class="w-10 h-7 object-contain select-none" draggable="false" />
        <span class="text-body-xs font-semibold text-on-surface select-none pr-xs">{label}</span>
      </div>
    {/each}
  </div>
</div>
