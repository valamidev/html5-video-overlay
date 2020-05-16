import ejs from 'ejs';
import { DEFAULT_FREEZE_TIME } from '../constants';
import { ElementConfig } from '../types';
import { templateOverlay, countDownTimer } from './template/overlay';

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
  endTime: number;
  countDownTimer?: any;
  timeLeft: number;
  timeToShow: number;

  constructor(overlayElement: ElementConfig, question: any) {
    this.overlayElement = overlayElement;
    this.question = question;
    this.timeToShow = Number(this.question.time_to_show) || 10;
    this.endTime = Date.now() + this.timeToShow * 1000;
    this.timeLeft = Math.floor((this.endTime - Date.now()) / 1000) + 1;

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
    if (!this.countDownTimer) {
      const element = document.querySelector(`[data-overlay=${dataOverlay.QUESTION_TIMER}]`);

      if (element) {
        this.countDownTimer = countDownTimer(element);
        this.countDownTimer.set(1);
        this.countDownTimer.setText(this.timeLeft.toString());
      }
    }

    this.updateInterval = setInterval(() => {
      this.timeLeft = Math.floor((this.endTime - Date.now()) / 1000) + 1;

      if (this.countDownTimer) {
        if (this.timeLeft > 0) {
          this.countDownTimer.set(this.timeLeft / this.timeToShow > 1 ? 1 : this.timeLeft / this.timeToShow);
          this.countDownTimer.setText(this.timeLeft.toString());
        }
        if (this.timeLeft <= 0) {
          this.countDownTimer.set(0);
          this.countDownTimer.setText('0');

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
