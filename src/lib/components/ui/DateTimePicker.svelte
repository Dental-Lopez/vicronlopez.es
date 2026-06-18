<script lang="ts">
  import { SvelteDate } from 'svelte/reactivity';
  import type { Locale } from '@/i18n/utils';

  interface Props {
    locale: Locale;
    startDate: Date;
    startTime: string;
    endDate: Date | null;
    endTime: string;
    onchange?: (dates: { startDate: Date; startTime: string; endDate: Date | null; endTime: string }) => void;
  }

  let {
    locale,
    startDate = $bindable(),
    startTime = $bindable(),
    endDate = $bindable(),
    endTime = $bindable(),
    onchange
  }: Props = $props();

  let showCalendar = $state(false);
  let showStartTime = $state(false);
  let showEndTime = $state(false);
  let containerElement = $state<HTMLElement | null>(null);

  // Reference date for calendar view navigation
  const navDate = new SvelteDate(startDate);

  const today = new SvelteDate();
  today.setHours(0, 0, 0, 0);

  const times = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const weekDays = $derived(locale === 'es'
    ? ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);

  const monthNames = $derived(locale === 'es'
    ? ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

  function handleWindowClick(e: Event) {
    if (containerElement && !containerElement.contains(e.target as Node)) {
      showCalendar = false;
      showStartTime = false;
      showEndTime = false;
    }
  }

  function getDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    const days = [];
    let firstDayIndex = date.getDay();
    // Adjust so Monday is 0, Sunday is 6
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  function prevMonth() {
    navDate.setMonth(navDate.getMonth() - 1);
  }

  function nextMonth() {
    navDate.setMonth(navDate.getMonth() + 1);
  }

  function selectDate(day: Date) {
    if (day.getTime() < today.getTime()) return; // Disabled

    if (!startDate || (startDate && endDate)) {
      startDate = day;
      endDate = null;
    } else if (startDate && !endDate) {
      if (day.getTime() >= startDate.getTime()) {
        endDate = day;
      } else {
        startDate = day;
      }
    }

    notifyChange();
  }

  function selectStartTime(t: string) {
    startTime = t;
    showStartTime = false;
    notifyChange();
  }

  function selectEndTime(t: string) {
    endTime = t;
    showEndTime = false;
    notifyChange();
  }

  function notifyChange() {
    if (onchange) {
      onchange({ startDate, startTime, endDate, endTime });
    }
  }

  function formatButtonDate(date: Date | null): string {
    if (!date) return locale === 'es' ? 'Seleccionar' : 'Select';
    const day = date.getDate();
    const monthNamesShort = locale === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${monthNamesShort[date.getMonth()]}`;
  }

  // Get active month definitions for the side-by-side view
  const month1Year = $derived(navDate.getFullYear());
  const month1Month = $derived(navDate.getMonth());

  const month2Year = $derived(month1Month === 11 ? month1Year + 1 : month1Year);
  const month2Month = $derived(month1Month === 11 ? 0 : month1Month + 1);
</script>

<svelte:window onclick={handleWindowClick} />

<div bind:this={containerElement} class="relative flex flex-col gap-xs w-full select-none">
  <!-- Title / Field labels -->
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-sm">
    <!-- Pickup (En) -->
    <div class="flex-1 flex flex-col gap-xs">
      <span class="text-label-caps uppercase tracking-wider text-on-surface-variant font-bold text-body-xs">
        {locale === 'es' ? 'Recogida (En)' : 'Pickup (From)'}
      </span>
      <div class="flex items-center gap-xs">
        <button
          type="button"
          onclick={() => {
            showCalendar = !showCalendar;
            showStartTime = false;
            showEndTime = false;
          }}
          class="flex-1 flex items-center justify-between gap-sm px-md py-sm rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary text-on-surface font-semibold text-body-md transition-all shadow-sm focus:outline-none cursor-pointer"
        >
          <span class="flex items-center gap-xs">
            <span class="material-symbols-outlined text-primary text-xl">arrow_forward</span>
            <span>{formatButtonDate(startDate)}</span>
          </span>
          <span class="material-symbols-outlined text-on-surface-variant text-base">calendar_month</span>
        </button>

        <div class="relative">
          <button
            type="button"
            onclick={() => {
              showStartTime = !showStartTime;
              showCalendar = false;
              showEndTime = false;
            }}
            class="px-md py-sm rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary text-on-surface font-semibold text-body-md transition-all shadow-sm focus:outline-none cursor-pointer"
          >
            {startTime}
          </button>
          {#if showStartTime}
            <div class="absolute right-0 top-11 z-30 w-32 max-h-60 overflow-y-auto rounded-xl bg-surface-container border border-outline-variant/40 shadow-lg p-1 backdrop-blur-md">
              {#each times as t}
                <button
                  type="button"
                  onclick={() => selectStartTime(t)}
                  class="w-full text-left px-md py-2 text-body-sm rounded-lg hover:bg-primary/10 transition-colors focus:outline-none cursor-pointer flex items-center justify-between"
                  class:bg-primary-container={startTime === t}
                  class:text-primary={startTime === t}
                >
                  <span>{t}</span>
                  {#if startTime === t}
                    <span class="material-symbols-outlined text-sm font-bold">check</span>
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Return (A) -->
    <div class="flex-1 flex flex-col gap-xs">
      <span class="text-label-caps uppercase tracking-wider text-on-surface-variant font-bold text-body-xs">
        {locale === 'es' ? 'Devolución (A)' : 'Return (To)'}
      </span>
      <div class="flex items-center gap-xs">
        <button
          type="button"
          onclick={() => {
            showCalendar = !showCalendar;
            showStartTime = false;
            showEndTime = false;
          }}
          class="flex-1 flex items-center justify-between gap-sm px-md py-sm rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary text-on-surface font-semibold text-body-md transition-all shadow-sm focus:outline-none cursor-pointer"
        >
          <span class="flex items-center gap-xs">
            <span class="material-symbols-outlined text-primary text-xl">arrow_forward</span>
            <span>{formatButtonDate(endDate)}</span>
          </span>
          <span class="material-symbols-outlined text-on-surface-variant text-base">calendar_month</span>
        </button>

        <div class="relative">
          <button
            type="button"
            onclick={() => {
              showEndTime = !showEndTime;
              showCalendar = false;
              showStartTime = false;
            }}
            class="px-md py-sm rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary text-on-surface font-semibold text-body-md transition-all shadow-sm focus:outline-none cursor-pointer"
          >
            {endTime}
          </button>
          {#if showEndTime}
            <div class="absolute right-0 top-11 z-30 w-32 max-h-60 overflow-y-auto rounded-xl bg-surface-container border border-outline-variant/40 shadow-lg p-1 backdrop-blur-md">
              {#each times as t}
                <button
                  type="button"
                  onclick={() => selectEndTime(t)}
                  class="w-full text-left px-md py-2 text-body-sm rounded-lg hover:bg-primary/10 transition-colors focus:outline-none cursor-pointer flex items-center justify-between"
                  class:bg-primary-container={endTime === t}
                  class:text-primary={endTime === t}
                >
                  <span>{t}</span>
                  {#if endTime === t}
                    <span class="material-symbols-outlined text-sm font-bold">check</span>
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Calendar Popover (Side-by-side or stacked) -->
  {#if showCalendar}
    <div class="absolute left-0 right-0 sm:left-auto sm:right-0 top-20 z-40 p-md rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-xl backdrop-blur-xl max-w-full sm:w-[680px]">
      <div class="flex items-center justify-between mb-md">
        <button
          type="button"
          onclick={prevMonth}
          class="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 flex items-center justify-center focus:outline-none cursor-pointer transition-colors"
          aria-label="Previous month"
        >
          <span class="material-symbols-outlined text-base">chevron_left</span>
        </button>
        <div class="flex gap-xl text-body-md font-display font-bold text-on-surface">
          <span class="hidden md:inline">{monthNames[month1Month]} {month1Year}</span>
          <span class="hidden md:inline">&amp;</span>
          <span>{monthNames[month2Month]} {month2Year}</span>
        </div>
        <button
          type="button"
          onclick={nextMonth}
          class="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 flex items-center justify-center focus:outline-none cursor-pointer transition-colors"
          aria-label="Next month"
        >
          <span class="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
        <!-- Month 1 -->
        <div class="space-y-sm">
          <h4 class="md:hidden text-center text-body-md font-display font-bold text-on-surface mb-xs">
            {monthNames[month1Month]} {month1Year}
          </h4>
          <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
            {#each weekDays as day}
              <div class="text-[11px] font-black text-on-surface-variant/60 uppercase tracking-wider py-1">{day}</div>
            {/each}
            {#each getDaysInMonth(month1Year, month1Month) as day}
              {#if day === null}
                <div></div>
              {:else}
                {@const isToday = day.getTime() === today.getTime()}
                {@const isDisabled = day.getTime() < today.getTime()}
                {@const isStart = startDate && day.getTime() === startDate.getTime()}
                {@const isEnd = endDate && day.getTime() === endDate.getTime()}
                {@const isInRange = startDate && endDate && day.getTime() > startDate.getTime() && day.getTime() < endDate.getTime()}
                <div class="relative aspect-square">
                  <button
                    type="button"
                    disabled={isDisabled}
                    onclick={() => selectDate(day)}
                    class="w-full h-full flex flex-col items-center justify-center text-body-sm font-semibold rounded-xl transition-all relative focus:outline-none cursor-pointer
                           {isDisabled ? 'text-on-surface-variant/30 cursor-not-allowed hover:bg-transparent' : 'text-on-surface hover:bg-primary/15'}
                           {isStart ? 'bg-primary text-on-primary font-black shadow-md scale-105 z-10' : ''}
                           {isEnd ? 'bg-primary text-on-primary font-black shadow-md scale-105 z-10' : ''}
                           {isInRange ? 'bg-primary-container/20 text-primary rounded-none' : ''}"
                  >
                    <span>{day.getDate()}</span>
                    {#if isToday}
                      <span class="absolute bottom-1 w-1.5 h-1.5 rounded-full {isStart || isEnd ? 'bg-on-primary' : 'bg-secondary'}"></span>
                    {/if}
                  </button>
                </div>
              {/if}
            {/each}
          </div>
        </div>

        <!-- Month 2 -->
        <div class="space-y-sm">
          <h4 class="md:hidden text-center text-body-md font-display font-bold text-on-surface mb-xs">
            {monthNames[month2Month]} {month2Year}
          </h4>
          <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
            {#each weekDays as day}
              <div class="text-[11px] font-black text-on-surface-variant/60 uppercase tracking-wider py-1">{day}</div>
            {/each}
            {#each getDaysInMonth(month2Year, month2Month) as day}
              {#if day === null}
                <div></div>
              {:else}
                {@const isToday = day.getTime() === today.getTime()}
                {@const isDisabled = day.getTime() < today.getTime()}
                {@const isStart = startDate && day.getTime() === startDate.getTime()}
                {@const isEnd = endDate && day.getTime() === endDate.getTime()}
                {@const isInRange = startDate && endDate && day.getTime() > startDate.getTime() && day.getTime() < endDate.getTime()}
                <div class="relative aspect-square">
                  <button
                    type="button"
                    disabled={isDisabled}
                    onclick={() => selectDate(day)}
                    class="w-full h-full flex flex-col items-center justify-center text-body-sm font-semibold rounded-xl transition-all relative focus:outline-none cursor-pointer
                           {isDisabled ? 'text-on-surface-variant/30 cursor-not-allowed hover:bg-transparent' : 'text-on-surface hover:bg-primary/15'}
                           {isStart ? 'bg-primary text-on-primary font-black shadow-md scale-105 z-10' : ''}
                           {isEnd ? 'bg-primary text-on-primary font-black shadow-md scale-105 z-10' : ''}
                           {isInRange ? 'bg-primary-container/20 text-primary rounded-none' : ''}"
                  >
                    <span>{day.getDate()}</span>
                    {#if isToday}
                      <span class="absolute bottom-1 w-1.5 h-1.5 rounded-full {isStart || isEnd ? 'bg-on-primary' : 'bg-secondary'}"></span>
                    {/if}
                  </button>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
