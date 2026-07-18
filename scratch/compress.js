const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '../src/assets/Photo-2.png');

async function compress() {
  console.log('Loading image...');
  const img = await loadImage(imgPath);
  console.log(`Original dimensions: ${img.width}x${img.height}`);
  
  let width = img.width;
  let height = img.height;
  
  if (width > 800) {
    const ratio = 800 / width;
    width = 800;
    height = Math.round(height * ratio);
    console.log(`Scaling down to: ${width}x${height}`);
  }
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  
  console.log('Saving as JPEG...');
  const jpegPath = path.join(__dirname, '../src/assets/Photo-2.jpg');
  const out = fs.createWriteStream(jpegPath);
  const stream = canvas.createJPEGStream({
    quality: 0.8,
    progressive: true
  });
  stream.pipe(out);
  out.on('finish', () => {
    const origSize = fs.statSync(imgPath).size;
    const newSize = fs.statSync(jpegPath).size;
    console.log(`Finished compression!`);
    console.log(`Original PNG size: ${(origSize / 1024).toFixed(2)} KB`);
    console.log(`Optimized JPEG size: ${(newSize / 1024).toFixed(2)} KB`);
  });
}

compress().catch(err => {
  console.error('Error during compression:', err);
});
