<script lang="ts">
  import { page } from '$app/stores';
  import TopNavBar from '@/components/domains/nav/TopNavBar.svelte';
  import Footer from '@/components/domains/shared/Footer.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const stats = $derived([
    { value: data.t.about.stat1Value, label: data.t.about.stat1Label },
    { value: data.t.about.stat2Value, label: data.t.about.stat2Label },
    { value: data.t.about.stat3Value, label: data.t.about.stat3Label },
    { value: data.t.about.stat4Value, label: data.t.about.stat4Label },
  ]);

  const values = $derived([
    { icon: 'lightbulb', title: data.t.about.value1Title, body: data.t.about.value1Body, bgColor: 'bg-primary-container', textColor: 'text-on-primary-container' },
    { icon: 'verified', title: data.t.about.value2Title, body: data.t.about.value2Body, bgColor: 'bg-surface-container-high', textColor: 'text-primary' },
    { icon: 'speed', title: data.t.about.value3Title, body: data.t.about.value3Body, bgColor: 'bg-surface-container-high', textColor: 'text-primary' },
  ]);

  const timeline = $derived(
    data.t.about.timeline.map((item, i) => ({ ...item, active: i === 0 }))
  );

  const teamMembers = [
    { name: 'Elena Rostova', image: '/assets/images/about/elena-rostova.webp' },
    { name: 'Marcus Chen', image: '/assets/images/about/marcus-chen.webp' },
    { name: 'Julian Hayes', image: '/assets/images/about/julian-hayes.webp' },
    { name: 'Sarah Jenkins', image: '/assets/images/about/sarah-jenkins.webp' },
  ];
  const team = $derived(
    teamMembers.map((member, i) => ({ ...member, role: data.t.about.roles[i] }))
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const aboutSchema = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `https://www.vicronlopez.es${$page.url.pathname}#aboutpage`,
        "url": `https://www.vicronlopez.es${$page.url.pathname}`,
        "name": `${data.t.about.title} | ${data.t.site.name}`,
        "description": data.t.about.subtitle
      },
      {
        "@type": "AutoRental",
        "@id": `https://www.vicronlopez.es/${data.locale}/#autorental`,
        "name": data.t.site.name,
        "url": `https://www.vicronlopez.es/${data.locale}/`,
        "image": "https://www.vicronlopez.es/icons/icon-512.png"
      }
    ]
  });
</script>

<svelte:head>
  <title>{data.t.about.title} | {data.t.site.name}</title>
  <meta name="description" content={data.t.about.subtitle} />
  <script type="application/ld+json">
    {@html JSON.stringify(aboutSchema)}
  </script>
</svelte:head>

<TopNavBar
  locale={data.locale}
  currentUrl={$page.url}
  lightLabel={data.t.theme.toggleLight}
  darkLabel={data.t.theme.toggleDark}
/>

<main class="flex-grow pt-20">
  <!-- Hero Section -->
  <section class="relative h-[600px] lg:h-[716px] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-surface-container-low/40 z-10"></div>
    <img
      alt="Vicron Lopez Luxury Fleet"
      class="absolute inset-0 w-full h-full object-cover object-center z-0"
      src="/assets/images/about/hero-dealership.webp"
      fetchpriority="high"
      loading="eager"
    />
    <div class="relative z-20 text-center px-8 max-w-4xl mx-auto">
      <h1 class="font-display text-[40px] md:text-[64px] lg:text-[80px] font-bold leading-[1.1] tracking-tight text-on-surface mb-6 drop-shadow-sm">
        {data.t.about.title}
      </h1>
      <p class="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
        {data.t.about.subtitle}
      </p>
    </div>
  </section>

  <!-- Our Mission -->
  <section class="py-xl px-8 bg-surface-container-lowest">
    <div class="max-w-screen-md mx-auto text-center space-y-lg">
      <h2 class="font-display text-label-caps text-primary uppercase tracking-widest">{data.t.about.missionTitle}</h2>
      <p class="font-body text-[18px] md:text-[22px] text-on-surface leading-relaxed font-medium">
        {data.t.about.missionBody}
      </p>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="border-y border-outline-variant/20 bg-background">
    <div class="max-w-screen-xl mx-auto px-8 py-xl">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-lg">
        {#each stats as { value, label }}
          <div class="text-center space-y-xs">
            <div class="text-display text-[40px] font-bold text-primary leading-none">{value}</div>
            <div class="text-label-caps text-on-surface-variant uppercase tracking-widest text-[11px] font-bold">{label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Values Section -->
  <section class="py-xl px-8 bg-background">
    <div class="max-w-screen-xl mx-auto">
      <h2 class="font-display text-[32px] md:text-[40px] font-bold text-on-surface text-center mb-16">{data.t.about.valuesTitle}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each values as val}
          <div class="bg-surface-container-lowest p-10 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,67,200,0.05)] border border-outline-variant/20 hover:-translate-y-1 transition-all duration-300 group">
            <div class="w-16 h-16 rounded-full {val.bgColor} {val.textColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <span class="material-symbols-outlined text-3xl">{val.icon}</span>
            </div>
            <h3 class="font-display text-[24px] font-bold text-on-surface mb-4">{val.title}</h3>
            <p class="font-body text-[16px] text-on-surface-variant leading-relaxed">{val.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Timeline -->
  <section class="py-xl px-8 bg-surface-container-lowest">
    <div class="max-w-screen-xl mx-auto">
      <h2 class="font-display text-[32px] md:text-[40px] font-bold text-on-surface text-center mb-16">{data.t.about.timelineTitle}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each timeline as item}
          <div class="relative pl-6 border-l border-outline-variant/30 group">
            <div class="absolute w-3 h-3 rounded-full -left-[6.5px] top-2 transition-all duration-300 {item.active ? 'bg-primary shadow-[0_0_10px_rgba(0,67,200,0.3)] scale-125' : 'bg-surface-variant group-hover:bg-primary/40'}"></div>
            <div class="font-display text-[20px] font-bold mb-2 transition-colors duration-300 {item.active ? 'text-primary' : 'text-outline group-hover:text-primary/60'}">{item.year}</div>
            <h4 class="font-display text-[18px] font-bold text-on-surface mb-2">{item.title}</h4>
            <p class="font-body text-[14px] text-on-surface-variant leading-relaxed">{item.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Team -->
  <section class="py-xl px-8 bg-background">
    <div class="max-w-screen-xl mx-auto">
      <h2 class="font-display text-[32px] md:text-[40px] font-bold text-on-surface text-center mb-16">{data.t.about.teamTitle}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each team as member}
          <div class="text-center group">
            <div class="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border border-surface-variant bg-surface-container-highest shadow-[0_20px_40px_-15px_rgba(0,67,200,0.05)] group-hover:shadow-[0_20px_40px_-10px_rgba(0,67,200,0.1)] transition-all duration-300">
              <img
                alt={member.name}
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                src={member.image}
                loading="lazy"
                width="192"
                height="192"
              />
            </div>
            <h3 class="font-display text-[22px] font-bold text-on-surface">{member.name}</h3>
            <p class="font-body text-[12px] text-primary font-black uppercase tracking-widest mt-1">{member.role}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Commitment CTA -->
  <section class="relative py-32 bg-primary overflow-hidden">
    <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] pointer-events-none" aria-hidden="true"></div>
    <div class="max-w-4xl mx-auto px-8 text-center relative z-10 space-y-lg">
      <h2 class="font-display text-[32px] md:text-[48px] font-bold text-on-primary leading-tight">
        {data.t.about.commitmentTitle}
      </h2>
      <p class="font-body text-[18px] text-on-primary/80 max-w-2xl mx-auto leading-relaxed">
        {data.t.about.commitmentBody}
      </p>
      <div class="pt-4">
        <a
          href="/{data.locale}/contact/"
          class="inline-flex items-center gap-sm rounded-full bg-on-primary text-primary px-xl py-4 text-label-caps uppercase tracking-widest font-black font-body hover:bg-on-primary/90 transition-all duration-300 active:scale-95 shadow-xl shadow-black/10"
        >
          {data.t.about.commitmentCta}
          <span class="material-symbols-outlined" style="font-size:20px">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>
</main>

<Footer locale={data.locale} currentUrl={$page.url} />
