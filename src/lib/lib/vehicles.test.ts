import { describe, it, expect } from 'vitest';
import {
  getAllVehicles,
  getSearchableVehicles,
  getFeaturedVehicles,
  filterVehicles,
  getUniqueBrands,
  getUniqueCategories,
} from './vehicles';
import type { Vehicle } from '../schemas/vehicle';
import { getVehicleImages } from './vehicleImages';


const mockVehicles: Vehicle[] = [
  {
    id: 'm1',
    slug: 'tesla-model-s-plaid',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    category: 'electric-sedan',
    pricePerDay: 800,
    specs: { acceleration: '1.99s', drivetrain: 'AWD', seats: 5, fuel: 'Electric' },
    image: '/vehicles/tesla-model-s-plaid.webp',
    featured: true,
    available: true,
  },
  {
    id: 'm2',
    slug: 'ford-f150-raptor',
    brand: 'Ford',
    model: 'F-150 Raptor',
    year: 2023,
    category: 'truck',
    pricePerDay: 250,
    specs: { acceleration: '5.2s', drivetrain: '4WD', seats: 5, fuel: 'Gasoline' },
    image: '/vehicles/ford-f150-raptor.webp',
    featured: false,
    available: true,
  },
  {
    id: 'm3',
    slug: 'bmw-m5-competition',
    brand: 'BMW',
    model: 'M5 Competition',
    year: 2023,
    category: 'sedan',
    pricePerDay: 450,
    specs: { acceleration: '3.1s', drivetrain: 'AWD', seats: 5, fuel: 'Gasoline' },
    image: '/vehicles/bmw-m5-competition.webp',
    featured: true,
    available: true,
  },
  {
    id: 'm4',
    slug: 'porsche-cayman',
    brand: 'Porsche',
    model: '718 Cayman GT4',
    year: 2022,
    category: 'sports-coupe',
    pricePerDay: 350,
    specs: { acceleration: '3.9s', drivetrain: 'RWD', seats: 2, fuel: 'Gasoline' },
    image: '/vehicles/porsche-718-cayman.webp',
    featured: false,
    available: true,
  },
  {
    id: 'm5',
    slug: 'fiat-500-1969',
    brand: 'Fiat',
    model: '500',
    year: 1969,
    category: 'convertible',
    pricePerDay: 150,
    specs: { drivetrain: 'RWD', seats: 4, fuel: 'Gasoline' },
    image: '/vehicles/fiat-500-1969.webp',
    featured: false,
    available: true,
  }
];

describe('getAllVehicles', () => {
  it('returns all 3 vehicles', () => {
    expect(getAllVehicles()).toHaveLength(3);
  });

  it('every vehicle has required fields', () => {
    for (const v of getAllVehicles()) {
      expect(v.id).toBeTruthy();
      expect(v.slug).toBeTruthy();
      expect(v.brand).toBeTruthy();
      expect(v.model).toBeTruthy();
      expect(v.image).toMatch(/^\/vehicles\/.+\.webp$/);
    }
  });

  it('every vehicle has a positive daily rental price', () => {
    for (const v of getAllVehicles()) {
      expect(v.pricePerDay).toBeGreaterThan(0);
    }
  });
});

describe('getSearchableVehicles', () => {
  it('returns a lightweight version of all vehicles', () => {
    const result = getSearchableVehicles();
    expect(result).toHaveLength(3);

    const v = result[0];
    expect(v).toHaveProperty('id');
    expect(v).toHaveProperty('brand');
    expect(v).toHaveProperty('model');
    expect(v).toHaveProperty('year');
    expect(v).toHaveProperty('category');
    expect(v).toHaveProperty('slug');
    expect(v).toHaveProperty('image');
    expect(v).toHaveProperty('pricePerDay');
    expect(v).not.toHaveProperty('specs');
  });
});

describe('getFeaturedVehicles', () => {
  it('default limit of 3 returns at most 3 featured vehicles', () => {
    const result = getFeaturedVehicles();
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('returns exactly 3 when there are at least 3 featured vehicles', () => {
    expect(getFeaturedVehicles(3)).toHaveLength(3);
  });

  it('all returned vehicles have featured=true', () => {
    expect(getFeaturedVehicles(10).every((v) => v.featured)).toBe(true);
  });

  it('custom limit is respected', () => {
    const result = getFeaturedVehicles(1);
    expect(result).toHaveLength(1);
    expect(result[0].featured).toBe(true);
  });
});

describe('filterVehicles', () => {
  const all = mockVehicles;

  it('no filters returns all vehicles', () => {
    expect(filterVehicles(all, {})).toHaveLength(all.length);
  });

  it('search="tesla" returns only Tesla vehicles (case-insensitive)', () => {
    const result = filterVehicles(all, { search: 'Tesla' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.brand === 'Tesla')).toBe(true);
  });

  it('search is case-insensitive', () => {
    const upper = filterVehicles(all, { search: 'TESLA' });
    const lower = filterVehicles(all, { search: 'tesla' });
    expect(upper.map((v) => v.id)).toEqual(lower.map((v) => v.id));
  });

  it('search matches model name', () => {
    const result = filterVehicles(all, { search: 'raptor' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.model.toLowerCase().includes('raptor'))).toBe(true);
  });

  it('category filter returns only matching category', () => {
    const result = filterVehicles(all, { category: 'electric-sedan' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.category === 'electric-sedan')).toBe(true);
  });

  it('brand filter is case-insensitive', () => {
    const result = filterVehicles(all, { brand: 'bmw' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.brand === 'BMW')).toBe(true);
  });

  it('maxPricePerDay filters by daily price ceiling', () => {
    const result = filterVehicles(all, { maxPricePerDay: 150 });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.pricePerDay <= 150)).toBe(true);
  });

  it('maxPricePerDay excludes vehicles above the ceiling', () => {
    const cheapest = Math.min(...all.map((v) => v.pricePerDay));
    const result = filterVehicles(all, { maxPricePerDay: cheapest - 1 });
    expect(result).toHaveLength(0);
  });

  it('multiple filters are applied together (AND logic)', () => {
    const result = filterVehicles(all, { category: 'sports-coupe', maxPricePerDay: 400 });
    expect(result.length).toBeGreaterThan(0);
    for (const v of result) {
      expect(v.category).toBe('sports-coupe');
      expect(v.pricePerDay).toBeLessThanOrEqual(400);
    }
  });

  it('returns empty array when filters match nothing', () => {
    const result = filterVehicles(all, { search: 'doesnotexistxyz123' });
    expect(result).toHaveLength(0);
  });

  it('empty search string does not filter', () => {
    const result = filterVehicles(all, { search: '' });
    expect(result).toHaveLength(all.length);
  });

  it('whitespace-only search does not filter', () => {
    const result = filterVehicles(all, { search: '   ' });
    expect(result).toHaveLength(all.length);
  });
});

describe('getUniqueBrands', () => {
  const all = mockVehicles;

  it('returns sorted unique brands', () => {
    const brands = getUniqueBrands(all);
    const sorted = [...brands].sort();
    expect(brands).toEqual(sorted);
  });

  it('contains no duplicates', () => {
    const brands = getUniqueBrands(all);
    expect(new Set(brands).size).toBe(brands.length);
  });

  it('every brand in the list exists in the data', () => {
    const brands = getUniqueBrands(all);
    const dataBrands = new Set(all.map((v) => v.brand));
    for (const b of brands) {
      expect(dataBrands.has(b)).toBe(true);
    }
  });

  it('returns empty array for empty input', () => {
    expect(getUniqueBrands([])).toHaveLength(0);
  });
});

describe('getUniqueCategories', () => {
  const all = mockVehicles;

  it('returns sorted unique categories', () => {
    const cats = getUniqueCategories(all);
    const sorted = [...cats].sort();
    expect(cats).toEqual(sorted);
  });

  it('contains no duplicates', () => {
    const cats = getUniqueCategories(all);
    expect(new Set(cats).size).toBe(cats.length);
  });

  it('every category in the list exists in the data', () => {
    const cats = getUniqueCategories(all);
    const dataCats = new Set(all.map((v) => v.category));
    for (const c of cats) {
      expect(dataCats.has(c as (typeof all)[number]['category'])).toBe(true);
    }
  });

  it('returns empty array for empty input', () => {
    expect(getUniqueCategories([])).toHaveLength(0);
  });
});

describe('getVehicleImages', () => {
  it('returns multiple image assets for active vehicles', () => {
    for (const v of getAllVehicles()) {
      const images = getVehicleImages(v.slug);
      expect(images).toBeInstanceOf(Array);
      // Cada vehículo activo debe tener al menos la imagen principal y las variantes (4 en total)
      expect(images.length).toBe(4);
    }
  });

  it('returns empty array for non-existent vehicle slug', () => {
    const images = getVehicleImages('non-existent-slug');
    expect(images).toEqual([]);
  });
});

describe('vehicleSchema validation with images', () => {
  it('every active vehicle has an images list in data', () => {
    for (const v of getAllVehicles()) {
      expect(v.images).toBeInstanceOf(Array);
      expect(v.images?.length).toBe(4);
      for (const imgPath of v.images || []) {
        expect(imgPath).toMatch(/^\/vehicles\/.+-\d+\.webp$/);
      }
    }
  });
});

