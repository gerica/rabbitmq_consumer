import logger from '../../utils/logger.js';
import MessageServiceMQ from './messageServiceMQ.js';

const messageServiceMQ = new MessageServiceMQ();

class MessageService {
  static async sendMessage({ msg }) {
    logger.info(msg, 'MessageService:sendMessage');
    await messageServiceMQ.sendToQueueWork(msg);
    return 'Success';
  }

  static async getMessage() {
    logger.info('MessageService:getMessages');
    const result = await messageServiceMQ.getQueueWork();

    return result;
  }

  static async getAllMessages() {
    logger.info('MessageService:getMessages');
    const result = await messageServiceMQ.getAllQueueWork();

    return result;
  }
}
export default MessageService;
