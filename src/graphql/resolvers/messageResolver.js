import { MessageService } from '../../api/services/index.js';

const query = {
  getMessage: () => MessageService.getMessage(),
  getAllMessages: () => MessageService.getAllMessages(),
};
const mutation = {
  sendMessage: (_, { input }) => MessageService.sendMessage(input),
};
export { query, mutation };
