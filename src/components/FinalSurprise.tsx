import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration, triggerHeartExplosion } from '../utils/confetti';

interface FinalSurpriseProps {
  heading: string;
  subheading: string;
  buttonText: string;
  finalNote: string[];
  footerText: string;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  heading,
  subheading,
  buttonText,
  finalNote,
  footerText,
}) => {
  const [revealed, setRevealed] = useState(false);

  const handleSendLove = () => {
    sounds.playSparkle();
    triggerBigCelebration();
    triggerHeartExplosion();
    setRevealed(true);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-transparent via-amber-100/60 to-yellow-200/50">
      {/* Starry Night particles overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300 animate-sparkle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-amber-300 shadow-2xl">
        {/* Glowing Heart Icon */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-white flex items-center justify-center shadow-xl animate-pulseGlow">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-500 animate-sparkle" />
        </div>

        {/* Heading */}
        <h2 className="font-cursive text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 mb-4 leading-tight">
          {heading}
        </h2>

        {/* Subheading */}
        <p className="text-slate-700 text-base sm:text-xl font-medium mb-8 max-w-xl">
          {subheading}
        </p>

        {/* Interaction Button or Revealed Message */}
        {!revealed ? (
          <button
            onClick={handleSendLove}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 font-bold text-lg shadow-xl hover:shadow-amber-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-amber-400"
          >
            <span>{buttonText}</span>
            <Heart className="w-6 h-6 fill-slate-900 group-hover:scale-125 transition-transform" />
          </button>
        ) : (
          <div className="w-full space-y-6 animate-fade-in">
            {/* The Final Letter Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-xl text-left space-y-4">
              {finalNote.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Floating Love Animation */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <span className="text-2xl animate-bounce">🌻</span>
              <span className="text-3xl animate-pulse">💛</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                ☀️
              </span>
            </div>
          </div>
        )}

        {/* Footer Text */}
        <div className="mt-12 pt-6 border-t border-amber-200/80 w-full text-center">
          <p className="font-cursive text-2xl sm:text-3xl font-bold text-amber-800 tracking-wide">
            {footerText}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Forever & Always 💫
          </p>
        </div>
      </div>
    </section>
  );
};
