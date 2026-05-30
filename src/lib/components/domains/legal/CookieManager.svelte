<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    dictionary: {
      intro: string;
      essential: { title: string; description: string };
      analytics: { title: string; description: string };
      marketing: { title: string; description: string };
      save: string;
      rejectAll: string;
      requiredBadge: string;
      success: string;
    };
  }

  let { dictionary }: Props = $props();

  let preferences = $state({
    essential: true,
    analytics: false,
    marketing: false,
  });
  let saved = $state(false);

  onMount(() => {
    const stored = localStorage.getItem('cookie-preferences');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as typeof preferences;
        preferences = parsed;
      } catch (error) {
        console.error('Failed to parse cookie preferences', error);
      }
    }
  });

  const categories = $derived([
    { id: 'essential' as const, ...dictionary.essential, essential: true, icon: 'security' },
    { id: 'analytics' as const, ...dictionary.analytics, essential: false, icon: 'bar_chart' },
    { id: 'marketing' as const, ...dictionary.marketing, essential: false, icon: 'campaign' },
  ]);

  function handleToggle(category: keyof typeof preferences) {
    if (category === 'essential') return;
    preferences = { ...preferences, [category]: !preferences[category] };
    saved = false;
  }

  function handleSave() {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    saved = true;
    setTimeout(() => {
      saved = false;
    }, 3000);
  }

  function handleRejectAll() {
    const newPrefs = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    preferences = newPrefs;
    localStorage.setItem('cookie-preferences', JSON.stringify(newPrefs));
    saved = true;
    setTimeout(() => {
      saved = false;
    }, 3000);
  }
</script>

<div class="space-y-12">
  <div class="max-w-2xl">
    <p class="text-body-lg text-on-surface-variant">{dictionary.intro}</p>
  </div>

  <div class="space-y-6">
    {#each categories as cat (cat.id)}
      <div class="bg-surface rounded-xl p-8 shadow-[0_20px_40px_rgba(0,87,255,0.06)] border border-outline-variant relative overflow-hidden group hover:border-primary-container transition-colors duration-300">
        <div class="flex justify-between items-start mb-4 relative z-10">
          <div class="flex-1 pr-8">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="material-symbols-outlined text-primary"
                style="font-variation-settings: 'FILL' 1"
              >
                {cat.icon}
              </span>
              <h3 class="font-display text-h3 text-on-background">
                {cat.title}
              </h3>
              {#if cat.essential}
                <span class="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ml-2">
                  {dictionary.requiredBadge}
                </span>
              {/if}
            </div>
            <p class="text-sm text-on-surface-variant max-w-prose">
              {cat.description}
            </p>
          </div>

          <button
            onclick={() => handleToggle(cat.id)}
            disabled={cat.essential}
            aria-label={cat.title}
            aria-pressed={preferences[cat.id]}
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 {preferences[cat.id]
              ? 'bg-primary'
              : 'bg-outline-variant'} {cat.essential ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {preferences[
                cat.id
              ]
                ? 'translate-x-5'
                : 'translate-x-0'}"
            ></span>
          </button>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-12 flex justify-end gap-4 border-t border-surface-container-high pt-8">
    <button
      onclick={handleRejectAll}
      class="px-6 py-3 text-body-md font-medium text-on-surface-variant bg-transparent border border-outline-variant hover:bg-surface-container-high rounded transition-colors active:scale-95"
    >
      {dictionary.rejectAll}
    </button>
    <button
      onclick={handleSave}
      class="px-6 py-3 text-body-md font-medium text-white bg-primary hover:bg-primary-container shadow-[0_8px_16px_rgba(0,87,255,0.2)] rounded transition-all hover:shadow-[0_12px_24px_rgba(0,87,255,0.3)] active:scale-95"
    >
      {dictionary.save}
    </button>
  </div>

  {#if saved}
    <div class="flex justify-center">
      <p class="text-secondary font-medium animate-in fade-in slide-in-from-bottom-2">
        {dictionary.success}
      </p>
    </div>
  {/if}
</div>
