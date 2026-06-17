import { z } from 'zod';

export const VEHICLE_CATEGORIES = [
  'electric-sedan',
  'sports-coupe',
  'luxury-suv',
  'suv',
  'sedan',
  'convertible',
  'truck',
] as const;

export const vehicleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int().min(1900).max(2100),
  category: z.enum(VEHICLE_CATEGORIES),
  pricePerDay: z.number().positive(),
  specs: z.object({
    acceleration: z.string().optional(),
    range: z.string().optional(),
    drivetrain: z.string().optional(),
    seats: z.number().int().positive().optional(),
    fuel: z.string().optional(),
  }),
  image: z.string(),
  images: z.array(z.string()).optional(),
  featured: z.boolean(),
  available: z.boolean(),
  deposit: z.number().int().positive().optional(),
});

export const vehiclesJsonSchema = z.object({
  vehicles: z.array(vehicleSchema),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
export type VehicleCategory = typeof VEHICLE_CATEGORIES[number];
