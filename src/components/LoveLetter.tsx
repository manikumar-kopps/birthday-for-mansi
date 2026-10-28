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
        <span className="text-sm font-semibold tracking-widest text-pink-500 uppercase bg-pink-100/80 px-4 py-1.5 rounded-full border border-pink-200">
          Written with love
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          {isOpen ? 'Tap the letter to fold it away or re-read anytime.' : 'Click the wax seal to unfold this letter 💌'}
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="w-full flex flex-col items-center">
        {!isOpen ? (
          // Sealed Envelope
          <div
            onClick={handleToggleEnvelope}
            className="group relative w-full max-w-md h-64 bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-pink-200 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          >
            {/* Envelope flaps effect */}
            <div className="absolute top-0 inset-x-0 h-32 bg-pink-200/60 rounded-b-3xl border-b border-pink-300 transform origin-top group-hover:scale-y-95 transition-transform"></div>

            {/* Stamp in corner */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-white/90 border border-pink-300 rounded p-1 shadow-sm flex flex-col items-center justify-center text-[10px] text-pink-600 font-serif">
              <span>💖</span>
              <span>FOREVER</span>
            </div>

            {/* Postmark */}
            <div className="absolute top-5 right-18 border border-pink-400/40 rounded-full w-12 h-12 flex items-center justify-center text-[8px] text-pink-400 font-mono rotate-12">
              BIRTHDAY
            </div>

            {/* Wax Seal in Center */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 shadow-lg flex items-center justify-center ring-4 ring-rose-200 group-hover:scale-110 group-hover:ring-rose-300 transition-all duration-300 animate-pulseGlow">
                <Heart className="w-9 h-9 fill-rose-100 text-rose-100" />
              </div>
              <span className="font-cursive text-2xl font-bold text-rose-800 mt-4 tracking-wide">
                Tap to Open
              </span>
              <span className="text-xs text-rose-600/80 font-medium">
                Sent from the depths of my heart ✨
              </span>
            </div>
          </div>
        ) : (
          // Opened Letter
          <div className="w-full max-w-2xl bg-amber-50/70 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/80 p-6 sm:p-12 relative animate-fade-in transition-all">
            {/* Top Bar with actions */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-200/60">
              <div className="flex items-center gap-2 text-pink-600 font-medium text-xs sm:text-sm">
                <MailOpen className="w-4 h-4" />
                <span>Opened with love</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-pink-200 text-pink-600 hover:bg-pink-50 transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Edit this letter with your personal words"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Letter'}</span>
                </button>
                <button
                  onClick={handleToggleEnvelope}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Letter Paper Content */}
            {isEditing ? (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-amber-800">
                  Tip: Use double enter (blank line) between paragraphs.
                </p>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={10}
                  className="w-full p-4 rounded-xl border border-amber-300 bg-white/90 text-slate-800 font-sans text-sm leading-relaxed focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
                <button
                  onClick={handleSaveEdit}
                  className="self-end px-5 py-2 rounded-full bg-pink-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow hover:bg-pink-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Letter</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-slate-800 leading-relaxed font-sans text-base sm:text-lg">
                <p className="font-cursive text-2xl sm:text-3xl font-bold text-pink-700 mb-6">
                  {greeting}
                </p>

                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-8 border-t border-amber-200/60 mt-8">
                  <p className="font-cursive text-2xl text-pink-700 font-semibold">
                    {closing}
                  </p>
                  <p className="font-cursive text-3xl font-bold text-pink-600 mt-1 flex items-center gap-2">
                    {signature}
                  </p>
                </div>
              </div>
            )}

            {/* Decorative Corner Flowers */}
            <div className="absolute top-3 right-3 text-2xl opacity-40 select-none pointer-events-none">
              🌸
            </div>
            <div className="absolute bottom-3 left-3 text-2xl opacity-40 select-none pointer-events-none">
              🌷
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
