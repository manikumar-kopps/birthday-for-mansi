import { useState, useEffect } from 'react';
import { defaultBirthdayConfig, BirthdayConfig } from './config';
import { FloatingParticles } from './components/FloatingParticles';
import { MusicPlayer } from './components/MusicPlayer';
import { OpeningSurprise } from './components/OpeningSurprise';
import { HeroSection } from './components/HeroSection';
import { LoveLetter } from './components/LoveLetter';
import { MemoriesGallery } from './components/MemoriesGallery';
import { ReasonsSection } from './components/ReasonsSection';
import { InteractiveLoveButtons } from './components/InteractiveLoveButtons';
import { ProposalSection } from './components/ProposalSection';
import { CakeMiniGame } from './components/CakeMiniGame';
import { SecretLoveRoom } from './components/SecretLoveRoom';
import { FinalSurprise } from './components/FinalSurprise';
import { ConfigEditorModal } from './components/ConfigEditorModal';

export function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem('birthday_site_config_v8');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultBirthdayConfig;
  });

  const [hasOpened, setHasOpened] = useState<boolean>(false);
  const [musicTrigger, setMusicTrigger] = useState<boolean>(false);

  const handleOpenSurprise = () => {
    setHasOpened(true);
    setMusicTrigger(true);
  };

  const handleUpdateLetter = (paragraphs: string[]) => {
    const updated = {
      ...config,
      letter: {
        ...config.letter,
        paragraphs,
      },
    };
    setConfig(updated);
    try {
      localStorage.setItem('birthday_site_config_v8', JSON.stringify(updated));
    } catch {}
  };

  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('birthday_site_config_v8', JSON.stringify(newConfig));
    } catch {}
  };

  const handleResetConfig = () => {
    setConfig(defaultBirthdayConfig);
    try {
      localStorage.removeItem('birthday_site_config_v8');
    } catch {}
  };

  // Prevent horizontal scroll
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50/60 via-yellow-50/40 to-amber-100/30 text-slate-800">
      {/* Background Floating Magic Particles */}
      <FloatingParticles />

      {/* Background Music Toggle */}
      <MusicPlayer
        title={config.music.title}
        customAudioUrl={config.music.customAudioUrl}
        autoPlayTrigger={musicTrigger}
      />

      {/* Opening Screen Overlay */}
      {!hasOpened && (
        <OpeningSurprise
          greeting={config.opening.greeting}
          subtitle={config.opening.subtitle}
          buttonText={config.opening.buttonText}
          onOpen={handleOpenSurprise}
        />
      )}

      {/* Main Birthday Content */}
      <main className={`transition-opacity duration-1000 ${hasOpened ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section 1: Hero */}
        <HeroSection
          title={config.hero.title}
          subtitle={config.hero.subtitle}
          wishText={config.hero.wishText}
        />

        {/* Section 2: Love Letter */}
        <LoveLetter
          title={config.letter.title}
          greeting={config.letter.greeting}
          paragraphs={config.letter.paragraphs}
          closing={config.letter.closing}
          signature={config.letter.signature}
          onUpdateLetter={handleUpdateLetter}
        />

        {/* Section 3: Memories Photo Gallery */}
        <MemoriesGallery
          title={config.memories.title}
          subtitle={config.memories.subtitle}
          photos={config.memories.photos}
        />

        {/* Section 4: Reasons Why You're Special */}
        <ReasonsSection
          title={config.reasons.title}
          subtitle={config.reasons.subtitle}
          items={config.reasons.items}
        />

        {/* Section 5: Interactive Love Buttons */}
        <InteractiveLoveButtons
          compliments={config.loveButtons.compliments}
          vouchers={config.loveButtons.vouchers}
        />

        {/* Section 6: Proposal Session */}
        <ProposalSection partnerName={config.partnerName} />

        {/* Section 7: Birthday Cake Mini-Game */}
        <div id="cake-section">
          <CakeMiniGame
            title={config.cake.title}
            subtitle={config.cake.subtitle}
            initialCandles={config.cake.initialCandles}
            wishMessage={config.cake.wishMessage}
          />
        </div>

        {/* Section 8: Secret Love Room */}
        <SecretLoveRoom
          title={config.secretRoom.title}
          subtitle={config.secretRoom.subtitle}
          password={config.secretRoom.password}
          hint={config.secretRoom.hint}
          unlockedTitle={config.secretRoom.unlockedTitle}
          secretNote={config.secretRoom.secretNote}
          secretWish={config.secretRoom.secretWish}
          secretPhotoUrl={config.secretRoom.secretPhotoUrl}
        />

        {/* Section 9: Final Surprise */}
        <FinalSurprise
          heading={config.finalSurprise.heading}
          subheading={config.finalSurprise.subheading}
          buttonText={config.finalSurprise.buttonText}
          finalNote={config.finalSurprise.finalNote}
          footerText={config.finalSurprise.footerText}
        />
      </main>

      {/* Floating Config Editor (for personalization) */}
      <ConfigEditorModal
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}

export default App;
