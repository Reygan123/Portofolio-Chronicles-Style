// Simple synth engine for retro RPG sounds using Web Audio API
// No external assets required.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambienceNode: AudioBufferSourceNode | null = null;
let ambienceGain: GainNode | null = null;
let isMuted = false;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 3; // Global volume
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.3, audioCtx!.currentTime, 0.1);
  }
  return isMuted;
};

export const getMuteState = () => isMuted;

// Procedural Sound Effects
export const playSound = (type: 'hover' | 'click' | 'success' | 'open' | 'unlock' | 'whisper') => {
  if (isMuted || !audioCtx) {
    // Attempt init on first interaction if not ready, but don't play if muted
    if (!audioCtx && !isMuted) initAudio(); 
    return;
  }
  if (!masterGain) return;

  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(masterGain);

  if (type === 'hover') {
    // High pitch airy swish
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.1);
    osc.start(t);
    osc.stop(t + 0.1);
  } else if (type === 'click') {
    // Mechanical/Metallic thud
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  } else if (type === 'open') {
    // Paper/Scroll sound simulation (Noise burst)
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(50, t);
    osc.frequency.linearRampToValueAtTime(20, t + 0.3);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.4);
    osc.start(t);
    osc.stop(t + 0.4);
  } else if (type === 'success') {
    // Level Up / Quest Complete Chime
    playNote(523.25, t, 0.1); // C5
    playNote(659.25, t + 0.1, 0.1); // E5
    playNote(783.99, t + 0.2, 0.4); // G5
  } else if (type === 'unlock') {
    // Secret Found - Magical glissando
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(880, t + 0.3);
    osc.frequency.linearRampToValueAtTime(1760, t + 0.6);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0, t + 1.0);
    osc.start(t);
    osc.stop(t + 1.0);
  } else if (type === 'whisper') {
    // Eerie whisper - detuned saws
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.linearRampToValueAtTime(50, t + 0.5);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t);
    osc.stop(t + 0.5);
  }
};

const playNote = (freq: number, time: number, duration: number) => {
  if (!audioCtx || !masterGain) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(masterGain);
  gain.gain.setValueAtTime(0.1, time);
  gain.gain.linearRampToValueAtTime(0, time + duration);
  osc.start(time);
  osc.stop(time + duration);
};

// Ambient Dungeon Rumble (Brown Noise simulation)
export const startAmbience = () => {
  if (!audioCtx) initAudio();
  if (ambienceNode || !audioCtx) return;

  // Create Brown Noise Buffer
  const bufferSize = 2 * audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5; // Compensate for gain loss
  }

  ambienceNode = audioCtx.createBufferSource();
  ambienceNode.buffer = buffer;
  ambienceNode.loop = true;
  
  ambienceGain = audioCtx.createGain();
  ambienceGain.gain.value = 0.05; // Very subtle
  
  // Lowpass filter to make it deep
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 120;

  ambienceNode.connect(filter);
  filter.connect(ambienceGain);
  ambienceGain.connect(masterGain!);
  
  ambienceNode.start();
};

export const stopAmbience = () => {
  if (ambienceNode) {
    ambienceNode.stop();
    ambienceNode = null;
  }
};