<script lang="ts">
  import type { Dictionary } from '@/i18n/en';

  interface Props {
    t: Dictionary['payments'];
    hideTitle?: boolean;
    class?: string;
    center?: boolean;
  }

  let { t, hideTitle = false, class: className, center = false }: Props = $props();

  const methods = $derived([
    { id: 'visa', label: t.visa, icon: '/assets/images/payments/visa.svg' },
    { id: 'mastercard', label: t.mastercard, icon: '/assets/images/payments/mastercard.svg' },
    { id: 'sepa', label: t.sepa, icon: '/assets/images/payments/sepa.svg' },
    { id: 'cash', label: t.cash, icon: '/assets/images/payments/cash.svg' }
  ] as const);
</script>

<div class="flex flex-col gap-md {center ? 'items-center text-center' : ''} {className}">
  {#if !hideTitle}
    <h3 class="text-label-caps text-on-surface-variant tracking-wider">{t.title}</h3>
  {/if}

  <div class="flex flex-wrap gap-sm {center ? 'justify-center' : ''}">
    {#each methods as { id, label, icon } (id)}
      <div class="flex items-center gap-xs px-sm py-xs rounded-xl bg-surface-container-low border border-outline-variant/10 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-surface-container-high/40" title={label}>
        <img src={icon} alt={label} class="w-10 h-7 object-contain select-none" draggable="false" />
        <span class="text-body-xs font-semibold text-on-surface select-none pr-xs">{label}</span>
      </div>
    {/each}
  </div>
</div>
