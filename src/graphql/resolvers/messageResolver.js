import { MessageService } from '../../api/services/index.js';

const query = {
  getMessages: () => MessageService.getMessages(),
};
const mutation = {
  sendMessage: (_, { input }) => MessageService.sendMessage(input),
};
export { query, mutation };
