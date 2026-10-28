import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MusicPlayerProps {
  title?: string;
  customAudioUrl?: string;
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Romantic Melody",
  customAudioUrl,
  autoPlayTrigger,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && !hasInteracted) {
      sounds.startAmbientMusic(customAudioUrl);
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [autoPlayTrigger, isPlaying, hasInteracted, customAudioUrl]);

  const toggleMusic = () => {
    setHasInteracted(true);
    const active = sounds.toggleAmbientMusic(customAudioUrl);
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full shadow-md backdrop-blur-md transition-all duration-300 border ${
          isPlaying
            ? 'bg-pink-500/90 text-white border-pink-300 ring-4 ring-pink-200/50 scale-105'
            : 'bg-white/80 text-pink-700 border-pink-200 hover:bg-pink-50'
        }`}
        title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        aria-label="Toggle background music"
      >
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
            isPlaying ? 'bg-pink-600 animate-spin text-white' : 'bg-pink-100 text-pink-600'
          }`}
          style={{ animationDuration: '4s' }}
        >
          <Music className="w-3.5 h-3.5" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold tracking-wide">
            {isPlaying ? 'Playing Music' : 'Music Paused'}
          </span>
          <span className="text-[10px] opacity-80 max-w-[110px] truncate">
            {title}
          </span>
        </div>
        <span className="ml-1 text-pink-200">
          {isPlaying ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-pink-400" />}
        </span>
      </button>
    </div>
  );
};
