import { MessageService } from '../../api/services/index.js';

const query = {
  versionRabbitMQConsumer: () => 'Version Radiolife RabbitMQ Consumer: 0.0.1-rc-01',
  getMessage: () => MessageService.getMessage(),
  getAllMessages: () => MessageService.getAllMessages(),
};
const mutation = {
  sendMessage: (_, { input }) => MessageService.sendMessage(input),
};
export { query, mutation };
