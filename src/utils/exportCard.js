/**
 * Canvas Exporter for HH Goa 2026 Format B Builder ID Pass (1080x1350)
 * Renders all brand assets with high precision onto offscreen HTML5 Canvas:
 * - Goa Beach Sunrise background scene (sunrise.png)
 * - Hacker House logo + Pink Goa Hindi text overlay
 * - Requested Border Asset (019-group-59467-54-3485-1.svg)
 * - Directional wooden signpost (BUILD, SHIP, LAUNCH, REPEAT)
 * - Bottom table laptop scene (agenda.png)
 * - Palm trees & bougainvillea flowers graphics (footer-trees.png)
 * - Translucent glossy badge sleeve with top punch hole
 * - Deep Jungle Green insert card with centered photo, NAME, BUILDER TITLE, ROLE, and APPROVED stamp
 */
 
import { getSmartCrop, roundRect } from './imageProcessing';
import { getTemplate } from '../data/templates';
 
const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
 
export async function exportBuilderCard(userData, templateId) {
  // Try pixel-perfect DOM capture with html2canvas if available (preferred)
  try {
    const pkg = 'html2canvas';
    const html2canvas = await import(/* @vite-ignore */ pkg);
    if (html2canvas && typeof document !== 'undefined') {
      const node = document.getElementById('export-card');
      if (node) {
        // Temporarily disable layout transforms, transitions and animations
        // so html2canvas captures a straight-on, stable preview.
        const prevStyles = new Map();
        try {
          const elems = node.querySelectorAll('*');
          elems.forEach((el) => {
            prevStyles.set(el, {
              transform: el.style.transform,
              transition: el.style.transition,
              animation: el.style.animation,
            });
            el.style.transform = 'none';
            el.style.transition = 'none';
            el.style.animation = 'none';
          });
          node.style.transform = 'none';
 
          // Ensure webfonts have loaded so canvas text matches the page exactly
          try {
            if (document.fonts && document.fonts.ready) await document.fonts.ready;
          } catch (e) {
            // ignore if document.fonts isn't supported
          }

          // Use the exact devicePixelRatio (don't floor) for pixel-perfect capture
          const scaleOption = (typeof window !== 'undefined' && window.devicePixelRatio) ? Math.max(1, window.devicePixelRatio) : 1;
          const canvas = await html2canvas.default(node, {
            scale: scaleOption,
            backgroundColor: null,
            useCORS: true,
            allowTaint: false,
          });
 
          const blob = await new Promise((res) => canvas.toBlob((b) => res(b), 'image/png'));
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `hh-goa-2026-builder-id-${userData.name?.replace(/\s+/g, '-').toLowerCase() || 'card'}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
 
          // restore styles
          prevStyles.forEach((vals, el) => {
            el.style.transform = vals.transform || '';
            el.style.transition = vals.transition || '';
            el.style.animation = vals.animation || '';
          });
 
          return;
        } catch (err) {
          // restore styles on error then rethrow to fall back
          prevStyles.forEach((vals, el) => {
            el.style.transform = vals.transform || '';
            el.style.transition = vals.transition || '';
            el.style.animation = vals.animation || '';
          });
          throw err;
        }
      }
    }
  } catch (err) {
    // html2canvas not available or failed — fall back to canvas renderer below
    console.warn('html2canvas not available, falling back to programmatic canvas exporter. To enable pixel-perfect exports, run: npm install html2canvas');
  }
 
  // Fallback: existing programmatic canvas renderer (keeps working if html2canvas unavailable)
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  // Improve exported image rendering quality
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }
 
  const template = getTemplate(templateId);
 
  // Try to read layout from the live DOM preview (if present) so fallback renderer
  // matches the on-screen preview pixel-for-pixel. We look for the #export-card node
  // and compute a scale factor to map DOM pixels -> canvas pixels.
  let domRects = null;
  try {
    const node = document.getElementById('export-card');
    if (node) {
      const nodeRect = node.getBoundingClientRect();
      const scale = CARD_WIDTH / nodeRect.width;
 
      const photoImgEl = node.querySelector(`img[src="${userData.photoUrl}"]`);
      const detailsImgEl = node.querySelector('img[src="/assets/details.png"]');
      const agendaEl = node.querySelector('img[src="/assets/agenda.png"]');
 
      domRects = { scale };
 
      if (photoImgEl) {
        const r = photoImgEl.getBoundingClientRect();
        domRects.photo = {
          x: Math.round((r.left - nodeRect.left) * scale),
          y: Math.round((r.top - nodeRect.top) * scale),
          w: Math.round(r.width * scale),
          h: Math.round(r.height * scale),
        };
      }
 
      if (detailsImgEl) {
        const r = detailsImgEl.getBoundingClientRect();
        domRects.details = {
          x: Math.round((r.left - nodeRect.left) * scale),
          y: Math.round((r.top - nodeRect.top) * scale),
          w: Math.round(r.width * scale),
          h: Math.round(r.height * scale),
        };
      }
 
      if (agendaEl) {
        const r = agendaEl.getBoundingClientRect();
        domRects.agenda = {
          x: Math.round((r.left - nodeRect.left) * scale),
          y: Math.round((r.top - nodeRect.top) * scale),
          w: Math.round(r.width * scale),
          h: Math.round(r.height * scale),
        };
      }
    }
  } catch (err) {
    // ignore DOM inspection errors in non-browser or server environments
    domRects = null;
  }
 
  // Load all required image assets
  const [photoImg, bgImg, logoImg, hindiImg, agendaImg, patternImg, treesImg, detailsImg] = await Promise.all([
    loadImageFromUrl(userData.photoUrl).catch(() => null),
    loadImageFromUrl('/assets/sunrise.png').catch(() => null),
    loadImageFromUrl('/assets/hacker-house.png').catch(() => null),
    loadImageFromUrl('/assets/goa-hindi.svg').catch(() => null),
    loadImageFromUrl('/assets/agenda.png').catch(() => null),
    loadImageFromUrl('/assets/019-group-59467-54-3485-1.svg').catch(() => null),
    loadImageFromUrl('/assets/footer-trees.png').catch(() => null),
    loadImageFromUrl('/assets/details.png').catch(() => null),
  ]);
 
  // 1. Draw Goa Beach Scene Background
  if (bgImg) {
    ctx.drawImage(bgImg, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  } else {
    ctx.fillStyle = template.colors.bg || '#0E4630';
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  }
 
  // 1b. Page-matching green gradient wash (same tint as the rest of the app's background)
  const bgGradient = ctx.createLinearGradient(0, 0, 0, CARD_HEIGHT);
  bgGradient.addColorStop(0, 'rgba(8, 62, 46, 0.55)');
  bgGradient.addColorStop(0.5, 'rgba(22, 122, 74, 0.22)');
  bgGradient.addColorStop(1, 'rgba(7, 26, 20, 0.75)');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
 
  // Outer border
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(6, 6, CARD_WIDTH - 12, CARD_HEIGHT - 12);
 
  // 2. Top Header Overlay (Logo & GOA, INDIA)
  drawHeaderOverlay(ctx, logoImg, hindiImg);
 
  // 3. REQUESTED BORDER STRIP (019-group-59467-54-3485-1.svg)
  if (patternImg) {
    ctx.drawImage(patternImg, 0, 115, CARD_WIDTH, 26);
    ctx.drawImage(patternImg, 0, CARD_HEIGHT - 35, CARD_WIDTH, 26);
  }
 
  // 4. Bottom Left Signpost (BUILD, SHIP, LAUNCH, REPEAT)
  drawSignpost(ctx);
 
  // 5. Bottom Right Laptop Scene
  if (agendaImg) {
    ctx.drawImage(agendaImg, CARD_WIDTH - 380, CARD_HEIGHT - 300, 360, 260);
  }
 
  // 6. Integrated Card Content Pass (Side-by-side Photo Left, Details Right)
  drawPlasticSleeveAndCard(ctx, photoImg, userData, template, treesImg, patternImg, detailsImg, domRects);
 
  // Export PNG
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hh-goa-2026-builder-id-${userData.name?.replace(/\s+/g, '-').toLowerCase() || 'card'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
 
function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
 
// ── CANVAS LAYERS ──
 
function drawHeaderOverlay(ctx, logoImg, hindiImg) {
  // Top Left Logo
  if (logoImg) {
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.drawImage(logoImg, 50, 45, 300, 55);
    ctx.shadowColor = 'transparent';
  }
 
  if (hindiImg) {
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.drawImage(hindiImg, 110, 35, 90, 80);
    ctx.shadowColor = 'transparent';
  }
 
  // Top Right "GOA, INDIA ✦"
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 6;
  ctx.fillStyle = '#FEE101';
  ctx.font = "900 24px 'JetBrains Mono', monospace";
  ctx.textAlign = 'right';
  ctx.fillText('GOA, INDIA ✦', CARD_WIDTH - 50, 75);
  ctx.shadowColor = 'transparent';
  ctx.textAlign = 'left';
}
 
function drawSignpost(ctx) {
  const baseX = 50;
  let baseY = CARD_HEIGHT - 330;
  const signs = [
    { text: 'BUILD', bg: '#FEE101', textCol: '#000000', rot: -0.04 },
    { text: 'SHIP', bg: '#FF0080', textCol: '#FFFFFF', rot: 0.02 },
    { text: 'LAUNCH', bg: '#FEE101', textCol: '#000000', rot: -0.02 },
    { text: 'REPEAT', bg: '#FF0080', textCol: '#FFFFFF', rot: 0.03 },
  ];
 
  signs.forEach((s) => {
    ctx.save();
    ctx.translate(baseX, baseY);
    ctx.rotate(s.rot);
 
    // Sign Box
    ctx.fillStyle = s.bg;
    ctx.fillRect(0, 0, 180, 55);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(0, 0, 180, 55);
 
    // Text
    ctx.fillStyle = s.textCol;
    ctx.font = "900 22px 'Space Grotesk', monospace";
    ctx.fillText(s.text, 25, 36);
 
    ctx.restore();
    baseY += 60;
  });
}
 
function drawPlasticSleeveAndCard(ctx, photoImg, userData, template, treesImg, patternImg, detailsImg, domRects = null) {
  // Main Card Center Content (Side-by-side Photo Left, Details Right)
  const contentW = Math.round(CARD_WIDTH * 0.8889); // 960 / 1080
  const contentH = Math.round(CARD_HEIGHT * 0.6074); // 820 / 1350
  const contentX = Math.round((CARD_WIDTH - contentW) / 2);
  const contentY = Math.round(CARD_HEIGHT * 0.1333); // ~180px
 
  // Draw Palm Trees Asset inside card backdrop
  if (treesImg) {
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(treesImg, contentX - Math.round(CARD_WIDTH * 0.0463), contentY + contentH - Math.round(CARD_HEIGHT * 0.2074), Math.round(CARD_WIDTH * 0.2778), Math.round(CARD_HEIGHT * 0.2370));
    // Mirror on right
    ctx.translate(contentX + contentW + Math.round(CARD_WIDTH * 0.0463), contentY + contentH - Math.round(CARD_HEIGHT * 0.2074));
    ctx.scale(-1, 1);
    ctx.drawImage(treesImg, 0, 0, Math.round(CARD_WIDTH * 0.2778), Math.round(CARD_HEIGHT * 0.2370));
    ctx.restore();
  }
 
  // Left Column: Larger User Photo Frame
  let photoW = Math.round(CARD_WIDTH * 0.4074);
  let photoH = Math.round(CARD_HEIGHT * 0.4296);
  let photoX = contentX + Math.round(CARD_WIDTH * 0.0185);
  let photoY = contentY + Math.round(CARD_HEIGHT * 0.0296);
  const photoR = Math.round(Math.max(16, CARD_WIDTH * 0.022));
 
  if (domRects && domRects.photo) {
    photoX = domRects.photo.x;
    photoY = domRects.photo.y;
    photoW = domRects.photo.w;
    photoH = domRects.photo.h;
  }
 
  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, photoR);
  ctx.clip();
 
  if (photoImg) {
    const crop = getSmartCrop(photoImg.naturalWidth, photoImg.naturalHeight, photoW / photoH);
    ctx.drawImage(
      photoImg,
      crop.sx, crop.sy, crop.sw, crop.sh,
      photoX, photoY, photoW, photoH
    );
  } else {
    ctx.fillStyle = '#040F0B';
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }
  ctx.restore();
 
  // Photo Frame Border
  ctx.lineWidth = Math.max(3, Math.round(CARD_WIDTH * 0.0046));
  ctx.strokeStyle = '#167A4A';
  roundRect(ctx, photoX, photoY, photoW, photoH, photoR);
  ctx.stroke();
 
  // Right Column: Details Table Area
  const rightX = photoX + photoW + Math.round(CARD_WIDTH * 0.0324);
  const rightY = photoY;
  const tableW = Math.round(CARD_WIDTH * 0.4074);
 
  // Draw details.png graphic overlay on right side if available
  if (detailsImg) {
    ctx.save();
    ctx.globalAlpha = 0.35;
    if (domRects && domRects.details) {
      ctx.drawImage(detailsImg, domRects.details.x, domRects.details.y, domRects.details.w, domRects.details.h);
    } else {
      ctx.drawImage(detailsImg, rightX + Math.round(CARD_WIDTH * 0.0370), rightY - Math.round(CARD_HEIGHT * 0.0148), Math.round(CARD_WIDTH * 0.3519), Math.round(CARD_HEIGHT * 0.2370));
    }
    ctx.restore();
  }
 
  // Table Container Box
  ctx.fillStyle = 'rgba(4, 15, 11, 0.88)';
  roundRect(ctx, rightX, rightY, tableW, Math.round(CARD_HEIGHT * 0.3259), Math.round(CARD_WIDTH * 0.0185));
  ctx.fill();
  ctx.lineWidth = Math.max(2, Math.round(CARD_WIDTH * 0.0028));
  ctx.strokeStyle = 'rgba(22, 122, 74, 0.6)';
  roundRect(ctx, rightX, rightY, tableW, Math.round(CARD_HEIGHT * 0.3259), Math.round(CARD_WIDTH * 0.0185));
  ctx.stroke();
 
  // Divider lines inside table box
  ctx.strokeStyle = 'rgba(22, 122, 74, 0.4)';
  ctx.lineWidth = Math.max(1, Math.round(CARD_WIDTH * 0.0019));
  ctx.beginPath();
  ctx.moveTo(rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.1037));
  ctx.lineTo(rightX + tableW - Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.1037));
  ctx.moveTo(rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.2074));
  ctx.lineTo(rightX + tableW - Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.2074));
  ctx.stroke();
 
  const name = (userData.name || 'RAVI KISHAN').toUpperCase();
  const stack = (userData.stack || 'FULL STACK DEVELOPER').toUpperCase();
  const title = (userData.builderTitle || 'THE SHIPPER').toUpperCase();
 
  // 1. BUILDER NAME
  ctx.fillStyle = 'rgba(167, 255, 79, 0.9)';
  ctx.font = "800 16px 'JetBrains Mono', monospace";
  ctx.fillText('BUILDER NAME', rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.0333));
 
  ctx.fillStyle = '#FFFFFF';
  ctx.font = "900 32px 'Space Grotesk', sans-serif";
  ctx.fillText(name, rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.0704));
 
  // 2. BUILDER TITLE
  ctx.fillStyle = 'rgba(167, 255, 79, 0.9)';
  ctx.font = "800 16px 'JetBrains Mono', monospace";
  ctx.fillText('BUILDER TITLE', rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.1370));
 
  ctx.fillStyle = '#FEE101';
  ctx.font = "900 30px 'Space Grotesk', sans-serif";
  ctx.fillText(title, rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.1704));
 
  // 3. STACK / ROLE
  ctx.fillStyle = 'rgba(167, 255, 79, 0.9)';
  ctx.font = "800 16px 'JetBrains Mono', monospace";
  ctx.fillText('STACK / ROLE', rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.2407));
 
  ctx.fillStyle = '#A7FF4F';
  ctx.font = "800 24px 'JetBrains Mono', monospace";
  ctx.fillText(stack, rightX + Math.round(CARD_WIDTH * 0.0231), rightY + Math.round(CARD_HEIGHT * 0.2778));
 
  // APPROVED Rubber Stamp Badge (Bottom Right below table)
  drawApprovedRubberStamp(ctx, rightX + Math.round(CARD_WIDTH * 0.0185), rightY + Math.round(CARD_HEIGHT * 0.3481));
}
 
function drawApprovedRubberStamp(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.18); // Rotate -10 degrees
 
  // Rubber Stamp Fill
  ctx.fillStyle = 'rgba(11, 42, 31, 0.9)';
  roundRect(ctx, 0, 0, 170, 70, 10);
  ctx.fill();
 
  // Double Stamp Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#32C766';
  roundRect(ctx, 0, 0, 170, 70, 10);
  ctx.stroke();
 
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#32C766';
  roundRect(ctx, 4, 4, 162, 62, 8);
  ctx.stroke();
 
  // Inner text
  ctx.fillStyle = '#32C766';
  ctx.font = "800 11px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('GOA 2026', 85, 20);
 
  ctx.fillStyle = '#A7FF4F';
  ctx.font = "900 22px 'Space Grotesk', sans-serif";
  ctx.fillText('APPROVED', 85, 45);
 
  ctx.fillStyle = '#32C766';
  ctx.font = "800 10px monospace";
  ctx.fillText('★ ★ ★', 85, 60);
 
  ctx.restore();
}
 