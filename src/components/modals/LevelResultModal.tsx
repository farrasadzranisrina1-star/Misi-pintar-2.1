import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, Map, Award, CheckCircle2, XCircle } from 'lucide-react';
import { Level } from '../../types/game';
import { soundEngine } from '../../utils/audio';

interface LevelResultModalProps {
  level: Level;
  score: number;
  correctCount: number;
  wrongCount: number;
  stars: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRetryLevel: () => void;
  onReturnToMap: () => void;
}

export const LevelResultModal: React.FC<LevelResultModalProps> = ({
  level,
  score,
  correctCount,
  wrongCount,
  stars,
  hasNextLevel,
  onNextLevel,
  onRetryLevel,
  onReturnToMap,
}) => {
  const isPassed = score >= 80;

  useEffect(() => {
    if (isPassed) {
      soundEngine.playLevelComplete();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // Ignore
      }
    } else {
      soundEngine.playWrong();
    }
  }, [isPassed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-sky-400">
        {/* Star Rating Display */}
        {isPassed ? (
          <div className="mb-3">
            <div className="flex justify-center items-center gap-2 mb-2">
              {[1, 2, 3].map((starIndex) => (
                <span
                  key={starIndex}
                  className={`text-4xl sm:text-5xl transition-all duration-300 transform ${
                    starIndex <= stars
                      ? 'scale-110 drop-shadow-md text-yellow-400 animate-bounce'
                      : 'text-slate-300 scale-90'
                  }`}
                  style={{ animationDelay: `${starIndex * 150}ms` }}
                >
                  ★
                </span>
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-sky-600">
              🎉 LEVEL SELESAI!
            </h3>
            <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
              Hebat! Kamu berhasil menyelesaikan tantangan level ini.
            </p>
          </div>
        ) : (
          <div className="mb-3">
            <div className="text-5xl mb-2 animate-pulse">💪</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              COBA LAGI!
            </h3>
            <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
              Kamu belum mencapai skor minimum (80 poin). Jangan menyerah, coba lagi!
            </p>
          </div>
        )}

        {/* Score & Stats Card */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 my-4">
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Perolehan Skor
            </span>
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">
              {score} <span className="text-lg font-semibold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold pt-2 border-t border-sky-200">
            <div className="flex items-center justify-center gap-1.5 text-emerald-700 bg-emerald-100/70 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>{correctCount} Benar</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-rose-700 bg-rose-100/70 py-2 rounded-xl">
              <XCircle className="w-4 h-4" />
              <span>{wrongCount} Salah</span>
            </div>
          </div>
        </div>

        {/* Badge Unlocked Notification */}
        {isPassed && (
          <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 mb-6 text-left shadow-sm">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-amber-100 rounded-xl text-3xl shadow-inner">
              {level.badgeIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Badge Terbuka!</span>
              </div>
              <div className="text-sm font-extrabold text-slate-800 truncate">
                {level.badgeName}
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                {level.badgeDescription}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {isPassed ? (
            <button
              onClick={() => {
                soundEngine.playClick();
                onNextLevel();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <span>{hasNextLevel ? 'LEVEL BERIKUTNYA' : 'LIHAT HADIAH JUARA'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundEngine.playClick();
                onRetryLevel();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>ULANGI LEVEL</span>
            </button>
          )}

          <button
            onClick={() => {
              soundEngine.playClick();
              onReturnToMap();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-sm sm:text-base transition-all cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>KEMBALI KE PETA LEVEL</span>
          </button>
        </div>
      </div>
    </div>
  );
};
