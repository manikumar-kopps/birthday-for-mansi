import React, { useState } from 'react';
import { Lock, Unlock, Key, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration } from '../utils/confetti';

interface SecretRoomProps {
  title: string;
  subtitle: string;
  password: string;
  hint: string;
  unlockedTitle: string;
  secretNote: string[];
  secretWish: string;
  secretPhotoUrl: string;
}

export const SecretLoveRoom: React.FC<SecretRoomProps> = ({
  title,
  subtitle,
  password,
  hint,
  unlockedTitle,
  secretNote,
  secretWish,
  secretPhotoUrl,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim().toLowerCase() === password.trim().toLowerCase()) {
      sounds.playSparkle();
      triggerBigCelebration();
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      sounds.playPop();
      setErrorMsg('Oops, not quite! Try checking the hint 🌸');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleRelock = () => {
    sounds.playPop();
    setIsUnlocked(false);
    setInputVal('');
  };

  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-widest text-purple-600 uppercase bg-purple-100 px-4 py-1.5 rounded-full border border-purple-200">
          Private Sanctuary
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      {!isUnlocked ? (
        // Locked Vault Screen
        <div
          className={`max-w-md mx-auto p-8 rounded-3xl bg-white/80 backdrop-blur-md border-2 border-purple-200 shadow-xl text-center transition-transform ${
            isShaking ? 'animate-gentleWiggle' : ''
          }`}
        >
          {/* Glowing Lock Icon */}
          <div className="relative my-4 flex justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner animate-pulse">
              <Lock className="w-10 h-10" />
            </div>
          </div>

          <h3 className="font-cursive text-3xl font-bold text-purple-900 mb-2">
            Enter Secret Passcode
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            A private chamber holding my deepest wishes for you.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Type the secret word..."
                className="w-full px-5 py-3 pr-12 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-center font-mono text-base tracking-wider bg-white/90 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs font-semibold text-rose-500 animate-fade-in">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-md hover:shadow-purple-300 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Unlock Secret Room ✨</span>
            </button>
          </form>

          {/* Hint Accordion */}
          <div className="mt-6 pt-4 border-t border-purple-100">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-semibold text-purple-600 hover:text-purple-800 underline flex items-center justify-center gap-1 mx-auto"
            >
              <span>{showHint ? 'Hide Hint 💡' : 'Need a Hint? 💡'}</span>
            </button>
            {showHint && (
              <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-800 leading-relaxed font-medium animate-fade-in">
                {hint}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Unlocked Secret Room
        <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-purple-50 via-white to-pink-50 border-2 border-purple-300 shadow-2xl animate-fade-in relative">
          {/* Re-lock Button */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-purple-200">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full">
              <Unlock className="w-3.5 h-3.5" />
              <span>Vault Unlocked</span>
            </span>
            <button
              onClick={handleRelock}
              className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-purple-200 text-purple-600 hover:bg-purple-100 transition-colors shadow-xs"
            >
              Lock Vault 🔒
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-purple-100 text-purple-600 mb-3 animate-bounce">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-cursive text-3xl sm:text-5xl font-bold text-purple-900 mb-2">
              {unlockedTitle}
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Welcome into our private universe. Only you hold the key. 🗝️
            </p>
          </div>

          {/* Hidden Picture */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-8 bg-purple-100 flex items-center justify-center">
            <img
              src={secretPhotoUrl}
              alt="Secret Memory"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
              A Secret For Us Two 🔒
            </div>
          </div>

          {/* Secret Note */}
          <div className="space-y-4 text-slate-700 leading-relaxed font-sans text-base sm:text-lg mb-8">
            {secretNote.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Extra Birthday Wish */}
          <div className="p-6 rounded-2xl bg-white/90 border border-purple-200 shadow-sm text-center">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-500 mx-auto mb-2" />
            <h4 className="font-cursive text-2xl font-bold text-pink-600 mb-1">
              My Secret Birthday Wish
            </h4>
            <p className="text-slate-800 text-sm sm:text-base italic font-serif">
              "{secretWish}"
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
