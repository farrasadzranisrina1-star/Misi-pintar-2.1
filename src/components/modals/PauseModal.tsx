import React from 'react';
import { Play, RotateCcw, Map, Home, Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface PauseModalProps {
  onResume: () => void;
  onRestartLevel: () => void;
  onReturnToMap: () => void;
  onReturnHome: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestartLevel,
  onReturnToMap,
  onReturnHome,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border-4 border-sky-400">
        <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
          ⏸️
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-1">
          PERMAINAN DIJEDA
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Mau istirahat sejenak atau lanjut petualangan?
        </p>

        {/* Audio Quick Toggles */}
        <div className="flex items-center justify-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleSound();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Efek: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMusic();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              musicEnabled
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Musik: {musicEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              soundEngine.playClick();
              onResume();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>LANJUTKAN BERMAIN</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onRestartLevel();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ULANGI LEVEL INI</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onReturnToMap();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-sm transition-all cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>PILIH LEVEL LAIN</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onReturnHome();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-500 hover:text-slate-800 font-bold text-xs transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>MENU UTAMA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
