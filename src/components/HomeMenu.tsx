import React from 'react';
import { Play, HelpCircle, BookOpen, Info, Volume2, VolumeX, Music, Award, Star } from 'lucide-react';
import { GameProgress } from '../types/game';
import { soundEngine } from '../utils/audio';
import { EducationalBackground } from './EducationalBackground';

interface HomeMenuProps {
  progress: GameProgress;
  onStartGame: () => void;
  onOpenInstructions: () => void;
  onOpenMaterials: () => void;
  onOpenAbout: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export const HomeMenu: React.FC<HomeMenuProps> = ({
  progress,
  onStartGame,
  onOpenInstructions,
  onOpenMaterials,
  onOpenAbout,
  onToggleSound,
  onToggleMusic,
  soundEnabled,
  musicEnabled,
}) => {
  // Calculate total stars collected
  const totalStars = Object.values(progress.levels).reduce((sum, lvl) => sum + (lvl.stars || 0), 0);
  const completedCount = Object.values(progress.levels).filter((l) => l.completed).length;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 overflow-hidden">
      <EducationalBackground variant="home" />

      {/* Top Bar with Audio Controls & Badge status */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-white/50">
          <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs sm:text-sm">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{totalStars} / 9</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1 text-indigo-600 font-extrabold text-xs sm:text-sm">
            <Award className="w-4 h-4" />
            <span>{completedCount} / 3 Level</span>
          </div>
        </div>

        {/* Sound controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
              soundEnabled
                ? 'bg-white text-sky-600 hover:scale-105'
                : 'bg-white/60 text-slate-400 line-through'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMusic();
            }}
            title={musicEnabled ? 'Matikan Musik Latar' : 'Nyalakan Musik Latar'}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
              musicEnabled
                ? 'bg-amber-400 text-amber-950 hover:scale-105 animate-pulse'
                : 'bg-white/60 text-slate-400'
            }`}
          >
            <Music className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="w-full max-w-md flex flex-col items-center text-center my-auto z-10 py-4">
        {/* Mascot Character with Floating Card */}
        <div className="relative mb-3 group">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-amber-300 via-yellow-200 to-sky-200 shadow-2xl border-4 border-white animate-gentle-bounce flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/images/mascot_kids_explorer_1790830663294.jpg"
              alt="Maskot Misi Pintar"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Fallback emoji if image loading fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-7xl absolute" style={{ display: 'none' }}>
              🧑‍🎓
            </div>
          </div>
          {/* Floating Dialogue Speech Bubble */}
          <div className="absolute -top-3 -right-6 sm:-right-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl rounded-bl-none shadow-md border-2 border-sky-300 animate-wiggle">
            <span className="text-xs sm:text-sm font-extrabold text-sky-700">
              Halo Teman Pintar! 👋
            </span>
          </div>
        </div>

        {/* Game Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_8px_rgba(14,116,144,0.4)]">
            MISI PINTAR
          </h1>
          <p className="text-base sm:text-lg font-bold text-sky-900 mt-1 drop-shadow-sm bg-white/40 px-4 py-1 rounded-full inline-block backdrop-blur-xs">
            Belajar sambil bermain! 🌟
          </p>
        </div>

        {/* Big Action Buttons */}
        <div className="w-full space-y-3 px-2">
          {/* Main Play Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onStartGame();
            }}
            className="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black text-xl sm:text-2xl shadow-xl shadow-emerald-700/30 border-b-4 border-emerald-700 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
            </div>
            <span>MULAI BERMAIN</span>
          </button>

          {/* Secondary Buttons Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenInstructions();
              }}
              className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-white/90 hover:bg-white active:scale-95 text-sky-700 font-extrabold text-xs shadow-md border-b-3 border-sky-200 transition-all cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <span>PETUNJUK</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenMaterials();
              }}
              className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-white/90 hover:bg-white active:scale-95 text-indigo-700 font-extrabold text-xs shadow-md border-b-3 border-indigo-200 transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>MATERI</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenAbout();
              }}
              className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-white/90 hover:bg-white active:scale-95 text-amber-700 font-extrabold text-xs shadow-md border-b-3 border-amber-200 transition-all cursor-pointer"
            >
              <Info className="w-5 h-5 text-amber-600" />
              <span>TENTANG</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full text-center text-xs font-semibold text-sky-950/70 z-10 pt-2">
        <p>Game Edukasi 2D Interaktif untuk Siswa Sekolah Dasar • Matematika BAB 2: KPK & FPB</p>
      </footer>
    </div>
  );
};
