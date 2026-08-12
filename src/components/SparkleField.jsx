import React, { useMemo } from 'react';

const COLORS = ['#A7FF4F', '#D5FF70', '#FFB84D', '#FF0080', '#FFF8E7'];

function seededRandom(seed) {
  const x = Math.sin(seed * 9973) * 43758.5453;
  return x - Math.floor(x);
}

export default function SparkleField({ count = 36 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = seededRandom(i + 1);
      const r2 = seededRandom(i + 51);
      const r3 = seededRandom(i + 101);
      const r4 = seededRandom(i + 151);
      const r5 = seededRandom(i + 201);

      const size = 5 + r1 * 5; // 5px - 10px (smaller)
      const left = r2 * 100; // vw %
      const duration = 8 + r3 * 10; // 8s - 18s
      const delay = -r4 * 18; // negative so they start mid-fall
      const drift = (r5 - 0.5) * 90; // px horizontal drift
      const color = COLORS[i % COLORS.length];
      const isStar = i % 5 === 0;

      return { id: i, size, left, duration, delay, drift, color, isStar };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 z-[18] overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift']: `${p.drift}px`,
            ['--color']: p.color,
          }}
        >
          {p.isStar ? (
            <span
              style={{
                display: 'block',
                fontSize: `${p.size * 2.2}px`,
                lineHeight: 1,
                color: p.color,
                textShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}66`,
              }}
            >
              ✦
            </span>
          ) : (
            <span
              style={{
                display: 'block',
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '9999px',
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}55`,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
