import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration } from '../utils/confetti';

interface OpeningSurpriseProps {
  greeting: string;
  subtitle: string;
  buttonText: string;
  onOpen: () => void;
}

export const OpeningSurprise: React.FC<OpeningSurpriseProps> = ({
  greeting,
  subtitle,
  buttonText,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    sounds.playSparkle();
    triggerBigCelebration();

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 px-4 transition-all duration-1000 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dreamy background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-pink-200/80 shadow-2xl">
        {/* Glowing Animated Heart */}
        <div className="relative mb-8 flex justify-center items-center">
          <div className="absolute w-28 h-28 bg-pink-400/25 rounded-full blur-xl animate-ping"></div>
          <div className="relative p-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-xl animate-pulseGlow cursor-pointer transform hover:scale-110 transition-transform">
            <Heart className="w-16 h-16 fill-current" />
          </div>
          {/* Sparkles around heart */}
          <Sparkles className="absolute -top-2 right-16 w-6 h-6 text-yellow-400 animate-sparkle" />
          <Sparkles className="absolute bottom-1 left-16 w-5 h-5 text-pink-400 animate-sparkle" style={{ animationDelay: '1s' }} />
        </div>

        {/* Text */}
        <h1 className="font-cursive text-4xl sm:text-5xl font-bold text-pink-600 mb-3 tracking-wide">
          {greeting}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mb-8 font-medium">
          {subtitle}
        </p>

        {/* Action Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 shadow-lg hover:shadow-pink-300/60 transform hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 border border-pink-200"
        >
          <span>{buttonText}</span>
          <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
        </button>

        <p className="mt-6 text-xs text-pink-400 tracking-wider uppercase font-semibold">
          Touch to unlock pure love 🌷
        </p>
      </div>
    </div>
  );
};
