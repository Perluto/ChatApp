import client from './client';

const createNewMessage = participants => client.post('/chat', {participants});
const getMessages = () => client.get(`/chat`);

export default {
  createNewMessage,
  getMessages,
};
