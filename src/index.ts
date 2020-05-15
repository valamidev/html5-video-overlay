import { wrapElement, injectBuffOverlay } from './utilities';
import { BuffVideoConfig } from './types';
import { DEFAULT_OUTER_DIV } from './constants';
import { BuffGame } from './buff-game';

let isBuffVideoInitialized = false;

const BuffVideo = (videoContainer: string, _options?: BuffVideoConfig): void => {
  if (isBuffVideoInitialized) {
    return;
  }
  isBuffVideoInitialized = true;

  // Wrap Video Player
  wrapElement(document.querySelector(videoContainer) as Element, DEFAULT_OUTER_DIV);

  injectBuffOverlay(DEFAULT_OUTER_DIV);

  const buffGame = new BuffGame();

  buffGame.init();
};

declare global {
  interface Window {
    BuffVideo: any;
  }
}

window.BuffVideo = BuffVideo;
