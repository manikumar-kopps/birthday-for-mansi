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
        <span className="text-sm font-semibold tracking-widest text-yellow-900 uppercase bg-yellow-100/90 px-4 py-1.5 rounded-full border border-yellow-300">
          Why I Love You ☀️
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
                  className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden shadow-sm hover:shadow-lg transition-shadow border-2 border-yellow-300/80 bg-gradient-to-br ${card.accentColor} glass-card`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl filter drop-shadow-xs animate-gentleWiggle">
                      {card.emoji}
                    </span>
                    <span className="p-2 rounded-full bg-white/90 text-yellow-800 shadow-xs border border-yellow-200">
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

                  <div className="flex items-center gap-1.5 text-xs text-yellow-900 font-bold tracking-wide">
                    <span>Tap to reveal secret message</span>
                    <span>🌻</span>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#fffef8] border-2 border-yellow-300 shadow-xl">
                  <div className="flex items-center justify-between border-b border-yellow-200 pb-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-900 uppercase tracking-wider">
                      <Heart className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      <span>From My Heart</span>
                    </div>
                    <span className="text-xs text-slate-400">Tap to flip back</span>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic my-auto">
                    "{card.longDesc}"
                  </p>

                  <div className="flex items-center justify-end text-yellow-800 text-xs font-cursive text-xl font-bold">
                    Forever Yours ☀️💛
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
