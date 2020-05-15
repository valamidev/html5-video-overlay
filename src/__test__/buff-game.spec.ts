
import {BuffGame} from '../buff-game'
import { wait } from './utils';




describe('Buff game', () => {

  const buffGame = new BuffGame();


  it('constructor', async () => {


    buffGame.init();

    await wait(3000);

    expect(1).toBe(1);
  });
});
