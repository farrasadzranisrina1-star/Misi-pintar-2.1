import React from 'react';
import { Lock, Trophy, Star, ArrowLeft, RotateCcw, Play, CheckCircle2 } from 'lucide-react';
import { GAME_LEVELS } from '../data/gameData';
import { GameProgress, Level } from '../types/game';
import { soundEngine } from '../utils/audio';
import { EducationalBackground } from './EducationalBackground';

interface LevelSelectProps {
  progress: GameProgress;
  onSelectLevel: (level: Level) => void;
  onBackToHome: () => void;
  onOpenResetConfirm: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  progress,
  onSelectLevel,
  onBackToHome,
  onOpenResetConfirm,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 overflow-x-hidden">
      <EducationalBackground variant="map" />
      {/* Top Header */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 mb-4">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBackToHome();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-sky-800 tracking-tight">
          PILIH MISI LEVEL
        </h2>

        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenResetConfirm();
          }}
          title="Reset semua kemajuan game"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Progress</span>
        </button>
      </header>

      {/* Level Selection Cards Grid */}
      <main className="w-full max-w-4xl my-auto z-10 py-2">
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            Selesaikan tiap level dengan skor minimal <span className="text-emerald-600 font-black">80 Poin</span> untuk membuka misi berikutnya!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {GAME_LEVELS.map((level) => {
            const levelProg = progress.levels[level.id] || {
              unlocked: level.id === 1,
              completed: false,
              bestScore: 0,
              stars: 0,
            };
            const isUnlocked = levelProg.unlocked;
            const isCompleted = levelProg.completed;
            const isBoss = level.id === 3;

            return (
              <div
                key={level.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 transform shadow-xl border-4 ${
                  isUnlocked
                    ? isBoss
                      ? 'bg-gradient-to-b from-indigo-50 to-purple-50 border-indigo-500 hover:-translate-y-1 hover:shadow-2xl'
                      : 'bg-white ' + level.colorTheme.border + ' hover:-translate-y-1 hover:shadow-2xl'
                    : 'bg-slate-100 border-slate-300 opacity-80'
                }`}
              >
                {/* Level Boss / Highlight Tag */}
                {isBoss && isUnlocked && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse whitespace-nowrap">
                    🏆 FINAL CHALLENGE
                  </div>
                )}

                {/* Level Top Details */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      LEVEL {level.number}
                    </span>

                    {/* Status Badge */}
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesai</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-xs font-extrabold text-sky-600 bg-sky-100 px-2.5 py-0.5 rounded-full">
                        Terbuka
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-extrabold text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>Terkunci</span>
                      </span>
                    )}
                  </div>

                  {/* Level Title */}
                  <h3 className="text-xl font-black text-slate-800 mb-1">
                    "{level.title}"
                  </h3>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">
                    {level.subtitle}
                  </p>

                  {/* Badge info preview */}
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 mb-4">
                    <span className="text-2xl">{level.badgeIcon}</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-slate-400 font-bold block">Hadiah Lencana</span>
                      <span className="text-xs font-bold text-slate-700 truncate block">
                        {level.badgeName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Status & Play Action */}
                <div>
                  {isUnlocked ? (
                    <div className="space-y-3">
                      {/* Stars & Score stats */}
                      <div className="flex items-center justify-between bg-sky-50/80 px-3 py-2 rounded-xl text-xs font-bold">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[1, 2, 3].map((starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-4 h-4 ${
                                starIdx <= levelProg.stars
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-slate-600">
                          Skor Terbaik: <span className="font-black text-slate-800">{levelProg.bestScore}</span>/100
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          onSelectLevel(level);
                        }}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer ${
                          isBoss
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/25'
                            : level.colorTheme.primary + ' shadow-emerald-500/25'
                        }`}
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{isCompleted ? 'MAINKAN LAGI' : 'MULAI LEVEL'}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-200/80 text-slate-500 font-bold text-xs">
                        <Lock className="w-4 h-4" />
                        <span>Selesaikan Level {level.number - 1} min. 80 Poin</span>
                      </div>

                      <button
                        disabled
                        className="w-full py-3 px-4 rounded-2xl bg-slate-300 text-slate-400 font-bold text-sm cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>TERKUNCI</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full text-center text-xs text-slate-500 z-10 pt-4">
        <p>💡 Tip: Jawaban tepat memberi 20 poin. Raih 80-100 poin untuk lulus dengan 2-3 bintang!</p>
      </footer>
    </div>
  );
};
