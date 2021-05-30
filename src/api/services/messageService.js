import logger from '../../utils/logger.js';
import MessageServiceMQ from './messageServiceMQ.js';

const messageServiceMQ = new MessageServiceMQ();

class MessageService {
  static async sendMessage({ msg }) {
    logger.info('sendMessage');
    logger.info(msg);

    await messageServiceMQ.sendToQueueWork(msg);
    return 'Success';
  }

  static async getMessages() {
    logger.info('get Message');
    const result = await messageServiceMQ.fetchQueueWork();
    return result;
  }
}
export default MessageService;
