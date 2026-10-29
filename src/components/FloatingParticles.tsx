import React, { useMemo } from 'react';

interface Particle {
  id: number;
  char: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingParticles: React.FC = () => {
  const particles: Particle[] = useMemo(() => {
    const symbols = ['☀️', '✨', '🌻', '💛', '⭐', '🌼', '🍯', '☁️'];
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      char: symbols[i % symbols.length],
      left: Math.random() * 96,
      top: Math.random() * 95,
      size: Math.random() * 14 + 14,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-30 transition-transform duration-1000 ease-in-out"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            animation: `floatSlow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
