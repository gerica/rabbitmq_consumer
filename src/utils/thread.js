/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import logger from './logger.js';

class Thread {
  async sleepTest(result) {
    let countInMs = 500;
    let totalWait = 2;
    while (!result) {
      logger.info('...waiting response: time to wait: %s trying: %s', countInMs, totalWait);
      await this.sleep(countInMs);
      if (totalWait <= 0) {
        break;
      }
      if (totalWait >= 5) {
        countInMs += 1000;
      }
      totalWait--;
    }
  }

  sleep(countInMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, countInMs);
    });
  }
}

export default Thread;
