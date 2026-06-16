<script lang="ts">
  import type { Dictionary } from '@/i18n/en';

  interface Props {
    t: Dictionary['payments'];
    hideTitle?: boolean;
    class?: string;
  }

  let { t, hideTitle = false, class: className }: Props = $props();
</script>

<div class="flex flex-col gap-md {className}">
  {#if !hideTitle}
    <h3 class="text-label-caps text-on-surface-variant tracking-wider">{t.title}</h3>
  {/if}

  <div class="flex flex-wrap gap-sm">
    <!-- Visa Card -->
    <div class="flex items-center gap-xs px-sm py-xs rounded-xl bg-surface-container-low border border-outline-variant/10 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-surface-container-high/40">
      <!-- Visa SVG -->
      <svg class="w-10 h-7" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="36" height="24" rx="4" fill="#1A1F71"/>
        <path d="M11.7 16.5H9.9L11 9.5H12.8L11.7 16.5ZM17.4 9.7C17.1 9.5 16.5 9.3 15.8 9.3C14.1 9.3 12.9 10.2 12.9 11.5C12.9 12.5 13.8 13 14.5 13.3C15.2 13.6 15.4 13.8 15.4 14.1C15.4 14.6 14.8 14.8 14.2 14.8C13.2 14.8 12.7 14.5 12.3 14.3L11.9 16C12.4 16.2 13.3 16.4 14.2 16.4C16 16.4 17.2 15.5 17.2 14.1C17.2 12.9 16.4 12.4 15.2 11.8C14.5 11.5 14.2 11.3 14.2 11C14.2 10.6 14.6 10.3 15.3 10.3C15.9 10.3 16.4 10.5 16.7 10.6L17.1 9L17.4 9.7ZM21.7 9.5H20.1C19.6 9.5 19.3 9.7 19.1 10.2L16.2 16.5H18.1L18.5 15.3H20.8L21 16.5H22.7L21.7 9.5ZM19 13.8L19.9 11.2L20.4 13.8H19ZM27.1 9.5L25.6 16.5H23.9L25.4 9.5H27.1Z" fill="white"/>
        <path d="M7.7 9.5H4.6L4.3 9.8C5.5 10.1 6.5 10.8 7.1 11.4L6.5 16.5H8.3L10.8 9.5H7.7Z" fill="#F7A600"/>
      </svg>
      <span class="text-body-xs font-semibold text-on-surface select-none pr-xs">{t.visa}</span>
    </div>

    <!-- Mastercard Card -->
    <div class="flex items-center gap-xs px-sm py-xs rounded-xl bg-surface-container-low border border-outline-variant/10 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-surface-container-high/40">
      <!-- Mastercard SVG -->
      <svg class="w-10 h-7" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="36" height="24" rx="4" fill="#0A0A0A"/>
        <circle cx="14.5" cy="12" r="7" fill="#EB001B"/>
        <circle cx="21.5" cy="12" r="7" fill="#F79E1B"/>
        <path d="M18 12C18 10.2 18.7 8.5 19.8 7.3C18.6 6.1 16.9 5.4 15.1 5.4C11.2 5.4 8 8.6 8 12.5C8 16.4 11.2 19.6 15.1 19.6C16.9 19.6 18.6 18.9 19.8 17.7C18.7 16.5 18 14.8 18 12Z" fill="#EB001B"/>
        <path d="M28 12.5C28 8.6 24.8 5.4 20.9 5.4C19.1 5.4 17.4 6.1 16.2 7.3C17.3 8.5 18 10.2 18 12C18 13.8 17.3 15.5 16.2 16.7C17.4 17.9 19.1 18.6 20.9 18.6C24.8 18.6 28 15.4 28 12.5Z" fill="#F79E1B"/>
        <path d="M19.8 7.3C18.7 8.5 18 10.2 18 12C18 13.8 18.7 15.5 19.8 16.7C20.9 15.5 21.6 13.8 21.6 12C21.6 10.2 20.9 8.5 19.8 7.3Z" fill="#FF5F00"/>
      </svg>
      <span class="text-body-xs font-semibold text-on-surface select-none pr-xs">{t.mastercard}</span>
    </div>

    <!-- Cash Card -->
    <div class="flex items-center gap-xs px-sm py-xs rounded-xl bg-surface-container-low border border-outline-variant/10 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-surface-container-high/40">
      <!-- Cash SVG -->
      <svg class="w-10 h-7" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="36" height="24" rx="4" fill="#1B4D3E"/>
        <rect x="3" y="3" width="30" height="18" rx="2" stroke="#4CAF50" stroke-width="1.2"/>
        <circle cx="18" cy="12" r="4.5" fill="#4CAF50" opacity="0.3"/>
        <circle cx="18" cy="12" r="3.5" stroke="#4CAF50" stroke-width="1.2"/>
        <path d="M8 7V9M28 7V9M8 17V15M28 17V15" stroke="#4CAF50" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M17 10C17.5 9.5 18.5 9.5 19 10C19.5 10.5 19.5 11.5 19 12C18.5 12.5 17.5 12.5 17 13C16.5 13.5 16.5 14.5 17 15C17.5 15.5 18.5 15.5 19 15M18 9V17" stroke="#ffffff" stroke-width="1" stroke-linecap="round"/>
      </svg>
      <span class="text-body-xs font-semibold text-on-surface select-none pr-xs">{t.cash}</span>
    </div>
  </div>
</div>
