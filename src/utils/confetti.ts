import confetti from 'canvas-confetti';

export const triggerHeartExplosion = () => {
  try {
    // Left burst
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ['#fbbf24', '#f59e0b', '#fde047', '#eab308', '#ffffff', '#fcd34d', '#fed7aa'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Right burst
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#fbbf24', '#f59e0b', '#fde047', '#eab308', '#ffffff', '#fcd34d', '#fed7aa'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  } catch {}
};

export const triggerBigCelebration = () => {
  try {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f59e0b', '#fbbf24', '#fde047', '#eab308', '#ffffff', '#fef08a', '#d97706'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {}
};

export const triggerStarBurst = (x = 0.5, y = 0.5) => {
  try {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x, y },
      colors: ['#fbbf24', '#f472b6', '#c084fc', '#60a5fa'],
      shapes: ['star', 'circle'],
    });
  } catch {}
};
