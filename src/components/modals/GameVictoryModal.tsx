import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, Star, Award } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface GameVictoryModalProps {
  totalScore: number;
  totalStars: number;
  badges: string[];
  onPlayAgain: () => void;
  onHome: () => void;
}

export const GameVictoryModal: React.FC<GameVictoryModalProps> = ({
  totalScore,
  totalStars,
  onPlayAgain,
  onHome,
}) => {
  useEffect(() => {
    soundEngine.playVictory();

    // Fireworks confetti effect
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#38BDF8'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-pop">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center mb-2">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-100 flex items-center justify-center border-4 border-amber-300 shadow-lg animate-wiggle">
            <img
              src="/src/assets/images/badge_champion_trophy_1790830689928.jpg"
              alt="Piala Misi Pintar"
              className="w-24 h-24 object-contain rounded-full"
              onError={(e) => {
                // styled SVG fallback
                e.currentTarget.style.display = 'none';
              }}
            />
            <Trophy className="w-14 h-14 text-amber-500 absolute" style={{ display: 'none' }} />
          </div>
        </div>

        <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">
          🎉🎉🎉 SELAMAT!
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2">
          KAMU TELAH MENYELESAIKAN MISI PINTAR!
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-600 mb-5 leading-relaxed">
          Luar biasa! Kamu telah menuntaskan seluruh tantangan dari Level 1 sampai Level 3 dengan penuh ketelitian dan kecerdasan!
        </p>

        {/* Score and Stars Banner */}
        <div className="grid grid-cols-2 gap-3 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 rounded-2xl p-4 border border-amber-200 mb-5">
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 block">Total Poin</span>
            <span className="text-3xl font-black text-emerald-600">{totalScore}</span>
            <span className="text-xs text-slate-400"> / 300</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 block">Total Bintang</span>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-black text-amber-600">{totalStars}</span>
              <span className="text-xs text-slate-400"> / 9</span>
            </div>
          </div>
        </div>

        {/* All Badges Earned */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Koleksi Lencana Kejuaraanmu</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🏅</span>
              <span className="text-[11px] font-bold text-emerald-800 line-clamp-1">Penjelajah</span>
              <span className="text-[9px] text-emerald-600">Level 1 Lulus</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🏅</span>
              <span className="text-[11px] font-bold text-amber-800 line-clamp-1">Pemecah</span>
              <span className="text-[9px] text-amber-600">Level 2 Lulus</span>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 flex flex-col items-center text-center ring-2 ring-indigo-400">
              <span className="text-2xl mb-1">🏆</span>
              <span className="text-[11px] font-bold text-indigo-900 line-clamp-1">Juara Pintar</span>
              <span className="text-[9px] text-indigo-600">Level 3 Lulus</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              soundEngine.playClick();
              onPlayAgain();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>MAIN LAGI</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              onHome();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-sm sm:text-base transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>KEMBALI KE MENU UTAMA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
