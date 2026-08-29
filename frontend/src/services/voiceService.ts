// Voice Synthesis and Spatial Audio Soundscapes for HeritageVerse

export interface VoiceNarrationOptions {
  text: string;
  lang?: string;
  pitch?: number;
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(options: VoiceNarrationOptions) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    // Clean markdown symbols for natural speech
    const cleanText = options.text
      .replace(/[*#_`~[\]]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = options.rate || 0.95; // Slightly slower for clear storytelling
    utterance.pitch = options.pitch || 1.0;
    utterance.lang = options.lang || 'en-IN'; // Prefer Indian English accent if available

    // Try to pick an Indian English voice if present
    const voices = this.synth.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      options.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      options.onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

export const voiceService = new VoiceService();

// Synthesized Soundscape Generator (Web Audio API)
class SoundscapeEngine {
  private audioCtx: AudioContext | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  // Play ambient temple bell chime and meditative harmonic drone
  public playTempleAmbience() {
    this.initAudio();
    if (!this.audioCtx) return;
    this.stop();

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);

    // Warm 432Hz fundamental drone
    const drone = this.audioCtx.createOscillator();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(216, this.audioCtx.currentTime);
    drone.connect(this.gainNode);
    drone.start();
    this.activeOscillators.push(drone);

    // Harmonic fifth (324Hz)
    const fifth = this.audioCtx.createOscillator();
    fifth.type = 'sine';
    fifth.frequency.setValueAtTime(324, this.audioCtx.currentTime);
    fifth.connect(this.gainNode);
    fifth.start();
    this.activeOscillators.push(fifth);

    this.isPlaying = true;
  }

  // Play river breeze / ocean surf ambient noise
  public playNatureAmbience() {
    this.initAudio();
    if (!this.audioCtx) return;
    this.stop();

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);

    // Low rumble / wind
    const rumble = this.audioCtx.createOscillator();
    rumble.type = 'triangle';
    rumble.frequency.setValueAtTime(108, this.audioCtx.currentTime);
    rumble.connect(this.gainNode);
    rumble.start();
    this.activeOscillators.push(rumble);

    this.isPlaying = true;
  }

  public stop() {
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundscapeEngine = new SoundscapeEngine();
