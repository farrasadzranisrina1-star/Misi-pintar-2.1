import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Pause, Home, Sparkles, Check, HelpCircle } from 'lucide-react';
import { Level, Question, DragItem } from '../types/game';
import { soundEngine } from '../utils/audio';
import { EducationalBackground } from './EducationalBackground';

interface DragDropGameProps {
  level: Level;
  currentQuestionIndex: number;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPause: () => void;
  onHome: () => void;
  onAnswerCorrect: (explanation: string) => void;
  onAnswerWrong: (hint?: string) => void;
}

export const DragDropGame: React.FC<DragDropGameProps> = ({
  level,
  currentQuestionIndex,
  score,
  soundEnabled,
  onToggleSound,
  onPause,
  onHome,
  onAnswerCorrect,
  onAnswerWrong,
}) => {
  const question: Question = level.questions[currentQuestionIndex];

  // State of placed items in targets: targetId -> itemId
  const [placements, setPlacements] = useState<Record<string, string>>({});
  // Currently dragged item id
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  // Tap-to-select fallback for touch/click accessibility
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  // Hovered target slot during drag
  const [hoveredTargetId, setHoveredTargetId] = useState<string | null>(null);
  // Shake animation for incorrect dropped target
  const [shakeTargetId, setShakeTargetId] = useState<string | null>(null);

  // Randomized item order for non-sequential answer choices
  const [shuffledItems, setShuffledItems] = useState<DragItem[]>(() => {
    const arr = [...question.items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  // High-performance refs for zero-lag 60fps dragging
  const floatingElRef = useRef<HTMLDivElement | null>(null);
  const targetRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cachedRectsRef = useRef<Record<string, DOMRect>>({});
  const dragStateRef = useRef<{
    itemId: string | null;
    startX: number;
    startY: number;
    isDragging: boolean;
    hoveredId: string | null;
  }>({
    itemId: null,
    startX: 0,
    startY: 0,
    isDragging: false,
    hoveredId: null,
  });

  // Reset placements and reshuffle items when question changes
  useEffect(() => {
    const arr = [...question.items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledItems(arr);
    setPlacements({});
    setDraggedItemId(null);
    setSelectedItemId(null);
    setHoveredTargetId(null);
    setShakeTargetId(null);
    dragStateRef.current = {
      itemId: null,
      startX: 0,
      startY: 0,
      isDragging: false,
      hoveredId: null,
    };
  }, [question.id, question.items]);

  // Which items have been placed
  const placedItemIds = new Set(Object.values(placements));
  const currentItemList = shuffledItems.length > 0 ? shuffledItems : question.items;
  const availableItems = currentItemList.filter((item) => !placedItemIds.has(item.id));

  // Check if an item matches a target
  const validateMatch = useCallback(
    (targetId: string, itemId: string): boolean => {
      const expectedItemId = question.correctMatches[targetId];
      if (expectedItemId === itemId) {
        return true;
      }
      const item = question.items.find((i) => i.id === itemId);
      const target = question.targets.find((t) => t.id === targetId);
      if (item && target && item.category && target.category && item.category === target.category) {
        return true;
      }
      return false;
    },
    [question]
  );

  const handleDropOnTarget = useCallback(
    (targetId: string, itemId: string) => {
      if (placements[targetId]) return;

      soundEngine.playDrop();
      const isCorrect = validateMatch(targetId, itemId);

      if (isCorrect) {
        const newPlacements = { ...placements, [targetId]: itemId };
        setPlacements(newPlacements);
        setSelectedItemId(null);
        setDraggedItemId(null);
        setHoveredTargetId(null);

        const totalTargets = question.targets.length;
        const filledCount = Object.keys(newPlacements).length;

        if (filledCount >= totalTargets) {
          onAnswerCorrect(question.explanation);
        }
      } else {
        setShakeTargetId(targetId);
        setTimeout(() => setShakeTargetId(null), 400);

        setSelectedItemId(null);
        setDraggedItemId(null);
        setHoveredTargetId(null);

        const hint =
          'Coba hitung kembali dengan cermat menggunakan pohon faktor atau faktorisasi prima, lalu pasangkan lagi.';
        onAnswerWrong(hint);
      }
    },
    [placements, question, validateMatch, onAnswerCorrect, onAnswerWrong]
  );

  // Cache target bounding boxes once on pointer down to avoid layout thrashing
  const cacheTargetRects = () => {
    const rects: Record<string, DOMRect> = {};
    Object.entries(targetRefs.current).forEach(([tId, el]) => {
      if (el && !placements[tId]) {
        rects[tId] = el.getBoundingClientRect();
      }
    });
    cachedRectsRef.current = rects;
  };

  // Start pointer interaction on a card
  const handlePointerDown = (e: React.PointerEvent, item: DragItem) => {
    e.preventDefault();
    soundEngine.playClick();

    cacheTargetRects();

    dragStateRef.current = {
      itemId: item.id,
      startX: e.clientX,
      startY: e.clientY,
      isDragging: true,
      hoveredId: null,
    };

    setDraggedItemId(item.id);

    // Position the floating element immediately without waiting for React state
    if (floatingElRef.current) {
      floatingElRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  // Global window pointer move & pointer up listeners for zero-latency tracking
  useEffect(() => {
    if (!draggedItemId) return;

    const onWindowPointerMove = (e: PointerEvent) => {
      if (!dragStateRef.current.isDragging) return;

      // Update floating clone position directly on DOM (0ms latency, no React re-render)
      if (floatingElRef.current) {
        floatingElRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Hit-test against cached target rects
      let foundTargetId: string | null = null;
      const clientX = e.clientX;
      const clientY = e.clientY;

      for (const [tId, rect] of Object.entries(cachedRectsRef.current)) {
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          foundTargetId = tId;
          break;
        }
      }

      if (dragStateRef.current.hoveredId !== foundTargetId) {
        dragStateRef.current.hoveredId = foundTargetId;
        setHoveredTargetId(foundTargetId);
      }
    };

    const onWindowPointerUp = (e: PointerEvent) => {
      if (!dragStateRef.current.isDragging) return;

      const { itemId, startX, startY, hoveredId } = dragStateRef.current;
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

      dragStateRef.current.isDragging = false;
      dragStateRef.current.itemId = null;
      dragStateRef.current.hoveredId = null;

      if (itemId && hoveredId) {
        // Dropped directly onto a target slot
        handleDropOnTarget(hoveredId, itemId);
      } else if (itemId && dist < 8) {
        // Quick tap/click without dragging -> toggle selection for tap-to-place
        setSelectedItemId((prev) => (prev === itemId ? null : itemId));
        setDraggedItemId(null);
        setHoveredTargetId(null);
      } else {
        setDraggedItemId(null);
        setHoveredTargetId(null);
      }
    };

    window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('pointercancel', onWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', onWindowPointerMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      window.removeEventListener('pointercancel', onWindowPointerUp);
    };
  }, [draggedItemId, handleDropOnTarget]);

  // Click / Tap placement handler on target slot
  const handleTargetClick = (targetId: string) => {
    if (placements[targetId]) return;
    if (selectedItemId) {
      handleDropOnTarget(targetId, selectedItemId);
    }
  };

  const draggedItemObj = question.items.find((i) => i.id === draggedItemId);

  // Progress percentage
  const totalQuestions = level.questions.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between select-none overflow-x-hidden">
      <EducationalBackground variant="game" />

      {/* HUD Header */}
      <header className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2 z-20">
        <div className="bg-white/95 rounded-2xl p-3 sm:p-4 shadow-md border-2 border-sky-200">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            {/* Level & Question indicator */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-sky-600 text-white font-black text-xs sm:text-sm tracking-wide">
                LEVEL {level.number}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-600">
                Soal {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>

            {/* Score Display */}
            <div className="flex items-center gap-1.5 bg-amber-100 px-3.5 py-1 rounded-xl border border-amber-300 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs sm:text-sm font-black text-amber-900">
                Skor: {score}
              </span>
            </div>

            {/* Controls: Sound, Pause, Home */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onToggleSound();
                }}
                title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onPause();
                }}
                title="Jeda Permainan"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <Pause className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onHome();
                }}
                title="Kembali ke Menu"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-400 to-sky-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="w-full max-w-5xl mx-auto px-4 py-2 flex-1 flex flex-col justify-center z-10">
        {/* Question Title & Banner */}
        <div className="bg-white/95 rounded-2xl p-4 border-2 border-sky-200 shadow-sm mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600 block">
                {question.title}
              </span>
              <h2 className="text-base sm:text-xl font-black text-slate-800 leading-snug">
                {question.instruction}
              </h2>
              {question.contextNarrative && (
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  💡 {question.contextNarrative}
                </p>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold flex-shrink-0">
              <HelpCircle className="w-4 h-4 text-sky-500" />
              <span>Seret atau Ketuk Kartu</span>
            </div>
          </div>
        </div>

        {/* 2-Zone Drag & Drop Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Zone: Draggable Items */}
          <div className="lg:col-span-5 bg-white/90 rounded-3xl p-4 sm:p-5 border-2 border-dashed border-sky-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-100">
                <span className="text-xs font-black uppercase tracking-wider text-sky-800">
                  PILIHAN JAWABAN ({availableItems.length} Tersisa)
                </span>
                {selectedItemId && (
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    ✓ Kartu Dipilih — Ketuk Kotak Tujuan
                  </span>
                )}
              </div>

              {availableItems.length === 0 ? (
                <div className="py-10 text-center text-emerald-600 font-bold text-sm flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                    ✨
                  </div>
                  <span>Semua kartu telah ditempatkan!</span>
                </div>
              ) : (
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5">
                  {availableItems.map((item) => {
                    const isSelected = selectedItemId === item.id;
                    const isBeingDragged = draggedItemId === item.id;

                    return (
                      <div
                        key={item.id}
                        onPointerDown={(e) => handlePointerDown(e, item)}
                        className={`group relative p-3 rounded-2xl border-2 transition-transform duration-100 flex items-center gap-3 cursor-grab active:cursor-grabbing select-none touch-none ${
                          isSelected
                            ? 'bg-amber-100 border-amber-400 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                            : 'bg-white hover:bg-sky-50 border-slate-200 hover:border-sky-300 shadow-xs'
                        } ${isBeingDragged ? 'opacity-30 scale-95' : 'opacity-100'}`}
                      >
                        {/* Item Icon */}
                        <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-xl flex-shrink-0">
                          {item.icon || '🔢'}
                        </div>

                        <div className="flex-1 min-w-0 text-left">
                          <h4 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                            {item.label}
                          </h4>
                        </div>

                        <div className="hidden sm:block text-[11px] font-bold text-sky-600">
                          Seret ➔
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t border-sky-100 text-center text-[11px] text-slate-500 font-medium">
              💡 Seret kartu ke kotak tujuan, atau ketuk kartu lalu ketuk kotak tujuannya.
            </div>
          </div>

          {/* Right Zone: Drop Target Slots */}
          <div className="lg:col-span-7 bg-white/90 rounded-3xl p-4 sm:p-5 border-2 border-sky-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-100">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  KOTAK SOAL & TUJUAN
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {Object.keys(placements).length} / {question.targets.length} Terisi
                </span>
              </div>

              <div className="space-y-3">
                {question.targets.map((target) => {
                  const placedId = placements[target.id];
                  const placedItem = question.items.find((i) => i.id === placedId);
                  const isHovered = hoveredTargetId === target.id;
                  const isShaking = shakeTargetId === target.id;
                  const isReadyForTap = !placedItem && Boolean(selectedItemId);

                  return (
                    <div
                      key={target.id}
                      ref={(el) => {
                        targetRefs.current[target.id] = el;
                      }}
                      onClick={() => handleTargetClick(target.id)}
                      className={`relative p-3 sm:p-3.5 rounded-2xl border-2 transition-colors duration-100 flex items-center justify-between gap-3 min-h-[72px] ${
                        placedItem
                          ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                          : isHovered
                          ? 'bg-sky-100 border-sky-500 ring-4 ring-sky-300'
                          : isReadyForTap
                          ? 'border-dashed border-amber-400 bg-amber-50/60 hover:bg-amber-100/70 cursor-pointer'
                          : 'border-dashed border-slate-300 bg-slate-50/90 hover:border-sky-300'
                      } ${isShaking ? 'animate-shake border-rose-400 bg-rose-50' : ''}`}
                    >
                      {/* Left Target Question */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl flex-shrink-0 shadow-2xs">
                          {target.icon || '🎯'}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                            {target.label}
                          </h4>
                        </div>
                      </div>

                      {/* Right Dropped / Slot placeholder */}
                      <div className="flex-shrink-0">
                        {placedItem ? (
                          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border-2 border-emerald-400 shadow-xs">
                            <span className="text-lg">{placedItem.icon || '🔢'}</span>
                            <span className="text-sm font-black text-emerald-800">
                              {placedItem.label}
                            </span>
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`px-3 py-2 rounded-xl text-center font-bold text-xs border border-dashed ${
                              isHovered
                                ? 'bg-sky-500 text-white border-sky-600'
                                : isReadyForTap
                                ? 'bg-amber-200 text-amber-900 border-amber-400'
                                : 'bg-white/80 text-slate-400 border-slate-300'
                            }`}
                          >
                            {isHovered
                              ? 'Lepaskan Di Sini!'
                              : isReadyForTap
                              ? 'Ketuk Di Sini'
                              : 'Taruh Jawaban'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Hitung dulu jawabannya, lalu taruh pada kotak yang sesuai.</span>
              <span className="font-bold text-emerald-600">+20 Poin saat Benar</span>
            </div>
          </div>
        </div>
      </main>

      {/* Hardware-Accelerated Floating Dragged Clone (0ms Direct DOM Transform) */}
      <div
        ref={floatingElRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: 'translate3d(-9999px, -9999px, 0)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          display: draggedItemId && draggedItemObj ? 'flex' : 'none',
        }}
        className="items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl shadow-xl border-2 border-sky-500 ring-4 ring-sky-300/50"
      >
        <span className="text-2xl">{draggedItemObj?.icon || '🔢'}</span>
        <span className="text-base font-black text-slate-800">
          {draggedItemObj?.label}
        </span>
      </div>

      {/* Bottom Cheerful Mascot Bar */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-2 z-10 flex items-center justify-between text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎒</span>
          <span className="hidden sm:inline">Misi Pintar SD • Semangat, kamu pasti bisa!</span>
        </div>
        <div className="text-[11px] text-sky-800 bg-white/90 px-3 py-1 rounded-full border border-sky-200 font-bold">
          Batas Kelulusan Level: 80 Poin
        </div>
      </footer>
    </div>
  );
};
