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
            ? 'bg-amber-500/95 text-white border-yellow-300 ring-4 ring-yellow-200/50 scale-105'
            : 'bg-white/90 text-amber-900 border-amber-200 hover:bg-amber-50'
        }`}
        title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        aria-label="Toggle background music"
      >
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
            isPlaying ? 'bg-amber-600 animate-spin text-white' : 'bg-amber-100 text-amber-700'
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
        <span className="ml-1">
          {isPlaying ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-amber-500" />}
        </span>
      </button>
    </div>
  );
};
