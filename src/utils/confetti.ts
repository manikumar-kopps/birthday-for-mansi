import confetti from 'canvas-confetti';

export const triggerHeartExplosion = () => {
  try {
    // Left burst
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ['#fef08a', '#fde047', '#fef9c3', '#facc15', '#ffffff', '#fefce8'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Right burst
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#fef08a', '#fde047', '#fef9c3', '#facc15', '#ffffff', '#fefce8'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  } catch {}
};

export const triggerBigCelebration = () => {
  try {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#fde047', '#fef08a', '#fef9c3', '#facc15', '#ffffff', '#fefce8'];

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
      colors: ['#fef08a', '#fde047', '#fef9c3', '#ffffff', '#facc15'],
      shapes: ['star', 'circle'],
    });
  } catch {}
};
