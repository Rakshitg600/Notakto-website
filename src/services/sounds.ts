import { log } from "console";

let backgroundAudio: HTMLAudioElement | null = null;

export const playMoveSound = (mute: boolean) => {
  if (mute) return;
  const audio = new Audio('/sounds/click.mp3');
  audio.play().catch(console.error);
};

export const playWinSound = (mute: boolean) => {
  if (mute) return;
  const audio = new Audio('/sounds/wins.mp3');
  audio.play().catch(console.error);
};

// Initialize background music only once
export const initBackgroundMusic = (mute: boolean) => {
  if (!backgroundAudio) {
    backgroundAudio = new Audio('/sounds/background.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.3;
  }

  if (!mute && backgroundAudio.paused) {
    backgroundAudio.play().catch((err) =>
      console.log("BG sound failed:", err)
    );
  }
};

// Toggle mute/play
export const toggleBackgroundMusic = (mute: boolean) => {
  if (!backgroundAudio) {
    initBackgroundMusic(mute);
  }
  
  if (!backgroundAudio) return;

  if (mute) {
    backgroundAudio.pause();
    console.log("Stop");
  } else {
    backgroundAudio.play().catch(console.error);
    console.log("Play");

  }
};

// Explicit stop if you ever need it 
export const stopBackgroundMusic = () => {
  if (backgroundAudio) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
    backgroundAudio = null;
  }
};
