import React, { useState, useRef } from 'react';
import { MemoryPhoto } from '../config';
import { Camera, Plus, X, Calendar, Heart, ZoomIn, Gift, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBigCelebration, triggerHeartExplosion } from '../utils/confetti';

interface MemoriesGalleryProps {
  title: string;
  subtitle: string;
  photos: MemoryPhoto[];
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  title,
  subtitle,
  photos: initialPhotos,
}) => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isBoxPopped, setIsBoxPopped] = useState<boolean>(false);
  const [isBoxShaking, setIsBoxShaking] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = (photo: MemoryPhoto) => {
    sounds.playPop();
    setSelectedPhoto(photo);
  };

  const handlePopSurpriseBox = () => {
    if (isBoxShaking) return;
    setIsBoxShaking(true);
    sounds.playPop();

    // Box shakes before popping open
    setTimeout(() => {
      setIsBoxShaking(false);
      setIsBoxPopped(true);
      sounds.playSparkle();
      triggerBigCelebration();
      triggerHeartExplosion();
    }, 550);
  };

  const handleRepackBox = () => {
    sounds.playPop();
    setIsBoxPopped(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newPhoto: MemoryPhoto = {
        id: `upload-${Date.now()}`,
        url: dataUrl,
        title: file.name.replace(/\.[^/.]+$/, ''),
        date: 'A Sweet Memory 💕',
        caption: 'A precious moment captured with you.',
        note: 'Every photo with you is a treasure I hold close to my heart.',
        rotation: (Math.random() - 0.5) * 6,
      };
      setPhotos((prev) => [newPhoto, ...prev]);
      sounds.playSparkle();
      triggerHeartExplosion();
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-widest text-pink-500 uppercase bg-pink-100/80 px-4 py-1.5 rounded-full border border-pink-200">
          Photo Album
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Hidden File Input for uploading extra photos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* SURPRISE BOX STATE 1: UNPOPPED (The Magical Surprise Box) */}
      {!isBoxPopped ? (
        <div className="flex flex-col items-center justify-center my-8">
          <div
            onClick={handlePopSurpriseBox}
            className={`group relative max-w-md w-full bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-pink-300/80 cursor-pointer text-center select-none transform hover:-translate-y-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 ${
              isBoxShaking ? 'animate-box-shake' : ''
            }`}
          >
            {/* Glowing Aura Ring */}
            <div className="absolute inset-0 rounded-3xl bg-pink-400/20 blur-xl animate-pulse pointer-events-none"></div>

            {/* Special Delivery Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 text-pink-700 font-bold text-xs shadow-sm mb-6 border border-pink-200">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Special Surprise Memory Box</span>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            </div>

            {/* 3D Animated Gift Box Visual */}
            <div className="relative my-4 flex justify-center items-center">
              {/* Ribbon bow */}
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-500 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform relative">
                {/* Cross Ribbons */}
                <div className="absolute inset-x-0 h-6 bg-yellow-300/90 top-1/2 -translate-y-1/2 shadow-xs"></div>
                <div className="absolute inset-y-0 w-6 bg-yellow-300/90 left-1/2 -translate-x-1/2 shadow-xs"></div>

                {/* Big Gift Icon */}
                <Gift className="w-16 h-16 text-white relative z-10 filter drop-shadow-md group-hover:scale-110 transition-transform" />
              </div>

              {/* Sparkles around box */}
              <span className="absolute -top-3 left-14 text-2xl animate-bounce">✨</span>
              <span className="absolute -bottom-2 right-14 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>
                💖
              </span>
            </div>

            <h3 className="font-cursive text-3xl sm:text-4xl font-bold text-pink-700 mt-6 mb-2">
              Tap To Pop The Surprise! 🎁✨
            </h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Touch this box to pop open all the beautiful pictures hidden inside for you!
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-lg hover:shadow-pink-300/60 transform group-hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Open Surprise Box</span>
            </button>
          </div>
        </div>
      ) : (
        /* SURPRISE BOX STATE 2: POPPED (Photos Exploded Out) */
        <div className="flex flex-col items-center">
          {/* Popped Status Celebration Banner */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-4 sm:p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-pink-200 shadow-sm animate-fade-in">
            <div className="flex items-center gap-3 text-left">
              <span className="p-2.5 rounded-full bg-pink-100 text-pink-600 text-xl">
                🎁✨
              </span>
              <div>
                <h4 className="font-cursive text-2xl font-bold text-pink-600">
                  Surprise Box Unlocked!
                </h4>
                <p className="text-xs text-slate-500">
                  All your photos popped out! Click any photo to see it in full view.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRepackBox}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 font-semibold text-xs shadow-xs border border-pink-200 transition-colors"
                title="Pack photos back into the surprise box to pop them again"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>Re-pack Box 🎁</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <Camera className="w-3.5 h-3.5" />
                <span>Add More</span>
              </button>
            </div>
          </div>

          {/* Polaroid Grid of Popped Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                style={{
                  transform: `rotate(${photo.rotation || 0}deg)`,
                  animationDelay: `${index * 0.12}s`,
                }}
                className="animate-pop-out group relative bg-white p-4 pb-6 rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 cursor-pointer border border-pink-100"
              >
                {/* Washi tape on top */}
                <div className="washi-tape" />

                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full bg-pink-50 rounded overflow-hidden mb-4 border border-slate-100">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-pink-600 shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Handwritten Caption */}
                <div className="text-center px-1">
                  <p className="font-cursive text-2xl font-bold text-slate-800 tracking-wide line-clamp-1">
                    {photo.title}
                  </p>
                  <p className="font-handwriting text-lg text-pink-600 line-clamp-2 mt-0.5">
                    {photo.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-sans">
                    <Calendar className="w-3 h-3 text-pink-400" />
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-600 hover:text-pink-600 transition-colors z-10"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Full Image */}
            <div className="rounded-2xl overflow-hidden max-h-[62vh] bg-pink-50 mb-6 flex items-center justify-center border border-pink-100">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[62vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Content Details */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-cursive text-3xl font-bold text-slate-900">
                  {selectedPhoto.title}
                </h3>
                <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPhoto.date}
                </span>
              </div>
              <p className="font-handwriting text-2xl text-pink-600 mb-3">
                "{selectedPhoto.caption}"
              </p>
              {selectedPhoto.note && (
                <p className="text-slate-600 text-sm leading-relaxed border-t border-pink-100 pt-3">
                  {selectedPhoto.note}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  sounds.playPop();
                  setSelectedPhoto(null);
                }}
                className="px-5 py-2 rounded-full bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Cherish This Memory</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
