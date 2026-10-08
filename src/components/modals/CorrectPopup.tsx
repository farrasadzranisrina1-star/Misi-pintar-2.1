import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface CorrectPopupProps {
  scoreGained: number;
  explanation?: string;
  onNext: () => void;
}

export const CorrectPopup: React.FC<CorrectPopupProps> = ({
  scoreGained,
  explanation,
  onNext,
}) => {
  useEffect(() => {
    soundEngine.playSuccess();

    // Trigger colorful confetti shower
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // Ignore if canvas-confetti fails
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-emerald-400">
        {/* Decorative Stars */}
        <div className="flex justify-center items-center gap-2 mb-3">
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0ms' }}>⭐</span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '150ms' }}>🌟</span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '300ms' }}>⭐</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>+{scoreGained} Poin</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mb-1">
          🎉 BENAR!
        </h3>
        <p className="text-base sm:text-lg font-semibold text-slate-700 mb-4">
          Hebat! Jawabanmu tepat sekali.
        </p>

        {explanation && (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 mb-6 text-left shadow-xs">
            <span className="text-xs font-extrabold text-emerald-800 block mb-2 flex items-center gap-1.5">
              <span>💡</span>
              <span>Cara Menghitungnya:</span>
            </span>
            <div className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed whitespace-pre-line">
              {explanation}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            soundEngine.playClick();
            onNext();
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
        >
          <span>LANJUT</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
