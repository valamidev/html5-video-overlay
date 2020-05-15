
import {BuffGame} from '../buff-game/buff-game'
import { wait } from './utils';


describe('Buff game', () => {

  const buffGame = new BuffGame();

  const updateSpy = jest.spyOn(buffGame, 'updateBuffGame');
  const apiSpy = jest.spyOn(buffGame, 'getBuffQuestion');

  it('constructor and updateBuffGame', async () => {
    buffGame.init();

    await wait(3000);

    expect(updateSpy).toBeCalled();
    expect(apiSpy).toBeCalled();
  });
});
