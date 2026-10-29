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
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-transparent via-yellow-100/40 to-yellow-200/30">
      {/* Starry Night particles overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-300 animate-sparkle"
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

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-yellow-300 shadow-2xl">
        {/* Glowing Heart Icon */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-200 to-yellow-400 text-yellow-950 flex items-center justify-center shadow-md animate-pulseGlow border-2 border-yellow-300">
            <Heart className="w-10 h-10 fill-yellow-600 text-yellow-600" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-sparkle" />
        </div>

        {/* Heading */}
        <h2 className="font-cursive text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 mb-4 leading-tight">
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
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 text-yellow-950 font-extrabold text-lg shadow-md hover:shadow-yellow-300/80 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border-2 border-yellow-300"
          >
            <span>{buttonText}</span>
            <Heart className="w-6 h-6 fill-yellow-600 text-yellow-600 group-hover:scale-125 transition-transform" />
          </button>
        ) : (
          <div className="w-full space-y-6 animate-fade-in">
            {/* The Final Letter Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#fffef8] border-2 border-yellow-300 shadow-xl text-left space-y-4">
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
        <div className="mt-12 pt-6 border-t border-yellow-200 w-full text-center">
          <p className="font-cursive text-2xl sm:text-3xl font-bold text-yellow-800 tracking-wide">
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
