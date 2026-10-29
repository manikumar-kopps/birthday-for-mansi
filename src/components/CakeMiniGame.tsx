import React, { useState, useEffect } from 'react';
import { Wind, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration } from '../utils/confetti';

interface CakeMiniGameProps {
  title: string;
  subtitle: string;
  initialCandles?: number;
  wishMessage: string;
}

export const CakeMiniGame: React.FC<CakeMiniGameProps> = ({
  title,
  subtitle,
  initialCandles = 5,
  wishMessage,
}) => {
  const [candles, setCandles] = useState<boolean[]>(Array(initialCandles).fill(true));
  const [hasBlown, setHasBlown] = useState<boolean>(false);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);

  // Toggle single candle
  const toggleCandle = (index: number) => {
    sounds.playPop();
    setCandles((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // Blow all candles out
  const handleBlowAll = () => {
    setIsBlowing(true);
    sounds.playBreeze();

    setTimeout(() => {
      setCandles(Array(initialCandles).fill(false));
      setIsBlowing(false);
      setHasBlown(true);
      sounds.playSparkle();
      triggerBigCelebration();
    }, 600);
  };

  // Relight all candles
  const handleRelightAll = () => {
    sounds.playSparkle();
    setCandles(Array(initialCandles).fill(true));
    setHasBlown(false);
  };

  const litCount = candles.filter(Boolean).length;

  // Keyboard accessibility: 1-5 to toggle candles, Space to blow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= String(initialCandles)) {
        const idx = parseInt(e.key, 10) - 1;
        toggleCandle(idx);
      } else if (e.code === 'Space' && litCount > 0 && !isBlowing) {
        e.preventDefault();
        handleBlowAll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [litCount, isBlowing, initialCandles]);

  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <span className="text-sm font-semibold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300">
          Birthday Game 🎂
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
          {subtitle}
        </p>
        <p className="text-xs text-amber-700 mt-2 font-medium">
          💡 Tap candles individually to light/extinguish them (or press keys 1-{initialCandles})
        </p>
      </div>

      {/* Interactive Birthday Cake Container */}
      <div className="relative max-w-md mx-auto p-8 rounded-3xl bg-white/80 backdrop-blur-md border-2 border-amber-300 shadow-xl flex flex-col items-center">
        {/* Status Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-800">
          {litCount > 0
            ? `${litCount} of ${initialCandles} candles are glowing bright 🔥`
            : 'All candles blown out! Make a wish ✨'}
        </div>

        {/* Cake Illustration */}
        <div className="relative w-72 h-64 flex flex-col items-center justify-end select-none">
          {/* Row of 5 Candles */}
          <div className="flex justify-center gap-5 sm:gap-6 mb-1 relative z-20">
            {candles.map((isLit, idx) => (
              <button
                key={idx}
                onClick={() => toggleCandle(idx)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer transform hover:scale-110 transition-transform"
                title={isLit ? `Candle ${idx + 1}: Lit (tap to blow)` : `Candle ${idx + 1}: Unlit (tap to light)`}
                aria-label={`Toggle candle ${idx + 1}`}
              >
                {/* Flame / Smoke */}
                <div className="h-7 flex items-center justify-center">
                  {isLit ? (
                    <div
                      className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flameFlicker"
                      style={{
                        animationDelay: `${idx * 0.15}s`,
                        boxShadow: '0 0 14px #f59e0b, 0 0 25px #d97706',
                      }}
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono opacity-60">
                      ☁️
                    </span>
                  )}
                </div>
                {/* Wick & Candle Body */}
                <div className="w-0.5 h-1.5 bg-slate-700"></div>
                <div
                  className={`w-3 h-12 rounded-t shadow-sm border border-amber-300/70 ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-b from-yellow-200 via-amber-100 to-yellow-300'
                      : 'bg-gradient-to-b from-amber-200 via-yellow-50 to-amber-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Frosting drips */}
          <div className="relative w-48 h-16 bg-gradient-to-b from-yellow-100 to-amber-200 rounded-t-3xl shadow-inner border-t-4 border-white flex items-center justify-center">
            <span className="font-cursive text-xl font-bold text-amber-800">
              Happy Birthday ☀️💛
            </span>
          </div>

          {/* Middle Tier with sunflowers & honey */}
          <div className="relative w-64 h-20 bg-gradient-to-b from-amber-100 to-yellow-300 rounded-t-2xl shadow-md border-t-4 border-white flex items-center justify-around px-6">
            <span className="text-xl">🌻</span>
            <span className="text-xl">✨</span>
            <span className="text-xl">🍯</span>
            <span className="text-xl">✨</span>
            <span className="text-xl">🌻</span>
          </div>

          {/* Cake Tray */}
          <div className="w-76 h-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full shadow-lg border border-amber-300"></div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {litCount > 0 ? (
            <button
              onClick={handleBlowAll}
              disabled={isBlowing}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 font-bold text-sm shadow-md hover:shadow-amber-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-amber-400"
            >
              <Wind className="w-4 h-4 text-slate-900" />
              <span>Blow the Candles! 💨</span>
            </button>
          ) : (
            <button
              onClick={handleRelightAll}
              className="px-6 py-3 rounded-full bg-white hover:bg-amber-50 text-amber-800 font-bold text-sm shadow-md border-2 border-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>Light Them Again ✨</span>
            </button>
          )}
        </div>

        {/* Revealed Celebration Wish */}
        {hasBlown && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-2 border-amber-300 shadow-md animate-fade-in text-center">
            <div className="text-3xl mb-2 animate-bounce">☀️🎉✨</div>
            <h4 className="font-cursive text-2xl font-bold text-amber-900 mb-1">
              May all your little dreams come true! 💛
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              {wishMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
