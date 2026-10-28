import React, { useState } from 'react';
import { Heart, Gift, Smile, Infinity as InfinityIcon, X, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerHeartExplosion, triggerStarBurst } from '../utils/confetti';

interface LoveButtonsProps {
  compliments: string[];
  vouchers: {
    title: string;
    description: string;
    code: string;
  }[];
}

export const InteractiveLoveButtons: React.FC<LoveButtonsProps> = ({
  compliments,
  vouchers,
}) => {
  const [activeModal, setActiveModal] = useState<'hug' | 'compliment' | 'infinity' | 'voucher' | null>(null);
  const [currentCompliment, setCurrentCompliment] = useState<string>('');
  const [currentVoucherIdx, setCurrentVoucherIdx] = useState(0);
  const [flyingKisses, setFlyingKisses] = useState<{ id: number; left: number; emoji: string }[]>([]);
  const [lovePercentage, setLovePercentage] = useState(0);

  // Hug interaction
  const handleHug = () => {
    sounds.playPop();
    setActiveModal('hug');
  };

  // Kiss interaction: release floating kiss emojis
  const handleKiss = () => {
    sounds.playPop();
    triggerHeartExplosion();

    const kisses = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 85 + 5,
      emoji: ['💋', '😘', '💖', '💕', '🥰'][i % 5],
    }));

    setFlyingKisses((prev) => [...prev, ...kisses]);

    // Clean up kisses after animation completes
    setTimeout(() => {
      setFlyingKisses((prev) => prev.filter((k) => !kisses.some((nk) => nk.id === k.id)));
    }, 2500);
  };

  // Smile interaction: pick random compliment
  const handleSmile = () => {
    sounds.playSparkle();
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(random);
    setActiveModal('compliment');
  };

  // Next compliment in modal
  const handleNextCompliment = () => {
    sounds.playPop();
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(random);
  };

  // Infinity Love interaction
  const handleInfinity = () => {
    sounds.playSparkle();
    setLovePercentage(0);
    setActiveModal('infinity');

    // Animate counter upwards
    let count = 0;
    const interval = setInterval(() => {
      count += 18;
      if (count >= 100) {
        clearInterval(interval);
        setLovePercentage(100);
      } else {
        setLovePercentage(count);
      }
    }, 40);
  };

  // One More Surprise (Gift / Voucher)
  const handleSurprise = () => {
    sounds.playSparkle();
    triggerStarBurst();
    setCurrentVoucherIdx((prev) => (prev + 1) % vouchers.length);
    setActiveModal('voucher');
  };

  return (
    <section className="relative py-20 px-4 max-w-5xl mx-auto text-center">
      <div className="mb-12">
        <span className="text-sm font-semibold tracking-widest text-pink-500 uppercase bg-pink-100/80 px-4 py-1.5 rounded-full border border-pink-200">
          Playful Moments
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          Interactive Love Buttons 💘
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          Every button holds a little piece of my heart. Tap any one of them!
        </p>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {/* 1. Tap for a Hug */}
        <button
          onClick={handleHug}
          className="group px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-pink-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-pink-200"
        >
          <span>Tap for a Hug</span>
          <span className="text-xl group-hover:scale-125 transition-transform">🤗</span>
        </button>

        {/* 2. Tap for a Kiss */}
        <button
          onClick={handleKiss}
          className="group px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-400 to-red-400 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-rose-200"
        >
          <span>Tap for a Kiss</span>
          <span className="text-xl group-hover:scale-125 transition-transform">😘</span>
        </button>

        {/* 3. Need a Smile? */}
        <button
          onClick={handleSmile}
          className="group px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-400 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-amber-200 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-amber-200"
        >
          <span>Need a Smile?</span>
          <span className="text-xl group-hover:scale-125 transition-transform">🌷</span>
        </button>

        {/* 4. How Much Do I Love You? */}
        <button
          onClick={handleInfinity}
          className="group px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-purple-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-purple-200"
        >
          <span>How Much Do I Love You?</span>
          <span className="text-xl group-hover:scale-125 transition-transform">♾️</span>
        </button>

        {/* 5. One More Surprise? */}
        <button
          onClick={handleSurprise}
          className="group px-6 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-rose-400 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-yellow-200 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-yellow-200"
        >
          <span>One More Surprise?</span>
          <span className="text-xl group-hover:scale-125 transition-transform">🎁</span>
        </button>
      </div>

      {/* Floating Kisses Shower Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {flyingKisses.map((kiss) => (
          <div
            key={kiss.id}
            className="absolute bottom-10 animate-floatSlow text-3xl select-none"
            style={{
              left: `${kiss.left}%`,
              animation: 'floatSlow 2.5s ease-out forwards',
              opacity: 0.9,
            }}
          >
            {kiss.emoji}
          </div>
        ))}
      </div>

      {/* Hug Modal */}
      {activeModal === 'hug' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative max-w-sm w-full bg-white rounded-3xl p-8 text-center shadow-2xl border-2 border-pink-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-pink-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated hugging heart illustration */}
            <div className="relative my-6 flex justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center animate-pulse">
                <div className="flex items-center -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg transform -rotate-12 animate-gentleWiggle">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-rose-400 text-white flex items-center justify-center shadow-lg transform rotate-12">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-cursive text-3xl font-bold text-pink-600 mb-2">
              The Warmest Virtual Hug! 🤗
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              Consider yourself held tightly in my arms. Close your eyes, feel the warmth, and remember that you are deeply, endlessly safe with me.
            </p>

            <button
              onClick={() => setActiveModal(null)}
              className="px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs tracking-wide shadow-md transition-colors"
            >
              I Feel Warm Now 💕
            </button>
          </div>
        </div>
      )}

      {/* Compliment Modal */}
      {activeModal === 'compliment' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl border-2 border-amber-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block p-4 rounded-full bg-amber-100 text-amber-600 mb-4 animate-bounce">
              <Smile className="w-8 h-8" />
            </div>

            <h3 className="font-cursive text-3xl font-bold text-amber-600 mb-3">
              A Sweet Reminder For You 🌷
            </h3>
            <p className="text-slate-800 text-lg leading-relaxed font-sans font-medium italic my-6 px-4">
              "{currentCompliment}"
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleNextCompliment}
                className="px-5 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold text-xs transition-colors"
              >
                Another Smile Please ✨
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs transition-colors"
              >
                Thank You ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Infinity Love Modal */}
      {activeModal === 'infinity' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl border-2 border-purple-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-purple-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative my-6 flex flex-col items-center justify-center">
              <div className="text-purple-600 animate-pulseGlow">
                <InfinityIcon className="w-24 h-24 stroke-[1.5]" />
              </div>
              <div className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {lovePercentage < 100 ? `${lovePercentage}%` : '♾️ Beyond All Numbers'}
              </div>
            </div>

            <h3 className="font-cursive text-3xl font-bold text-purple-700 mb-2">
              My Love For You Has No Limit
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              If love could be counted in stars, the whole cosmos wouldn't have enough room. Past infinity, into tomorrow, and for every lifetime after that.
            </p>

            <button
              onClick={() => {
                sounds.playSparkle();
                triggerHeartExplosion();
                setActiveModal(null);
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs tracking-wide shadow-md transition-all hover:scale-105"
            >
              I Love You More! 💖
            </button>
          </div>
        </div>
      )}

      {/* Voucher Modal */}
      {activeModal === 'voucher' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative max-w-md w-full bg-gradient-to-br from-yellow-50 via-white to-pink-50 rounded-3xl p-8 text-center shadow-2xl border-2 border-yellow-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-yellow-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block p-4 rounded-full bg-yellow-100 text-yellow-600 mb-3 animate-bounce">
              <Gift className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Birthday VIP Coupon
            </span>

            <h3 className="font-cursive text-3xl font-bold text-slate-800 mt-4 mb-2">
              {vouchers[currentVoucherIdx].title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {vouchers[currentVoucherIdx].description}
            </p>

            {/* Coupon Code Box */}
            <div className="bg-white/90 border-2 border-dashed border-pink-300 rounded-xl p-3 mb-6 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-pink-600 tracking-wider">
                {vouchers[currentVoucherIdx].code}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                Never Expires 💖
              </span>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  sounds.playPop();
                  setCurrentVoucherIdx((prev) => (prev + 1) % vouchers.length);
                }}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Draw Another 🎁
              </button>
              <button
                onClick={() => {
                  sounds.playSparkle();
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Claim This Coupon</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
