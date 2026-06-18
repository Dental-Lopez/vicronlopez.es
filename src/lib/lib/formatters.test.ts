import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters';

describe('formatCurrency', () => {
  it('should format EUR for English locale', () => {
    const result = formatCurrency(1000, 'en');
    expect(result).toContain('€');
    expect(result).toContain('1,000');
  });

  it('should format EUR for Spanish locale', () => {
    const result = formatCurrency(1000, 'es');
    expect(result).toContain('€');
    expect(result).toContain('1000');
  });

  it('groups thousands with a dot in Spanish for large amounts', () => {
    expect(formatCurrency(25000, 'es')).toContain('25.000');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0, 'en');
    expect(result).toContain('€0');
  });
});
