import { Lists } from '.keystone/types';
import Conversation from './schemas/conversation';
import Message from './schemas/message';
import User from './schemas/user';

export const lists: Lists = {
  User: User,
  Conversation: Conversation,
  Message: Message
};
