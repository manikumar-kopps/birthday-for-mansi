import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration, triggerStarBurst } from '../utils/confetti';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  wishText: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  wishText,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWish, setShowWish] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleMakeWish = () => {
    if (!candlesLit) {
      // Relight
      setCandlesLit(true);
      setShowWish(false);
      sounds.playChime(659.25, 0.8, 0.2);
      return;
    }

    setIsBlowing(true);
    sounds.playBreeze();

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setShowWish(true);
      sounds.playSparkle();
      triggerBigCelebration();
    }, 700);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Decorative Floating Balloons */}
      <div className="absolute top-12 left-6 sm:left-16 pointer-events-none animate-floatSlow">
        <div className="relative">
          <div className="w-14 h-18 bg-yellow-200 rounded-full shadow-md opacity-90 border border-yellow-300/40"></div>
          <div className="w-0.5 h-16 bg-yellow-400/40 mx-auto"></div>
        </div>
      </div>
      <div className="absolute top-24 right-8 sm:right-20 pointer-events-none animate-float" style={{ animationDelay: '1.2s' }}>
        <div className="relative">
          <div className="w-16 h-20 bg-yellow-300 rounded-full shadow-md opacity-85 border border-yellow-400/40"></div>
          <div className="w-0.5 h-16 bg-yellow-400/40 mx-auto"></div>
        </div>
      </div>
      <div className="absolute bottom-20 left-12 pointer-events-none hidden md:block animate-float" style={{ animationDelay: '2.5s' }}>
        <div className="relative">
          <div className="w-12 h-16 bg-amber-100 rounded-full shadow-md opacity-85 border border-amber-200"></div>
          <div className="w-0.5 h-14 bg-amber-300/40 mx-auto"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Cute crown or badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100/90 text-yellow-900 text-sm font-semibold tracking-wide border border-yellow-300/80 mb-6 shadow-sm">
          <Heart className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span>It's Your Special Day Today</span>
          <Sparkles className="w-4 h-4 text-yellow-600" />
        </div>

        {/* Main Heading */}
        <h1 className="font-cursive text-5xl sm:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 drop-shadow-sm mb-4 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg sm:text-2xl text-slate-700 max-w-2xl font-medium mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* Animated Birthday Cake with Glowing Candles */}
        <div className="relative my-4 flex flex-col items-center">
          {/* Cake Illustration */}
          <div className="relative w-64 h-56 flex flex-col items-center justify-end select-none">
            {/* Candle Flames & Smoke */}
            <div className="flex gap-8 mb-1 relative z-20">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {candlesLit ? (
                    <div
                      className="w-3.5 h-6 bg-gradient-to-t from-amber-400 via-yellow-200 to-white rounded-full animate-flameFlicker transition-all duration-300"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        boxShadow: '0 0 16px #fde047, 0 0 28px #f59e0b',
                      }}
                    />
                  ) : (
                    <div className="relative h-6 flex items-center justify-center">
                      <span className="text-xs text-slate-400 animate-fade-out font-mono opacity-60">
                        ~*~
                      </span>
                    </div>
                  )}
                  {/* Candle Stick */}
                  <div className="w-2.5 h-10 bg-gradient-to-b from-yellow-200 via-white to-yellow-300 rounded-t shadow-xs border border-yellow-300/70"></div>
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="relative w-36 h-14 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-t-2xl shadow-inner border-t-2 border-white flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-4 bg-white/70 rounded-b-xl"></div>
              <span className="text-xs font-cursive font-bold text-yellow-900">Pure Sunshine</span>
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-52 h-18 bg-gradient-to-b from-yellow-200 to-amber-200 rounded-t-xl shadow-md border-t-4 border-white/80 flex items-center justify-around px-4">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
              <div className="w-3 h-3 rounded-full bg-amber-300"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
            </div>

            {/* Cake Plate */}
            <div className="w-64 h-4 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 rounded-full shadow-md border border-yellow-200"></div>
          </div>

          {/* Blow Effect Overlay */}
          {isBlowing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping opacity-75">💨✨</span>
            </div>
          )}

          {/* Make a Wish Button */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={handleMakeWish}
              className={`group px-8 py-3.5 rounded-full font-extrabold text-lg shadow-md transition-all duration-300 transform active:scale-95 flex items-center gap-2 border-2 ${
                candlesLit
                  ? 'bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 text-yellow-950 hover:shadow-yellow-300/80 hover:-translate-y-1 border-yellow-300'
                  : 'bg-white text-yellow-900 hover:bg-yellow-50 border-yellow-300 shadow-xs'
              }`}
            >
              <span>{candlesLit ? 'Make a Wish ✨' : 'Relight Candles 🕯️'}</span>
              <Sparkles className="w-5 h-5 text-yellow-700 group-hover:rotate-45 transition-transform" />
            </button>
            <p className="text-xs text-slate-500">
              {candlesLit
                ? 'Close your eyes, think of your sweetest dream, then tap the button! 🌟'
                : 'Your wish has flown to the stars! Click again to relight.'}
            </p>
          </div>

          {/* Revealed Birthday Wish Card */}
          {showWish && (
            <div className="mt-8 max-w-lg p-6 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-yellow-300 shadow-xl animate-fade-in text-center transform transition-all duration-500">
              <div className="inline-block p-3 rounded-full bg-yellow-100 text-yellow-700 mb-3 animate-bounce">
                🎂✨
              </div>
              <h3 className="font-cursive text-3xl font-bold text-yellow-900 mb-2">
                Your Wish Has Been Heard!
              </h3>
              <p className="text-slate-700 text-base leading-relaxed italic">
                "{wishText}"
              </p>
              <button
                onClick={() => {
                  sounds.playSparkle();
                  triggerStarBurst();
                }}
                className="mt-4 text-xs font-semibold text-yellow-800 hover:text-yellow-950 underline"
              >
                Send an extra sparkle to the stars ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
