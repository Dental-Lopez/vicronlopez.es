import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = '/Users/hlorenzoz/databank/Development/Companies/Dental Lopez/projects/vicronlopez.es/src/lib/assets/vehicles';
const brainDir = '/Users/hlorenzoz/.gemini/antigravity-ide/brain/f4628875-1cc5-4f39-82dc-593b8867a751';

const jobs = [
  // Porsche 992 GT3
  {
    type: 'copy',
    src: path.join(assetsDir, 'porsche-992-gt3.webp'),
    destWebp: path.join(assetsDir, 'porsche-992-gt3-1.webp')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'porsche_gt3_front_red_1781702057199.png'),
    destWebp: path.join(assetsDir, 'porsche-992-gt3-2.webp'),
    destAvif: path.join(assetsDir, 'porsche-992-gt3-2.avif')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'porsche_gt3_side_red_1781702075365.png'),
    destWebp: path.join(assetsDir, 'porsche-992-gt3-3.webp'),
    destAvif: path.join(assetsDir, 'porsche-992-gt3-3.avif')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'porsche_gt3_rear_1781701584492.png'),
    destWebp: path.join(assetsDir, 'porsche-992-gt3-4.webp'),
    destAvif: path.join(assetsDir, 'porsche-992-gt3-4.avif')
  },

  // Fiat 500
  {
    type: 'copy',
    src: path.join(assetsDir, 'fiat-500-1969.webp'),
    destWebp: path.join(assetsDir, 'fiat-500-1969-1.webp')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'fiat_front_1781701636635.png'),
    destWebp: path.join(assetsDir, 'fiat-500-1969-2.webp'),
    destAvif: path.join(assetsDir, 'fiat-500-1969-2.avif')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'fiat_side_1781701651195.png'),
    destWebp: path.join(assetsDir, 'fiat-500-1969-3.webp'),
    destAvif: path.join(assetsDir, 'fiat-500-1969-3.avif')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'fiat_rear_1781701668591.png'),
    destWebp: path.join(assetsDir, 'fiat-500-1969-4.webp'),
    destAvif: path.join(assetsDir, 'fiat-500-1969-4.avif')
  },

  // Mercedes AMG GTS
  {
    type: 'copy',
    src: path.join(assetsDir, 'mercedes-amg-gts.webp'),
    destWebp: path.join(assetsDir, 'mercedes-amg-gts-1.webp')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'mercedes_front_1781701714058.png'),
    destWebp: path.join(assetsDir, 'mercedes-amg-gts-2.webp'),
    destAvif: path.join(assetsDir, 'mercedes-amg-gts-2.avif')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'mercedes_side_1781701728832.png'),
    destWebp: path.join(assetsDir, 'mercedes-amg-gts-3.webp'),
    destAvif: path.join(assetsDir, 'mercedes-amg-gts-3.avif')
  },
  {
    type: 'convert',
    src: path.join(brainDir, 'mercedes_rear_1781701744674.png'),
    destWebp: path.join(assetsDir, 'mercedes-amg-gts-4.webp'),
    destAvif: path.join(assetsDir, 'mercedes-amg-gts-4.avif')
  }
];

async function run() {
  // Also create AVIF versions of the originals just to have them on disk
  const originalGtsAvif = path.join(assetsDir, 'mercedes-amg-gts-1.avif');
  const originalPorscheAvif = path.join(assetsDir, 'porsche-992-gt3-1.avif');
  const originalFiatAvif = path.join(assetsDir, 'fiat-500-1969-1.avif');

  console.log('Generating AVIF variants for original files...');
  if (!fs.existsSync(originalPorscheAvif)) {
    await sharp(path.join(assetsDir, 'porsche-992-gt3.webp')).avif({ quality: 80 }).toFile(originalPorscheAvif);
  }
  if (!fs.existsSync(originalFiatAvif)) {
    await sharp(path.join(assetsDir, 'fiat-500-1969.webp')).avif({ quality: 80 }).toFile(originalFiatAvif);
  }
  if (!fs.existsSync(originalGtsAvif)) {
    await sharp(path.join(assetsDir, 'mercedes-amg-gts.webp')).avif({ quality: 80 }).toFile(originalGtsAvif);
  }

  for (const job of jobs) {
    if (job.type === 'copy') {
      console.log(`Copying ${job.src} -> ${job.destWebp}`);
      fs.copyFileSync(job.src, job.destWebp);
    } else if (job.type === 'convert') {
      console.log(`Converting ${job.src} to WEBP & AVIF...`);
      if (!fs.existsSync(job.src)) {
        console.error(`Error: Source file does not exist: ${job.src}`);
        continue;
      }
      // Convert to WEBP
      await sharp(job.src)
        .webp({ quality: 85 })
        .toFile(job.destWebp);
      
      // Convert to AVIF
      if (job.destAvif) {
        await sharp(job.src)
          .avif({ quality: 80 })
          .toFile(job.destAvif);
      }
    }
  }
  console.log('All image operations (WEBP & AVIF) completed!');
}

run().catch(console.error);
