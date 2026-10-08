export interface DragItem {
  id: string;
  label: string;
  icon?: string; // emoji or icon name
  category?: string;
  image?: string;
  hint?: string;
}

export interface TargetSlot {
  id: string;
  label: string;
  category: string; // The required category or expected matching item ID
  icon?: string;
  description?: string;
  placedItemId?: string | null;
}

export interface Question {
  id: number;
  title: string;
  instruction: string;
  contextNarrative?: string;
  items: DragItem[];
  targets: TargetSlot[];
  // Mapping of target id to correct item id (or category match rule)
  correctMatches: Record<string, string>; // targetId -> itemId
  explanation: string;
}

export interface Level {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  badgeName: string;
  badgeIcon: string;
  badgeDescription: string;
  colorTheme: {
    primary: string;
    border: string;
    bg: string;
    light: string;
  };
  questions: Question[];
}

export interface LevelProgress {
  unlocked: boolean;
  completed: boolean;
  bestScore: number;
  stars: number; // 0 to 3
}

export interface GameProgress {
  levels: Record<number, LevelProgress>;
  badges: string[];
  totalScore: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface MaterialCard {
  id: string;
  title: string;
  category: string;
  summary: string;
  keyPoints: string[];
  funFact: string;
  icon: string;
}
