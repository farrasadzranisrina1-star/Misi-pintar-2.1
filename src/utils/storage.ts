import { GameProgress } from '../types/game';

const STORAGE_KEY = 'misi_pintar_progress_v1';

export const INITIAL_PROGRESS: GameProgress = {
  levels: {
    1: {
      unlocked: true,
      completed: false,
      bestScore: 0,
      stars: 0,
    },
    2: {
      unlocked: false,
      completed: false,
      bestScore: 0,
      stars: 0,
    },
    3: {
      unlocked: false,
      completed: false,
      bestScore: 0,
      stars: 0,
    },
  },
  badges: [],
  totalScore: 0,
  soundEnabled: true,
  musicEnabled: false,
};

export const loadGameProgress = (): GameProgress => {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      levels: {
        ...INITIAL_PROGRESS.levels,
        ...(parsed.levels || {}),
      },
    };
  } catch {
    return INITIAL_PROGRESS;
  }
};

export const saveGameProgress = (progress: GameProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save game progress', e);
  }
};

export const resetGameProgress = (): GameProgress => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  return INITIAL_PROGRESS;
};

export const calculateStars = (score: number): number => {
  if (score >= 90) return 3;
  if (score >= 80) return 2;
  if (score >= 60) return 1;
  return 0;
};
