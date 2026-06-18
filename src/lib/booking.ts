import { formatCurrency } from '@/lib/formatters';
import type { Dictionary } from '@/i18n/en';
import type { Locale } from '@/i18n/utils';

/**
 * Builds the localized booking message shared by the WhatsApp link (vehicle
 * detail page) and the contact form prefill. The message is derived from the
 * vehicle data + dictionary so it can be rebuilt in any locale.
 */
export function buildBookingMessage(
  v: { brand: string; model: string; year: number; pricePerDay: number },
  url: string,
  t: Dictionary,
  locale: Locale,
  dates?: { startDate: string; startTime: string; endDate: string; endTime: string }
): string {
  let message =
    `${t.vehicleDetail.whatsappIntro}\n` +
    `${v.brand} ${v.model} (${v.year})\n` +
    `${t.vehicleDetail.rentPrice}: ${formatCurrency(v.pricePerDay, locale)}${t.vehicleDetail.perDay}\n`;

  if (dates && dates.startDate && dates.endDate) {
    if (locale === 'es') {
      message += `Fechas de reserva:\n` +
        `- Desde: ${dates.startDate} a las ${dates.startTime}\n` +
        `- Hasta: ${dates.endDate} a las ${dates.endTime}\n`;
    } else {
      message += `Booking Dates:\n` +
        `- From: ${dates.startDate} at ${dates.startTime}\n` +
        `- To: ${dates.endDate} at ${dates.endTime}\n`;
    }
  }

  message += `${url}`;
  return message;
}
