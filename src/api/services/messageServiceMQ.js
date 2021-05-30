/* eslint-disable class-methods-use-this */
import amqp from 'amqplib';
import logger from '../../utils/logger.js';
import config from '../../config/config.js';
import Thread from '../../utils/thread.js';

const { MQ_HOST, MQ_QUEUE_WORK_MSG, MQ_QUEUE_WORK_MSG_RESPONSE } = config;

class MessageServiceMQ {
  constructor() {
    this.thread = new Thread();
  }

  async sendToQueueWork(payload) {
    logger.info('Send to MQ, message.');

    try {
      const { connection, channel } = await this.createConnection();

      const queue = MQ_QUEUE_WORK_MSG;

      channel.assertQueue(queue, {
        durable: true,
      });
      logger.info(payload);
      const data = Buffer.from(JSON.stringify(payload));
      channel.sendToQueue(queue, data, {
        persistent: true,
      });
      logger.info(' [x] Sent ');
      this.closeConnection(channel, connection);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async fetchQueueWork() {
    logger.info('Init work.');
    let result;
    try {
      const { connection, channel } = await this.createConnection();

      const message = await channel.get(MQ_QUEUE_WORK_MSG_RESPONSE); // get one msg at a time
      if (message) {
        logger.info(' [x] Received %s', message.content.toString());
        result = JSON.parse(message.content.toString());
        channel.ack(message);
      }

      //   channel.assertQueue(MQ_QUEUE_WORK_MSG_RESPONSE, {
      //     durable: true,
      //   });
      //   channel.prefetch(1);
      //   logger.info(' [*] Waiting for messages in %s. ', MQ_QUEUE_WORK_MSG_RESPONSE);

      //   const processMessage = async (message) => {
      //     try {
      //       logger.info(' [x] Received %s', message.content.toString());
      //       result = JSON.parse(message.content.toString());
      //       channel.ack(message);
      //     } catch (error) {
      //       this.handleError(error);
      //     }
      //   };

      //   channel.consume(MQ_QUEUE_WORK_MSG_RESPONSE, processMessage, {
      //     // manual acknowledgment mode,
      //     // see https://www.rabbitmq.com/confirms.html for details
      //     noAck: false,
      //   });
      //   await this.thread.sleepTest(result);
      this.closeConnection(channel, connection);
      return result;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async createConnection() {
    const connection = await amqp.connect(`amqp://${MQ_HOST}`);
    const channel = await connection.createChannel();
    return { connection, channel };
  }

  closeConnection(channel, connection) {
    setTimeout(() => {
      if (channel) {
        channel.close();
      }
      if (connection) {
        connection.close();
      }
    }, 500);
  }

  handleError(error) {
    logger.error(error);
  }
}
export default MessageServiceMQ;
