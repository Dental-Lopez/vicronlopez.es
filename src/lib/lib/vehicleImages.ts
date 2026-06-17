/**
 * Build-time map of vehicle slug -> processed `enhanced:img` source.
 *
 * Images live in `src/lib/assets/vehicles/{slug}.webp` and are processed by
 * `@sveltejs/enhanced-img` (responsive avif/webp + intrinsic dimensions).
 * The catalog is data-driven (vehicles.json), so we resolve images by slug
 * through a static glob.
 */
import type { Picture } from '@sveltejs/enhanced-img';

const modules = import.meta.glob<Picture>('$lib/assets/vehicles/*.webp', {
  eager: true,
  query: { enhanced: true },
  import: 'default',
});

// Key the map by the bare filename (== vehicle slug).
const bySlug = new Map<string, Picture>();
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? '';
  const slug = file.replace(/\.webp$/, '');
  bySlug.set(slug, mod);
}

export function getVehicleImage(slug: string): Picture | undefined {
  return bySlug.get(slug);
}

export function getVehicleImages(slug: string): Picture[] {
  const list: Picture[] = [];
  let i = 1;
  while (true) {
    const variantSlug = `${slug}-${i}`;
    const pic = bySlug.get(variantSlug);
    if (pic) {
      list.push(pic);
      i++;
    } else {
      break;
    }
  }

  // Fallback to main slug if no numeric variants exist
  if (list.length === 0) {
    const mainPic = bySlug.get(slug);
    if (mainPic) {
      list.push(mainPic);
    }
  }

  return list;
}

