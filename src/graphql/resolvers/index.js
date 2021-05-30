import * as message from './messageResolver.js';

export default {
  Query: {
    ...message.query,
  },
  Mutation: {
    ...message.mutation,
  },
};
