import React, { useState } from 'react';
import { Settings, X, Save, RotateCcw } from 'lucide-react';
import { BirthdayConfig } from '../config';
import { sounds } from '../utils/audio';

interface ConfigEditorModalProps {
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
  onReset: () => void;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  config,
  onSave,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<BirthdayConfig>(config);

  const handleOpen = () => {
    sounds.playPop();
    setFormData(config);
    setIsOpen(true);
  };

  const handleClose = () => {
    sounds.playPop();
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSparkle();
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Gear Button in bottom left */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-yellow-900 shadow-md border-2 border-yellow-300 backdrop-blur-md text-xs font-semibold transition-all hover:scale-105"
          title="Customize Names, Texts & Password"
          aria-label="Customize settings"
        >
          <Settings className="w-3.5 h-3.5 text-yellow-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="hidden sm:inline">Customize Website</span>
        </button>
      </div>

      {/* Settings Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative max-w-xl w-full max-h-[85vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto border-2 border-yellow-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-yellow-200">
              <div>
                <h3 className="font-cursive text-3xl font-bold text-yellow-950">
                  Personalize Her Website ✨
                </h3>
                <p className="text-xs text-slate-500">
                  Changes take effect immediately and are saved in your session.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-yellow-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Her Name
                </label>
                <input
                  type="text"
                  value={formData.partnerName}
                  onChange={(e) =>
                    setFormData({ ...formData, partnerName: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Her Nickname
                </label>
                <input
                  type="text"
                  value={formData.partnerNickname}
                  onChange={(e) =>
                    setFormData({ ...formData, partnerNickname: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Hero Heading
                </label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Secret Room Password
                </label>
                <input
                  type="text"
                  value={formData.secretRoom.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      secretRoom: { ...formData.secretRoom, password: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Secret Room Hint
                </label>
                <input
                  type="text"
                  value={formData.secretRoom.hint}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      secretRoom: { ...formData.secretRoom, hint: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-yellow-100">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    onReset();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 text-yellow-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md border border-yellow-300"
                >
                  <Save className="w-4 h-4 text-yellow-950" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
