import React, { useState } from 'react';
import { Heart, MailOpen, Mail, Edit3, Check } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerHeartExplosion } from '../utils/confetti';

interface LoveLetterProps {
  title: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
  onUpdateLetter?: (paragraphs: string[]) => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  title,
  greeting,
  paragraphs,
  closing,
  signature,
  onUpdateLetter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(paragraphs.join('\n\n'));

  const handleToggleEnvelope = () => {
    if (!isOpen) {
      sounds.playSparkle();
      triggerHeartExplosion();
      setIsOpen(true);
    } else {
      sounds.playPop();
      setIsOpen(false);
      setIsEditing(false);
    }
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (onUpdateLetter) {
      const newParagraphs = editedText
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);
      onUpdateLetter(newParagraphs);
    }
    sounds.playChime(784, 0.5, 0.2);
  };

  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold tracking-widest text-yellow-900 uppercase bg-yellow-100/90 px-4 py-1.5 rounded-full border border-yellow-300">
          Written with love 💌
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          {isOpen ? 'Tap the letter to fold it away or re-read anytime.' : 'Click the golden seal to unfold this letter 💌'}
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="w-full flex flex-col items-center">
        {!isOpen ? (
          // Sealed Envelope
          <div
            onClick={handleToggleEnvelope}
            className="group relative w-full max-w-md h-64 bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-100/80 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-yellow-300 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          >
            {/* Envelope flaps effect */}
            <div className="absolute top-0 inset-x-0 h-32 bg-yellow-200/40 rounded-b-3xl border-b border-yellow-300 transform origin-top group-hover:scale-y-95 transition-transform"></div>

            {/* Stamp in corner */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-white/95 border border-yellow-300 rounded p-1 shadow-xs flex flex-col items-center justify-center text-[10px] text-yellow-800 font-serif">
              <span>☀️</span>
              <span>FOREVER</span>
            </div>

            {/* Postmark */}
            <div className="absolute top-5 right-18 border border-yellow-400/50 rounded-full w-12 h-12 flex items-center justify-center text-[8px] text-yellow-700 font-mono rotate-12">
              SUNSHINE
            </div>

            {/* Wax Seal in Center */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-200 to-yellow-400 shadow-md flex items-center justify-center ring-4 ring-yellow-200 group-hover:scale-110 group-hover:ring-yellow-300 transition-all duration-300 animate-pulseGlow border border-yellow-300">
                <Heart className="w-9 h-9 fill-yellow-600 text-yellow-600" />
              </div>
              <span className="font-cursive text-2xl font-bold text-yellow-950 mt-4 tracking-wide">
                Tap to Open
              </span>
              <span className="text-xs text-yellow-800 font-medium">
                Sent from the depths of my heart ✨
              </span>
            </div>
          </div>
        ) : (
          // Opened Letter
          <div className="w-full max-w-2xl bg-[#fffef8] backdrop-blur-md rounded-2xl shadow-2xl border-2 border-yellow-300 p-6 sm:p-12 relative animate-fade-in transition-all">
            {/* Top Bar with actions */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-800 font-medium text-xs sm:text-sm">
                <MailOpen className="w-4 h-4 text-yellow-600" />
                <span>Opened with love</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-yellow-300 text-yellow-900 hover:bg-yellow-50 transition-colors flex items-center gap-1.5 shadow-xs"
                  title="Edit this letter with your personal words"
                >
                  <Edit3 className="w-3.5 h-3.5 text-yellow-700" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Letter'}</span>
                </button>
                <button
                  onClick={handleToggleEnvelope}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-900 hover:bg-yellow-200 transition-colors flex items-center gap-1 border border-yellow-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Letter Paper Content */}
            {isEditing ? (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-yellow-800">
                  Tip: Use double enter (blank line) between paragraphs.
                </p>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={10}
                  className="w-full p-4 rounded-xl border-2 border-yellow-300 bg-white text-slate-800 font-sans text-sm leading-relaxed focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <button
                  onClick={handleSaveEdit}
                  className="self-end px-5 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 text-yellow-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-yellow-200 transition-colors border border-yellow-300"
                >
                  <Check className="w-4 h-4 text-yellow-950" />
                  <span>Save Letter</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-slate-800 leading-relaxed font-sans text-base sm:text-lg">
                <p className="font-cursive text-2xl sm:text-3xl font-bold text-yellow-950 mb-6">
                  {greeting}
                </p>

                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-8 border-t border-yellow-200 mt-8">
                  <p className="font-cursive text-2xl text-yellow-900 font-semibold">
                    {closing}
                  </p>
                  <p className="font-cursive text-3xl font-bold text-yellow-800 mt-1 flex items-center gap-2">
                    {signature}
                  </p>
                </div>
              </div>
            )}

            {/* Decorative Corner Flowers */}
            <div className="absolute top-3 right-3 text-2xl opacity-40 select-none pointer-events-none">
              🌻
            </div>
            <div className="absolute bottom-3 left-3 text-2xl opacity-40 select-none pointer-events-none">
              🌼
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
