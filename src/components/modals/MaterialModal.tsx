import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { LEARNING_MATERIALS } from '../../data/gameData';
import { soundEngine } from '../../utils/audio';

interface MaterialModalProps {
  onClose: () => void;
}

const PRIME_DETAILS: Record<number, string> = {
  2: '2 = 1 × 2 (Satu-satunya bilangan prima yang genap!)',
  3: '3 = 1 × 3 (Hanya bisa dibagi 1 dan 3)',
  5: '5 = 1 × 5 (Hanya bisa dibagi 1 dan 5)',
  7: '7 = 1 × 7 (Hanya bisa dibagi 1 dan 7)',
  11: '11 = 1 × 11 (Hanya bisa dibagi 1 dan 11)',
  13: '13 = 1 × 13 (Hanya bisa dibagi 1 dan 13)',
};

export const MaterialModal: React.FC<MaterialModalProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPrime, setSelectedPrime] = useState<number>(2);
  const [treeNumber, setTreeNumber] = useState<12 | 18>(12);

  const currentCard = LEARNING_MATERIALS[currentIndex];

  const triggerPageFlip = (nextIdx: number) => {
    soundEngine.playClick();
    setCurrentIndex(nextIdx);
  };

  const handleNext = () => {
    if (currentIndex < LEARNING_MATERIALS.length - 1) {
      triggerPageFlip(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      triggerPageFlip(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-pop">
      {/* 3D Pop-Up Book Outer Hardcover */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-[32px] p-2.5 sm:p-4 shadow-2xl border-4 border-amber-400 max-h-[94vh] flex flex-col">
        {/* Top Bookmark Ribbon & Chapter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500 text-white px-3 py-1 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 border-2 border-rose-300">
              <BookOpen className="w-4 h-4" />
              <span>BUKU POP-UP PINTAR</span>
            </div>

            {/* Quick Page Tabs */}
            <div className="hidden sm:flex items-center gap-1.5">
              {LEARNING_MATERIALS.map((mat, idx) => (
                <button
                  key={mat.id}
                  onClick={() => triggerPageFlip(idx)}
                  className={`px-3 py-1 rounded-t-xl font-extrabold text-xs transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-amber-100 text-amber-950 shadow-sm translate-y-0.5 scale-105'
                      : 'bg-amber-800/80 text-amber-200 hover:bg-amber-700'
                  }`}
                >
                  Hal {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            title="Tutup Buku"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-rose-600 font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Open Book Inner Spread (Left Page & Right Page) */}
        <div className="relative flex-1 bg-[#FFFDF7] rounded-2xl sm:rounded-3xl shadow-inner border-x-8 border-b-8 border-amber-100 overflow-y-auto">
          {/* Center Book Spine Shadow on Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-amber-900/5 via-amber-900/20 to-amber-900/5 pointer-events-none z-10" />

          {/* Center Binding Rings on Desktop */}
          <div className="hidden md:flex flex-col justify-around items-center absolute top-6 bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            {[1, 2, 3, 4].map((ring) => (
              <div
                key={ring}
                className="w-5 h-2.5 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-400 border border-slate-400 shadow-xs"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            {/* LEFT PAGE: 3D Pop-Up Interactive Visual Stage */}
            <div className="p-4 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-sky-50/70 via-white to-amber-50/40 border-b md:border-b-0 border-amber-200/60">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    {currentCard.category}
                  </span>
                  <span className="text-xs font-bold text-amber-700/70">Halaman Kiri</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md border-2 border-amber-300 flex items-center justify-center text-3xl transform -rotate-3">
                    {currentCard.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
                      {currentCard.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ilustrasi Pop-Up Interaktif</span>
                    </p>
                  </div>
                </div>

                {/* POP-UP STAGE PER PAGE */}
                <div className="relative mt-2 p-4 rounded-3xl bg-white border-2 border-sky-200 shadow-[0_10px_0_0_rgba(186,230,253,0.6)] transform transition-transform">
                  {/* PAGE 1 POP-UP: PRIME NUMBERS */}
                  {currentIndex === 0 && (
                    <div className="text-center">
                      <span className="text-xs font-extrabold text-sky-800 block mb-2.5">
                        👆 Ketuk Angka Prima di Bawah Ini!
                      </span>
                      <div className="grid grid-cols-3 gap-2.5 mb-3">
                        {[2, 3, 5, 7, 11, 13].map((num) => (
                          <button
                            key={num}
                            onClick={() => {
                              soundEngine.playClick();
                              setSelectedPrime(num);
                            }}
                            className={`py-2.5 rounded-2xl font-black text-lg border-b-4 transition-all cursor-pointer ${
                              selectedPrime === num
                                ? 'bg-emerald-500 text-white border-emerald-700 -translate-y-1 shadow-md'
                                : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-2.5 text-xs font-bold text-emerald-900 animate-pop">
                        ⭐ {PRIME_DETAILS[selectedPrime]}
                      </div>
                    </div>
                  )}

                  {/* PAGE 2 POP-UP: VISUAL POHON FAKTOR */}
                  {currentIndex === 1 && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            setTreeNumber(12);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                            treeNumber === 12
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          🌳 Pohon 12
                        </button>
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            setTreeNumber(18);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                            treeNumber === 18
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          🌳 Pohon 18
                        </button>
                      </div>

                      {/* Visual Tree Diagram */}
                      <div className="flex flex-col items-center py-2 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                        {/* Root Number */}
                        <div className="w-12 h-10 rounded-xl bg-amber-500 text-white font-black text-base flex items-center justify-center shadow-sm border-2 border-amber-700">
                          {treeNumber}
                        </div>
                        <div className="text-xs font-black text-amber-800 my-0.5">↙ &nbsp;&nbsp;&nbsp; ↘</div>
                        {/* Level 1 Branches */}
                        <div className="flex items-center gap-8">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-sm border-2 border-white ring-2 ring-emerald-400">
                            2
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-950 font-black text-sm flex items-center justify-center border-2 border-amber-400">
                            {treeNumber === 12 ? 6 : 9}
                          </div>
                        </div>
                        <div className="text-xs font-black text-amber-800 my-0.5 translate-x-7">↙ &nbsp;&nbsp;&nbsp; ↘</div>
                        {/* Level 2 Branches */}
                        <div className="flex items-center gap-6 translate-x-7">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-sm border-2 border-white ring-2 ring-emerald-400">
                            {treeNumber === 12 ? 2 : 3}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-sm border-2 border-white ring-2 ring-emerald-400">
                            3
                          </div>
                        </div>

                        <div className="mt-3 px-3 py-1 rounded-full bg-white border border-emerald-300 text-xs font-black text-emerald-800 shadow-2xs">
                          {treeNumber === 12 ? '12 = 2 × 2 × 3 = 2² × 3' : '18 = 2 × 3 × 3 = 2 × 3²'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PAGE 3 POP-UP: VISUAL MESIN FPB */}
                  {currentIndex === 2 && (
                    <div className="text-center space-y-2.5">
                      <div className="text-xs font-extrabold text-amber-800 bg-amber-100 py-1 px-3 rounded-full inline-block">
                        🛡️ Contoh Mencari FPB dari 4 dan 6
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200">
                          <div className="font-black text-slate-700 mb-1">Angka 4</div>
                          <div className="text-sm font-black text-sky-700">
                            <span className="bg-emerald-200 px-1.5 py-0.5 rounded-md border border-emerald-400">2²</span>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200">
                          <div className="font-black text-slate-700 mb-1">Angka 6</div>
                          <div className="text-sm font-black text-sky-700">
                            <span className="bg-emerald-200 px-1.5 py-0.5 rounded-md border border-emerald-400">2</span> × 3
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-xs font-bold text-emerald-950">
                        <div>Faktor yang SAMA adalah angka 2.</div>
                        <div className="text-sm font-black text-emerald-700 mt-1">
                          Pilih Pangkat Terkecil → FPB = 2
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PAGE 4 POP-UP: VISUAL ROKET KPK */}
                  {currentIndex === 3 && (
                    <div className="text-center space-y-2.5">
                      <div className="text-xs font-extrabold text-indigo-800 bg-indigo-100 py-1 px-3 rounded-full inline-block">
                        🚀 Contoh Mencari KPK dari 4 dan 6
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200">
                          <div className="font-black text-slate-700 mb-1">Angka 4</div>
                          <div className="text-sm font-black text-indigo-700">
                            <span className="bg-amber-200 px-1.5 py-0.5 rounded-md border border-amber-400">2²</span>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200">
                          <div className="font-black text-slate-700 mb-1">Angka 6</div>
                          <div className="text-sm font-black text-indigo-700">
                            2 × <span className="bg-amber-200 px-1.5 py-0.5 rounded-md border border-amber-400">3</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-400 text-xs font-bold text-amber-950">
                        <div>Kalikan SEMUA faktor, pilih pangkat TERBESAR:</div>
                        <div className="text-sm font-black text-indigo-700 mt-1">
                          KPK = 2² × 3 = 4 × 3 = 12
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>BAB 2: KPK & FPB</span>
                <span>Hal. {currentIndex * 2 + 1}</span>
              </div>
            </div>

            {/* RIGHT PAGE: Story Summary, Clear Bullet Steps & Fun Fact */}
            <div className="p-4 sm:p-6 flex flex-col justify-between bg-gradient-to-bl from-amber-50/50 via-white to-emerald-50/30">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                    📖 Penjelasan Mudah
                  </span>
                  <span className="text-xs font-bold text-amber-700/70">Halaman Kanan</span>
                </div>

                {/* Summary Box */}
                <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-3.5 mb-4 shadow-2xs">
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    {currentCard.summary}
                  </p>
                </div>

                {/* Key Steps */}
                <div className="space-y-2.5 mb-4">
                  {currentCard.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-xs hover:border-sky-200 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pop-Up Sticky Note Fun Fact */}
                <div className="relative bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-amber-300 p-3.5 rounded-2xl shadow-md transform rotate-[0.5deg]">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-amber-900 block">
                        Tips & Ingatan Pintar!
                      </span>
                      <p className="text-xs font-bold text-amber-950 leading-snug mt-0.5">
                        {currentCard.funFact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>Misi Pintar SD</span>
                <span>Hal. {currentIndex * 2 + 2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Book Controls (Turn Pages) */}
        <div className="flex items-center justify-between pt-3 px-2 flex-shrink-0 gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              currentIndex === 0
                ? 'opacity-40 bg-amber-900/40 text-amber-200 cursor-not-allowed'
                : 'bg-white hover:bg-amber-50 text-amber-900 shadow-md active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Halaman Sebelumnya</span>
          </button>

          {/* Page Dots */}
          <div className="flex items-center gap-2">
            {LEARNING_MATERIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => triggerPageFlip(i)}
                className={`h-3 rounded-full transition-all cursor-pointer ${
                  i === currentIndex
                    ? 'w-7 bg-white shadow-sm'
                    : 'w-3 bg-amber-300/50 hover:bg-amber-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === LEARNING_MATERIALS.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              currentIndex === LEARNING_MATERIALS.length - 1
                ? 'opacity-40 bg-amber-900/40 text-amber-200 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md border-b-3 border-emerald-700 active:scale-95'
            }`}
          >
            <span>Buka Halaman Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
