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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 px-4 transition-all duration-1000 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dreamy background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-amber-200/80 shadow-2xl">
        {/* Glowing Animated Heart */}
        <div className="relative mb-8 flex justify-center items-center">
          <div className="absolute w-28 h-28 bg-yellow-400/30 rounded-full blur-xl animate-ping"></div>
          <div className="relative p-6 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-white shadow-xl animate-pulseGlow cursor-pointer transform hover:scale-110 transition-transform">
            <Heart className="w-16 h-16 fill-current" />
          </div>
          {/* Sparkles around heart */}
          <Sparkles className="absolute -top-2 right-16 w-6 h-6 text-amber-500 animate-sparkle" />
          <Sparkles className="absolute bottom-1 left-16 w-5 h-5 text-yellow-500 animate-sparkle" style={{ animationDelay: '1s' }} />
        </div>

        {/* Text */}
        <h1 className="font-cursive text-4xl sm:text-5xl font-bold text-amber-800 mb-3 tracking-wide">
          {greeting}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mb-8 font-medium">
          {subtitle}
        </p>

        {/* Action Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 shadow-lg hover:shadow-amber-300/60 transform hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 border border-yellow-200"
        >
          <span>{buttonText}</span>
          <Sparkles className="w-5 h-5 text-yellow-100 group-hover:rotate-12 transition-transform" />
        </button>

        <p className="mt-6 text-xs text-amber-600 tracking-wider uppercase font-semibold">
          Touch to unlock pure love 🌻
        </p>
      </div>
    </div>
  );
};
