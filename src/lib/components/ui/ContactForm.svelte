<script lang="ts">
  import { page } from '$app/stores';
  import { contactSchema } from '@/schemas/contact';
  import { getAllVehicles } from '@/lib/vehicles';
  import { getDictionary, type Locale } from '@/i18n/utils';
  import { buildBookingMessage } from '@/booking';

  interface ContactFormLabels {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    required: string;
    invalidEmail: string;
    minMessage: string;
  }

  interface Props {
    labels: ContactFormLabels;
    locale: Locale;
  }

  let { labels, locale }: Props = $props();

  type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

  let values = $state({ name: '', email: '', phone: '', message: '' });

  // Prefill the message from a `?vehicle=<slug>` query param. Runs client-only
  // (effects don't run during prerender/SSR, so reading searchParams is safe)
  // and reactively: switching language re-runs it, retranslating the message.
  $effect(() => {
    const slug = $page.url.searchParams.get('vehicle');
    if (!slug) return;
    const vehicle = getAllVehicles().find((v) => v.slug === slug);
    if (!vehicle) return;
    const t = getDictionary(locale);
    const url = `${$page.url.origin}/${locale}/${t.nav.slugs.vehicles}/${slug}/`;

    const startDate = $page.url.searchParams.get('startDate') || '';
    const startTime = $page.url.searchParams.get('startTime') || '';
    const endDate = $page.url.searchParams.get('endDate') || '';
    const endTime = $page.url.searchParams.get('endTime') || '';

    const dates = startDate && endDate ? { startDate, startTime, endDate, endTime } : undefined;

    values.message = buildBookingMessage(vehicle, url, t, locale, dates);
  });
  let errors = $state<FieldErrors>({});
  let submitted = $state(false);
  let submitting = $state(false);

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    values = { ...values, [name]: value };
    if (errors[name as keyof FieldErrors]) {
      errors = { ...errors, [name]: undefined };
    }
  }

  function validate(): FieldErrors {
    const result = contactSchema.safeParse(values);
    if (result.success) return {};
    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FieldErrors;
      if (field === 'name' && !fieldErrors.name) {
        fieldErrors.name = labels.required;
      } else if (field === 'email' && !fieldErrors.email) {
        fieldErrors.email = issue.code === 'invalid_format' ? labels.invalidEmail : labels.required;
      } else if (field === 'message' && !fieldErrors.message) {
        fieldErrors.message = issue.code === 'too_small' ? labels.minMessage : labels.required;
      }
    }
    return fieldErrors;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      errors = fieldErrors;
      return;
    }
    submitting = true;
    setTimeout(() => {
      submitting = false;
      submitted = true;
    }, 0);
  }
</script>

{#if submitted}
  <div class="text-center py-xl" data-testid="success-state">
    <span class="material-symbols-outlined filled text-5xl text-secondary block mb-md">
      check_circle
    </span>
    <h3 class="text-h3 font-display font-bold text-on-surface mb-sm">{labels.successTitle}</h3>
    <p class="text-body-lg text-on-surface-variant">{labels.successBody}</p>
  </div>
{:else}
  <form onsubmit={handleSubmit} novalidate class="space-y-lg">
    <!-- Name -->
    <div class="flex flex-col gap-xs">
      <label for="contact-name" class="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
        {labels.name}
      </label>
      <input
        id="contact-name"
        name="name"
        type="text"
        value={values.name}
        oninput={handleChange}
        placeholder={labels.namePlaceholder}
        aria-describedby={errors.name ? 'error-name' : undefined}
        class="bg-surface-container border rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors {errors.name
          ? 'border-error focus:border-error'
          : 'border-outline-variant/40 focus:border-primary'}"
      />
      {#if errors.name}
        <p id="error-name" class="text-error text-body-sm">{errors.name}</p>
      {/if}
    </div>

    <!-- Email -->
    <div class="flex flex-col gap-xs">
      <label for="contact-email" class="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
        {labels.email}
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        value={values.email}
        oninput={handleChange}
        placeholder={labels.emailPlaceholder}
        aria-describedby={errors.email ? 'error-email' : undefined}
        class="bg-surface-container border rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors {errors.email
          ? 'border-error focus:border-error'
          : 'border-outline-variant/40 focus:border-primary'}"
      />
      {#if errors.email}
        <p id="error-email" class="text-error text-body-sm">{errors.email}</p>
      {/if}
    </div>

    <!-- Phone (optional) -->
    <div class="flex flex-col gap-xs">
      <label for="contact-phone" class="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
        {labels.phone}
      </label>
      <input
        id="contact-phone"
        name="phone"
        type="tel"
        value={values.phone}
        oninput={handleChange}
        placeholder={labels.phonePlaceholder}
        class="bg-surface-container border border-outline-variant/40 rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
      />
    </div>

    <!-- Message -->
    <div class="flex flex-col gap-xs">
      <label for="contact-message" class="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
        {labels.message}
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows={5}
        value={values.message}
        oninput={handleChange}
        placeholder={labels.messagePlaceholder}
        aria-describedby={errors.message ? 'error-message' : undefined}
        class="bg-surface-container border rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors resize-none {errors.message
          ? 'border-error focus:border-error'
          : 'border-outline-variant/40 focus:border-primary'}"
      ></textarea>
      {#if errors.message}
        <p id="error-message" class="text-error text-body-sm">{errors.message}</p>
      {/if}
    </div>

    <button
      type="submit"
      disabled={submitting}
      class="w-full bg-primary text-on-primary rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95 disabled:opacity-60"
    >
      {submitting ? labels.sending : labels.submit}
    </button>
  </form>
{/if}
