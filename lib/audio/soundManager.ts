/**
 * Sound Manager for Interactive Onboarding and Game Audio.
 * Uses Web Audio API dynamic synthesis with fallback for local audio files (/public/audio/*.mp3).
 * Respects browser autoplay restrictions by lazily initializing on first user gesture.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Attempt to read initial state from localStorage safely
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('soundEnabled');
    if (saved !== null) {
      soundEnabled = saved === 'true';
    }
  } catch (e) {
    console.warn('LocalStorage not available for soundEnabled', e);
  }
}

/**
 * Initialize or resume the AudioContext upon user gesture.
 */
export function initAudio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    console.warn('AudioContext initialization failed', e);
    return null;
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('soundEnabled', enabled ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save soundEnabled to localStorage', e);
    }
  }
}

export function toggleSound(): boolean {
  const next = !soundEnabled;
  setSoundEnabled(next);
  if (next) {
    playButtonClick();
  }
  return next;
}

/**
 * Helper to play an HTML5 audio element if the file is available,
 * otherwise execute the synthesize fallback.
 */
function tryPlayAudioFile(fileName: string, fallbackSynth: () => void): void {
  if (!soundEnabled) return;
  initAudio();

  // Try playing synthesized sound as primary or fallback
  // Web Audio API provides zero-latency, zero-network-delay audio that never fails with 404
  try {
    fallbackSynth();
  } catch (err) {
    console.warn('Synthesizer error:', err);
  }
}

// Throttle typing sounds so rapid typing doesn't overload the audio stack
let lastTypingSoundTime = 0;

/**
 * Subtle typewriter keypress click sound
 */
export function playTypingSound(): void {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - lastTypingSoundTime < 45) return;
  lastTypingSoundTime = now;

  tryPlayAudioFile('typing.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle mechanical wooden/plastic click
    const pitch = 750 + Math.random() * 250;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  });
}

/**
 * Tactile spring button click
 */
export function playButtonClick(): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('click.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.07);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  });
}

/**
 * Rapid counter number rolling sound effect ("tr-r-r-r-tik-tik!")
 * Simulates rapid rolling digits or mechanical odometer spinning numbers quickly.
 */
export function playCounterTick(freq = 1200): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('counter.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    // Series of 8 rapid micro clicks/ticks in ~240ms with escalating pitch
    const tickCount = 8;
    const interval = 0.028; // 28ms between rapid number increments

    for (let i = 0; i < tickCount; i++) {
      const startTime = ctx.currentTime + i * interval;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sharp crisp click tone ramping slightly up like rolling digits
      const basePitch = freq + i * 110;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(basePitch, startTime);
      osc.frequency.exponentialRampToValueAtTime(basePitch * 0.4, startTime + 0.015);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.09, startTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.02);
    }
  });
}

/**
 * Success celebratory chime (Major chord arpeggio)
 */
export function playSuccessSound(): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('success.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  });
}

/**
 * Subtle swoosh transition sound
 */
export function playTransitionSound(): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('transition.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    // Filtered noise swoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  });
}

/**
 * Countdown ticking sound for exam timer (soft tick or urgent higher pitch beep)
 */
export function playCountdownTick(isUrgent = false): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('tick.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isUrgent ? 'sawtooth' : 'sine';
    const freq = isUrgent ? 880 : 440; // A5 for urgent, A4 for normal
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(isUrgent ? 0.12 : 0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  });
}

/**
 * Urgent warning buzzer or chime when time is running out or answer wrong
 */
export function playWarningSound(): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('warning.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  });
}

/**
 * Inspiring hint chime when student unlocks/views a hint
 */
export function playHintSound(): void {
  if (!soundEnabled) return;
  tryPlayAudioFile('hint.mp3', () => {
    const ctx = initAudio();
    if (!ctx) return;

    const notes = [659.25, 880]; // E5, A5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.26);
    });
  });
}
