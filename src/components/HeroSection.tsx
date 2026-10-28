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
          <div className="w-14 h-18 bg-pink-300 rounded-full shadow-lg opacity-80"></div>
          <div className="w-0.5 h-16 bg-pink-400/50 mx-auto"></div>
        </div>
      </div>
      <div className="absolute top-24 right-8 sm:right-20 pointer-events-none animate-float" style={{ animationDelay: '1.2s' }}>
        <div className="relative">
          <div className="w-16 h-20 bg-purple-300 rounded-full shadow-lg opacity-80"></div>
          <div className="w-0.5 h-16 bg-purple-400/50 mx-auto"></div>
        </div>
      </div>
      <div className="absolute bottom-20 left-12 pointer-events-none hidden md:block animate-float" style={{ animationDelay: '2.5s' }}>
        <div className="relative">
          <div className="w-12 h-16 bg-rose-200 rounded-full shadow-lg opacity-75"></div>
          <div className="w-0.5 h-14 bg-rose-300/50 mx-auto"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Cute crown or badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-sm font-semibold tracking-wide border border-pink-200 mb-6 shadow-sm">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span>It's Your Special Day Today</span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>

        {/* Main Heading */}
        <h1 className="font-cursive text-5xl sm:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 drop-shadow-sm mb-4 leading-tight">
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
                      className="w-3.5 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full animate-flameFlicker transition-all duration-300"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        boxShadow: '0 0 16px #f59e0b, 0 0 30px #f43f5e',
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
                  <div className="w-2.5 h-10 bg-gradient-to-b from-pink-200 via-white to-pink-300 rounded-t shadow-sm border border-pink-300/50"></div>
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="relative w-36 h-14 bg-gradient-to-b from-pink-100 to-pink-200 rounded-t-2xl shadow-inner border-t-2 border-white flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-4 bg-white/70 rounded-b-xl"></div>
              <span className="text-xs font-cursive font-bold text-pink-600">Pure Love</span>
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-52 h-18 bg-gradient-to-b from-rose-100 to-pink-300 rounded-t-xl shadow-md border-t-4 border-white/80 flex items-center justify-around px-4">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div>
              <div className="w-3 h-3 rounded-full bg-purple-300"></div>
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
            </div>

            {/* Cake Plate */}
            <div className="w-64 h-4 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-lg border border-slate-300"></div>
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
              className={`group px-8 py-3.5 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform active:scale-95 flex items-center gap-2 border ${
                candlesLit
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white hover:shadow-pink-300 hover:-translate-y-1 border-pink-200'
                  : 'bg-white text-pink-600 hover:bg-pink-50 border-pink-300 shadow-sm'
              }`}
            >
              <span>{candlesLit ? 'Make a Wish ✨' : 'Relight Candles 🕯️'}</span>
              <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-45 transition-transform" />
            </button>
            <p className="text-xs text-slate-500">
              {candlesLit
                ? 'Close your eyes, think of your sweetest dream, then tap the button! 🌟'
                : 'Your wish has flown to the stars! Click again to relight.'}
            </p>
          </div>

          {/* Revealed Birthday Wish Card */}
          {showWish && (
            <div className="mt-8 max-w-lg p-6 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-pink-300 shadow-xl animate-fade-in text-center transform transition-all duration-500">
              <div className="inline-block p-3 rounded-full bg-pink-100 text-pink-600 mb-3 animate-bounce">
                🎂✨
              </div>
              <h3 className="font-cursive text-3xl font-bold text-pink-600 mb-2">
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
                className="mt-4 text-xs font-semibold text-pink-500 hover:text-pink-700 underline"
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
