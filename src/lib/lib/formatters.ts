import { business } from '@/business';

export function formatCurrency(amount: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    style: 'currency',
    currency: business.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
