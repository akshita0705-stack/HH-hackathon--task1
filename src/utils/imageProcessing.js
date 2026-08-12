/**
 * Image processing utilities for the Builder ID Card
 * Handles photo loading, smart cropping, and preview generation
 */

/**
 * Load an image file and return useful metadata
 * @param {File} file
 * @returns {Promise<{url: string, width: number, height: number, img: HTMLImageElement}>}
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
        img,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

/**
 * Calculate smart crop coordinates for a target aspect ratio
 * Centers the crop on the image
 * @param {number} srcWidth
 * @param {number} srcHeight
 * @param {number} targetRatio - width/height ratio (e.g., 0.8 for 4:5)
 * @returns {{sx: number, sy: number, sw: number, sh: number}}
 */
export function getSmartCrop(srcWidth, srcHeight, targetRatio = 0.85) {
  const srcRatio = srcWidth / srcHeight;

  let sw, sh, sx, sy;

  if (srcRatio > targetRatio) {
    // Source is wider → crop sides
    sh = srcHeight;
    sw = srcHeight * targetRatio;
    sx = (srcWidth - sw) / 2;
    sy = 0;
  } else {
    // Source is taller → crop top/bottom
    sw = srcWidth;
    sh = srcWidth / targetRatio;
    sx = 0;
    sy = (srcHeight - sh) / 2;
  }

  return { sx, sy, sw, sh };
}

/**
 * Check if a file is a supported image type
 * @param {File} file
 * @returns {boolean}
 */
export function isSupportedImage(file) {
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ];
  return supportedTypes.includes(file.type.toLowerCase()) || 
    /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(file.name);
}

/**
 * Draw a rounded rectangle on canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} r - border radius
 */
export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
