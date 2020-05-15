import { ajax } from 'rxjs/ajax';
import { retry } from 'rxjs/operators';

import { ElementConfig } from '../types';
import { FIRST_REQUEST_DELAY, DEFAULT_API_URI, DEFAULT_BUFF_INNER_OVERLAY, REQUEST_INTERVAL } from '../constants';
import { BuffOverlay } from './buff-overlay';

export interface BuffGameConfig {
  overlayInnerElement?: ElementConfig;
  requestInterval?: number;
}

export class BuffGame {
  buffUpdateCount: number;
  buffInprogress: boolean;
  overlayInnerElement: ElementConfig;
  constructor(config?: BuffGameConfig) {
    this.buffUpdateCount = 0;
    this.buffInprogress = false;

    this.overlayInnerElement = config?.overlayInnerElement || DEFAULT_BUFF_INNER_OVERLAY;
  }

  init(): void {
    setTimeout(async () => {
      await this.updateBuffGame();
    }, FIRST_REQUEST_DELAY);

    setInterval(async () => {
      await this.updateBuffGame();
    }, REQUEST_INTERVAL);
  }

  async updateBuffGame(): Promise<void> {
    try {
      this.buffUpdateCount += 1;
      this.buffInprogress = true;

      const questionData = (await this.getBuffQuestion(this.buffUpdateCount))?.result;

      const questionOverlay = new BuffOverlay(this.overlayInnerElement, questionData);
    } catch (err) {
      console.log(err);
    } finally {
      this.buffInprogress = false;
    }
  }

  async getBuffQuestion(buffId: number): Promise<any> {
    try {
      const requestURI = `${DEFAULT_API_URI}/buffs/${buffId}`;

      const buffResponse = await ajax.getJSON(requestURI).pipe(retry(4)).toPromise();

      return buffResponse;
    } catch (err) {
      console.log(err);
    }
  }
}
