import React, { useState } from 'react';
import { ReasonCard } from '../config';
import { RotateCw, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ReasonsSectionProps {
  title: string;
  subtitle: string;
  items: ReasonCard[];
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({
  title,
  subtitle,
  items,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    sounds.playPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest text-pink-500 uppercase bg-pink-100/80 px-4 py-1.5 rounded-full border border-pink-200">
          Why I Love You
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {items.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="perspective-1000 h-72 cursor-pointer select-none"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of Card */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden shadow-md hover:shadow-xl transition-shadow border border-pink-200/80 bg-gradient-to-br ${card.accentColor} glass-card`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl filter drop-shadow-sm animate-gentleWiggle">
                      {card.emoji}
                    </span>
                    <span className="p-2 rounded-full bg-white/70 text-pink-500 shadow-xs">
                      <RotateCw className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-cursive text-3xl font-bold text-slate-800 mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {card.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-pink-600 font-semibold tracking-wide">
                    <span>Tap to reveal secret message</span>
                    <span>🌸</span>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 bg-white/95 border-2 border-pink-300 shadow-xl">
                  <div className="flex items-center justify-between border-b border-pink-100 pb-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-pink-600 uppercase tracking-wider">
                      <Heart className="w-3.5 h-3.5 fill-pink-500" />
                      <span>From My Heart</span>
                    </div>
                    <span className="text-xs text-slate-400">Tap to flip back</span>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic my-auto">
                    "{card.longDesc}"
                  </p>

                  <div className="flex items-center justify-end text-pink-400 text-xs font-cursive text-xl font-bold">
                    Forever Yours 💕
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
