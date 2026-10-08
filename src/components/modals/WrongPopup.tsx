import React, { useEffect } from 'react';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface WrongPopupProps {
  hint?: string;
  onRetry: () => void;
}

export const WrongPopup: React.FC<WrongPopupProps> = ({ hint, onRetry }) => {
  useEffect(() => {
    soundEngine.playWrong();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 animate-shake">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-500 mb-3 shadow-inner">
          <Lightbulb className="w-9 h-9" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mb-1">
          💡 BELUM TEPAT
        </h3>
        <p className="text-base sm:text-lg font-semibold text-slate-700 mb-3">
          Coba periksa kembali jawabannya ya!
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-left">
          <span className="text-xs font-bold text-amber-800 block mb-1">Ayo Hitung Kembali:</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {hint || 'Hitunglah kembali menggunakan pohon faktor atau faktorisasi prima dengan teliti pada buku coretanmu, lalu pasangkan lagi.'}
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            onRetry();
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-lg shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>COBA LAGI</span>
        </button>
      </div>
    </div>
  );
};
