import { describe, it, expect } from 'vitest';
import { buildBookingMessage } from './booking';
import { formatCurrency } from './lib/formatters';
import { en } from './i18n/en';
import { es } from './i18n/es';

const vehicle = { brand: 'Porsche', model: '992 GT3', year: 2024, pricePerDay: 900 };
const url = 'https://www.vicronlopez.es/es/vehiculos/porsche-992-gt3/';

describe('buildBookingMessage', () => {
  it('builds a Spanish message with intro, vehicle, price label and url', () => {
    const message = buildBookingMessage(vehicle, url, es, 'es');

    expect(message).toContain(es.vehicleDetail.whatsappIntro);
    expect(message).toContain('Porsche 992 GT3 (2024)');
    expect(message).toContain(es.vehicleDetail.rentPrice);
    expect(message).toContain(es.vehicleDetail.perDay);
    expect(message).toContain(url);
  });

  it('localizes the intro and price label in English', () => {
    const message = buildBookingMessage(vehicle, url, en, 'en');

    expect(message).toContain(en.vehicleDetail.whatsappIntro);
    expect(message).toContain(en.vehicleDetail.rentPrice);
    expect(message).not.toContain(es.vehicleDetail.whatsappIntro);
  });

  it('formats the price using the given locale currency', () => {
    expect(buildBookingMessage(vehicle, url, es, 'es')).toContain(formatCurrency(900, 'es'));
    expect(buildBookingMessage(vehicle, url, en, 'en')).toContain(formatCurrency(900, 'en'));
  });

  it('includes booking dates in Spanish if dates are provided', () => {
    const dates = { startDate: '19 Jun 2026', startTime: '14:00', endDate: '28 Jun 2026', endTime: '14:00' };
    const message = buildBookingMessage(vehicle, url, es, 'es', dates);
    expect(message).toContain('Fechas de reserva:');
    expect(message).toContain('- Desde: 19 Jun 2026 a las 14:00');
    expect(message).toContain('- Hasta: 28 Jun 2026 a las 14:00');
  });

  it('includes booking dates in English if dates are provided', () => {
    const dates = { startDate: '19 Jun 2026', startTime: '14:00', endDate: '28 Jun 2026', endTime: '14:00' };
    const message = buildBookingMessage(vehicle, url, en, 'en', dates);
    expect(message).toContain('Booking Dates:');
    expect(message).toContain('- From: 19 Jun 2026 at 14:00');
    expect(message).toContain('- To: 28 Jun 2026 at 14:00');
  });
});
