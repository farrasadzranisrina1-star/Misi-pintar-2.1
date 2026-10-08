import { useState, useEffect } from 'react';
import { GAME_LEVELS } from './data/gameData';
import { Level, GameProgress } from './types/game';
import { loadGameProgress, saveGameProgress, resetGameProgress, calculateStars } from './utils/storage';
import { soundEngine } from './utils/audio';

import { HomeMenu } from './components/HomeMenu';
import { LevelSelect } from './components/LevelSelect';
import { DragDropGame } from './components/DragDropGame';

import { CorrectPopup } from './components/modals/CorrectPopup';
import { WrongPopup } from './components/modals/WrongPopup';
import { LevelResultModal } from './components/modals/LevelResultModal';
import { GameVictoryModal } from './components/modals/GameVictoryModal';
import { InstructionModal } from './components/modals/InstructionModal';
import { MaterialModal } from './components/modals/MaterialModal';
import { AboutModal } from './components/modals/AboutModal';
import { PauseModal } from './components/modals/PauseModal';
import { ResetConfirmModal } from './components/modals/ResetConfirmModal';

type AppView = 'HOME' | 'LEVEL_SELECT' | 'GAME';

export default function App() {
  // Game progress stored in localStorage
  const [progress, setProgress] = useState<GameProgress>(loadGameProgress);

  // Navigation view
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [activeLevel, setActiveLevel] = useState<Level>(GAME_LEVELS[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Current level session score & attempts
  const [levelScore, setLevelScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [questionMistakeCount, setQuestionMistakeCount] = useState<number>(0);

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(progress.soundEnabled);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(progress.musicEnabled);

  // Modals state
  const [showCorrectPopup, setShowCorrectPopup] = useState<boolean>(false);
  const [correctExplanation, setCorrectExplanation] = useState<string>('');

  const [showWrongPopup, setShowWrongPopup] = useState<boolean>(false);
  const [wrongHint, setWrongHint] = useState<string>('');

  const [showLevelResult, setShowLevelResult] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);

  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showMaterials, setShowMaterials] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showPause, setShowPause] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Sync sound settings with audio engine
  useEffect(() => {
    soundEngine.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    soundEngine.setMusicEnabled(musicEnabled);
  }, [musicEnabled]);

  // Save progress changes to storage
  const updateProgress = (updater: (prev: GameProgress) => GameProgress) => {
    setProgress((prev) => {
      const updated = updater(prev);
      saveGameProgress(updated);
      return updated;
    });
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundEngine.setSoundEnabled(nextVal);
    updateProgress((p) => ({ ...p, soundEnabled: nextVal }));
  };

  const handleToggleMusic = () => {
    const nextVal = !musicEnabled;
    setMusicEnabled(nextVal);
    soundEngine.setMusicEnabled(nextVal);
    updateProgress((p) => ({ ...p, musicEnabled: nextVal }));
  };

  const handleStartGame = () => {
    setCurrentView('LEVEL_SELECT');
  };

  const handleSelectLevel = (level: Level) => {
    setActiveLevel(level);
    setCurrentQuestionIndex(0);
    setLevelScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setQuestionMistakeCount(0);
    setCurrentView('GAME');
  };

  // Called when all items in current question are placed correctly
  const handleAnswerCorrect = (explanation: string) => {
    setCorrectExplanation(explanation);

    // If student had 0 or 1 mistake, they earn full +20 points
    const earnedPoints = questionMistakeCount > 1 ? 10 : 20;
    setLevelScore((prev) => prev + earnedPoints);
    setCorrectCount((prev) => prev + 1);

    setShowCorrectPopup(true);
  };

  // Called when item is dropped onto the wrong slot
  const handleAnswerWrong = (hint?: string) => {
    setWrongHint(hint || '');
    setQuestionMistakeCount((prev) => prev + 1);
    setShowWrongPopup(true);
  };

  const handleNextQuestion = () => {
    setShowCorrectPopup(false);
    setQuestionMistakeCount(0);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeLevel.questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // Level finished! Calculate outcomes
      handleLevelComplete();
    }
  };

  const handleRetryQuestion = () => {
    setShowWrongPopup(false);
    // If student has made 3 mistakes on this same question, consider it marked wrong and move on
    if (questionMistakeCount >= 2) {
      setWrongCount((prev) => prev + 1);
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < activeLevel.questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setQuestionMistakeCount(0);
      } else {
        handleLevelComplete();
      }
    }
  };

  const handleLevelComplete = () => {
    const finalScore = levelScore;
    const isPassed = finalScore >= 80;
    const starsEarned = calculateStars(finalScore);

    updateProgress((prev) => {
      const nextLevels = { ...prev.levels };
      const currentLevelData = nextLevels[activeLevel.id] || {
        unlocked: true,
        completed: false,
        bestScore: 0,
        stars: 0,
      };

      const updatedCurrent = {
        unlocked: true,
        completed: currentLevelData.completed || isPassed,
        bestScore: Math.max(currentLevelData.bestScore, finalScore),
        stars: Math.max(currentLevelData.stars, starsEarned),
      };
      nextLevels[activeLevel.id] = updatedCurrent;

      // Unlock next level if passed!
      const nextLevelId = activeLevel.id + 1;
      if (isPassed && GAME_LEVELS.some((l) => l.id === nextLevelId)) {
        nextLevels[nextLevelId] = {
          unlocked: true,
          completed: nextLevels[nextLevelId]?.completed || false,
          bestScore: nextLevels[nextLevelId]?.bestScore || 0,
          stars: nextLevels[nextLevelId]?.stars || 0,
        };
      }

      // Add badge if passed and not yet collected
      const badges = [...prev.badges];
      if (isPassed && !badges.includes(activeLevel.badgeName)) {
        badges.push(activeLevel.badgeName);
      }

      // Recalculate total score
      const totalScore = Object.values(nextLevels).reduce(
        (acc, l) => acc + (l.bestScore || 0),
        0
      );

      return {
        ...prev,
        levels: nextLevels,
        badges,
        totalScore,
      };
    });

    setShowLevelResult(true);
  };

  const handleNextLevelFromSummary = () => {
    setShowLevelResult(false);
    const nextLevelId = activeLevel.id + 1;
    const nextLevel = GAME_LEVELS.find((l) => l.id === nextLevelId);

    if (nextLevel) {
      handleSelectLevel(nextLevel);
    } else {
      // Completed Level 3! Open grand victory screen!
      setShowVictoryModal(true);
    }
  };

  const handleRetryCurrentLevel = () => {
    setShowLevelResult(false);
    setShowPause(false);
    handleSelectLevel(activeLevel);
  };

  const handleReturnToMap = () => {
    setShowLevelResult(false);
    setShowPause(false);
    setCurrentView('LEVEL_SELECT');
  };

  const handleReturnHome = () => {
    setShowLevelResult(false);
    setShowVictoryModal(false);
    setShowPause(false);
    setCurrentView('HOME');
  };

  const handleResetProgressConfirm = () => {
    const fresh = resetGameProgress();
    setProgress(fresh);
    setShowResetConfirm(false);
  };

  const hasNextLevel = activeLevel.id < GAME_LEVELS.length;
  const currentLevelStars = calculateStars(levelScore);
  const totalStars = Object.values(progress.levels).reduce((sum, l) => sum + (l.stars || 0), 0);

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans antialiased text-slate-800">
      {/* View routing */}
      {currentView === 'HOME' && (
        <HomeMenu
          progress={progress}
          onStartGame={handleStartGame}
          onOpenInstructions={() => setShowInstructions(true)}
          onOpenMaterials={() => setShowMaterials(true)}
          onOpenAbout={() => setShowAbout(true)}
          onToggleSound={handleToggleSound}
          onToggleMusic={handleToggleMusic}
          soundEnabled={soundEnabled}
          musicEnabled={musicEnabled}
        />
      )}

      {currentView === 'LEVEL_SELECT' && (
        <LevelSelect
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onBackToHome={() => setCurrentView('HOME')}
          onOpenResetConfirm={() => setShowResetConfirm(true)}
        />
      )}

      {currentView === 'GAME' && (
        <DragDropGame
          level={activeLevel}
          currentQuestionIndex={currentQuestionIndex}
          score={levelScore}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onPause={() => setShowPause(true)}
          onHome={handleReturnHome}
          onAnswerCorrect={handleAnswerCorrect}
          onAnswerWrong={handleAnswerWrong}
        />
      )}

      {/* Popups & Modals */}
      {showCorrectPopup && (
        <CorrectPopup
          scoreGained={20}
          explanation={correctExplanation}
          onNext={handleNextQuestion}
        />
      )}

      {showWrongPopup && (
        <WrongPopup
          hint={wrongHint}
          onRetry={handleRetryQuestion}
        />
      )}

      {showLevelResult && (
        <LevelResultModal
          level={activeLevel}
          score={levelScore}
          correctCount={correctCount}
          wrongCount={wrongCount}
          stars={currentLevelStars}
          hasNextLevel={hasNextLevel}
          onNextLevel={handleNextLevelFromSummary}
          onRetryLevel={handleRetryCurrentLevel}
          onReturnToMap={handleReturnToMap}
        />
      )}

      {showVictoryModal && (
        <GameVictoryModal
          totalScore={progress.totalScore || levelScore}
          totalStars={totalStars}
          badges={progress.badges}
          onPlayAgain={() => {
            setShowVictoryModal(false);
            handleSelectLevel(GAME_LEVELS[0]);
          }}
          onHome={handleReturnHome}
        />
      )}

      {showInstructions && (
        <InstructionModal
          onClose={() => setShowInstructions(false)}
          onStartPlaying={() => {
            setShowInstructions(false);
            setCurrentView('LEVEL_SELECT');
          }}
        />
      )}

      {showMaterials && (
        <MaterialModal onClose={() => setShowMaterials(false)} />
      )}

      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}

      {showPause && (
        <PauseModal
          onResume={() => setShowPause(false)}
          onRestartLevel={handleRetryCurrentLevel}
          onReturnToMap={handleReturnToMap}
          onReturnHome={handleReturnHome}
          soundEnabled={soundEnabled}
          musicEnabled={musicEnabled}
          onToggleSound={handleToggleSound}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {showResetConfirm && (
        <ResetConfirmModal
          onConfirm={handleResetProgressConfirm}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
}
