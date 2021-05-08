import client from './client';

const createNewMessage = participants => client.post('/chat', {participants});
const getMessages = id => client.get(`/chat${id}`);

export default {
  createNewMessage,
};
