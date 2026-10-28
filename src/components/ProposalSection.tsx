import React, { useState } from 'react';
import { Heart, Sparkles, ArrowDown } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration, triggerHeartExplosion } from '../utils/confetti';

interface ProposalSectionProps {
  partnerName?: string;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({
  partnerName = 'Mansi',
}) => {
  const [accepted, setAccepted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);

  const noPhrases = [
    'No 🙈',
    'Are you sure? 🥺',
    'Think again silly! 👀',
    'Wrong button! 😜',
    'You really mean Yes right? 💖',
    'Error 404: "No" does not exist! 🚫',
    'Nice try! Still Yes! 🥰',
    'My heart says you clicked Yes! ✨',
  ];

  const handleYes = () => {
    sounds.playSparkle();
    triggerBigCelebration();
    triggerHeartExplosion();
    setAccepted(true);
    setSkipped(false);
  };

  const handleNoInteraction = () => {
    sounds.playPop();
    setNoCount((prev) => prev + 1);

    // Random offset to make the button jump away playfully
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 140;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleSkip = () => {
    sounds.playPop();
    setSkipped(true);
    // Smooth scroll down to next section
    const nextElem = document.getElementById('cake-section');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const yesScale = Math.min(1 + noCount * 0.15, 1.8);

  return (
    <section id="proposal-section" className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      {/* Title */}
      <div className="mb-10">
        <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase bg-rose-100/90 px-4 py-1.5 rounded-full border border-rose-200">
          A Special Question 💍
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          From My Heart To Yours 💖
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
          Out of all the questions in the world, this is the only one that truly matters.
        </p>
      </div>

      {/* Main Proposal Card */}
      <div className="relative max-w-2xl mx-auto p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-rose-50 via-white to-pink-50 border-2 border-rose-300 shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-300/25 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-300/25 rounded-full blur-2xl pointer-events-none"></div>

        {!accepted && !skipped && (
          <div>
            {/* Glowing Ring Box Icon */}
            <div className="relative mb-6 flex justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-xl animate-pulseGlow">
                <span className="text-4xl filter drop-shadow">💍</span>
              </div>
              <Sparkles className="absolute -top-2 right-1/3 w-6 h-6 text-yellow-400 animate-sparkle" />
            </div>

            {/* The Question */}
            <h3 className="font-cursive text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-4 leading-tight">
              Will You Be Mine? 💖
            </h3>

            <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-md mx-auto mb-10">
              Dear {partnerName}, every day with you is a gift. Through laughter, quiet days, silly moments, and everything in between... will you be mine?
            </p>

            {/* Interactive Yes / No Buttons Container */}
            <div className="relative min-h-[140px] flex items-center justify-center gap-6 sm:gap-8 flex-wrap pt-4">
              {/* YES Button (Always works and grows bigger!) */}
              <button
                type="button"
                onClick={handleYes}
                style={{
                  transform: `scale(${yesScale})`,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-lg sm:text-xl shadow-xl hover:shadow-rose-400/60 active:scale-95 flex items-center gap-2 border border-rose-200 z-20 cursor-pointer"
              >
                <span>YES! Absolutely! 💖</span>
                <Heart className="w-6 h-6 fill-white group-hover:scale-125 transition-transform" />
              </button>

              {/* NO Button (Playfully dodges/runs away or changes text) */}
              <button
                type="button"
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                onClick={handleNoInteraction}
                style={{
                  transform: noPosition
                    ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                    : 'none',
                  transition: 'all 0.25s ease-out',
                }}
                className="px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-semibold text-sm border border-slate-300 shadow-sm cursor-pointer select-none"
              >
                {noPhrases[noCount % noPhrases.length]}
              </button>
            </div>

            {/* Skip Option */}
            <div className="mt-12 pt-6 border-t border-rose-200/60 flex flex-col items-center">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-slate-400 hover:text-pink-600 font-medium underline transition-colors flex items-center gap-1"
              >
                <span>If you don't want to answer right now, skip this session</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ACCEPTED STATE (She clicked YES!) */}
        {accepted && (
          <div className="space-y-6 animate-fade-in text-center py-4">
            <div className="text-6xl mb-2 animate-bounce">💍🎉💖</div>
            <h3 className="font-cursive text-4xl sm:text-6xl font-extrabold text-rose-600 mb-3">
              YAY! She Said YES! 😭❤️
            </h3>
            <p className="text-slate-800 text-lg sm:text-xl font-medium leading-relaxed max-w-lg mx-auto">
              You just made me the happiest person in the entire world! I promise to love, protect, and cherish you with every beat of my heart, today and forever. 🌹
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 text-rose-700 font-bold text-xs tracking-wider uppercase border border-rose-300">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Official Promise Sealed Forever 🔒✨</span>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <span className="text-3xl animate-pulse">🌸</span>
              <span className="text-3xl animate-bounce">💖</span>
              <span className="text-3xl animate-pulse">🌷</span>
            </div>
          </div>
        )}

        {/* SKIPPED STATE */}
        {skipped && (
          <div className="space-y-4 animate-fade-in text-center py-6">
            <div className="text-4xl mb-2">🌸✨</div>
            <h4 className="font-cursive text-3xl font-bold text-slate-700">
              No Rush At All, My Sunshine ☀️
            </h4>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Take all the time in the world. My feelings for you remain steady, patient, and full of love. 🌷
            </p>
            <button
              onClick={() => {
                setSkipped(false);
                setNoCount(0);
                setNoPosition(null);
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline mt-2"
            >
              Take me back to the question 💖
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
