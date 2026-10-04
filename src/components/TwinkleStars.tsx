const STARS = [
  { x: 68, y: 6, size: 2, delay: 0, duration: 3.4 },
  { x: 92, y: 10, size: 1.5, delay: 0.8, duration: 4.1 },
  { x: 78, y: 16, size: 1.5, delay: 1.6, duration: 3.8 },
  { x: 86, y: 24, size: 2, delay: 0.3, duration: 4.6 },
  { x: 60, y: 11, size: 1, delay: 2.1, duration: 3.2 },
  { x: 74, y: 28, size: 1, delay: 1.1, duration: 3.6 },
  { x: 95, y: 20, size: 1.5, delay: 2.6, duration: 4.2 },
  { x: 65, y: 22, size: 1, delay: 0.5, duration: 3.9 },
  { x: 55, y: 18, size: 1.5, delay: 1.9, duration: 4.4 },
  { x: 90, y: 32, size: 1, delay: 1.3, duration: 3.3 },
  { x: 8, y: 14, size: 1.5, delay: 0.9, duration: 4 },
  { x: 18, y: 8, size: 1, delay: 2.3, duration: 3.5 },
  { x: 30, y: 20, size: 1, delay: 1.5, duration: 3.7 },
  { x: 14, y: 30, size: 1.5, delay: 0.2, duration: 4.3 },
];

export default function TwinkleStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="twinkle-star absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
