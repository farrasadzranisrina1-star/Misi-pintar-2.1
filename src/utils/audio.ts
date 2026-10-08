/**
 * Web Audio API synthesizer for crisp, child-friendly sound effects and background tune.
 * Works entirely without external audio files, completely reliable and offline-safe.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = false;
  private musicInterval: number | null = null;
  private musicStep: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  public getMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public toggleMusic(): boolean {
    this.setMusicEnabled(!this.musicEnabled);
    return this.musicEnabled;
  }

  public toggleSound(): boolean {
    this.setSoundEnabled(!this.soundEnabled);
    return this.soundEnabled;
  }

  /**
   * Sound when user clicks a button or picks an item
   */
  public playClick() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted
    }
  }

  /**
   * Sound when item is dropped on target
   */
  public playDrop() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Ignore
    }
  }

  /**
   * Happy arpeggio when answer is correct!
   */
  public playSuccess() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Gentle, encouraging buzzer when answer is wrong
   */
  public playWrong() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {
      // Ignore
    }
  }

  /**
   * Fanfare for level completion
   */
  public playLevelComplete() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const melody = [
        { freq: 523.25, dur: 0.12 }, // C
        { freq: 659.25, dur: 0.12 }, // E
        { freq: 783.99, dur: 0.12 }, // G
        { freq: 1046.5, dur: 0.28 }, // C
        { freq: 880.0, dur: 0.14 },  // A
        { freq: 1046.5, dur: 0.4 },  // C
      ];

      let elapsed = 0;
      melody.forEach((note) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = this.ctx.currentTime + elapsed;
        osc.frequency.setValueAtTime(note.freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.dur);
        elapsed += note.dur * 0.9;
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Grand victory sound when Level 3 is completed
   */
  public playVictory() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const victoryChords = [
        [523.25, 659.25, 783.99],   // C major
        [587.33, 739.99, 880.0],    // D major
        [659.25, 830.61, 987.77],   // E major
        [783.99, 987.77, 1174.66],  // G major
        [1046.5, 1318.51, 1567.98], // High C major
      ];

      victoryChords.forEach((chord, step) => {
        if (!this.ctx) return;
        const start = this.ctx.currentTime + step * 0.2;
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(start);
          osc.stop(start + 0.5);
        });
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Cheerful background ambient melody loop (soft marimba style)
   */
  private startMusic() {
    if (this.musicInterval !== null) return;
    this.initContext();

    // Pentatonic happy scale: C4, D4, E4, G4, A4, C5
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    const pattern = [0, 2, 4, 3, 2, 4, 5, 3, 1, 3, 4, 2, 0, 3, 2, 0];

    this.musicInterval = window.setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      try {
        const noteIndex = pattern[this.musicStep % pattern.length];
        const freq = scale[noteIndex];
        this.musicStep++;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.04, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.35);
      } catch {
        // Ignore
      }
    }, 450);
  }

  private stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
