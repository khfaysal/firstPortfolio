import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

async function makeCircle() {
  try {
    const srcPath = 'e:/Coding Stuff/Projects/firstPortfolio/src/assets/Favicon.png';
    const destPath = 'e:/Coding Stuff/Projects/firstPortfolio/public/favicon.png';

    const img = await loadImage(srcPath);
    const size = Math.max(img.width, img.height);
    
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Create a circular clipping mask
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    // Draw the image centered
    ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(destPath, buffer);
    console.log('Successfully saved circular favicon to public/favicon.png');
  } catch (err) {
    console.error('Error creating circular favicon:', err);
  }
}

makeCircle();
