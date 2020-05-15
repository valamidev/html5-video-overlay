import ejs from 'ejs';
import { DEFAULT_FREEZE_TIME } from '../constants';
import { ElementConfig } from '../types';
import { templateOverlay } from './template/overlay';

export enum dataOverlay {
  OVERLAY = 'overlay',
  CLOSE = 'close',
  QUESTION_TIMER = 'timeLeft',
  ANSWER = 'answer-',
}

export class BuffOverlay {
  question: any;
  overlayElement: ElementConfig;
  updateInterval?: NodeJS.Timeout;
  endTime?: number;

  constructor(overlayElement: ElementConfig, question: any) {
    this.overlayElement = overlayElement;
    this.question = question;
    this.endTime = Date.now() + (Number(this.question.time_to_show) || 10) * 1000;

    this.init();
  }

  init(): void {
    this.loadOverlay();
  }

  async loadOverlay(): Promise<void> {
    const element = document.querySelector(`${this.overlayElement.type}.${this.overlayElement.class}`);

    if (element) {
      element.innerHTML = ejs.render(templateOverlay, this.question);

      this.updateOverlay();
      this.listenOverlay();
    }
  }

  updateOverlay(): void {
    this.updateInterval = setInterval(() => {
      if (!this.endTime) {
        return;
      }
      const timeLeft = Math.floor((this.endTime - Date.now()) / 1000) + 1;

      const element = document.querySelector(`[data-overlay=${dataOverlay.QUESTION_TIMER}]`);

      if (element) {
        if (timeLeft > 0) {
          element.innerHTML = timeLeft.toString();
        }
        if (timeLeft <= 0) {
          element.innerHTML = '0';

          this.destroyOverlay();
        }
      }
    }, 50);
  }

  destroyOverlay(freeze = 0): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    const freezeTimer = setTimeout(() => {
      const element = document.querySelector(`[data-overlay=${dataOverlay.OVERLAY}]`);
      if (element) {
        element.classList.add('FadeOut');
      }

      clearTimeout(freezeTimer);
    }, freeze);
  }

  listenOverlay(): void {
    document.querySelector(`[data-overlay=${dataOverlay.CLOSE}]`)?.addEventListener('click', () => {
      console.log('Buff closed');

      this.destroyOverlay();
    });

    for (const answer of this.question.answers) {
      document.querySelector(`[data-overlay=${dataOverlay.ANSWER}${answer.id}]`)?.addEventListener('click', () => {
        console.log(`Answer clicked: ${answer.id}`);

        this.destroyOverlay(DEFAULT_FREEZE_TIME);
      });
    }
  }
}
