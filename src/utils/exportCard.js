/**
 * Canvas Exporter for HH Goa 2026 Format B Lanyard Builder ID Pass (1080x1350)
 * Renders all brand assets with high precision onto offscreen HTML5 Canvas:
 * - Goa Beach Sunrise background scene (sunrise.png)
 * - Hacker House logo + Pink Goa Hindi text overlay
 * - Requested Border Asset (019-group-59467-54-3485-1.svg)
 * - Directional wooden signpost (BUILD, SHIP, LAUNCH, REPEAT)
 * - Bottom table laptop scene (agenda.png)
 * - Palm trees & bougainvillea flowers graphics (footer-trees.png)
 * - Woven lanyard strap & metallic clip
 * - Translucent glossy badge sleeve with top punch hole
 * - Deep Jungle Green insert card with centered photo, NAME, BUILDER TITLE, ROLE, and APPROVED stamp
 */

import { getSmartCrop, roundRect } from './imageProcessing';
import { getTemplate } from '../data/templates';

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

export async function exportBuilderCard(userData, templateId) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');

  const template = getTemplate(templateId);

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
  drawPlasticSleeveAndCard(ctx, photoImg, userData, template, treesImg, patternImg, detailsImg);

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

function drawPlasticSleeveAndCard(ctx, photoImg, userData, template, treesImg, patternImg, detailsImg) {
  // Main Card Center Content (Side-by-Side Pass Content)
  const contentW = 960;
  const contentH = 820;
  const contentX = (CARD_WIDTH - contentW) / 2;
  const contentY = 180;

  // Draw Palm Trees Asset inside card backdrop
  if (treesImg) {
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(treesImg, contentX - 50, contentY + contentH - 280, 300, 320);
    // Mirror on right
    ctx.translate(contentX + contentW + 50, contentY + contentH - 280);
    ctx.scale(-1, 1);
    ctx.drawImage(treesImg, 0, 0, 300, 320);
    ctx.restore();
  }

  // Left Column: Larger User Photo Frame
  const photoW = 440;
  const photoH = 580;
  const photoX = contentX + 20;
  const photoY = contentY + 40;

  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, 24);
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
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#167A4A';
  roundRect(ctx, photoX, photoY, photoW, photoH, 24);
  ctx.stroke();

  // Right Column: Details Table Area
  const rightX = photoX + photoW + 35;
  const rightY = photoY;
  const tableW = 440;

  // Draw details.png graphic overlay on right side if available
  if (detailsImg) {
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(detailsImg, rightX + 40, rightY - 20, 380, 320);
    ctx.restore();
  }

  // Table Container Box
  ctx.fillStyle = 'rgba(4, 15, 11, 0.88)';
  roundRect(ctx, rightX, rightY, tableW, 440, 20);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(22, 122, 74, 0.6)';
  roundRect(ctx, rightX, rightY, tableW, 440, 20);
  ctx.stroke();

  // Divider lines inside table box
  ctx.strokeStyle = 'rgba(22, 122, 74, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rightX + 20, rightY + 140);
  ctx.lineTo(rightX + tableW - 20, rightY + 140);
  ctx.moveTo(rightX + 20, rightY + 280);
  ctx.lineTo(rightX + tableW - 20, rightY + 280);
  ctx.stroke();

  const name = (userData.name || 'RAVI KISHAN').toUpperCase();
  const stack = (userData.stack || 'FULL STACK DEVELOPER').toUpperCase();
  const title = (userData.builderTitle || 'THE SHIPPER').toUpperCase();

  // 1. BUILDER NAME
  ctx.fillStyle = 'rgba(167, 255, 79, 0.9)';
  ctx.font = "800 16px 'JetBrains Mono', monospace";
  ctx.fillText('BUILDER NAME', rightX + 25, rightY + 45);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = "900 32px 'Space Grotesk', sans-serif";
  ctx.fillText(name, rightX + 25, rightY + 95);

  // 2. BUILDER TITLE
  ctx.fillStyle = 'rgba(167, 255, 79, 0.9)';
  ctx.font = "800 16px 'JetBrains Mono', monospace";
  ctx.fillText('BUILDER TITLE', rightX + 25, rightY + 185);

  ctx.fillStyle = '#FEE101';
  ctx.font = "900 30px 'Space Grotesk', sans-serif";
  ctx.fillText(title, rightX + 25, rightY + 235);

  // 3. STACK / ROLE
  ctx.fillStyle = 'rgba(167, 255, 79, 0.9)';
  ctx.font = "800 16px 'JetBrains Mono', monospace";
  ctx.fillText('STACK / ROLE', rightX + 25, rightY + 325);

  ctx.fillStyle = '#A7FF4F';
  ctx.font = "800 24px 'JetBrains Mono', monospace";
  ctx.fillText(stack, rightX + 25, rightY + 375);

  // APPROVED Rubber Stamp Badge (Bottom Right below table)
  drawApprovedRubberStamp(ctx, rightX + 20, rightY + 470);
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
